import useSolid from "./solid"
import useMetalic from "./glossy"
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
    }: {
        name: string
        code: string
        color: string | string[]
    }) => void
}) => {
    const colors: {
        [style: string]: ShadeColor
    } = {
        solid: useSolid(),
        glossy: useGlossy(),
        matte: useSolid(),
        metalic: useMetalic(),
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
                {colors?.[style?.toLowerCase()]?.[shade]?.map((color) => (
                    <>
                        {style === "Metalic" ? (
                            <SwiperSlide
                                key={`metalic-${color.name}`}
                                style={{
                                    background: `linear-gradient(135deg, ${color.color[0]} 0%, ${color.color[1]} 100%)`,
                                }}
                                onClick={() => handleClick(color)}
                                className={`rounded-md !min-w-[20px] !min-h-[30px] border`}
                            />
                        ) : (
                            <SwiperSlide
                                key={`solid-${color.name}`}
                                style={{
                                    background: `${color.color}`,
                                }}
                                onClick={() => handleClick(color)}
                                className={`rounded-md !min-w-[20px] !min-h-[30px] border`}
                            />
                        )}
                    </>
                ))}
            </Swiper>
        </div>
    )
}

export default ColorSwatch
