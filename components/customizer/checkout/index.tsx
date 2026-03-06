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

    useEffect(() => {
        setTotalDiscount(pricing * discount)
    }, [discount, pricing])

    useEffect(() => {
        setTotal(pricing - totalDiscount + 100)
    }, [pricing, totalDiscount])

    return (
        <section className='bg-[#0a0a0a] relative'>
            <div className='mx-auto max-w-4xl min-h-screen px-3 sm:px-4 py-4'>
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
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm'>
                    <div className='text-center text-white font-medium'>
                        <ClipLoader color='#8b5cf6' />
                        <p className='mt-3 text-zinc-300'>Submitting your order...</p>
                    </div>
                </div>
            )}
        </section>
    )
}
