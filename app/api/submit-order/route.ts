import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const data = await req.json()
    const url =
        "https://script.google.com/macros/s/AKfycbxTO3OPM_UU1qP4z1_H1TZ0Log8neS4PO3El30L0U0u/dev"
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
