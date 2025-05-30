import { useCustomizeContext } from "../provider"
import Checkout from "../checkout"
import { useRef } from "react"

const Pricing = () => {
    const { setCapturing, checkout, setCheckout, setLogo } =
        useCustomizeContext()
    const handleClick = () => {
        setCapturing(true)
        setCheckout(true)
    }

    // Handle file upload
    const uploader = useRef<HTMLInputElement>(null)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setLogo(URL.createObjectURL(file))
        }
    }
    return (
        <div
            style={{
                top: checkout ? "-13dvh" : "90dvh",
                transition: "0.5s ease",
            }}
            className='w-full h-full absolute left-0 z-50'
        >
            <div className='flex justify-center items-center border border-0 border-t rounded-t-[30px] w-full bg-white text-black'>
                <div className='flex justify-center items-center mt-2 pt-2 pb-6'>
                    {/* UPLOAD LOGO */}
                    <div className='w-full flex items-center justify-center'>
                        <div
                            className={`w-fit px-5 py-1.5 text-sm mr-3 transition duration-500 ease cursor-pointer rounded-full border border-[#aaaaaa]`}
                            onClick={() => uploader.current?.click()}
                        >
                            Upload Logo
                            <input
                                ref={uploader}
                                className='hidden'
                                type='file'
                                accept='.jpg,.jpeg,.png'
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className='w-[1px] h-[20px] rounded mr-4 bg-black bg-opacity-80' />

                    {/* CHECKOUT */}
                    <button
                        id='checkout'
                        onClick={handleClick}
                        className='px-8 py-2 bg-black text-white rounded-md text-black text-sm'
                    >
                        Checkout
                    </button>
                </div>
            </div>

            <Checkout />
        </div>
    )
}

export default Pricing
