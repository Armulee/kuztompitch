"use client"

import { useCustomizeContext } from "../provider"
import { useRef, useState, useEffect, useCallback } from "react"

// const ZOOM = 2
const VIEWPORT_WIDTH = 300
const VIEWPORT_HEIGHT = 150
const IMAGE_WIDTH = 400
const IMAGE_HEIGHT = 600
const TOP_HANDLE_Y_THRESHOLD = -160
const BOTTOM_HANDLE_Y_THRESHOLD = -220

// Convert offset px to R3F position unit
const SLOPE = 0.011764706
const Y_INTERCEPT = 5.141

const EditLogo = () => {
    const { logo, setLogo, setEditLogo, bgOffsetY, setBgOffsetY } =
        useCustomizeContext()

    const containerRef = useRef<HTMLDivElement>(null)
    const [dragging, setDragging] = useState<boolean>(false)

    const clamp = (val: number, min: number, max: number) =>
        Math.min(Math.max(val, min), max)

    const handleMouseDown = () => {
        setDragging(true)
    }

    const handleMouseUp = () => {
        setDragging(false)
    }

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!dragging) return
            setBgOffsetY((prevY) => {
                const offsetY = clamp(
                    prevY + e.movementY,
                    VIEWPORT_HEIGHT - IMAGE_HEIGHT,
                    0
                )
                if (offsetY > -160) {
                    // No exceed position to capsule
                    return -160
                } else if (offsetY < -395) {
                    // No exceed position to microphone base
                    return -395
                }

                return offsetY
            })

            // Calculate part
            // using simple linear equation y = mx + c
            const realPosition = SLOPE * bgOffsetY + Y_INTERCEPT
            if (
                bgOffsetY < TOP_HANDLE_Y_THRESHOLD &&
                bgOffsetY > BOTTOM_HANDLE_Y_THRESHOLD
            ) {
                setLogo((prev) => ({
                    ...prev,
                    position: [0, realPosition, 0.5],
                    part: "Both",
                }))
            } else if (bgOffsetY < BOTTOM_HANDLE_Y_THRESHOLD) {
                setLogo((prev) => ({
                    ...prev,
                    position: [0, realPosition, 0.5],
                    part: "Bottom Handle",
                }))
            } else {
                setLogo((prev) => ({
                    ...prev,
                    position: [0, realPosition, 0.5],
                    part: "Top Handle",
                }))
            }
        },
        [dragging, bgOffsetY, setLogo]
    )

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [handleMouseMove])

    const backgroundPosition = {
        backgroundImage: "url(/assets/microphone-projection.png)",
        backgroundSize: `${IMAGE_WIDTH}px ${IMAGE_HEIGHT}px`,
        backgroundPosition: `center ${bgOffsetY}px`,
    }

    // handle change file image
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
        <div className='select-none flex flex-col justify-center items-center'>
            <span className='block font-bold mb-2'>Adjust image position</span>
            <div className='flex items-start'>
                <div
                    ref={containerRef}
                    className='relative border border-white overflow-hidden'
                    onMouseDown={handleMouseDown}
                    style={{
                        minWidth: VIEWPORT_WIDTH,
                        minHeight: VIEWPORT_HEIGHT,
                        backgroundRepeat: "no-repeat",
                        ...backgroundPosition,
                    }}
                >
                    {/* Fixed Center Logo */}
                    {logo.image && (
                        <div
                            className='absolute rounded-md border-2 border-white bg-black/30 cursor-default flex items-center justify-center user-select'
                            style={{
                                width: "120px",
                                height: logo.aspect * 120 + "px",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            Image
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditLogo
