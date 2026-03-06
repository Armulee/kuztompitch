"use client"

import { createContext, useCallback, useEffect, useState } from "react"
import ThreeDimensionViewer from "./3d-viewer"
import Menu from "./menu"
import { usePathname } from "next/navigation"
import Tutorial from "./tutorial"
import Pricing from "./menu/pricing"
import { useCustomizeContext } from "./provider"
import Display from "./display"
import Dropzone from "react-dropzone"
import { createImageWithPadding } from "../../utils/imageProcessing"

export const CustomizeContext = createContext(null)

const Customizer = () => {
    const pathname = usePathname()
    useEffect(() => {
        if (pathname === "/customize") {
            document.body.style.background = "#0a0a0a"
        }
        return () => document.body.removeAttribute("style")
    }, [pathname])

    // handle decal file drop
    const { addLogo } = useCustomizeContext()
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = async () => {
                    const img = new Image()
                    img.onload = async () => {
                        const imageUrl = reader.result as string

                        try {
                            // Create clone with transparent padding
                            const cloneImage = await createImageWithPadding(
                                imageUrl,
                                25,
                            )

                            addLogo({
                                fileName: file.name,
                                image: imageUrl, // Original image
                                cloneImage: cloneImage, // Clone with padding
                                position: [0, 2.2, 0.6],
                                aspect: img.width / img.height,
                                scale: 1.0,
                                flipHorizontal: false,
                                flipVertical: false,
                            })
                        } catch (error) {
                            console.error(
                                "Error creating image with padding:",
                                error,
                            )
                            // Fallback to original if padding fails
                            addLogo({
                                fileName: file.name,
                                image: imageUrl,
                                cloneImage: imageUrl,
                                position: [0, 2.2, 0.6],
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

            setIsRejected(false)
        },
        [addLogo],
    )

    const onDragEnter = () => {
        setIsRejected(true)
    }
    const [isRejected, setIsRejected] = useState(true)

    return (
        <section className='w-full h-[100dvh] z-0 relative overflow-hidden'>
            <Dropzone
                onDrop={onDrop}
                accept={{
                    "image/jpeg": [".jpg", ".jpeg"],
                    "image/png": [".png"],
                }}
                noClick
                noKeyboard
                multiple={false}
            >
                {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragReject,
                }) => (
                    <div
                        {...getRootProps({ onDragEnter })}
                        className='w-full h-full'
                    >
                        <input {...getInputProps()} />
                        <div className='flex flex-col w-full h-full lg:relative'>
                            <div className='w-full flex-1 min-h-0 relative'>
                                <ThreeDimensionViewer />
                            </div>

                            <div
                                className='w-full flex-shrink-0 overflow-hidden relative bg-[#0a0a0a]
                                lg:absolute lg:bottom-20 lg:right-16 lg:w-fit lg:min-w-[420px] lg:max-w-[520px] lg:max-h-[calc(100dvh-32px)] lg:overflow-y-auto lg:rounded-2xl lg:border lg:border-white/[0.08] lg:shadow-2xl lg:bg-[#0c0c10]/95 lg:backdrop-blur-xl'
                            >
                                <Display />
                                <Menu />
                                <Pricing />
                            </div>
                        </div>

                        {isDragActive && (
                            <div className='absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50'>
                                <div className='p-10 rounded-3xl text-center border-2 border-dashed border-accent-purple/40 bg-accent-purple/[0.06]'>
                                    <div className='w-14 h-14 rounded-2xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-4'>
                                        <svg
                                            className='w-7 h-7 text-accent-purple'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={1.5}
                                                d='M12 16V4m0 0l-4 4m4-4l4 4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17'
                                            />
                                        </svg>
                                    </div>
                                    <p className='text-base font-semibold text-white'>
                                        Drop your image here
                                    </p>
                                    <p className='text-xs text-zinc-500 mt-1.5'>
                                        JPG and PNG supported
                                    </p>
                                </div>
                            </div>
                        )}

                        {isDragReject && isRejected && (
                            <div className='absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50'>
                                <div className='p-10 rounded-3xl text-center border-2 border-dashed border-red-500/40 bg-red-500/[0.06]'>
                                    <div className='w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4'>
                                        <svg
                                            className='w-7 h-7 text-red-400'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={1.5}
                                                d='M6 18L18 6M6 6l12 12'
                                            />
                                        </svg>
                                    </div>
                                    <p className='text-base font-semibold text-white'>
                                        Unsupported file type
                                    </p>
                                    <p className='text-xs text-zinc-500 mt-1.5'>
                                        Only JPG and PNG files are supported
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Dropzone>

            <Tutorial />
        </section>
    )
}

export default Customizer
