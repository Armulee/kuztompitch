import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const data = await req.json()
    const url = process.env.GOOGLE_SHEET_URL_APP_SCRIPT
    if (!url) {
        console.error("[submit-order] GOOGLE_SHEET_URL_APP_SCRIPT is not set")
        return NextResponse.json(
            { success: false, message: "Server configuration error" },
            { status: 500 },
        )
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ purpose: "create-order", ...data }),
        })

        if (response.ok) {
            return NextResponse.json({ success: true }, { status: 200 })
        }
    } catch (err) {
        console.error("[submit-order] Handler exception", err)
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 },
        )
    }
}
