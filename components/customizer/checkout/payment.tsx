import { FaCreditCard } from "react-icons/fa6"

const Payment = () => {
    return (
        <div className='bg-surface-light rounded-2xl border border-white/[0.06]'>
            <div className='p-6 border-b border-white/[0.06]'>
                <h2 className='flex items-center gap-2 text-xl font-semibold text-white'>
                    <FaCreditCard className='h-5 w-5 text-amber-400' />
                    Payment Method
                </h2>
            </div>
            <div className='p-6'>
                <label className='flex items-center space-x-3 p-4 border border-white/10 rounded-xl hover:border-amber-500/30 transition-colors cursor-pointer bg-white/[0.02]'>
                    <input
                        type='radio'
                        name='payment'
                        value='bank-transfer'
                        defaultChecked={true}
                        className='w-4 h-4 text-amber-500 border-zinc-600 focus:ring-amber-500 bg-transparent'
                    />
                    <div className='flex-1'>
                        <div className='font-semibold text-white'>
                            Bank Transfer
                        </div>
                        <p className='text-sm text-zinc-400'>
                            Please show us your payment slip when complete
                        </p>
                    </div>
                    <FaCreditCard className='h-5 w-5 text-amber-400' />
                </label>
            </div>
        </div>
    )
}

export default Payment
