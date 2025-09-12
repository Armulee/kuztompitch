// import { FaMapMarkerAlt } from "react-icons/fa"
import { FaTruck, FaTrash, FaCalendarAlt } from "react-icons/fa6"
import { useState } from "react"

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
        const minDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000))
        return minDate.toISOString().split('T')[0]
    }
    
    // Validate selected date
    const validateDate = (selectedDate: string) => {
        const today = new Date()
        const minDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000))
        const selected = new Date(selectedDate)
        
        if (selected < minDate) {
            alert(`Please select a date at least 30 days from today. Minimum date: ${minDate.toLocaleDateString()}`)
            return false
        }
        return true
    }
    
    const clearDeliveryDate = () => {
        setDeliveryDate("")
        setShowDatePicker(false)
    }
    
    const clearDateAndKeepPicker = () => {
        setDeliveryDate("")
        setShowDatePicker(true)
    }
    
    // Custom date picker component
    const CustomDatePicker = () => {
        const today = new Date()
        const minDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000))
        const [selectedDate, setSelectedDate] = useState(deliveryDate)
        
        const handleDateSelect = (date: string) => {
            const selected = new Date(date)
            if (selected >= minDate) {
                setDeliveryDate(date)
                setShowDatePicker(false)
            }
        }
        
        const isDateDisabled = (date: Date) => {
            return date < minDate
        }
        
        // Generate next 60 days for display
        const generateDates = () => {
            const dates = []
            for (let i = 0; i < 60; i++) {
                const date = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000))
                dates.push(date)
            }
            return dates
        }
        
        return (
            <div className="mt-2 border border-slate-200 rounded-lg p-4 bg-white">
                <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                    <FaCalendarAlt className="h-4 w-4" />
                    <span>Select delivery date (minimum 30 days from today)</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-2 text-center font-semibold text-slate-500">
                            {day}
                        </div>
                    ))}
                    {generateDates().map((date, index) => {
                        const isDisabled = isDateDisabled(date)
                        const isSelected = selectedDate === date.toISOString().split('T')[0]
                        const isToday = date.toDateString() === today.toDateString()
                        
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleDateSelect(date.toISOString().split('T')[0])}
                                disabled={isDisabled}
                                className={`
                                    p-2 text-center rounded transition-colors
                                    ${isDisabled 
                                        ? 'text-slate-300 bg-slate-50 cursor-not-allowed' 
                                        : isSelected
                                            ? 'bg-green-600 text-white font-semibold'
                                            : isToday
                                                ? 'bg-slate-200 text-slate-700 font-semibold'
                                                : 'text-slate-700 hover:bg-green-50 hover:text-green-700'
                                    }
                                `}
                            >
                                {date.getDate()}
                            </button>
                        )
                    })}
                </div>
                <div className="mt-3 text-xs text-slate-500">
                    <p>• Gray dates are not available (less than 30 days)</p>
                    <p>• Green dates are available for delivery</p>
                </div>
            </div>
        )
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
                        {showDatePicker && <CustomDatePicker />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delivery
