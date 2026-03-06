import { useCallback } from "react"
import { useCustomizeContext } from "./provider"

const Display = () => {
    const { displayStyle, displayColor, colorName } = useCustomizeContext()

    const color = useCallback(() => {
        const monochromatics = [
            "#ffffff",
            "#f2f0eb",
            "#e7e9e7",
            "#d2cfc4",
            "#c5c6c7",
            "#aeb2b5",
            "#9a9a9a",
            "#646762",
            "#44413c",
            "#2d2c2f",
            "#000000",
        ]

        if (Array.isArray(displayColor)) {
            if (!monochromatics.includes(displayColor[0])) {
                return displayColor[0]
            }
            return "#ffffff"
        } else {
            if (!monochromatics.includes(displayColor)) {
                return displayColor
            }
            return "#ffffff"
        }
    }, [displayColor])

    return (
        <div className='w-full relative'>
            <div className='bg-[#0a0a0a]'>
                <div className='flex justify-center'>
                    <div
                        style={{
                            borderColor: `${color()}25`,
                            backgroundColor: `${
                                Array.isArray(displayColor)
                                    ? displayColor[0]
                                    : displayColor
                            }08`,
                        }}
                        className='inline-flex gap-3 sm:gap-5 items-center px-4 sm:px-6 py-1.5 sm:py-2 border border-white/[0.06] rounded-b-2xl backdrop-blur-md'
                    >
                        <div className='flex flex-col items-center'>
                            <span className='text-[6px] sm:text-[7px] text-zinc-600 uppercase tracking-[0.15em] font-medium'>Style</span>
                            <span style={{ color: color() }} className='text-[10px] sm:text-xs font-semibold mt-0.5'>
                                {displayStyle}
                            </span>
                        </div>

                        <div className='w-px h-5 sm:h-6 bg-white/[0.06]' />

                        <div className='flex flex-col items-center'>
                            <span className='text-[6px] sm:text-[7px] text-zinc-600 uppercase tracking-[0.15em] font-medium'>Color</span>
                            <span style={{ color: color() }} className='text-[10px] sm:text-xs font-semibold mt-0.5'>
                                {colorName}
                            </span>
                        </div>

                        <div className='w-px h-5 sm:h-6 bg-white/[0.06]' />

                        {Array.isArray(displayColor) ? (
                            <span
                                className='w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg border border-white/10 shadow-inner flex-shrink-0'
                                style={{
                                    background: `linear-gradient(135deg, ${displayColor[0]} 0%, ${displayColor[1]} 100%)`,
                                }}
                            />
                        ) : (
                            <span
                                className='w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg border border-white/10 shadow-inner flex-shrink-0'
                                style={{ background: displayColor }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Display
