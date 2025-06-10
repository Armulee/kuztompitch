import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const data = await req.json()
    const url =
        "https://script.google.com/macros/s/AKfycbxhkpF_zGxwgKBrPGt_DNEJF_x9wNYjlCMCP8PwQEuus5qdgYU0pRt3F4AWJRHzri74qw/exec"
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ purpose: "create-order", ...data }),
        })

        const result = await response.json()

        if (result.success) {
            return NextResponse.json(result, { status: 400 })
        } else {
            return NextResponse.json({ message: "Error" }, { status: 400 })
        }
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
