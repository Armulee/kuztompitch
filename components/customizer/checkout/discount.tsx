import { MdDiscount } from "react-icons/md"
import React, { useEffect } from "react"
import { FaCheck, FaX } from "react-icons/fa6"

const Discount = ({
    setDiscount,
}: {
    setDiscount: React.Dispatch<React.SetStateAction<number>>
}) => {
    const [discountCode, setDiscountCode] = React.useState<string>("")
    const [error, setError] = React.useState<boolean | null>(null)
    useEffect(() => {
        // start a timer whenever discountCode changes
        const handler = setTimeout(() => {
            if (!discountCode) {
                setError(null)
                setDiscount(0)
                return
            }
            // this will only run 500 ms *after* the last keypress
            fetch(`/api/discount/${encodeURIComponent(discountCode)}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.discount != null) {
                        setError(false)
                        setDiscount(data.discount)
                    } else {
                        setError(true)
                        setDiscount(0)
                    }
                })
                .catch(() => {
                    setError(true)
                    setDiscount(0)
                })
        }, 500)

        // if discountCode changes *again* before the 500 ms is up, clear this timer
        return () => clearTimeout(handler)
    }, [discountCode, setDiscount])

    return (
        <div className='bg-white rounded-xl shadow-sm border border-slate-200'>
            <div className='p-6 border-b border-slate-200'>
                <h2 className='flex items-center gap-2 text-xl font-semibold text-slate-900'>
                    <MdDiscount className='h-5 w-5 text-orange-600' />
                    Discount
                </h2>
            </div>
            <div className='p-6'>
                <label
                    htmlFor='postal'
                    className='block text-sm font-medium text-slate-700'
                >
                    Discount Code
                </label>
                <div className='relative'>
                    <MdDiscount className='absolute left-3 top-3 h-4 w-4 text-zinc-400' />
                    <input
                        id='discount'
                        type='text'
                        className='w-full pl-10 pr-4 py-2 text-slate-700 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors'
                        placeholder='EXAMPLE100'
                        onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    {error === null ? null : error === true ? (
                        <div className='absolute top-1/2 -translate-y-1/2 right-4 rounded-full bg-red-500 text-white w-5 h-5 flex items-center justify-center text-center'>
                            <FaX className='w-3 h-3' />
                        </div>
                    ) : (
                        <div className='absolute top-1/2 -translate-y-1/2 right-4 rounded-full bg-green-500 text-white w-5 h-5 flex items-center justify-center text-center'>
                            <FaCheck className='w-3 h-3' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Discount
