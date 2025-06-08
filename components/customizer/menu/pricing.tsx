import { useCustomizeContext } from "../provider"
import Checkout from "../checkout"
import { useRef } from "react"
import { FaTrash } from "react-icons/fa6"

const Pricing = () => {
    const {
        setCapturing,
        checkout,
        setCheckout,
        logo,
        setLogo,
        editLogo,
        setEditLogo,
    } = useCustomizeContext()
    const handleClick = () => {
        setCapturing(true)
        setCheckout(true)
    }

    // Handle file upload
    const uploader = useRef<HTMLInputElement>(null)
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            const img = new Image()
            img.onload = () => {
                setLogo({
                    fileName: file.name,
                    image: reader.result as string,
                    position: [0, 2.2, 0.5],
                    aspect: img.height / img.width,
                })
            }
            img.src = reader.result as string
        }
        reader.readAsDataURL(file)
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
                    {!editLogo ? (
                        <div className='w-full flex items-center justify-center'>
                            <div
                                className={`w-fit px-5 py-1.5 text-sm mr-3 transition duration-500 ease cursor-pointer rounded-full border border-[#aaaaaa]`}
                                onClick={() => uploader.current?.click()}
                            >
                                {logo.image ? (
                                    <button onClick={() => setEditLogo(true)}>
                                        Edit Image
                                    </button>
                                ) : (
                                    <>
                                        Upload Image
                                        <input
                                            ref={uploader}
                                            className='hidden'
                                            type='file'
                                            accept='.jpg,.jpeg,.png'
                                            onChange={handleUpload}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setEditLogo(false)}
                            className='rounded-full border px-3 py-1 mr-2'
                        >
                            Back
                        </button>
                    )}

                    <div className='w-[1px] h-[20px] rounded mr-4 bg-black bg-opacity-80' />

                    {/* CHECKOUT */}
                    {editLogo ? (
                        <div className='w-full ml-1 flex items-center gap-3'>
                            <div className='flex items-center gap-2'>
                                <span
                                    className='underline underline-offset-4'
                                    onClick={() => uploader.current?.click()}
                                >
                                    {logo.fileName}
                                </span>
                            </div>

                            <input
                                className='hidden'
                                type='file'
                                ref={uploader}
                                onChange={handleUpload}
                            />

                            <button
                                className='rounded'
                                onClick={() => {
                                    setLogo({
                                        fileName: "",
                                        image: "",
                                        position: [0, 2.2, 0.5],
                                        aspect: 0,
                                    })
                                    setEditLogo(false)
                                }}
                            >
                                <FaTrash className='text-red-500' />
                            </button>
                        </div>
                    ) : (
                        <button
                            id='checkout'
                            onClick={handleClick}
                            className='px-8 py-2 bg-black text-white rounded-md text-black text-sm'
                        >
                            Checkout
                        </button>
                    )}
                </div>
            </div>

            <Checkout />
        </div>
    )
}

export default Pricing
