import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const data = await req.json()
    const url =
        "https://script.google.com/macros/s/AKfycbzpKG1Rg2TAervfsMVe1McR_gmVlODInBUcrY2-cnMLOBZI0Dvd2yJuhn6PCIxyQEJK8A/exec"

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ purpose: "create-order", ...data }),
        })

        const result = await response.json()

        console.log(result)
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
