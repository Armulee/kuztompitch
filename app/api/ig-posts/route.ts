import { NextResponse } from "next/server"

export async function POST() {
    const url =
        "https://script.google.com/macros/s/AKfycbxt9Mb5AxkUg_vHjpz7U5DV4pJwi7kbzHuosQ4WUSdnWWrZxPm7Bg11-p6hJxmD7KWgbA/exec"

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ purpose: "get-ig-posts" }),
        })

        // Get content type to check if response is JSON
        const contentType = response.headers.get("content-type") || ""
        const isJson = contentType.includes("application/json")

        // Read response as text first to handle both JSON and HTML
        const responseText = await response.text()

        // Check if response is HTML (error page from Google Apps Script)
        if (!isJson || responseText.trim().startsWith("<!DOCTYPE") || responseText.trim().startsWith("<html")) {
            console.error("[ig-posts] Received HTML response instead of JSON")
            console.error("[ig-posts] Response status:", response.status)
            console.error("[ig-posts] Full response content:", responseText)

            // Try to extract error message from HTML
            let errorMessage = "Google Apps Script returned an error page"
            
            // Google Apps Script error pages typically have:
            // 1. Error message in a div with class "errorMessage"
            const errorMessageDivMatch = responseText.match(/<div[^>]*class=["']errorMessage["'][^>]*>([^<]+)<\/div>/i)
            // 2. Error message in body text content
            const bodyTextMatch = responseText.match(/<body[^>]*>[\s\S]*?<div[^>]*>[\s\S]*?<div[^>]*>([^<]+)<\/div>/i)
            // 3. Title tag
            const titleMatch = responseText.match(/<title[^>]*>([^<]+)<\/title>/i)
            // 4. Any text between divs in the body
            const bodyDivMatch = responseText.match(/<body[^>]*>[\s\S]*?<div[^>]*>[\s\S]*?<div[^>]*>[\s\S]*?<div[^>]*>([^<]+)<\/div>/i)
            // 5. Extract all text content from body (remove HTML tags)
            const bodyTextContent = responseText
                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                .match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1]
                ?.replace(/<[^>]+>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
            
            // Try to find the actual error message
            if (errorMessageDivMatch && errorMessageDivMatch[1]) {
                errorMessage = errorMessageDivMatch[1].trim()
            } else if (bodyTextMatch && bodyTextMatch[1]) {
                errorMessage = bodyTextMatch[1].trim()
            } else if (bodyDivMatch && bodyDivMatch[1]) {
                errorMessage = bodyDivMatch[1].trim()
            } else if (bodyTextContent) {
                // Extract meaningful text (skip common UI text)
                const meaningfulText = bodyTextContent
                    .split(/\s+/)
                    .filter(text => 
                        text.length > 3 && 
                        !text.match(/^(google|apps|script|error|the|and|for|are|with)$/i)
                    )
                    .slice(0, 20)
                    .join(' ')
                
                if (meaningfulText) {
                    errorMessage = meaningfulText
                }
            } else if (titleMatch && titleMatch[1] !== "Error") {
                errorMessage = titleMatch[1]
            }

            // Log the extracted error message
            console.error("[ig-posts] Extracted error message:", errorMessage)

            return NextResponse.json(
                {
                    success: false,
                    message: errorMessage,
                    details: "The Google Apps Script returned an HTML error page instead of JSON. Please check the script configuration and ensure it's deployed correctly.",
                    statusCode: response.status,
                    rawHtml: responseText.substring(0, 1000), // Include first 1000 chars for debugging
                },
                { status: response.status >= 400 ? response.status : 500 }
            )
        }

        // Parse JSON response
        let data
        try {
            data = JSON.parse(responseText)
        } catch {
            console.error("[ig-posts] Failed to parse JSON response")
            console.error("[ig-posts] Response text:", responseText.substring(0, 500))
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to parse response from Google Apps Script",
                    details: "The response was not valid JSON.",
                },
                { status: 500 }
            )
        }

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: data.message || "Failed to fetch Instagram posts",
                    data: data,
                },
                { status: response.status }
            )
        }

        return NextResponse.json(data, { status: 200 })
    } catch (err) {
        console.error("[ig-posts] Handler exception", err)
        const errorMessage =
            err instanceof Error ? err.message : "Unknown error occurred"
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
                details: errorMessage,
            },
            { status: 500 }
        )
    }
}
