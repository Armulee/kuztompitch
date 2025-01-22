import { useCustomizeContext } from "../provider"
import Link from "next/link"

const Pricing = () => {
    const { pricing } = useCustomizeContext()
    return (
        <div className='w-full flex justify-center items-center absolute bottom-0'>
            <div className='border border-0 border-t rounded-t-full w-full bg-white text-black py-2'>
                <div className='flex justify-center items-center mt-2'>
                    <span className='mr-4 text-sm'>
                        {pricing.toLocaleString()} Baht
                    </span>
                    <div className='w-[1px] h-[20px] rounded mr-4 bg-black bg-opacity-80' />
                    <Link id='checkout' href={"/customize/checkout"}>
                        <button className='px-8 py-2 bg-black text-white rounded-md text-black text-sm'>
                            Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Pricing
