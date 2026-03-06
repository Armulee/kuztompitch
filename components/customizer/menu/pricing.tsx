import { useCustomizeContext } from "../provider"
import { useRef, useState, useEffect } from "react"
import { FaTrash, FaChevronDown, FaPlus } from "react-icons/fa6"
import { FaImage } from "react-icons/fa"
import { createImageWithPadding } from "../../../utils/imageProcessing"
import { useRouter } from "next/navigation"

const Pricing = () => {
    const {
        setCapturing,
        logos,
        selectedLogoId,
        setSelectedLogoId,
        addLogo,
        deleteLogo,
        editLogo,
        setEditLogo,
    } = useCustomizeContext()

    const router = useRouter()
    const [showDropdown, setShowDropdown] = useState(false)
    const selectedLogo = logos.find(logo => logo.id === selectedLogoId)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const handleClick = () => {
        setCapturing(true)
        // Capture the latest 3D snapshot before navigating to checkout page.
        window.setTimeout(() => {
            router.push("/customize/checkout")
        }, 350)
    }

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
                    const cloneImage = await createImageWithPadding(imageUrl, 25)
                    
                    addLogo({
                        fileName: file.name,
                        image: imageUrl,
                        cloneImage: cloneImage,
                        position: [0, 2.2, 0.5],
                        aspect: img.width / img.height,
                        scale: 1.0,
                        flipHorizontal: false,
                        flipVertical: false,
                    })
                } catch (error) {
                    console.error('Error creating image with padding:', error)
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
        <>
            {/* Pricing bar - in normal document flow */}
            <div className='flex justify-center items-center w-full bg-[#0f0f12] border-t border-white/[0.06] text-white'>
                <div className='flex justify-center items-center gap-2 sm:gap-3 py-2.5 sm:py-3 px-3 sm:px-4'>
                    {!editLogo ? (
                        <div className='flex items-center'>
                            <div className='relative'>
                                {logos.length === 0 ? (
                                    <button
                                        className='flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all duration-300 cursor-pointer rounded-full border border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-white bg-white/[0.03]'
                                        onClick={() => uploader.current?.click()}
                                    >
                                        <FaImage className='w-3 h-3' />
                                        Upload Image
                                        <input
                                            ref={uploader}
                                            className='hidden'
                                            type='file'
                                            accept='.jpg,.jpeg,.png'
                                            onChange={handleUpload}
                                        />
                                    </button>
                                ) : (
                                    <div className='relative' ref={dropdownRef}>
                                        <button
                                            className='flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all duration-300 cursor-pointer rounded-full border border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-white bg-white/[0.03]'
                                            onClick={() => setShowDropdown(!showDropdown)}
                                        >
                                            <FaImage className='w-3 h-3' />
                                            Edit Image
                                            <FaChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                                        </button>
                                        <input
                                            ref={uploader}
                                            className='hidden'
                                            type='file'
                                            accept='.jpg,.jpeg,.png'
                                            onChange={handleUpload}
                                        />
                                        
                                        {showDropdown && (
                                            <div className='absolute bottom-full left-0 mb-2 w-56 bg-[#141418] backdrop-blur-xl rounded-xl shadow-2xl z-50 border border-white/[0.08] overflow-hidden'>
                                                <button
                                                    className='w-full px-3 py-2.5 text-xs cursor-pointer hover:bg-white/[0.05] flex items-center gap-2 text-zinc-400 hover:text-white transition-colors border-b border-white/[0.06]'
                                                    onClick={() => {
                                                        uploader.current?.click()
                                                        setShowDropdown(false)
                                                    }}
                                                >
                                                    <FaPlus className='w-2.5 h-2.5' />
                                                    Add new image
                                                </button>
                                                {logos.map((logo) => (
                                                    <div 
                                                        key={logo.id} 
                                                        className='flex items-center justify-between px-3 py-2 text-xs hover:bg-white/[0.05] text-zinc-400 transition-colors'
                                                    >
                                                        <span 
                                                            className='cursor-pointer flex-1 truncate hover:text-white transition-colors'
                                                            style={{ maxWidth: '170px' }}
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
                                                            className='ml-2 p-1 hover:bg-red-500/20 rounded transition-colors'
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                deleteLogo(logo.id)
                                                            }}
                                                        >
                                                            <FaTrash className='w-2.5 h-2.5 text-red-400/70 hover:text-red-400' />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setEditLogo(false)}
                            className='rounded-full border border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-white px-4 py-2 text-xs font-medium transition-all bg-white/[0.03]'
                        >
                            Back
                        </button>
                    )}

                    <div className='w-px h-5 bg-white/[0.08]' />

                    {editLogo && selectedLogo ? (
                        <div className='flex items-center gap-2'>
                            <span
                                className='text-xs text-zinc-400 truncate max-w-[140px] cursor-pointer hover:text-white transition-colors underline underline-offset-4 decoration-white/20'
                                title={selectedLogo.fileName}
                                onClick={() => uploader.current?.click()}
                            >
                                {selectedLogo.fileName}
                            </span>

                            <input
                                className='hidden'
                                type='file'
                                ref={uploader}
                                onChange={handleUpload}
                            />

                            <button
                                className='p-1.5 rounded-lg hover:bg-red-500/15 transition-colors'
                                onClick={() => {
                                    deleteLogo(selectedLogo.id)
                                    setEditLogo(false)
                                }}
                            >
                                <FaTrash className='w-3 h-3 text-red-400/70' />
                            </button>
                        </div>
                    ) : (
                        <button
                            id='checkout'
                            onClick={handleClick}
                            className='px-6 py-2 bg-gradient-accent text-white rounded-full text-xs font-semibold hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-[1.03]'
                        >
                            Checkout
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Pricing
