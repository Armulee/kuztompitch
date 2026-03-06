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
        const handler = setTimeout(() => {
            if (!discountCode) {
                setError(null)
                setDiscount(0)
                return
            }
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

        return () => clearTimeout(handler)
    }, [discountCode, setDiscount])

    return (
        <div className='bg-surface-light rounded-2xl border border-white/[0.06]'>
            <div className='p-6 border-b border-white/[0.06]'>
                <h2 className='flex items-center gap-2 text-xl font-semibold text-white'>
                    <MdDiscount className='h-5 w-5 text-accent-cyan' />
                    Discount
                </h2>
            </div>
            <div className='p-6'>
                <label
                    htmlFor='discount'
                    className='block text-sm font-medium text-zinc-300 mb-2'
                >
                    Discount Code
                </label>
                <div className='relative'>
                    <MdDiscount className='absolute left-3 top-3 h-4 w-4 text-zinc-500' />
                    <input
                        id='discount'
                        type='text'
                        className='w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-accent-purple/50 focus:border-accent-purple/50 outline-none transition-all'
                        placeholder='EXAMPLE100'
                        onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    {error === null ? null : error === true ? (
                        <div className='absolute top-1/2 -translate-y-1/2 right-4 rounded-full bg-red-500 text-white w-5 h-5 flex items-center justify-center text-center'>
                            <FaX className='w-3 h-3' />
                        </div>
                    ) : (
                        <div className='absolute top-1/2 -translate-y-1/2 right-4 rounded-full bg-emerald-500 text-white w-5 h-5 flex items-center justify-center text-center'>
                            <FaCheck className='w-3 h-3' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Discount
