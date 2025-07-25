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
            document.body.style.background = "#efefef"
        }
        return () => document.body.removeAttribute("style")
    }, [pathname])

    const { checkout } = useCustomizeContext()

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
                                25
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
                                error
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
        [addLogo]
    )

    const onDragEnter = () => {
        setIsRejected(true)
    }
    const [isRejected, setIsRejected] = useState(true)

    return (
        <section
            style={{ overflow: checkout ? "visible" : "hidden" }}
            className='w-full h-[100dvh] z-0 relative'
        >
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
                        <div className={`w-[100vw] h-[53dvh] relative`}>
                            <ThreeDimensionViewer />
                        </div>

                        <div
                            className={`w-full h-[47dvh] overflow-hidden relative`}
                        >
                            <Display />
                            <Menu />
                        </div>

                        {isDragActive && (
                            <div className='absolute inset-0 bg-white/50 flex items-center justify-center z-50'>
                                <div className='bg-black p-8 rounded-lg text-center'>
                                    <p className='text-lg font-semibold text-white'>
                                        Drop your image here.
                                    </p>
                                    <p className='text-sm text-gray-300 mt-2'>
                                        Supports JPG and PNG files
                                    </p>
                                </div>
                            </div>
                        )}

                        {isDragReject && isRejected && (
                            <div className='absolute inset-0 bg-red-500/20 flex items-center justify-center z-50'>
                                <div className='bg-red-500 p-8 rounded-lg text-center'>
                                    <p className='text-lg font-semibold text-white'>
                                        Sorry, we cannot read this file.
                                    </p>
                                    <p className='text-sm text-white/70 mt-2'>
                                        File must be in format JPG or PNG
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Dropzone>

            <Pricing />

            <Tutorial />
        </section>
    )
}

export default Customizer
