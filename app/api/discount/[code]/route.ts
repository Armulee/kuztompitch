import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params

    const url =
        "https://script.google.com/macros/s/AKfycbwvuJorNSlwssoaT5qGkz1LDS_wvZl60pCsQorVpzE3kHuU37Wg-VtFKhfytyiVokJj2w/exec"
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
