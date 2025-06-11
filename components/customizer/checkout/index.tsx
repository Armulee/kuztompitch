"use client"

import React, { useEffect, useState } from "react"
import MainCheckout from "./checkout"
import PaymentInfo from "./payment-info"
import { ClipLoader } from "react-spinners"
import { useCustomizeContext } from "../provider"

export default function Checkout() {
    const { pricing } = useCustomizeContext()
    const [submitted, setSubmiited] = useState<boolean>(false)
    const [orderNumber, setOrderNumber] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(pricing + 100)
    const [discount, setDiscount] = useState<number>(0)
    const [totalDiscount, setTotalDiscount] = useState<number>(0)

    // make a total discount
    useEffect(() => {
        setTotalDiscount(pricing * discount)
    }, [discount, pricing])

    // get the total value by model price, deducted with discount and plus delivery fee
    useEffect(() => {
        setTotal(pricing - totalDiscount + 100)
    }, [pricing, totalDiscount])

    return (
        <section
            className='bg-[#efefef] relative'
            // 'bg-gradient-to-br from-slate-50 to-slate-100'
        >
            <div className='mx-auto max-w-4xl min-h-screen p-4'>
                {submitted ? (
                    <PaymentInfo orderNumber={orderNumber} total={total} />
                ) : (
                    <MainCheckout
                        setSubmitted={setSubmiited}
                        setOrderNumber={setOrderNumber}
                        setLoading={setLoading}
                        total={total}
                        setDiscount={setDiscount}
                        totalDiscount={totalDiscount}
                    />
                )}
            </div>

            {loading && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm'>
                    <div className='text-center text-gray-800 font-medium'>
                        <ClipLoader />
                        <p>Submitting your order…</p>
                    </div>
                </div>
            )}
        </section>
    )
}
