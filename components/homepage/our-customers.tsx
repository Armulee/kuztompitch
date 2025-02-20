import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import _ from "lodash"
import Image from "next/image"
import { SwiperSlide } from "swiper/react"
import dummy from "../../public/assets/dummy-profile-pic.jpg"
import { useState } from "react"
import { Swiper as SwiperType } from "swiper/types"
// import { FreeMode } from "swiper/modules"
import FlowCarousel from "../flow-carousel"

const OurCustomers = () => {
    const srcs = [dummy, dummy, dummy, dummy, dummy, dummy]
    const [swiper, setSwiper] = useState<SwiperType>()
    const [index, setIndex] = useState<number>(0)

    const handleLeft = () => swiper?.slidePrev()
    const handleRight = () => swiper?.slideNext()
    return (
        <section className='mb-6'>
            <h6 className='text-3xl font-bold mb-6'>Our Customers</h6>
            <div className='w-full flex justify-between items-center w-[350px] m-auto'>
                <FaChevronLeft
                    className={`${
                        index === 0 ? "text-stone-400" : "text-white"
                    }`}
                    onClick={handleLeft}
                />
                <div className='mx-3'>
                    <Image
                        className='max-w-full min-w-[300px] h-auto mb-2 rounded-lg user-select-none'
                        src={_.sample(srcs) ?? ""}
                        alt=''
                    />
                    <FlowCarousel
                        className='w-[300px]'
                        slidesPerView={3}
                        spaceBetween={14}
                        onSwiper={(swiper) => setSwiper(swiper)}
                        onSlideChange={(swiper: SwiperType) =>
                            setIndex(swiper.realIndex)
                        }
                    >
                        {srcs.map((src, index) => (
                            <SwiperSlide key={`src-${index}`}>
                                <Image
                                    className='rounded user-select-none'
                                    src={src}
                                    alt=''
                                />
                            </SwiperSlide>
                        ))}
                    </FlowCarousel>
                    {/* <Swiper
                        freeMode
                        className='w-[300px]'
                        slidesPerView={3}
                        spaceBetween={14}
                        modules={[FreeMode]}
                        onSwiper={(swiper) => setSwiper(swiper)}
                        onSlideChange={(swiper) => setIndex(swiper.realIndex)}
                    >
                        {srcs.map((src, index) => (
                            <SwiperSlide key={`src-${index}`}>
                                <Image
                                    className='rounded user-select-none'
                                    src={src}
                                    alt=''
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper> */}
                </div>
                <FaChevronRight
                    className={`${
                        index === srcs.length - 3
                            ? "text-stone-400"
                            : "text-white"
                    }`}
                    onClick={handleRight}
                />
            </div>
        </section>
    )
}

export default OurCustomers
