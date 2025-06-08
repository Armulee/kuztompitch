"use client"

import React, { useState } from "react"
import MainCheckout from "./checkout"
import PaymentInfo from "./payment-info"
import { ClipLoader } from "react-spinners"

export default function Checkout() {
    const [submitted, setSubmiited] = useState<boolean>(false)
    const [orderNumber, setOrderNumber] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <section
            className='bg-[#efefef] relative'
            // 'bg-gradient-to-br from-slate-50 to-slate-100'
        >
            <div className='mx-auto max-w-4xl min-h-screen p-4'>
                {submitted ? (
                    <PaymentInfo orderNumber={orderNumber} />
                ) : (
                    <MainCheckout
                        setSubmitted={setSubmiited}
                        setOrderNumber={setOrderNumber}
                        setLoading={setLoading}
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
