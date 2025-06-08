import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaCheckCircle, FaInfoCircle, FaUniversity } from "react-icons/fa"
import { FaArrowRight, FaChevronLeft, FaCopy } from "react-icons/fa6"
import kbankLogo from "@/public/assets/kbank-logo.png"
import { useCustomizeContext } from "../provider"

export default function PaymentInfo({ orderNumber }: { orderNumber: string }) {
    const router = useRouter()
    const { pricing } = useCustomizeContext()
    const [copied, setCopied] = useState<boolean>(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText("102-3-21860-3")
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
            {/* Header */}
            <div className='mb-4 bg-white rounded-xl shadow-sm border border-slate-200'>
                <div className='w-full flex items-center justify-center p-6 relative'>
                    <button
                        onClick={() => router.push("/")}
                        className='absolute left-0 flex items-center gap-2 text-slate-600 hover:translate-x-1 transition duration-300 px-3 py-2'
                    >
                        <FaChevronLeft className='h-4 w-4' />
                        Back
                    </button>
                    <h4 className='text-2xl font-bold text-slate-900'>
                        Order Has Been Received
                    </h4>
                </div>
            </div>

            <div className='mx-auto max-w-2xl px-4 py-8'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <FaUniversity className='h-12 w-12 text-green-600 mx-auto mb-4' />
                    <h1 className='text-3xl font-bold text-slate-900 mb-2'>
                        Payment Information
                    </h1>
                    <p className='text-slate-600'>
                        Please transfer your payment to the account below
                    </p>
                </div>

                {/* Order Summary */}
                <div className='bg-white rounded-xl shadow-sm border border-slate-200 mb-6'>
                    <div className='p-6'>
                        <div className='flex justify-between items-center mb-4'>
                            <span className='text-slate-600'>
                                Order Number:
                            </span>
                            <span className='font-semibold text-slate-900'>
                                {orderNumber}
                            </span>
                        </div>
                        <div className='flex justify-between items-center text-lg'>
                            <span className='font-semibold text-slate-900'>
                                Total Amount:
                            </span>
                            <span className='text-2xl font-bold text-green-600'>
                                xx,xxx ฿
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payment Instructions */}
                <div className='bg-white rounded-xl shadow-sm border border-slate-200 mb-6'>
                    <div className='p-6 border-b border-slate-200'>
                        <h2 className='text-xl font-semibold text-slate-900 flex items-center gap-2'>
                            💰 Please transfer your payment to:
                        </h2>
                    </div>

                    <div className='p-6 space-y-4'>
                        {/* Bank Name */}
                        <div className='flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200'>
                            <div className='flex items-center gap-3'>
                                <Image
                                    width={50}
                                    height={50}
                                    src={kbankLogo}
                                    alt='kbank-logo'
                                />

                                <p className='text-green-900'>
                                    <span className='font-bold'>
                                        Kasikorn Bank
                                    </span>
                                    <br />
                                    <span className='text-lg font-bold'>
                                        102-3-21860-3
                                    </span>
                                    <br />
                                    <span>บจก. คัสต้อม พิทช์</span>
                                    <br />
                                    <span>เดอะมอลล์ งามวงศ์วาน</span>
                                </p>
                            </div>
                            <button
                                onClick={() => copyToClipboard()}
                                className='p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors'
                                title='Copy bank name'
                            >
                                {copied ? (
                                    <FaCheckCircle className='h-4 w-4' />
                                ) : (
                                    <FaCopy className='h-4 w-4' />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Important Notes */}
                <div className='bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6'>
                    <div className='flex items-start gap-3'>
                        <FaInfoCircle className='h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0' />
                        <div>
                            <h3 className='font-semibold text-amber-900 mb-2'>
                                Important Notes:
                            </h3>
                            <ul className='text-sm text-amber-800 space-y-1'>
                                <li>
                                    • Please transfer the exact amount:{" "}
                                    <strong>{pricing}</strong>
                                </li>
                                <li>
                                    • Keep your payment slip for confirmation
                                </li>
                                <li>
                                    • Transfer must be completed within 24 hours
                                </li>
                                <li>
                                    • After transfer, proceed to payment
                                    confirmation
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='space-y-4'>
                    <Link href='/confirm-payment'>
                        <button className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2'>
                            I&apos;ve Made the Transfer - Confirm Payment
                            <FaArrowRight className='h-4 w-4' />
                        </button>
                    </Link>

                    <p className='text-center text-sm text-slate-500'>
                        After making the transfer, click the button above to
                        upload your payment slip
                    </p>
                </div>

                {/* Copy Success Message */}
                {copied && (
                    <div className='fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in'>
                        <FaCheckCircle className='h-4 w-4' />
                        Copied to clipboard!
                    </div>
                )}
            </div>
        </div>
    )
}
