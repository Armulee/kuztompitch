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
const VIEWPORT_HEIGHT = 150
const IMAGE_WIDTH = 400
const IMAGE_HEIGHT = 800

// Convert offset px to R3F position unit
const SLOPE = 0.011764706
const Y_INTERCEPT = 5.141

const EditLogo = () => {
    const { logos, selectedLogoId, updateLogo, bgOffsetY, setBgOffsetY } =
        useCustomizeContext()

    const containerRef = useRef<HTMLDivElement>(null)
    const [dragging, setDragging] = useState<boolean>(false)
    const [hovering] = useState<boolean>(false)
    const [bgOffsetX, setBgOffsetX] = useState<number>(0)
    const [viewportWidth, setViewportWidth] = useState<number>(300)

    const clamp = (val: number, min: number, max: number) =>
        Math.min(Math.max(val, min), max)

    // Calculate distance between two touches for pinch gesture
    const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
        const dx = touch1.clientX - touch2.clientX
        const dy = touch1.clientY - touch2.clientY
        return Math.sqrt(dx * dx + dy * dy)
    }

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

    const [mouseDownPos, setMouseDownPos] = useState<{
        x: number
        y: number
    } | null>(null)
    const [isClick, setIsClick] = useState(false)

    const handleMouseDown = (e: React.MouseEvent) => {
        setMouseDownPos({ x: e.clientX, y: e.clientY })
        setIsClick(true)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        e.preventDefault()

        if (e.touches.length === 2) {
            // Two-finger pinch gesture
            const distance = getTouchDistance(e.touches[0], e.touches[1])
            setPinchStart({
                distance,
                scale: selectedLogo?.scale || 1,
            })
            setDragging(false)
        } else if (e.touches.length === 1) {
            // Single finger drag - always allow dragging on mobile
            setDragging(true)
            setPinchStart(null)
            const touch = e.touches[0]
            setLastPosition({
                x: touch.clientX,
                y: touch.clientY,
            })
        }
    }

    const handleTouchEnd = () => {
        setDragging(false)
        setIsResizing(false)
        setResizeStart(null)
        setPinchStart(null)
    }

    const handleResizeStart = (
        e: React.MouseEvent | React.TouchEvent,
        corner: "nw" | "ne" | "sw" | "se"
    ) => {
        e.preventDefault()
        e.stopPropagation()

        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

        setIsResizing(true)
        setResizeStart({
            x: clientX,
            y: clientY,
            scale: selectedLogo?.scale || 1,
            corner,
        })
        
        // Prevent dragging when resizing
        setDragging(false)
    }

    const handleResizeEnd = () => {
        setIsResizing(false)
        setResizeStart(null)
    }

    // Precision adjustment functions
    const adjustPosition = (
        direction: "up" | "down" | "left" | "right",
        amount: number = 5
    ) => {
        const currentLogo = logos.find((logo) => logo.id === selectedLogoId)
        if (!currentLogo) return

        if (direction === "up" || direction === "down") {
            const newOffsetY = clamp(
                bgOffsetY + (direction === "up" ? amount : -amount),
                VIEWPORT_HEIGHT - IMAGE_HEIGHT,
                0
            )

            // const finalOffsetY =
            //     newOffsetY > -160 ? -160 : newOffsetY < -395 ? -395 : newOffsetY
            setBgOffsetY(newOffsetY)

            const realPositionY = SLOPE * newOffsetY + Y_INTERCEPT + 0.12
            const realPositionX = bgOffsetX * 0.01
            updateLogo(currentLogo.id, {
                position: [
                    realPositionX,
                    realPositionY,
                    currentLogo.position[2],
                ],
            })
        } else {
            // Handle left/right movement
            const newOffsetX =
                bgOffsetX + (direction === "right" ? amount : -amount)
            setBgOffsetX(newOffsetX)

            const realPositionY = SLOPE * bgOffsetY + Y_INTERCEPT + 0.12
            const realPositionX = newOffsetX * 0.01
            updateLogo(currentLogo.id, {
                position: [
                    realPositionX,
                    realPositionY,
                    currentLogo.position[2],
                ],
            })
        }
    }

    // Reset to center position
    const resetToCenter = () => {
        const currentLogo = logos.find((logo) => logo.id === selectedLogoId)
        if (!currentLogo) return

        const centerY = -280
        setBgOffsetY(centerY)
        setBgOffsetX(0)
        const realPosition = SLOPE * centerY + Y_INTERCEPT + 0.12
        updateLogo(currentLogo.id, {
            position: [0, realPosition, currentLogo.position[2]],
        })
    }

    const [lastPosition, setLastPosition] = useState<{
        x: number
        y: number
    } | null>(null)
    const [isResizing, setIsResizing] = useState<boolean>(false)
    const [resizeStart, setResizeStart] = useState<{
        x: number
        y: number
        scale: number
        corner: "nw" | "ne" | "sw" | "se"
    } | null>(null)
    const [showResizers, setShowResizers] = useState<boolean>(false)
    const [pinchStart, setPinchStart] = useState<{
        distance: number
        scale: number
    } | null>(null)

    const handleMouseUp = useCallback(() => {
        if (isClick && mouseDownPos) {
            // This was a click - show/hide resizers
            setShowResizers(!showResizers)
        }
        setDragging(false)
        setIsClick(false)
        setMouseDownPos(null)
    }, [isClick, mouseDownPos, showResizers])

    // Get the currently selected logo
    const selectedLogo = logos.find((logo) => logo.id === selectedLogoId)

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            // Handle resizing
            if (isResizing && resizeStart && selectedLogo) {
                const deltaX = e.clientX - resizeStart.x
                const deltaY = e.clientY - resizeStart.y

                // Calculate scale based on corner and mouse movement
                let scaleFactor = 0

                switch (resizeStart.corner) {
                    case "nw": // Top-left: increase when moving left or up
                        scaleFactor = (-deltaX + -deltaY) / 100
                        break
                    case "ne": // Top-right: increase when moving right or up
                        scaleFactor = (deltaX + -deltaY) / 100
                        break
                    case "sw": // Bottom-left: increase when moving left or down
                        scaleFactor = (-deltaX + deltaY) / 100
                        break
                    case "se": // Bottom-right: increase when moving right or down
                        scaleFactor = (deltaX + deltaY) / 100
                        break
                }

                const newScale = Math.max(
                    0.2,
                    Math.min(2.0, resizeStart.scale + scaleFactor)
                )

                console.log(
                    resizeStart.corner,
                    resizeStart.scale,
                    scaleFactor,
                    newScale
                )

                updateLogo(selectedLogo.id, { scale: newScale })
                return
            }

            // Check if this is a drag operation vs click
            if (mouseDownPos && isClick) {
                const distance = Math.sqrt(
                    Math.pow(e.clientX - mouseDownPos.x, 2) +
                        Math.pow(e.clientY - mouseDownPos.y, 2)
                )
                // If mouse moved more than 5px, it's a drag
                if (distance > 5) {
                    setIsClick(false)
                    setDragging(true)
                }
            }

            if (!dragging || isClick) return // Don't move if it's still considered a click or resizers are shown

            const currentLogo = logos.find((logo) => logo.id === selectedLogoId)
            if (!currentLogo) return

            // Handle Y-axis movement (inverted for natural dragging)
            setBgOffsetY((prevY) => {
                const offsetY = clamp(
                    prevY - e.movementY,
                    VIEWPORT_HEIGHT - IMAGE_HEIGHT,
                    0
                )
                return offsetY
            })

            // Handle X-axis movement
            setBgOffsetX((prevX) => {
                return prevX + e.movementX
            })

            // Calculate positions
            const realPositionY = SLOPE * bgOffsetY + Y_INTERCEPT + 0.12
            const realPositionX = bgOffsetX * 0.01 // Convert X offset to 3D position

            updateLogo(currentLogo.id, {
                position: [
                    realPositionX,
                    realPositionY,
                    currentLogo.position[2],
                ],
            })
        },
        [
            isResizing,
            resizeStart,
            selectedLogo,
            dragging,
            isClick,
            mouseDownPos,
            bgOffsetY,
            bgOffsetX,
            updateLogo,
            selectedLogoId,
            setBgOffsetY,
            setBgOffsetX,
            logos,
        ]
    )

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            e.preventDefault()

            // Handle pinch-to-zoom scaling
            if (e.touches.length === 2 && pinchStart && selectedLogo) {
                const distance = getTouchDistance(e.touches[0], e.touches[1])
                const scaleChange = distance / pinchStart.distance
                const newScale = Math.max(
                    0.2,
                    Math.min(2.0, pinchStart.scale * scaleChange)
                )
                updateLogo(selectedLogo.id, { scale: newScale })
                return
            }

            // Handle resizing
            if (isResizing && resizeStart && selectedLogo) {
                const touch = e.touches[0]
                const deltaX = touch.clientX - resizeStart.x
                const deltaY = touch.clientY - resizeStart.y

                // Calculate scale based on corner and touch movement
                let scaleFactor = 0

                switch (resizeStart.corner) {
                    case "nw": // Top-left: increase when moving left or up
                        scaleFactor = (-deltaX + -deltaY) / 100
                        break
                    case "ne": // Top-right: increase when moving right or up
                        scaleFactor = (deltaX + -deltaY) / 100
                        break
                    case "sw": // Bottom-left: increase when moving left or down
                        scaleFactor = (-deltaX + deltaY) / 100
                        break
                    case "se": // Bottom-right: increase when moving right or down
                        scaleFactor = (deltaX + deltaY) / 100
                        break
                }

                const newScale = Math.max(
                    0.2,
                    Math.min(2.0, resizeStart.scale + scaleFactor * 0.1)
                )

                updateLogo(selectedLogo.id, { scale: newScale })
                return
            }

            // Handle single finger dragging
            if (dragging && e.touches.length === 1) {
                const currentLogo = logos.find(
                    (logo) => logo.id === selectedLogoId
                )
                if (!currentLogo) return

                const touch = e.touches[0]
                if (!touch || !lastPosition) return

                const movementX = touch.clientX - lastPosition.x
                const movementY = touch.clientY - lastPosition.y

                // Handle Y-axis movement (inverted for natural dragging)
                setBgOffsetY((prevY) => {
                    const offsetY = clamp(
                        prevY - movementY,
                        VIEWPORT_HEIGHT - IMAGE_HEIGHT,
                        0
                    )
                    return offsetY
                })

                // Handle X-axis movement
                setBgOffsetX((prevX) => {
                    return prevX + movementX
                })

                // Calculate positions
                const realPositionY = SLOPE * bgOffsetY + Y_INTERCEPT + 0.12
                const realPositionX = bgOffsetX * 0.01

                updateLogo(currentLogo.id, {
                    position: [
                        realPositionX,
                        realPositionY,
                        currentLogo.position[2],
                    ],
                })

                setLastPosition({ x: touch.clientX, y: touch.clientY })
            }
        },
        [
            pinchStart,
            selectedLogo,
            isResizing,
            resizeStart,
            dragging,
            showResizers,
            bgOffsetY,
            bgOffsetX,
            updateLogo,
            selectedLogoId,
            setBgOffsetY,
            setBgOffsetX,
            logos,
            lastPosition,
        ]
    )

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            handleMouseUp()
            handleResizeEnd()
        }

        const handleGlobalTouchEnd = () => {
            handleTouchEnd()
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleGlobalMouseUp)
        window.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        })
        window.addEventListener("touchend", handleGlobalTouchEnd)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleGlobalMouseUp)
            window.removeEventListener("touchmove", handleTouchMove)
            window.removeEventListener("touchend", handleGlobalTouchEnd)
        }
    }, [handleMouseMove, handleTouchMove, handleMouseUp])

    useEffect(() => {
        console.log(showResizers)
    }, [showResizers])

    // Don't render if no logo is selected
    if (!selectedLogo) return null

    const backgroundPosition = {
        backgroundImage: "url(/assets/projection-background.png)",
        backgroundSize: `${IMAGE_WIDTH}px ${IMAGE_HEIGHT}px`,
        backgroundRepeat: "repeat",
        backgroundPosition: `center ${bgOffsetY}px`,
    }

    return (
        <div
            className='select-none flex flex-col items-center'
            style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                WebkitTouchCallout: "none",
            }}
        >
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
                    onTouchStart={handleTouchStart}
                    style={{
                        width: viewportWidth,
                        minHeight: VIEWPORT_HEIGHT,
                        ...backgroundPosition,
                        cursor: dragging ? "grabbing" : "grab",
                        touchAction: "none",
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                        userSelect: "none",
                    }}
                >
                    {/* Logo preview - fixed size, only shows resizers */}
                    {selectedLogo.image && (
                        <div
                            className='absolute rounded border-2 border-white shadow-lg opacity-80'
                            style={{
                                width:
                                    selectedLogo.aspect > 1
                                        ? "140px"
                                        : `${selectedLogo.aspect * 140}px`,
                                height:
                                    selectedLogo.aspect > 1
                                        ? `${140 / selectedLogo.aspect}px`
                                        : "140px",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundImage: `url(${selectedLogo.image})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            {/* Corner Resizers - only for decal scaling */}
                            {showResizers && (
                                <>
                                    <div
                                        className='absolute w-6 h-6 bg-blue-500 border-2 border-white rounded-full cursor-nw-resize hover:bg-blue-600 transition-colors touch-manipulation'
                                        style={{ top: "-12px", left: "-12px" }}
                                        onMouseDown={(e) =>
                                            handleResizeStart(e, "nw")
                                        }
                                        onTouchStart={(e) =>
                                            handleResizeStart(e, "nw")
                                        }
                                    />
                                    <div
                                        className='absolute w-6 h-6 bg-blue-500 border-2 border-white rounded-full cursor-ne-resize hover:bg-blue-600 transition-colors touch-manipulation'
                                        style={{ top: "-12px", right: "-12px" }}
                                        onMouseDown={(e) =>
                                            handleResizeStart(e, "ne")
                                        }
                                        onTouchStart={(e) =>
                                            handleResizeStart(e, "ne")
                                        }
                                    />
                                    <div
                                        className='absolute w-6 h-6 bg-blue-500 border-2 border-white rounded-full cursor-sw-resize hover:bg-blue-600 transition-colors touch-manipulation'
                                        style={{ bottom: "-12px", left: "-12px" }}
                                        onMouseDown={(e) =>
                                            handleResizeStart(e, "sw")
                                        }
                                        onTouchStart={(e) =>
                                            handleResizeStart(e, "sw")
                                        }
                                    />
                                    <div
                                        className='absolute w-6 h-6 bg-blue-500 border-2 border-white rounded-full cursor-se-resize hover:bg-blue-600 transition-colors touch-manipulation'
                                        style={{
                                            bottom: "-12px",
                                            right: "-12px",
                                        }}
                                        onMouseDown={(e) =>
                                            handleResizeStart(e, "se")
                                        }
                                        onTouchStart={(e) =>
                                            handleResizeStart(e, "se")
                                        }
                                    />
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Joystick-style position controls */}
                <div className='flex-shrink-0'>
                    <div className='flex justify-center mb-4 space-x-2'>
                        <button
                            onClick={() =>
                                updateLogo(selectedLogo.id, {
                                    flipHorizontal:
                                        !selectedLogo.flipHorizontal,
                                })
                            }
                            className='w-8 h-8 bg-white/10 hover:bg-white/20 rounded-t border border-white/20 text-white transition-colors group flex items-center justify-center'
                            title='Flip Horizontal'
                        >
                            <LuFlipHorizontal />
                        </button>
                        <button
                            onClick={() =>
                                updateLogo(selectedLogo.id, {
                                    flipVertical: !selectedLogo.flipVertical,
                                })
                            }
                            className='w-8 h-8 bg-white/10 hover:bg-white/20 rounded-t border border-white/20 text-white transition-colors group flex items-center justify-center'
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
