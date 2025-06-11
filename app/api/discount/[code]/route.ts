import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params

    const url =
        "https://script.google.com/macros/s/AKfycbzu5f7XDqAfWz-OCVaEKpsD1SepgajGuE9dX4yXI_5LDZtIpF-H113n3LAHindxp-l8Ag/exec"
    const newUrl = `${url}?discountCode=${encodeURIComponent(code)}`
    try {
        const response = await fetch(newUrl, { cache: "no-store" })

        const result = await response.json()
        return NextResponse.json(result, { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
