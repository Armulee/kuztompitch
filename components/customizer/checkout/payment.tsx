import { FaCreditCard } from "react-icons/fa6"

const Payment = () => {
    return (
        <div className='bg-white rounded-xl shadow-sm border border-slate-200'>
            <div className='p-6 border-b border-slate-200'>
                <h2 className='flex items-center gap-2 text-xl font-semibold text-slate-900'>
                    <FaCreditCard className='h-5 w-5 text-orange-600' />
                    Payment Method
                </h2>
            </div>
            <div className='p-6'>
                <label className='flex items-center space-x-3 p-4 border border-slate-200 rounded-xl hover:border-orange-300 transition-colors cursor-pointer'>
                    <input
                        type='radio'
                        name='payment'
                        value='bank-transfer'
                        checked={true}
                        // onChange={(e) => setSelectedPayment(e.target.value)}
                        className='w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500'
                    />
                    <div className='flex-1'>
                        <div className='font-semibold text-slate-900'>
                            Bank Transfer
                        </div>
                        <p className='text-sm text-slate-600'>
                            Please show us your payment slip when complete
                        </p>
                    </div>
                    <FaCreditCard className='h-5 w-5 text-orange-600' />
                </label>
            </div>
        </div>
    )
}

export default Payment
