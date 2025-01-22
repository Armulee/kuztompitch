// import { useState } from "react"
import { useCustomizeContext } from "../provider"
import { useCallback, useEffect, useState } from "react"

import ColorSwatch from "./swatches"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel } from "swiper/modules"
import Pricing from "./pricing"
import { Material } from "../provider/types"

const Menu = () => {
    const styles = ["Solid", "Metalic"]
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
                    const solid = { roughness: 0, metalness: 0.8 }
                    setCapsule((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...solid,
                        style,
                    }))
                } else if (style === "Metalic") {
                    const metalic = { roughness: 0.15, metalness: 1 }
                    setCapsule((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...metalic,
                        style,
                    }))
                }
            } else if (part === "Top Handle") {
                if (style === "Solid") {
                    const solid = { roughness: 0.8, metalness: 0.7 }
                    setTopHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...solid,
                        style,
                    }))
                } else if (style === "Metalic") {
                    const metalic = { roughness: 0.35, metalness: 1 }
                    setTopHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...metalic,
                        style,
                    }))
                }
            } else if (part === "Bottom Handle") {
                if (style === "Solid") {
                    const solid = { roughness: 0.8, metalness: 0.7 }
                    setBottomHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...solid,
                        style,
                    }))
                } else if (style === "Metalic") {
                    const metalic = { roughness: 0.35, metalness: 1 }
                    setBottomHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...metalic,
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

    // const [swiperIndex, setSwiperIndex] = useState<number>(0)
    // const colorPaginations = [
    //     "#ffffff",
    //     "#fee715",
    //     "#f36944",
    //     "#dc343b",
    //     "#e55982",
    //     "#5f4b8b",
    //     "#3d428b",
    // ]

    // useEffect(() => {
    //     if (swiperIndex) {
    //         console.log(swiperIndex)
    //     }
    // }, [swiperIndex])
    return (
        <div className={`h-full bg-black relative`}>
            <div className={`${isIphone ? "py-4 px-2" : "p-4"} h-full`}>
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

                <Swiper
                    // onSwiper={(swiper) => setSwiperIndex(swiper.realIndex)}
                    // onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
                    id='swatches'
                    slidesPerView={1}
                    direction='vertical'
                    modules={[Mousewheel]}
                    mousewheel={{ forceToAxis: true }}
                    className='h-[15vh] py-[8px] border-0 border-t mt-1'
                >
                    {/* Monochromatics #9a9a9a */}
                    <SwiperSlide>
                        <ColorSwatch
                            shade='monochromatics'
                            handleClick={handleClick}
                        />
                    </SwiperSlide>
                    {/* Yellow #fee715 */}
                    <SwiperSlide>
                        <ColorSwatch shade='yellow' handleClick={handleClick} />
                    </SwiperSlide>
                    {/* Orange #f36944 */}
                    <SwiperSlide>
                        <ColorSwatch shade='orange' handleClick={handleClick} />
                    </SwiperSlide>
                    {/* Red #f36944 */}
                    <SwiperSlide>
                        <ColorSwatch shade='red' handleClick={handleClick} />
                    </SwiperSlide>
                    {/* Pink #d32e5e */}
                    <SwiperSlide>
                        <ColorSwatch shade='pink' handleClick={handleClick} />
                    </SwiperSlide>
                    {/* Violet #773376 */}
                    <SwiperSlide>
                        <ColorSwatch shade='violet' handleClick={handleClick} />
                    </SwiperSlide>
                    {/* Blue #5b7ebd */}
                    <SwiperSlide>
                        <ColorSwatch shade='blue' handleClick={handleClick} />
                    </SwiperSlide>
                </Swiper>

                <Pricing />
            </div>
        </div>
    )
}

export default Menu
