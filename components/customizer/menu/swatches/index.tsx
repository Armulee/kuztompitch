import { useCustomizeContext } from "../../provider"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Mousewheel } from "swiper/modules"
import useGlossy from "./glossy"

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
}) => {
    const colors: {
        [style: string]: ShadeColor
    } = {
        glossy: useGlossy(),
        matte: useGlossy(),
    }

    const { style } = useCustomizeContext()
    return (
        <div className='mt-1 sm:mt-2'>
            <span className='text-xs sm:text-sm text-zinc-400'>{shade}</span>
            <Swiper
                className='pt-1 pb-2 sm:pb-3 my-2 sm:my-3'
                slidesPerView={15}
                spaceBetween={12}
                mousewheel={{ releaseOnEdges: true, forceToAxis: true }}
                breakpoints={{
                    320: {
                        slidesPerView: 5,
                        spaceBetween: 8,
                    },
                    400: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 6.5,
                        spaceBetween: 12,
                    },
                    640: {
                        slidesPerView: 7.5,
                        spaceBetween: 14,
                    },
                    800: {
                        slidesPerView: 8.5,
                    },
                    960: {
                        slidesPerView: 9,
                    },
                    1120: {
                        slidesPerView: 9.5,
                    },
                    1280: {
                        slidesPerView: 10,
                    },
                }}
                direction='horizontal'
                modules={[FreeMode, Mousewheel]}
                freeMode
            >
                {colors?.[style?.toLowerCase()]?.[shade]?.map((c) =>
                    style === "Metalic" ? (
                        <SwiperSlide
                            key={`metalic-${c.name}`}
                            style={{
                                background: `linear-gradient(135deg, ${c.color[0]} 0%, ${c.color[1]} 100%)`,
                            }}
                            onClick={() => handleClick({ ...c, style })}
                            className='rounded-md !min-w-[18px] sm:!min-w-[20px] !min-h-[26px] sm:!min-h-[30px] border border-white/10 cursor-pointer hover:scale-110 transition-transform'
                        />
                    ) : (
                        <SwiperSlide
                            key={`solid-${c.name}`}
                            style={{
                                background: `${c.color}`,
                            }}
                            onClick={() => handleClick({ ...c, style })}
                            className='rounded-md !min-w-[18px] sm:!min-w-[20px] !min-h-[26px] sm:!min-h-[30px] border border-white/10 relative cursor-pointer hover:scale-110 transition-transform'
                        ></SwiperSlide>
                    )
                )}
            </Swiper>
        </div>
    )
}

export default ColorSwatch
