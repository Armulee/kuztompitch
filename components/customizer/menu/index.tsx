import { useCustomizeContext } from "../provider"
import { useCallback, useEffect, useState } from "react"
import ColorSwatch, { Shade } from "./swatches"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel } from "swiper/modules"
import { Material } from "../provider/types"
import {
    bottomHandleStyle,
    capsuleStyle,
    topHandleStyle,
} from "./styleMaterial"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import { Swiper as SwiperType } from "swiper/types"

const shades: Shade[] = [
    "Monochromatics",
    "Yellow",
    "Orange",
    "Red",
    "Pink",
    "Violet",
    "Blue",
]

const Menu = () => {
    const styles = ["Solid", "Glossy", "Matte"]
    const {
        part,
        style,
        setStyle,
        setCapsule,
        setTopHandle,
        setBottomHandle,
        setDisplayColor,
        setColorName,
        isIphone,
        setIsRotating,
    } = useCustomizeContext()

    const [color, setColor] = useState<{
        code: string
        name: string
        color: string | string[]
    } | null>(null)

    const [swiper, setSwiper] = useState<SwiperType | null>(null)
    const [swiperIndex, setSwiperIndex] = useState<number>(0)

    const handleClick = (color: {
        code: string
        name: string
        color: string | string[]
    }) => {
        setColor(color)
    }

    // // handle click to set the part
    const handleColor = useCallback(
        (color: string, displayColor: string | string[]) => {
            setIsRotating(false)
            if (part === "Capsule") {
                if (style === "Solid") {
                    setCapsule((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...capsuleStyle.solid,
                        style,
                    }))
                } else if (style === "Glossy") {
                    setCapsule((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...capsuleStyle.glossy,
                        style,
                    }))
                } else if (style === "Matte") {
                    setCapsule((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...capsuleStyle.matte,
                        style,
                    }))
                }
            } else if (part === "Top Handle") {
                if (style === "Solid") {
                    setTopHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...topHandleStyle.solid,
                        style,
                    }))
                } else if (style === "Glossy") {
                    setTopHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...topHandleStyle.glossy,
                        style,
                    }))
                } else if (style === "Matte") {
                    setTopHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...topHandleStyle.matte,
                        style,
                    }))
                }
            } else if (part === "Bottom Handle") {
                if (style === "Solid") {
                    setBottomHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...bottomHandleStyle.solid,
                        style,
                    }))
                } else if (style === "Glossy") {
                    setBottomHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...bottomHandleStyle.glossy,
                        style,
                    }))
                } else if (style === "Matte") {
                    setBottomHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...bottomHandleStyle.matte,
                        style,
                    }))
                }
            }
        },
        [part, style, setCapsule, setTopHandle, setBottomHandle, setIsRotating]
    )

    // // when click the color
    useEffect(() => {
        if (color) {
            handleColor(color.code, color.color)
            // setColorName(color.name)
            if (part === "Capsule") {
                setCapsule((prev) => ({ ...prev, colorName: color.name }))
            } else if (part === "Top Handle") {
                setTopHandle((prev) => ({ ...prev, colorName: color.name }))
            } else if (part === "Bottom Handle") {
                setBottomHandle((prev) => ({ ...prev, colorName: color.name }))
            }
            setDisplayColor(color.color)
        }

        return () => setColor(null)
    }, [
        color,
        part,
        setCapsule,
        setTopHandle,
        setBottomHandle,
        setColorName,
        setDisplayColor,
        handleColor,
    ])

    return (
        <div className={`h-full bg-black relative`}>
            <div className={`${isIphone ? "py-4 px-2" : "p-4"} h-full`}>
                <div className='flex justify-between items-center'>
                    <div
                        id='styles'
                        className='flex justify-start items-center'
                    >
                        {styles.map((s) => (
                            <div
                                key={`style-${s}`}
                                onClick={() => setStyle(s)}
                                className={`px-5 py-1.5 text-sm mr-3 mb-3 transition duration-500 ease cursor-pointer ${
                                    style === s
                                        ? "bg-white text-black"
                                        : "bg-transparent text-[#aaaaaa]"
                                } rounded-full border border-[#aaaaaa]`}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                </div>

                <Swiper
                    onSwiper={(swiper) => {
                        setSwiper(swiper)
                        setSwiperIndex(swiper.realIndex)
                    }}
                    onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
                    id='swatches'
                    slidesPerView={1}
                    direction='vertical'
                    modules={[Mousewheel]}
                    mousewheel={{ forceToAxis: true }}
                    className='h-[12vh] border-0 border-y border-white/50'
                >
                    {/* Monochromatics #9a9a9a */}
                    {/* Yellow #fee715 */}
                    {/* Orange #f36944 */}
                    {/* Red #f36944 */}
                    {/* Pink #d32e5e */}
                    {/* Violet #773376 */}
                    {/* Blue #5b7ebd */}
                    {shades.map((shade) => (
                        <SwiperSlide key={`shade-${shade}`}>
                            <ColorSwatch
                                shade={shade}
                                handleClick={handleClick}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='max-w-md m-auto flex items-center justify-around pt-3'>
                    <button
                        type='button'
                        className={`w-fit flex items-center gap-3 text-xs text-zinc-300`}
                        onClick={() => swiper?.slidePrev()}
                    >
                        <FaChevronUp
                            className={`${
                                swiperIndex === 0
                                    ? "text-white/50"
                                    : "text-white"
                            }`}
                        />
                        {shades[swiperIndex - 1]}
                    </button>
                    <button
                        type='button'
                        className={`w-fit flex items-center gap-3 text-xs text-zinc-300`}
                        onClick={() => swiper?.slideNext()}
                    >
                        {shades[swiperIndex + 1]}
                        <FaChevronDown
                            className={`${
                                swiperIndex === 6
                                    ? "text-white/50"
                                    : "text-white"
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Menu
