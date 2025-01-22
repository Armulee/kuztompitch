"use client"
import { FaChevronLeft } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import Details from "./details"
import CheckoutProvider from "./provider"
import Address from "./address"
import Payment from "./payment"
import Delivery from "./delivery"
import Total from "./total"

const Checkout = () => {
    const router = useRouter()
    return (
        <CheckoutProvider>
            <section className='bg-black antialiased'>
                <form
                    action='#'
                    className='mx-auto max-w-screen-xl px-4 2xl:px-0'
                >
                    <div className='flex justify-center items-center py-3 w-full font-bold text-lg rounded-b-full border-0 border-b text-black bg-white mb-4 relative'>
                        <div
                            onClick={() => router.push("/customize")}
                            className='flex items-center gap-1 absolute left-[40px] text-sm cursor-pointer transition duration-500 translate-x-0 hover:-translate-x-1'
                        >
                            <FaChevronLeft />
                            <span>Back</span>
                        </div>
                        <span>Order Summary</span>
                    </div>
                    <div className='lg:flex lg:items-start lg:gap-12 xl:gap-16'>
                        <div className='min-w-0 flex-1 space-y-8'>
                            <div className='space-y-1 w-[90%] m-auto'>
                                <Details />
                                <Delivery />
                                <Address />
                                <Payment />
                                <Total />
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </CheckoutProvider>
    )
}

export default Checkout
