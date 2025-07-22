"use client"

import { useCustomizeContext } from "../provider"
import { useRef, useState, useEffect, useCallback } from "react"
import {
    FaChevronUp,
    FaChevronDown,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa"
import { LuFlipHorizontal, LuFlipVertical } from "react-icons/lu"

// Base viewport dimensions (HEIGHT stays fixed for consistency)
const VIEWPORT_HEIGHT = 180
const IMAGE_WIDTH = 400
const IMAGE_HEIGHT = 800

// Convert offset px to R3F position unit
const SLOPE = 0.011764706
const Y_INTERCEPT = 5.141

const EditLogo = () => {
    const { logo, setLogo, bgOffsetY, setBgOffsetY } = useCustomizeContext()

    const containerRef = useRef<HTMLDivElement>(null)
    const [dragging, setDragging] = useState<boolean>(false)
    const [hovering, setHovering] = useState<boolean>(false)
    const [bgOffsetX, setBgOffsetX] = useState<number>(0)
    const [viewportWidth, setViewportWidth] = useState<number>(300)

    const clamp = (val: number, min: number, max: number) =>
        Math.min(Math.max(val, min), max)

    // Calculate responsive viewport width based on screen size
    const calculateViewportWidth = () => {
        const screenWidth = window.innerWidth
        // Responsive sizing: minimum 200px, maximum 500px, scales with screen width
        const minWidth = 200
        const maxWidth = 400
        const scaleFactor = 0.5 // 25% of screen width

        const calculatedWidth = Math.min(
            maxWidth,
            Math.max(minWidth, screenWidth * scaleFactor)
        )
        return Math.floor(calculatedWidth)
    }

    // Update viewport width on window resize
    useEffect(() => {
        const updateViewportWidth = () => {
            setViewportWidth(calculateViewportWidth())
        }

        // Set initial width
        updateViewportWidth()

        // Add resize listener
        window.addEventListener("resize", updateViewportWidth)

        return () => {
            window.removeEventListener("resize", updateViewportWidth)
        }
    }, [])

    const handleMouseDown = () => {
        setDragging(true)
    }

    const handleMouseUp = () => {
        setDragging(false)
    }

    // Precision adjustment functions
    const adjustPosition = (
        direction: "up" | "down" | "left" | "right",
        amount: number = 5
    ) => {
        if (direction === "up" || direction === "down") {
            const newOffsetY = clamp(
                bgOffsetY + (direction === "up" ? amount : -amount),
                VIEWPORT_HEIGHT - IMAGE_HEIGHT,
                0
            )

            // const finalOffsetY =
            //     newOffsetY > -160 ? -160 : newOffsetY < -395 ? -395 : newOffsetY
            setBgOffsetY(newOffsetY)

            const realPositionY = SLOPE * newOffsetY + Y_INTERCEPT
            const realPositionX = bgOffsetX * 0.01
            setLogo((prev) => ({
                ...prev,
                position: [realPositionX, realPositionY, prev.position[2]],
            }))
        } else {
            // Handle left/right movement
            const newOffsetX =
                bgOffsetX + (direction === "right" ? amount : -amount)
            setBgOffsetX(newOffsetX)

            const realPositionY = SLOPE * bgOffsetY + Y_INTERCEPT
            const realPositionX = newOffsetX * 0.01
            setLogo((prev) => ({
                ...prev,
                position: [realPositionX, realPositionY, prev.position[2]],
            }))
        }
    }

    // Reset to center position
    const resetToCenter = () => {
        const centerY = -280
        setBgOffsetY(centerY)
        setBgOffsetX(0)
        const realPosition = SLOPE * centerY + Y_INTERCEPT
        setLogo((prev) => ({
            ...prev,
            position: [0, realPosition, prev.position[2]],
        }))
    }

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!dragging) return

            // Handle Y-axis movement
            setBgOffsetY((prevY) => {
                const offsetY = clamp(
                    prevY + e.movementY,
                    VIEWPORT_HEIGHT - IMAGE_HEIGHT,
                    0
                )
                // if (offsetY > -160) {
                //     // No exceed position to capsule
                //     return -160
                // } else if (offsetY < -395) {
                //     // No exceed position to microphone base
                //     return -395
                // }

                return offsetY
            })

            // Handle X-axis movement
            setBgOffsetX((prevX) => {
                return prevX + e.movementX
            })

            // Calculate positions
            const realPositionY = SLOPE * bgOffsetY + Y_INTERCEPT + 0.12
            const realPositionX = bgOffsetX * 0.01 // Convert X offset to 3D position

            setLogo((prev) => ({
                ...prev,
                position: [realPositionX, realPositionY, prev.position[2]],
            }))
        },
        [dragging, bgOffsetY, bgOffsetX, setLogo, setBgOffsetY, setBgOffsetX]
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
        backgroundImage: "url(/assets/projection-background.png)",
        backgroundSize: `${IMAGE_WIDTH}px ${IMAGE_HEIGHT}px`,
        backgroundRepeat: "repeat",
        backgroundPosition: `center ${bgOffsetY}px`,
    }

    return (
        <div className='select-none flex flex-col items-center'>
            {/* Header with current part indicator */}
            <div className='w-full text-center'>
                <h3 className='text-lg font-semibold text-white mb-1'>
                    Image Adjustment
                </h3>
            </div>

            {/* Main positioning area */}
            <div className='flex items-center justify-center space-x-6'>
                <div
                    ref={containerRef}
                    className={`relative border-2 rounded-lg overflow-hidden ${
                        dragging
                            ? "border-blue-400 shadow-lg shadow-blue-400/20"
                            : hovering
                            ? "border-gray-300 shadow-md"
                            : "border-gray-500"
                    }`}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    style={{
                        width: viewportWidth,
                        minHeight: VIEWPORT_HEIGHT,
                        ...backgroundPosition,
                        cursor: dragging ? "grabbing" : "grab",
                    }}
                >
                    {/* Logo preview with actual image */}
                    {logo.image && (
                        <div
                            className='absolute rounded border-2 border-white shadow-lg opacity-80'
                            style={{
                                width:
                                    logo.aspect > 1
                                        ? "180px"
                                        : logo.aspect * 180 + "px",
                                height:
                                    logo.aspect > 1
                                        ? 180 / logo.aspect + "px"
                                        : "180px",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundImage: `url(${logo.image})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                    )}

                    {/* Drag instruction overlay */}
                    {!dragging && hovering && (
                        <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                            <div className='text-white text-center'>
                                <div className='text-sm opacity-75'>
                                    Drag to position
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Joystick-style position controls */}
                <div className='flex-shrink-0'>
                    <div className='flex justify-center mb-4 space-x-2'>
                        <button
                            onClick={() =>
                                setLogo((prev) => ({
                                    ...prev,
                                    flipHorizontal: !prev.flipHorizontal,
                                }))
                            }
                            className='w-8 h-8 bg-white/10 hover:bg-white/20 rounded-t border border-white/20 transition-colors group flex items-center justify-center'
                            title='Flip Horizontal'
                        >
                            <LuFlipHorizontal />
                        </button>
                        <button
                            onClick={() =>
                                setLogo((prev) => ({
                                    ...prev,
                                    flipVertical: !prev.flipVertical,
                                }))
                            }
                            className='w-8 h-8 bg-white/10 hover:bg-white/20 rounded-t border border-white/20 transition-colors group flex items-center justify-center'
                            title='Flip Vertical'
                        >
                            <LuFlipVertical />
                        </button>
                    </div>

                    {/* Up button */}
                    <div className='flex justify-center'>
                        <button
                            onClick={() => adjustPosition("up")}
                            className='w-8 h-8 bg-white/10 hover:bg-white/20 rounded-t border border-white/20 transition-colors group flex items-center justify-center'
                            title='Move up'
                        >
                            <FaChevronUp className='w-3 h-3 text-white group-hover:text-blue-300' />
                        </button>
                    </div>

                    {/* Middle row: Left, Center, Right */}
                    <div className='flex items-center'>
                        <button
                            onClick={() => adjustPosition("left")}
                            className='w-8 h-8 bg-white/10 hover:bg-white/20 rounded-l border border-white/20 border-r-0 transition-colors group flex items-center justify-center'
                            title='Move left'
                        >
                            <FaChevronLeft className='w-3 h-3 text-white group-hover:text-blue-300' />
                        </button>

                        {/* Center reset button */}
                        <button
                            onClick={resetToCenter}
                            className='w-8 h-8 bg-white/5 hover:bg-white/15 border-t border-b border-white/20 flex items-center justify-center transition-colors group'
                            title='Reset to center'
                        >
                            <div className='w-2 h-2 bg-white/30 group-hover:bg-white/50 rounded-full transition-colors'></div>
                        </button>

                        <button
                            onClick={() => adjustPosition("right")}
                            className='w-8 h-8 bg-white/10 hover:bg-white/20 rounded-r border border-white/20 border-l-0 transition-colors group flex items-center justify-center'
                            title='Move right'
                        >
                            <FaChevronRight className='w-3 h-3 text-white group-hover:text-blue-300' />
                        </button>
                    </div>

                    {/* Down button */}
                    <div className='flex justify-center'>
                        <button
                            onClick={() => adjustPosition("down")}
                            className='w-8 h-8 bg-white/10 hover:bg-white/20 rounded-b border border-white/20 border-t-0 transition-colors group flex items-center justify-center'
                            title='Move down'
                        >
                            <FaChevronDown className='w-3 h-3 text-white group-hover:text-blue-300' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditLogo
