"use client"
import { useState, useEffect, useRef } from "react"
import { SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from "swiper/types"
import FlowCarousel from "../flow-carousel"
import InstagramPost from "./ig-post"

export interface InstagramPostType {
    id: string
    imageUrl: string
    caption: string
    username: string
    userAvatar: string
    likes: number
    timestamp: string
}

const dummyPosts: InstagramPostType[] = [
    {
        id: "1",
        imageUrl: "https://picsum.photos/400/400?random=1",
        caption:
            "Amazing custom pitch design! 🎤✨ #kuztompitch #custom #microphone",
        username: "kuztompitch_official",
        userAvatar: "https://picsum.photos/40/40?random=10",
        likes: 127,
        timestamp: "2h",
    },
    {
        id: "2",
        imageUrl: "https://picsum.photos/400/400?random=2",
        caption:
            "Behind the scenes of our latest project 🎨 #bts #design #creation",
        username: "kuztompitch_official",
        userAvatar: "https://picsum.photos/40/40?random=10",
        likes: 89,
        timestamp: "4h",
    },
    {
        id: "3",
        imageUrl: "https://picsum.photos/400/400?random=3",
        caption:
            "Client spotlight: Premium metallic finish ⚡ #premium #metallic #quality",
        username: "kuztompitch_official",
        userAvatar: "https://picsum.photos/40/40?random=10",
        likes: 203,
        timestamp: "1d",
    },
    {
        id: "4",
        imageUrl: "https://picsum.photos/400/400?random=4",
        caption:
            "New color options available now! 🌈 #newcolors #options #customize",
        username: "kuztompitch_official",
        userAvatar: "https://picsum.photos/40/40?random=10",
        likes: 156,
        timestamp: "2d",
    },
]

const ProgressBar = ({
    currentSlide,
    totalSlides,
    autoplayDelay,
    transitionSpeed,
    isPaused,
}: {
    currentSlide: number
    totalSlides: number
    autoplayDelay: number
    transitionSpeed: number
    isPaused: boolean
}) => {
    const [progress, setProgress] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout>()
    const transitionTimeoutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        setProgress(0)

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current)
        }

        if (isPaused) {
            return
        }

        // Pause progress during transition
        transitionTimeoutRef.current = setTimeout(() => {
            // Start progress after transition completes
            intervalRef.current = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        return 100
                    }
                    return prev + 100 / (autoplayDelay / 50)
                })
            }, 50)
        }, transitionSpeed)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current)
            }
        }
    }, [currentSlide, autoplayDelay, transitionSpeed, isPaused])

    // Pause progress when user is interacting
    useEffect(() => {
        if (isPaused && intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }, [isPaused])

    return (
        <div className='flex justify-center mt-6 space-x-2'>
            {Array.from({ length: totalSlides }).map((_, index) => (
                <div
                    key={index}
                    className='relative h-1 bg-gray-300 rounded-full overflow-hidden'
                    style={{ width: `${100 / totalSlides}%`, maxWidth: "60px" }}
                >
                    <div
                        className='absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-75 ease-linear'
                        style={{
                            width:
                                index === currentSlide
                                    ? `${progress}%`
                                    : index < currentSlide
                                    ? "100%"
                                    : "0%",
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

const News = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const autoplayDelay = 8000 // Match FlowCarousel delay
    const transitionSpeed = 2000 // Match FlowCarousel speed

    const handleSlideChange = (swiper: SwiperType) => {
        setCurrentSlide(swiper.realIndex)
    }

    const handleSwiper = (swiper: SwiperType) => {
        // Use Swiper's built-in events for better integration
        swiper.on("touchStart", () => {
            setIsPaused(true)
        })

        swiper.on("touchEnd", () => {
            // Resume after a short delay
            setTimeout(() => {
                setIsPaused(false)
            }, 500)
        })

        // Handle mouse events for desktop
        swiper.on("sliderFirstMove", () => {
            setIsPaused(true)
        })

        // Handle when autoplay is stopped/started
        swiper.on("autoplayStop", () => {
            setIsPaused(true)
        })

        swiper.on("autoplayStart", () => {
            setIsPaused(false)
        })
    }

    return (
        <section className='py-16 bg-black'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-white mb-4'>
                        Latest from Our Instagram
                    </h2>
                    <p className='text-lg text-slate-400'>
                        Follow our journey and see our latest Kuztom Pitch
                        creations
                    </p>
                </div>

                <FlowCarousel
                    slidesPerView='auto'
                    spaceBetween={20}
                    loop={true}
                    speed={2000}
                    disableOnInteraction={false}
                    onSlideChange={handleSlideChange}
                    onSwiper={handleSwiper}
                    breakpoint={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    className='!overflow-visible'
                >
                    {dummyPosts.map((post) => (
                        <SwiperSlide key={post.id} className='!w-auto'>
                            <InstagramPost post={post} />
                        </SwiperSlide>
                    ))}
                </FlowCarousel>

                <ProgressBar
                    currentSlide={currentSlide}
                    totalSlides={dummyPosts.length}
                    autoplayDelay={autoplayDelay}
                    transitionSpeed={transitionSpeed}
                    isPaused={isPaused}
                />

                <div className='text-center mt-8'>
                    <a
                        href='https://instagram.com/kuztompitch_official'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300'
                    >
                        <svg
                            className='w-5 h-5 mr-2 text-white'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                        </svg>
                        Follow us on Instagram
                    </a>
                </div>
            </div>
        </section>
    )
}

export default News
