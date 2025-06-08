"use client"

import type React from "react"

import { useState } from "react"
import {
    FaCheckCircle,
    FaUpload,
    FaCalendarAlt,
    FaClock,
    FaReceipt,
    FaSpinner,
} from "react-icons/fa"
import Image from "next/image"
import { FaChevronLeft } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import kbankLogo from "@/public/assets/kbank-logo.png"

const bank = {
    id: "kbank",
    name: "Kasikorn Bank",
    account: "102-3-21860-3",
    company: "บจก. คัสต้อม พิทช์",
    branch: "เดอะมอลล์ งามวงศ์วาน",
    logo: kbankLogo,
}

export default function ConfirmPayment() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        orderNumber: "",
        transferredAccount: "",
        transferDate: "",
        transferTime: "",
        paymentSlip: "",
    })
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Create preview
            const reader = new FileReader()
            reader.onload = (e) => {
                const slip = e.target?.result as string
                setFormData((prev) => ({ ...prev, paymentSlip: slip }))
                setPreviewImage(slip)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Dummy fetch logic
            const formDataToSend = new FormData()
            formDataToSend.append("orderNumber", formData.orderNumber)
            formDataToSend.append(
                "transferredAccount",
                formData.transferredAccount
            )
            formDataToSend.append("transferDate", formData.transferDate)
            formDataToSend.append("transferTime", formData.transferTime)
            if (formData.paymentSlip) {
                formDataToSend.append("paymentSlip", formData.paymentSlip)
            }

            const response = await fetch("/api/confirm-payment", {
                method: "POST",
                body: formDataToSend,
            })

            if (response.ok) {
                setIsSubmitted(true)
            } else {
                throw new Error(
                    "Something went wrong, please check your order number."
                )
            }
        } catch (error) {
            console.error("Error submitting payment confirmation:", error)
            alert("Failed to submit payment confirmation. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4'>
                <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center'>
                    <div className='mb-6'>
                        <FaCheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4' />
                        <h1 className='text-2xl font-bold text-slate-900 mb-2'>
                            {/* ยืนยันการชำระเงิน! */}
                            Confirm Payment
                        </h1>
                        <p className='text-slate-600'>
                            {/* คุณได้แจ้งชำระเงินของคุณสำเร็จแล้ว
                            และเราจะทำการตรวจสอบการชำระเงินของคุณภายใน 24
                            ชั่วโมง */}
                            Your payment confirmation has been submitted
                            successfully. We&apos;ll verify your payment and
                            update your order status within 24 hours.
                        </p>
                    </div>
                    <div className='bg-green-50 rounded-lg p-4 mb-6'>
                        <p className='text-sm text-green-800'>
                            <strong>
                                {/* หมายเลขออเดอร์: */}
                                Order Number:
                            </strong>{" "}
                            {formData.orderNumber}
                        </p>
                    </div>
                    <button
                        onClick={() => (window.location.href = "/")}
                        className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors'
                    >
                        {/* กลับไปยังหน้าหลัก */}
                        Back to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
            {/* Back */}
            <div
                className='absolute top-4 left-10 text-black flex items-center cursor-pointer hover:underline'
                onClick={() => router.push("/")}
            >
                <FaChevronLeft />
                {/* กลับ */}
                Back
            </div>

            <div className='mx-auto max-w-2xl px-4 py-8'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <FaReceipt className='h-12 w-12 text-blue-600 mx-auto mb-4' />
                    <h1 className='text-3xl font-bold text-slate-900 mb-2'>
                        {/* แจ้งชำระเงิน */}
                        Confirm Your Payment
                    </h1>
                    <p className='text-slate-600'>
                        {/* กรุณากรอกข้อมูลการสั่งซื้อของคุณเพื่อทำการยืนยันการชำระเงิน */}
                        Please provide your payment details to confirm your
                        order
                    </p>
                </div>

                {/* Form */}
                <div className='bg-white rounded-xl shadow-sm border border-slate-200'>
                    <form onSubmit={handleSubmit} className='p-6 space-y-6'>
                        {/* Order Number */}
                        <div className='space-y-2'>
                            <label
                                htmlFor='orderNumber'
                                className='block text-sm font-medium text-slate-700'
                            >
                                {/* หมายเลขออเดอร์  */}
                                Order Number
                                <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <FaReceipt className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                                <input
                                    id='orderNumber'
                                    name='orderNumber'
                                    type='text'
                                    required
                                    value={formData.orderNumber}
                                    onChange={handleInputChange}
                                    className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                                    placeholder='Enter your order number (e.g., ORD-2024-001)'
                                />
                            </div>
                        </div>

                        {/* Bank Account Cards */}
                        <div className='bg-slate-50 rounded-lg p-4'>
                            <div
                                key={bank.id}
                                className='flex items-center gap-3'
                            >
                                <Image
                                    src={bank.logo}
                                    className={`w-10 h-10`}
                                    alt='kbank-logo'
                                />
                                <div>
                                    <div className='font-semibold text-slate-900'>
                                        {bank.name}
                                    </div>
                                    <div className='text-sm text-slate-600'>
                                        Account Number: {bank.account}
                                    </div>
                                    <div className='text-xs text-slate-600'>
                                        {bank.branch}
                                    </div>
                                    <div className='text-xs text-slate-600'>
                                        {bank.company}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Transfer Date and Time */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <label
                                    htmlFor='transferDate'
                                    className='block text-sm font-medium text-slate-700'
                                >
                                    Date <span className='text-red-500'>*</span>
                                </label>
                                <div className='relative'>
                                    <FaCalendarAlt className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                                    <input
                                        id='transferDate'
                                        name='transferDate'
                                        type='date'
                                        required
                                        value={formData.transferDate}
                                        onChange={handleInputChange}
                                        className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <label
                                    htmlFor='transferTime'
                                    className='block text-sm font-medium text-slate-700'
                                >
                                    Time <span className='text-red-500'>*</span>
                                </label>
                                <div className='relative'>
                                    <FaClock className='absolute left-3 top-3 h-4 w-4 text-slate-400' />
                                    <input
                                        id='transferTime'
                                        name='transferTime'
                                        type='time'
                                        required
                                        value={formData.transferTime}
                                        onChange={handleInputChange}
                                        className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Slip Upload */}
                        <div className='space-y-2'>
                            <label
                                htmlFor='paymentSlip'
                                className='block text-sm font-medium text-slate-700'
                            >
                                Slip Payment{" "}
                                <span className='text-red-500'>*</span>
                            </label>
                            <div className='border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors'>
                                <input
                                    id='paymentSlip'
                                    name='paymentSlip'
                                    type='file'
                                    accept='image/*'
                                    required
                                    onChange={handleFileChange}
                                    className='hidden'
                                />
                                <label
                                    htmlFor='paymentSlip'
                                    className='cursor-pointer'
                                >
                                    {previewImage ? (
                                        <div className='space-y-4'>
                                            <Image
                                                src={
                                                    previewImage ||
                                                    "/placeholder.svg"
                                                }
                                                alt='Payment slip preview'
                                                width={200}
                                                height={300}
                                                className='w-[200px] h-auto mx-auto rounded-lg shadow-sm max-h-60 object-contain'
                                            />
                                            <p className='text-sm text-slate-600'>
                                                Click to change your slip
                                            </p>
                                        </div>
                                    ) : (
                                        <div className='space-y-2'>
                                            <FaUpload className='h-8 w-8 text-slate-400 mx-auto' />
                                            <div className='text-slate-600'>
                                                <span className='font-medium text-blue-600'>
                                                    Upload
                                                </span>{" "}
                                                slip payment
                                            </div>
                                            <p className='text-xs text-slate-500'>
                                                PNG, JPG maximum to 10MB
                                            </p>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='pt-4'>
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                            >
                                {isSubmitting ? (
                                    <span className='flex items-center justify-center gap-2'>
                                        <FaSpinner className='h-4 w-4 animate-spin' />
                                        Confirming...
                                    </span>
                                ) : (
                                    "Confirm Payment"
                                )}
                            </button>
                        </div>

                        {/* Info Text */}
                        <div className='bg-blue-50 rounded-lg p-4'>
                            <p className='text-sm text-blue-800'>
                                <strong className='mr-2'>Note:</strong>
                                After submitting your payment confirmation, our
                                team will verify your payment within 24 hours.
                                You&apos;ll receive an email confirmation once
                                your payment is verified and your order is
                                processed.
                                {/* หลังจากยืนยันการชำระเงินของคุณ
                                เราจะตรวจสอบการชำระเงินของคุณภายใน 24 ชั่วโมง
                                และจะส่งอีเมลยืนยันการชำระเงินของคุณหลังจากตรวจสอบเสร็จสิ้น */}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
