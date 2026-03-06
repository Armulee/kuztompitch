import { useCustomizeContext } from "../provider"

const Total = ({
    total,
    totalDiscount,
}: {
    total: number
    totalDiscount: number
}) => {
    const { pricing } = useCustomizeContext()
    return (
        <div className='lg:col-span-1'>
            <div className='bg-surface-light rounded-2xl border border-white/[0.06] sticky top-8'>
                <div className='p-6 border-b border-white/[0.06]'>
                    <h2 className='text-xl font-semibold text-white'>
                        Order Summary
                    </h2>
                </div>
                <div className='p-6 space-y-4'>
                    <div className='space-y-3'>
                        <div className='flex justify-between text-zinc-400'>
                            <span>Subtotal</span>
                            <span>{pricing.toLocaleString()}&#3647;</span>
                        </div>

                        <div className='flex justify-between text-zinc-400'>
                            <span>Discount</span>
                            <span className='text-emerald-400'>-{totalDiscount.toLocaleString()}&#3647;</span>
                        </div>

                        <div className='flex justify-between text-zinc-400'>
                            <span>Delivery</span>
                            <span>100&#3647;</span>
                        </div>

                        <div className='border-t border-white/[0.06] pt-3'>
                            <div className='flex justify-between text-lg font-bold text-white'>
                                <span>Total</span>
                                <span className='gradient-text'>{total.toLocaleString()}&#3647;</span>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-3 pt-4'>
                        <button
                            type='submit'
                            className='w-full bg-gradient-accent hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent-purple/50'
                        >
                            Proceed to Payment
                        </button>

                        <p className='text-xs text-zinc-500 text-center leading-relaxed'>
                            By proceeding, you agree to our{" "}
                            <a
                                href='#'
                                className='text-accent-purple hover:underline'
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href='#'
                                className='text-accent-purple hover:underline'
                            >
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Total
