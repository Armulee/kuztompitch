import { useCallback } from "react"
import { useCustomizeContext } from "../../provider"
import Head from "./head"
import { IoIosHelpCircle } from "react-icons/io"

const Display = () => {
    const { displayStyle, displayColor, colorName, setTour } =
        useCustomizeContext()

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
        <div className='w-full absolute bottom-0 left-1/2 -translate-x-1/2 z-10'>
            <Head />
            <div className='bg-black'>
                <div
                    style={{
                        borderColor: color(),
                        backgroundColor: `${
                            Array.isArray(displayColor)
                                ? displayColor[0]
                                : displayColor
                        }30`,
                    }}
                    className={`flex gap-3 justify-center items-center gap-4 px-4 py-2 border border-0 border-b rounded-b-full text-white`}
                >
                    <span className='flex flex-col justify-center items-center'>
                        <span className='text-[8px]'>Style</span>{" "}
                        <b style={{ color: color() }} className='text-sm'>
                            {displayStyle}
                        </b>
                    </span>
                    <span className='flex flex-col justify-center items-center'>
                        <span className='text-[8px]'>Color</span>{" "}
                        <b style={{ color: color() }} className='text-sm'>
                            {colorName}
                        </b>
                    </span>
                    {Array.isArray(displayColor) ? (
                        <span
                            className='w-[50px] h-[25px] border rounded-md'
                            style={{
                                background: `linear-gradient(135deg, ${displayColor[0]} 0%, ${displayColor[1]} 100%)`,
                            }}
                        />
                    ) : (
                        <span
                            className='w-[50px] h-[25px] border rounded-md'
                            style={{ background: displayColor }}
                        />
                    )}
                </div>
                <IoIosHelpCircle
                    onClick={() => setTour(true)}
                    className='w-10 h-10 text-black absolute bottom-[60px] right-2 z-20'
                />
            </div>
        </div>
    )
}

export default Display
