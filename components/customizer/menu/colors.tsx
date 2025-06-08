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

const Colors = ({
    color,
    setColor,
}: {
    color: Color
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
            <div className='flex justify-between items-center'>
                <div id='styles' className='flex justify-start items-center'>
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
                            color={color}
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
                            swiperIndex === 0 ? "text-white/50" : "text-white"
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
                            swiperIndex === 6 ? "text-white/50" : "text-white"
                        }`}
                    />
                </button>
            </div>
        </>
    )
}

export default Colors
