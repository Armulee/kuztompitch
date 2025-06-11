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
            <div className='bg-white rounded-xl shadow-sm border border-slate-200 sticky top-8'>
                <div className='p-6 border-b border-slate-200'>
                    <h2 className='text-xl font-semibold text-slate-900'>
                        Order Summary
                    </h2>
                </div>
                <div className='p-6 space-y-4'>
                    <div className='space-y-3'>
                        <div className='flex justify-between text-slate-600'>
                            <span>Subtotal</span>
                            <span>{pricing.toLocaleString()}฿</span>
                        </div>

                        <div className='flex justify-between text-slate-600'>
                            <span>Discount</span>
                            <span>-{totalDiscount.toLocaleString()}฿</span>
                        </div>

                        <div className='flex justify-between text-slate-600'>
                            <span>Delivery</span>
                            <span>100฿</span>
                        </div>

                        <div className='border-t border-slate-200 pt-3'>
                            <div className='flex justify-between text-lg font-bold text-slate-900'>
                                <span>Total</span>
                                <span>{total.toLocaleString()}฿</span>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-3 pt-4'>
                        <button
                            type='submit'
                            className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                        >
                            Proceed to Payment
                        </button>

                        <p className='text-xs text-slate-500 text-center leading-relaxed'>
                            By proceeding, you agree to our{" "}
                            <a
                                href='#'
                                className='text-blue-600 hover:underline'
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href='#'
                                className='text-blue-600 hover:underline'
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
