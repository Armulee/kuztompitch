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
            console.error("[ig-posts] Response content:", responseText.substring(0, 500))

            // Try to extract error message from HTML
            let errorMessage = "Google Apps Script returned an error page"
            
            // Try to find error message in common HTML error formats
            const titleMatch = responseText.match(/<title[^>]*>([^<]+)<\/title>/i)
            const h1Match = responseText.match(/<h1[^>]*>([^<]+)<\/h1>/i)
            const errorMatch = responseText.match(/error[^<]*:?\s*([^<\n]+)/i)
            
            if (titleMatch) {
                errorMessage = `Error: ${titleMatch[1]}`
            } else if (h1Match) {
                errorMessage = `Error: ${h1Match[1]}`
            } else if (errorMatch) {
                errorMessage = `Error: ${errorMatch[1]}`
            }

            return NextResponse.json(
                {
                    success: false,
                    message: errorMessage,
                    details: "The Google Apps Script returned an HTML error page instead of JSON. Please check the script configuration and ensure it's deployed correctly.",
                    statusCode: response.status,
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
