import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const requestId = `confirm-payment-${Date.now()}`
    const url = process.env.GOOGLE_SHEET_URL_APP_SCRIPT
    if (!url) {
        console.error(
            `[confirm-payment][${requestId}] GOOGLE_SHEET_URL_APP_SCRIPT is not set`,
        )
        return NextResponse.json(
            {
                success: false,
                requestId,
                message: "Server configuration error",
            },
            { status: 500 },
        )
    }

    try {
        const formData = await request.formData()

        const orderNumber = formData.get("orderNumber") as string
        const email = formData.get("email") as string
        const paymentSlip = formData.get("paymentSlip") as string

        const data = {
            orderNumber,
            email: email.trim().toLowerCase(),
            slip: paymentSlip,
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ purpose: "confirm-payment", ...data }),
        })

        const contentType = response.headers.get("content-type") || ""
        const rawText = await response.text()

        if (!contentType.includes("application/json")) {
            console.error(
                `[confirm-payment][${requestId}] Non-JSON response from GAS`,
                {
                    status: response.status,
                    statusText: response.statusText,
                    contentType,
                    rawText,
                    payloadPreview: {
                        orderNumber: data.orderNumber,
                        email: data.email,
                        hasSlip: Boolean(data.slip),
                    },
                },
            )
            return NextResponse.json(
                {
                    success: false,
                    requestId,
                    message: "Unexpected response format from GAS",
                },
                { status: 502 },
            )
        }

        let result: { success?: boolean; message?: string; [key: string]: unknown }
        try {
            result = JSON.parse(rawText)
        } catch {
            console.error(
                `[confirm-payment][${requestId}] Invalid JSON response from GAS`,
                {
                    status: response.status,
                    statusText: response.statusText,
                    rawText,
                },
            )
            return NextResponse.json(
                {
                    success: false,
                    requestId,
                    message: "Invalid JSON response from GAS",
                },
                { status: 502 },
            )
        }

        if (response.ok && result.success) {
            return NextResponse.json({ ...result, requestId }, { status: 200 })
        }

        console.error(`[confirm-payment][${requestId}] GAS business error`, {
            status: response.status,
            statusText: response.statusText,
            result,
            payloadPreview: {
                orderNumber: data.orderNumber,
                email: data.email,
                hasSlip: Boolean(data.slip),
            },
        })
        if (result.success === false) {
            return NextResponse.json(
                {
                    success: false,
                    requestId,
                    message: result.message || "Payment confirmation failed",
                },
                { status: response.status >= 400 ? response.status : 400 },
            )
        }

        return NextResponse.json(
            {
                success: false,
                requestId,
                message: "Unexpected response from GAS",
            },
            { status: 502 },
        )
    } catch (error) {
        console.error(
            `[confirm-payment][${requestId}] Error processing payment confirmation`,
            error,
        )
        return NextResponse.json(
            {
                success: false,
                requestId,
                message: "Failed to process payment confirmation",
            },
            { status: 500 },
        )
    }
}
