import { FaTruck, FaTrash } from "react-icons/fa6"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./datepicker.css"

const Delivery = ({
    deliveryDate,
    setDeliveryDate,
}: {
    deliveryDate: string
    setDeliveryDate: React.Dispatch<React.SetStateAction<string>>
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false)
    
    const getMinDate = () => {
        const today = new Date()
        return new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000))
    }
    
    const clearDateAndKeepPicker = () => {
        setDeliveryDate("")
        setShowDatePicker(true)
    }
    
    const handleDateChange = (date: Date | null) => {
        if (date) {
            const minDate = getMinDate()
            if (date >= minDate) {
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                const dateString = `${year}-${month}-${day}`
                setDeliveryDate(dateString)
                setShowDatePicker(false)
            } else {
                alert(`Please select a date at least 30 days from today. Minimum date: ${minDate.toLocaleDateString()}`)
            }
        }
    }

    return (
        <div className='bg-surface-light rounded-2xl border border-white/[0.06]'>
            <div className='p-6 border-b border-white/[0.06]'>
                <h2 className='flex items-center gap-2 text-xl font-semibold text-white'>
                    <FaTruck className='h-5 w-5 text-emerald-400' />
                    Delivery Method
                </h2>
            </div>
            <div className='p-6'>
                <div className='space-y-4'>
                    <label className='flex items-center space-x-3 p-4 border border-white/10 rounded-xl hover:border-emerald-500/30 transition-colors cursor-pointer bg-white/[0.02]'>
                        <input
                            type='radio'
                            name='delivery'
                            value='ems'
                            defaultChecked={true}
                            className='w-4 h-4 text-emerald-500 border-zinc-600 focus:ring-emerald-500 bg-transparent'
                        />
                        <FaTruck className='h-5 w-5 text-emerald-400' />
                        <div className='flex-1'>
                            <div className='font-semibold text-white'>
                                EMS Delivery - 100&#3647;
                            </div>
                        </div>
                    </label>
                    
                    <div className='ml-7 text-sm text-zinc-400'>
                        <p>
                            Our custom microphone take 15-30 days to
                            produce and deliver, depending on the
                            current queue.
                        </p>
                        <p className='mt-1 text-red-400'>
                            If you need your microphone by a specific
                            date, please let us know.
                        </p>
                        {!deliveryDate && (
                            <button
                                type='button'
                                className='underline text-accent-cyan hover:text-white mt-2 transition-colors'
                                onClick={() => setShowDatePicker((prev) => !prev)}
                            >
                                {showDatePicker ? "Back" : "Specify a date"}
                            </button>
                        )}
                        {deliveryDate && (
                            <div className='mt-1 flex items-center gap-2'>
                                <span className='text-zinc-300'>
                                    Selected:{" "}
                                    {new Date(
                                        deliveryDate
                                    ).toLocaleDateString()}
                                </span>
                                <button
                                    type='button'
                                    onClick={clearDateAndKeepPicker}
                                    className='text-red-400 hover:text-red-300 transition-colors p-1 rounded-full hover:bg-red-500/10'
                                    title='Remove selected date'
                                >
                                    <FaTrash className='h-3 w-3' />
                                </button>
                            </div>
                        )}
                        {showDatePicker && (
                            <div className='mt-2'>
                                <DatePicker
                                    selected={deliveryDate ? new Date(deliveryDate + 'T00:00:00') : null}
                                    onChange={handleDateChange}
                                    minDate={getMinDate()}
                                    placeholderText="dd/mm/yyyy"
                                    dateFormat="dd/MM/yyyy"
                                    className="border border-white/10 rounded-xl px-3 py-2 text-white bg-white/5 w-full focus:ring-2 focus:ring-accent-purple focus:border-accent-purple outline-none placeholder:text-zinc-600"
                                    showPopperArrow={false}
                                    popperClassName="react-datepicker-popper"
                                    calendarClassName="react-datepicker-calendar"
                                    dayClassName={(date) => {
                                        const minDate = getMinDate()
                                        if (date < minDate) {
                                            return 'react-datepicker__day--disabled'
                                        }
                                        return ''
                                    }}
                                    isClearable={false}
                                    readOnly={false}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delivery
