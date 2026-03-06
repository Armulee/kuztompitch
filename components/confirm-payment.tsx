"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
    FaCheckCircle,
    FaUpload,
    FaSpinner,
    FaEnvelope,
    FaHashtag,
    FaImage,
    FaShieldAlt,
    FaCopy,
    FaCheck,
} from "react-icons/fa"
import { FaChevronLeft, FaBuilding } from "react-icons/fa6"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import kbankLogo from "@/public/assets/kbank-logo.png"

const bank = {
    id: "kbank",
    name: "Kasikorn Bank",
    account: "102-3-21860-3",
    company: "\u0e1a\u0e08\u0e01. \u0e04\u0e31\u0e2a\u0e15\u0e49\u0e2d\u0e21 \u0e1e\u0e34\u0e17\u0e0a\u0e4c",
    branch: "\u0e40\u0e14\u0e2d\u0e30\u0e21\u0e2d\u0e25\u0e25\u0e4c \u0e07\u0e32\u0e21\u0e27\u0e07\u0e28\u0e4c\u0e27\u0e32\u0e19",
    logo: kbankLogo,
}

const steps = [
    { label: "Details", icon: FaHashtag },
    { label: "Payment", icon: FaImage },
    { label: "Done", icon: FaCheckCircle },
]

export default function ConfirmPayment() {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [formData, setFormData] = useState<{
        orderNumber: string
        email: string
        paymentSlip: string
    }>({
        orderNumber: "",
        email: "",
        paymentSlip: "",
    })
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [copied, setCopied] = useState(false)

    const currentStep = isSubmitted ? 2 : previewImage ? 1 : 0

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")) return
        const reader = new FileReader()
        reader.onload = (e) => {
            const slip = e.target?.result as string
            setPreviewImage(slip)
            setFormData((prev) => ({ ...prev, paymentSlip: slip }))
        }
        reader.readAsDataURL(file)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) processFile(file)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) processFile(file)
    }

    const copyAccount = () => {
        navigator.clipboard.writeText(bank.account.replace(/-/g, ""))
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            if (formData.paymentSlip) {
                const formDataToSend = new FormData()
                formDataToSend.append("orderNumber", formData.orderNumber)
                formDataToSend.append("email", formData.email)
                formDataToSend.append("paymentSlip", formData.paymentSlip)

                const response = await fetch("/api/confirm-payment", {
                    method: "POST",
                    body: formDataToSend,
                })

                const result = await response.json()
                if (result.success) {
                    setIsSubmitted(true)
                } else {
                    throw new Error(result.message)
                }
            }
        } catch (error) {
            const err = error as Error
            console.error("Error submitting payment confirmation:", error)
            alert(err.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='min-h-screen bg-[#050505] relative'>
            {/* Background effects */}
            <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                <div className='absolute top-[10%] right-[15%] w-[600px] h-[600px] rounded-full bg-accent-purple/[0.04] blur-[180px]' />
                <div className='absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-accent-cyan/[0.04] blur-[160px]' />
            </div>

            {/* Top bar */}
            <div className='relative z-10 border-b border-white/[0.04]'>
                <div className='max-w-3xl mx-auto px-6 py-4 flex items-center justify-between'>
                    <button
                        onClick={() => router.push("/")}
                        className='flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors group'
                    >
                        <FaChevronLeft className='w-3 h-3 group-hover:-translate-x-0.5 transition-transform' />
                        Back
                    </button>
                    <span className='text-sm text-zinc-600'>Kuztom Pitch</span>
                </div>
            </div>

            <div className='max-w-xl mx-auto px-6 pt-10 pb-20 relative z-10'>
                {/* Step indicator */}
                <div className='flex items-center justify-center gap-2 mb-10'>
                    {steps.map((step, i) => (
                        <div key={step.label} className='flex items-center gap-2'>
                            <div
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-500 ${
                                    i <= currentStep
                                        ? "bg-white/10 text-white"
                                        : "bg-white/[0.02] text-zinc-600"
                                }`}
                            >
                                <step.icon className={`w-3 h-3 ${i < currentStep ? "text-emerald-400" : i === currentStep ? "text-accent-purple" : ""}`} />
                                <span className='hidden sm:inline'>{step.label}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`w-8 h-px transition-colors duration-500 ${i < currentStep ? "bg-emerald-400/40" : "bg-white/[0.06]"}`} />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode='wait'>
                    {isSubmitted ? (
                        <motion.div
                            key='success'
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className='text-center'
                        >
                            <div className='relative inline-block mb-6'>
                                <div className='absolute inset-0 bg-emerald-500/20 blur-[40px] rounded-full' />
                                <div className='relative w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto'>
                                    <FaCheckCircle className='w-9 h-9 text-emerald-400' />
                                </div>
                            </div>

                            <h1 className='text-2xl font-bold text-white mb-2 font-display'>
                                Payment Confirmed
                            </h1>
                            <p className='text-zinc-500 text-sm max-w-sm mx-auto mb-8'>
                                We&apos;ll verify your payment and update your order
                                status within 24 hours.
                            </p>

                            <div className='bg-surface-light rounded-2xl border border-white/[0.06] p-5 mb-8 text-left'>
                                <div className='flex items-center justify-between mb-3'>
                                    <span className='text-xs text-zinc-600 uppercase tracking-wider'>Order</span>
                                    <span className='text-xs text-emerald-400/80 flex items-center gap-1'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse' />
                                        Pending verification
                                    </span>
                                </div>
                                <p className='text-white font-mono text-lg'>
                                    #{formData.orderNumber}
                                </p>
                                <p className='text-zinc-600 text-xs mt-1'>{formData.email}</p>
                            </div>

                            <button
                                onClick={() => (window.location.href = "/")}
                                className='w-full bg-white/[0.06] hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-all duration-300 text-sm'
                            >
                                Back to Home
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key='form'
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Title */}
                            <div className='mb-8'>
                                <h1 className='text-3xl font-bold text-white font-display mb-2'>
                                    Confirm Payment
                                </h1>
                                <p className='text-zinc-500 text-sm'>
                                    Transfer to the account below, then upload your slip.
                                </p>
                            </div>

                            {/* Bank card */}
                            <div className='rounded-2xl bg-gradient-to-br from-[#00A651]/10 via-surface-light to-surface-light border border-white/[0.06] p-5 mb-8'>
                                <div className='flex items-center gap-4 mb-4'>
                                    <div className='w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center overflow-hidden'>
                                        <Image
                                            src={bank.logo}
                                            className='w-8 h-8 object-contain'
                                            alt='kbank-logo'
                                        />
                                    </div>
                                    <div>
                                        <div className='font-semibold text-white text-sm'>
                                            {bank.name}
                                        </div>
                                        <div className='text-xs text-zinc-500'>
                                            {bank.branch}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between bg-black/30 rounded-xl px-4 py-3'>
                                    <div>
                                        <span className='text-xs text-zinc-600 block mb-0.5'>Account Number</span>
                                        <span className='text-white font-mono text-lg tracking-wider'>
                                            {bank.account}
                                        </span>
                                    </div>
                                    <button
                                        type='button'
                                        onClick={copyAccount}
                                        className='p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all'
                                        title='Copy account number'
                                    >
                                        {copied ? <FaCheck className='w-3.5 h-3.5 text-emerald-400' /> : <FaCopy className='w-3.5 h-3.5' />}
                                    </button>
                                </div>
                                <div className='flex items-center gap-1.5 mt-3'>
                                    <FaBuilding className='w-3 h-3 text-zinc-600' />
                                    <span className='text-xs text-zinc-500'>{bank.company}</span>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className='space-y-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className='space-y-1.5'>
                                        <label
                                            htmlFor='orderNumber'
                                            className='block text-xs font-medium text-zinc-400 uppercase tracking-wider'
                                        >
                                            Order Number <span className='text-red-400'>*</span>
                                        </label>
                                        <div className='relative'>
                                            <FaHashtag className='absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600' />
                                            <input
                                                id='orderNumber'
                                                name='orderNumber'
                                                type='text'
                                                required
                                                value={formData.orderNumber}
                                                onChange={handleInputChange}
                                                className='w-full pl-9 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-zinc-700 focus:ring-1 focus:ring-accent-purple/40 focus:border-accent-purple/30 outline-none transition-all'
                                                placeholder='e.g. 000000'
                                            />
                                        </div>
                                    </div>

                                    <div className='space-y-1.5'>
                                        <label
                                            htmlFor='email'
                                            className='block text-xs font-medium text-zinc-400 uppercase tracking-wider'
                                        >
                                            Email <span className='text-red-400'>*</span>
                                        </label>
                                        <div className='relative'>
                                            <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600' />
                                            <input
                                                id='email'
                                                name='email'
                                                type='email'
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className='w-full pl-9 pr-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-zinc-700 focus:ring-1 focus:ring-accent-purple/40 focus:border-accent-purple/30 outline-none transition-all'
                                                placeholder='jane@example.com'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* File upload */}
                                <div className='space-y-1.5'>
                                    <label className='block text-xs font-medium text-zinc-400 uppercase tracking-wider'>
                                        Payment Slip <span className='text-red-400'>*</span>
                                    </label>
                                    <div
                                        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
                                            isDragging
                                                ? "border-accent-purple/60 bg-accent-purple/5"
                                                : previewImage
                                                ? "border-white/10 bg-white/[0.02]"
                                                : "border-white/[0.08] bg-white/[0.02] hover:border-white/15"
                                        }`}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            id='paymentSlip'
                                            name='paymentSlip'
                                            type='file'
                                            accept='image/*'
                                            required={!previewImage}
                                            onChange={handleFileChange}
                                            className='hidden'
                                        />
                                        <div className='cursor-pointer'>
                                            {previewImage ? (
                                                <div className='p-4 flex flex-col items-center'>
                                                    <Image
                                                        src={previewImage}
                                                        alt='Payment slip preview'
                                                        width={200}
                                                        height={300}
                                                        style={{ width: "auto", height: "auto" }}
                                                        className='rounded-xl max-h-52 object-contain'
                                                    />
                                                    <span className='text-xs text-zinc-600 mt-3'>
                                                        Click or drop to replace
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className='py-10 flex flex-col items-center'>
                                                    <div className='w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-3'>
                                                        <FaUpload className='w-5 h-5 text-zinc-600' />
                                                    </div>
                                                    <p className='text-sm text-zinc-400'>
                                                        <span className='text-accent-purple font-medium'>
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p className='text-xs text-zinc-700 mt-1'>
                                                        PNG, JPG up to 10MB
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='w-full bg-gradient-accent hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.01] disabled:transform-none disabled:cursor-not-allowed focus:outline-none text-sm'
                                >
                                    {isSubmitting ? (
                                        <span className='flex items-center justify-center gap-2'>
                                            <FaSpinner className='h-4 w-4 animate-spin' />
                                            Confirming...
                                        </span>
                                    ) : (
                                        "Submit Confirmation"
                                    )}
                                </button>
                            </form>

                            {/* Note */}
                            <div className='mt-6 flex items-start gap-3 text-xs text-zinc-600'>
                                <FaShieldAlt className='w-3.5 h-3.5 mt-0.5 text-zinc-700 flex-shrink-0' />
                                <p>
                                    Our team will verify your payment within 24 hours.
                                    You&apos;ll receive an email once your payment is
                                    confirmed and your order is processed.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
