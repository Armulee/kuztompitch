import useSolid from "./solid"
import useMetalic from "./glossy"
import { useCustomizeContext } from "../../provider"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Mousewheel } from "swiper/modules"
import useGlossy from "./glossy"
import { Color } from ".."
import { FaCheck } from "react-icons/fa6"

export type Shade =
    | "Monochromatics"
    | "Yellow"
    | "Orange"
    | "Red"
    | "Pink"
    | "Violet"
    | "Blue"
export type ShadeColor = {
    [shade: string]: { name: string; code: string; color: string | string[] }[]
}

const ColorSwatch = ({
    shade,
    handleClick,
    color,
}: {
    shade: Shade
    handleClick: ({
        name,
        code,
        color,
        style,
    }: {
        name: string
        code: string
        color: string | string[]
        style: string
    }) => void
    color: Color
}) => {
    const colors: {
        [style: string]: ShadeColor
    } = {
        glossy: useGlossy(),
        matte: useSolid(),
    }

    const { style } = useCustomizeContext()
    return (
        <div className='mt-2'>
            <span>{shade}</span>
            <Swiper
                className='pt-1 pb-3 my-3'
                slidesPerView={15}
                spaceBetween={20}
                mousewheel={{ releaseOnEdges: true, forceToAxis: true }}
                breakpoints={{
                    320: {
                        slidesPerView: 5.5,
                    },
                    480: {
                        slidesPerView: 6.5,
                    },
                    640: {
                        slidesPerView: 7.5,
                    },
                    800: {
                        slidesPerView: 8.5,
                    },
                    960: {
                        slidesPerView: 9.5,
                    },
                    1120: {
                        slidesPerView: 10.5,
                    },
                    1280: {
                        slidesPerView: 11.5,
                    },
                }}
                direction='horizontal'
                modules={[FreeMode, Mousewheel]}
                freeMode
            >
                {colors?.[style?.toLowerCase()]?.[shade]?.map((c) => {
                    return (
                        <>
                            {style === "Metalic" ? (
                                <SwiperSlide
                                    key={`metalic-${c.name}`}
                                    style={{
                                        background: `linear-gradient(135deg, ${c.color[0]} 0%, ${c.color[1]} 100%)`,
                                    }}
                                    onClick={() => handleClick({ ...c, style })}
                                    className={`rounded-md !min-w-[20px] !min-h-[30px] border`}
                                />
                            ) : (
                                <SwiperSlide
                                    key={`solid-${c.name}`}
                                    style={{
                                        background: `${c.color}`,
                                    }}
                                    onClick={() => handleClick({ ...c, style })}
                                    className={`rounded-md !min-w-[20px] !min-h-[30px] border relative`}
                                >
                                    {/* {color?.code === c.code &&
                                    color?.style === style ? (
                                        <FaCheck className='absolute inset-0 flex items-center justify-center text-white text-xs z-10' />
                                    ) : null} */}
                                </SwiperSlide>
                            )}
                        </>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default ColorSwatch
