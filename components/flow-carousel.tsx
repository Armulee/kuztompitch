import { Swiper } from "swiper/react"
import { Autoplay, FreeMode, Scrollbar } from "swiper/modules"
import { Swiper as SwiperType } from "swiper/types"

const FlowCarousel = ({
    children,
    className,
    breakpoint,
    slidesPerView = 1,
    scrollbar,
    speed = 15000,
    spaceBetween = 10,
    loop = false,
    disableOnInteraction = true,
    onSwiper,
    onSlideChange,
}: {
    children: React.ReactNode
    className?: string
    slidesPerView?: number | "auto"
    scrollbar?: boolean
    speed?: number
    spaceBetween?: number
    loop?: boolean
    breakpoint?: {
        [x: number]: { slidesPerView: number; spaceBetween: number }
    }
    onSwiper?: (swiper: SwiperType) => void
    onSlideChange?: (swiper: SwiperType) => void
    disableOnInteraction?: boolean
}) => {
    return (
        <Swiper
            onSwiper={onSwiper}
            onSlideChange={onSlideChange}
            className={`${className}`}
            slidesPerView={slidesPerView}
            breakpoints={breakpoint}
            spaceBetween={spaceBetween}
            freeMode={true}
            scrollbar={scrollbar}
            autoplay={{
                disableOnInteraction: disableOnInteraction,
                delay: 8000,
            }}
            modules={[Autoplay, FreeMode, Scrollbar]}
            loop={loop}
            speed={speed}
        >
            {children}
        </Swiper>
    )
}

export default FlowCarousel
