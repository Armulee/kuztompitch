"use client"

import { FaChevronLeft } from "react-icons/fa"
import React, { useState } from "react"
import { useCustomizeContext } from "../provider"
import Details from "./details"
import Delivery from "./delivery"
import Address from "./address"
import Payment from "./payment"
import Total from "./total"

export default function Checkout() {
    const { setCheckout } = useCustomizeContext()
    const [selectedDelivery, setSelectedDelivery] = useState<"ems" | "pickup">(
        "ems"
    )
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [telephone, setTelephone] = useState<string>("")
    const [address, setAddress] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const timestamp = new Date().toISOString()
        const data = {
            timestamp,
            fullName,
            email,
            telephone,
            address,
            status: "On Hold",
        }

        try {
            const res = await fetch(
                "https://script.google.com/macros/s/AKfycbwf-wJ3ANZdkjBpYsqP-yxKhnOedtxfkDVigjcfVcBxIKER7S3pnliUjtDmNTsRAS8_gA/exec",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            const result = await res.json()
            if (result.success) {
                alert(
                    `Order submitted! Your order number is ${result.orderNumber}`
                )
            } else {
                alert("Submission failed.")
            }
        } catch (error) {
            console.error("Error submitting to Google Sheet", error)
            alert("Something went wrong.")
        }
    }
    return (
        <section
            className='bg-[#efefef]'
            // 'bg-gradient-to-br from-slate-50 to-slate-100'
        >
            <div className='mx-auto max-w-4xl p-4'>
                {/* Header */}
                <div className='mb-4 bg-white rounded-xl shadow-sm border border-slate-200'>
                    <div className='w-full flex items-center justify-center p-6 relative'>
                        <button
                            onClick={() => setCheckout(false)}
                            className='absolute left-0 flex items-center gap-2 text-slate-600 hover:translate-x-1 transition duration-300 px-3 py-2'
                        >
                            <FaChevronLeft className='h-4 w-4' />
                            Back
                        </button>
                        <h4 className='text-2xl font-bold text-slate-900'>
                            Order Summary
                        </h4>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='grid md:grid-cols-3 gap-8'
                >
                    {/* Main Content */}
                    <div className='md:col-span-2 space-y-8'>
                        <Details />
                        <Delivery
                            selectedDelivery={selectedDelivery}
                            setSelectedDelivery={setSelectedDelivery}
                        />
                        <Address
                            setFullName={setFullName}
                            setEmail={setEmail}
                            setTelephone={setTelephone}
                            setAddress={setAddress}
                        />
                        <Payment />
                    </div>

                    {/* Order Summary Sidebar */}
                    <Total selectedDelivery={selectedDelivery} />
                </form>
            </div>
        </section>
    )
}
