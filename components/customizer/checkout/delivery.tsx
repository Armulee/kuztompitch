// import { FaMapMarkerAlt } from "react-icons/fa"
import { FaTruck } from "react-icons/fa6"

const Delivery = ({
    selectedDelivery,
    setSelectedDelivery,
}: {
    selectedDelivery: "ems" | "pickup"
    setSelectedDelivery: React.Dispatch<React.SetStateAction<"ems" | "pickup">>
}) => {
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
                            checked={selectedDelivery === "ems"}
                            onChange={() => setSelectedDelivery("ems")}
                            className='w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500'
                        />
                        <div className='flex-1'>
                            <div className='font-semibold text-slate-900'>
                                EMS Delivery - 60฿
                            </div>
                            <p className='text-sm text-slate-600'>
                                Get it delivered in 7 business days
                            </p>
                        </div>
                        <FaTruck className='h-5 w-5 text-green-600' />
                    </label>

                    {/* <label className='flex items-center space-x-3 p-4 border border-slate-200 rounded-xl hover:border-green-300 transition-colors cursor-pointer'>
                        <input
                            type='radio'
                            name='delivery'
                            value='pickup'
                            checked={selectedDelivery === "pickup"}
                            onChange={() => setSelectedDelivery("pickup")}
                            className='w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500'
                        />
                        <div className='flex-1'>
                            <div className='font-semibold text-slate-900'>
                                Self Pickup - Free
                            </div>
                            <p className='text-sm text-slate-600'>
                                Pick up when ready at our store
                            </p>
                        </div>
                        <FaMapMarkerAlt className='h-5 w-5 text-blue-600' />
                    </label> */}
                </div>
            </div>
        </div>
    )
}

export default Delivery
