import React, { useState } from "react"
import { Swiper as SwiperType } from "swiper/types"
import { useCustomizeContext } from "../provider"
import ColorSwatch, { Shade } from "./swatches"
import { Color } from "."
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel } from "swiper/modules"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"

const shades: Shade[] = [
    "Monochromatics",
    "Yellow",
    "Orange",
    "Red",
    "Pink",
    "Violet",
    "Blue",
]

const shadeColorMap: Record<Shade, string> = {
    Monochromatics: "#a1a1aa",
    Yellow: "#facc15",
    Orange: "#fb923c",
    Red: "#f87171",
    Pink: "#f472b6",
    Violet: "#a78bfa",
    Blue: "#60a5fa",
}

const Colors = ({
    setColor,
}: {
    setColor: React.Dispatch<React.SetStateAction<Color>>
}) => {
    const styles = ["Glossy", "Matte"]
    const [swiper, setSwiper] = useState<SwiperType | null>(null)
    const [swiperIndex, setSwiperIndex] = useState<number>(0)

    const { style, setStyle } = useCustomizeContext()

    const handleClick = (color: {
        code: string
        name: string
        color: string | string[]
        style: string
    }) => {
        setColor(color)
    }

    return (
        <>
            <div className='flex items-center justify-between px-1 pt-2 sm:pt-3 pb-1'>
                <div id='styles' className='flex items-center gap-1.5 sm:gap-2'>
                    {styles.map((s) => (
                        <button
                            key={`style-${s}`}
                            onClick={() => setStyle(s)}
                            className={`px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium transition-all duration-300 cursor-pointer rounded-full border ${
                                style === s
                                    ? "bg-gradient-accent text-white border-transparent shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                                    : "bg-transparent text-zinc-500 border-white/[0.08] hover:border-white/20 hover:text-zinc-300"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <span className='text-[9px] sm:text-[10px] text-zinc-600 font-medium tracking-wider uppercase pr-1'>
                    {shades[swiperIndex]}
                </span>
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
                className='h-[9vh] sm:h-[10vh] lg:h-[11vh] border-y border-white/[0.06]'
            >
                {shades.map((shade) => (
                    <SwiperSlide key={`shade-${shade}`}>
                        <ColorSwatch shade={shade} handleClick={handleClick} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className='flex items-center justify-between px-3 sm:px-4 pt-2 sm:pt-2.5'>
                <button
                    type='button'
                    className='flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] transition-colors disabled:opacity-30'
                    onClick={() => swiper?.slidePrev()}
                    disabled={swiperIndex === 0}
                    style={{ color: swiperIndex > 0 ? shadeColorMap[shades[swiperIndex - 1]] : undefined }}
                >
                    <FaChevronUp />
                    <span className='min-w-[60px] sm:min-w-[80px]'>{shades[swiperIndex - 1] || ""}</span>
                </button>
                <button
                    type='button'
                    className='flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] transition-colors disabled:opacity-30'
                    onClick={() => swiper?.slideNext()}
                    disabled={swiperIndex === shades.length - 1}
                    style={{ color: swiperIndex < shades.length - 1 ? shadeColorMap[shades[swiperIndex + 1]] : undefined }}
                >
                    <span className='min-w-[60px] sm:min-w-[80px] text-right'>{shades[swiperIndex + 1] || ""}</span>
                    <FaChevronDown />
                </button>
            </div>
        </>
    )
}

export default Colors
