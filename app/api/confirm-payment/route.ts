import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const url =
        "https://script.google.com/macros/s/AKfycbzVSCRVsMtn_41_gH6vGcn9yWGRBAGVxDj4GJse59kpZ4zGSFrrYPZ1TCU_AEgVK1H_9w/exec"

    try {
        const formData = await request.formData()

        const orderNumber = formData.get("orderNumber") as string
        const paymentSlip = formData.get("paymentSlip") as File

        const data = {
            orderNumber,
            slip: paymentSlip,
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ purpose: "confirm-payment", ...data }),
        })

        const result = await response.json()

        if (result.success) {
            return NextResponse.json(result, { status: 200 })
        } else if (result.success === false) {
            return NextResponse.json(
                { message: result.message },
                { status: 400 }
            )
        }
    } catch (error) {
        console.error("Error processing payment confirmation:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Failed to process payment confirmation",
            },
            { status: 500 }
        )
    }
}
