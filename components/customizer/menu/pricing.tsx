import { useCustomizeContext } from "../provider"
import Checkout from "../checkout"
import { useRef, useState, useEffect } from "react"
import { FaTrash, FaChevronDown, FaPlus } from "react-icons/fa6"
import { createImageWithPadding } from "../../../utils/imageProcessing"

const Pricing = () => {
    const {
        setCapturing,
        checkout,
        setCheckout,
        logos,
        selectedLogoId,
        setSelectedLogoId,
        addLogo,
        deleteLogo,
        editLogo,
        setEditLogo,
    } = useCustomizeContext()
    
    const [showDropdown, setShowDropdown] = useState(false)
    const selectedLogo = logos.find(logo => logo.id === selectedLogoId)
    const dropdownRef = useRef<HTMLDivElement>(null)
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
        reader.onload = async () => {
            const img = new Image()
            img.onload = async () => {
                const imageUrl = reader.result as string
                
                try {
                    // Create clone with transparent padding
                    const cloneImage = await createImageWithPadding(imageUrl, 25)
                    
                    addLogo({
                        fileName: file.name,
                        image: imageUrl, // Original image
                        cloneImage: cloneImage, // Clone with padding
                        position: [0, 2.2, 0.5],
                        aspect: img.width / img.height,
                        scale: 1.0,
                        flipHorizontal: false,
                        flipVertical: false,
                    })
                } catch (error) {
                    console.error('Error creating image with padding:', error)
                    // Fallback to original if padding fails
                    addLogo({
                        fileName: file.name,
                        image: imageUrl,
                        cloneImage: imageUrl,
                        position: [0, 2.2, 0.5],
                        aspect: img.width / img.height,
                        scale: 1.0,
                        flipHorizontal: false,
                        flipVertical: false,
                    })
                }
            }
            img.src = reader.result as string
        }
        reader.readAsDataURL(file)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showDropdown])

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
                            <div className='relative'>
                                {logos.length === 0 ? (
                                    <div
                                        className={`w-fit px-5 py-1.5 text-sm mr-3 transition duration-500 ease cursor-pointer rounded-full border border-[#aaaaaa]`}
                                        onClick={() => uploader.current?.click()}
                                    >
                                        Upload Image
                                        <input
                                            ref={uploader}
                                            className='hidden'
                                            type='file'
                                            accept='.jpg,.jpeg,.png'
                                            onChange={handleUpload}
                                        />
                                    </div>
                                ) : (
                                    <div className='relative' ref={dropdownRef}>
                                        <div
                                            className={`w-fit px-5 py-1.5 text-sm mr-3 transition duration-500 ease cursor-pointer rounded-full border border-[#aaaaaa] flex items-center gap-2`}
                                            onClick={() => setShowDropdown(!showDropdown)}
                                        >
                                            Edit Image
                                            <FaChevronDown className={`w-3 h-3 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                                        </div>
                                        <input
                                            ref={uploader}
                                            className='hidden'
                                            type='file'
                                            accept='.jpg,.jpeg,.png'
                                            onChange={handleUpload}
                                        />
                                        
                                        {showDropdown && (
                                            <div className='absolute bottom-full left-0 mb-2 w-64 max-w-[240px] bg-white border border-gray-300 rounded-lg shadow-lg z-50'>
                                                <div className='p-2'>
                                                    <div
                                                        className='w-full px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded border-b border-gray-200 mb-2 flex items-center gap-2'
                                                        onClick={() => {
                                                            uploader.current?.click()
                                                            setShowDropdown(false)
                                                        }}
                                                    >
                                                        Upload Image
                                                        <FaPlus className='w-3 h-3' />
                                                    </div>
                                                    {logos.map((logo) => (
                                                        <div 
                                                            key={logo.id} 
                                                            className='flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 rounded'
                                                        >
                                                            <span 
                                                                className='cursor-pointer flex-1 truncate max-w-[200px]'
                                                                style={{ maxWidth: '200px' }}
                                                                title={logo.fileName}
                                                                onClick={() => {
                                                                    setSelectedLogoId(logo.id)
                                                                    setEditLogo(true)
                                                                    setShowDropdown(false)
                                                                }}
                                                            >
                                                                {logo.fileName}
                                                            </span>
                                                            <button
                                                                className='ml-2 p-1 hover:bg-red-100 rounded'
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    deleteLogo(logo.id)
                                                                }}
                                                            >
                                                                <FaTrash className='w-3 h-3 text-red-500' />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
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
                    {editLogo && selectedLogo ? (
                        <div className='w-full ml-1 flex items-center gap-3'>
                            <div className='flex items-center gap-2'>
                                <span
                                    className='underline underline-offset-4 truncate max-w-[200px] block'
                                    style={{ maxWidth: '200px' }}
                                    title={selectedLogo.fileName}
                                    onClick={() => uploader.current?.click()}
                                >
                                    {selectedLogo.fileName}
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
                                    deleteLogo(selectedLogo.id)
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
