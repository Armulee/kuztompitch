import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaInfoCircle, FaUniversity } from "react-icons/fa"
import { FaArrowRight, FaChevronLeft } from "react-icons/fa6"
import kbankLogo from "@/public/assets/kbank-logo.png"

export default function PaymentInfo({
    orderNumber,
    total,
}: {
    orderNumber: string
    total: number
}) {
    const router = useRouter()

    return (
        <div className='min-h-screen'>
            <div className='mb-4 bg-surface-light rounded-2xl border border-white/[0.06]'>
                <div className='w-full flex items-center justify-center p-4 sm:p-6 relative'>
                    <button
                        onClick={() => router.push("/")}
                        className='absolute left-0 flex items-center gap-1.5 sm:gap-2 text-zinc-400 hover:text-white hover:translate-x-1 transition-all duration-300 px-2 sm:px-3 py-2 text-sm'
                    >
                        <FaChevronLeft className='h-3 w-3 sm:h-4 sm:w-4' />
                        <span className='hidden sm:inline'>Back</span>
                    </button>
                    <h4 className='text-base sm:text-2xl font-bold gradient-text font-display'>
                        Order Received
                    </h4>
                </div>
            </div>

            <div className='mx-auto max-w-2xl px-2 sm:px-4 py-6 sm:py-8'>
                <div className='text-center mb-8'>
                    <div className='w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4'>
                        <FaUniversity className='h-8 w-8 text-emerald-400' />
                    </div>
                    <h1 className='text-3xl font-bold text-white mb-2 font-display'>
                        Payment Information
                    </h1>
                    <p className='text-zinc-400'>
                        Please transfer your payment to the account below
                    </p>
                </div>

                <div className='bg-surface-light rounded-2xl border border-white/[0.06] mb-6'>
                    <div className='p-6'>
                        <div className='flex justify-between items-center mb-4'>
                            <span className='text-zinc-400'>Order Number:</span>
                            <span className='font-semibold text-white'>
                                {orderNumber}
                            </span>
                        </div>
                        <div className='flex justify-between items-center text-lg'>
                            <span className='font-semibold text-white'>
                                Total Amount:
                            </span>
                            <span className='text-2xl font-bold gradient-text'>
                                {total.toLocaleString()}&#3647;
                            </span>
                        </div>
                    </div>
                </div>

                <div className='bg-surface-light rounded-2xl border border-white/[0.06] mb-6'>
                    <div className='p-6 border-b border-white/[0.06]'>
                        <h2 className='text-xl font-semibold text-white flex items-center gap-2'>
                            Please transfer your payment to:
                        </h2>
                    </div>

                    <div className='p-6 space-y-4'>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 gap-3'>
                            <div className='flex items-center gap-3'>
                                <Image
                                    width={50}
                                    height={50}
                                    src={kbankLogo}
                                    alt='kbank-logo'
                                    className='w-10 h-10 sm:w-[50px] sm:h-[50px] flex-shrink-0'
                                />

                                <p className='text-zinc-200 text-sm sm:text-base'>
                                    <span className='font-bold text-white'>
                                        Kasikorn Bank
                                    </span>
                                    <br />
                                    <span className='text-lg font-bold text-emerald-400'>
                                        102-3-21860-3
                                    </span>
                                    <br />
                                    <span className='text-zinc-400'>
                                        &#xe1a;&#xe08;&#xe01;.
                                        &#xe04;&#xe31;&#xe2a;&#xe15;&#xe49;&#xe2d;&#xe21;
                                        &#xe1e;&#xe34;&#xe17;&#xe0a;&#xe4c;
                                    </span>
                                    <br />
                                    <span className='text-zinc-400'>
                                        &#xe40;&#xe14;&#xe2d;&#xe30;&#xe21;&#xe2d;&#xe25;&#xe25;&#xe4c;
                                        &#xe07;&#xe32;&#xe21;&#xe27;&#xe07;&#xe28;&#xe4c;&#xe27;&#xe32;&#xe19;
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-6'>
                    <div className='flex items-start gap-3'>
                        <FaInfoCircle className='h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0' />
                        <div>
                            <h3 className='font-semibold text-amber-300 mb-2'>
                                Important Notes:
                            </h3>
                            <ul className='text-sm text-amber-200/70 space-y-1'>
                                <li>
                                    - Please transfer the exact amount:{" "}
                                    <strong className='text-amber-200'>
                                        {total.toLocaleString()}&#3647;
                                    </strong>
                                </li>
                                <li>
                                    - Keep your payment slip for confirmation
                                </li>
                                <li>
                                    - Transfer must be completed within 24 hours
                                </li>
                                <li>
                                    - After transfer, proceed to payment
                                    confirmation
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='space-y-4'>
                    <Link href='/confirm-payment'>
                        <button className='w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 flex items-center justify-center gap-2'>
                            Confirm Payment
                            <FaArrowRight className='h-4 w-4' />
                        </button>
                    </Link>

                    <p className='text-center text-sm text-zinc-500'>
                        After making the transfer, click the button above to
                        upload your payment slip
                    </p>
                </div>
            </div>
        </div>
    )
}
