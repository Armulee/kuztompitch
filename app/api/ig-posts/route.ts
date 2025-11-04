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

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: "Failed to fetch Instagram posts" },
                { status: response.status }
            )
        }

        const data = await response.json()

        return NextResponse.json(data, { status: 200 })
    } catch (err) {
        console.error("[ig-posts] Handler exception", err)
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
