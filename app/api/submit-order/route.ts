import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const data = await req.json()
    const url =
        "https://script.google.com/macros/s/AKfycbwBp5mRH1XetFTg74j0ZnL7kL88CCJJ92ojKSViq1-aQ7XU9qxQ-R7oa-QvAWHqZ1sbUA/exec"

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()
        if (result.success) {
            return NextResponse.json(result, { status: 200 })
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
