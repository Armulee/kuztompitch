// import { FaMapMarkerAlt } from "react-icons/fa"
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
    
    // Calculate minimum date (30 days from today)
    const getMinDate = () => {
        const today = new Date()
        return new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000))
    }
    
    const clearDeliveryDate = () => {
        setDeliveryDate("")
        setShowDatePicker(false)
    }
    
    const clearDateAndKeepPicker = () => {
        setDeliveryDate("")
        setShowDatePicker(true)
    }
    
    // Handle date selection
    const handleDateChange = (date: Date | null) => {
        if (date) {
            // Check if the selected date meets the minimum requirement
            const minDate = getMinDate()
            if (date >= minDate) {
                // Use local date to avoid timezone issues
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                const dateString = `${year}-${month}-${day}`
                setDeliveryDate(dateString)
                setShowDatePicker(false)
            } else {
                // Show alert for invalid date
                alert(`Please select a date at least 30 days from today. Minimum date: ${minDate.toLocaleDateString()}`)
            }
        }
    }

    return (
        <div className='bg-white rounded-xl shadow-sm border border-slate-200'>
            <div className='p-6 border-b border-slate-200'>
                <h2 className='flex items-center gap-2 text-xl font-semibold text-slate-900'>
                    <FaTruck className='h-5 w-5 text-green-600' />
                    Delivery Method
                </h2>
            </div>
            <div className='p-6'>
                <div className='space-y-4'>
                    <label className='flex items-center space-x-3 p-4 border border-slate-200 rounded-xl hover:border-green-300 transition-colors cursor-pointer'>
                        <input
                            type='radio'
                            name='delivery'
                            value='ems'
                            defaultChecked={true}
                            className='w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500'
                        />
                        <FaTruck className='h-5 w-5 text-green-600' />
                        <div className='flex-1'>
                            <div className='font-semibold text-slate-900'>
                                EMS Delivery - 100฿
                            </div>
                        </div>
                    </label>
                    
                    <div className='ml-7 text-sm text-black/70'>
                        <p>
                            Our custom microphone take 15-30 days to
                            produce and deliver, depending on the
                            current queue.
                        </p>
                        <p className='mt-1 text-red-500'>
                            If you need your microphone by a specific
                            date, please let us know.
                        </p>
                        <button
                            type='button'
                            className='underline text-black mt-2'
                            onClick={() => {
                                if (deliveryDate) {
                                    clearDeliveryDate()
                                } else {
                                    setShowDatePicker((prev) => !prev)
                                }
                            }}
                        >
                            {deliveryDate ? "Delete" : showDatePicker ? "Back" : "Specify a date"}
                        </button>
                        {deliveryDate && (
                            <div className='mt-1 flex items-center gap-2'>
                                <span className='text-slate-700'>
                                    Selected:{" "}
                                    {new Date(
                                        deliveryDate
                                    ).toLocaleDateString()}
                                </span>
                                <button
                                    type='button'
                                    onClick={clearDateAndKeepPicker}
                                    className='text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50'
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
                                    className="border border-slate-200 rounded-lg px-3 py-2 text-black bg-white w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none placeholder:text-black/50"
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
