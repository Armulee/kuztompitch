"use client"

import { useState, useEffect, useRef } from "react"
import { SwiperSlide } from "swiper/react"
import { Swiper as SwiperType } from "swiper/types"
import FlowCarousel from "../flow-carousel"
import InstagramPost from "./ig-post"

export interface InstagramPostType {
    id: string
    media_url: string
    caption?: string | null
    permalink?: string
    type?: string
    timestamp?: string
    username?: string
    userAvatar?: string
}

const fallbackPosts: InstagramPostType[] = [
    {
        id: "fallback-1",
        media_url: "https://picsum.photos/400/400?random=1",
        caption:
            "Amazing custom pitch design! 🎤✨ #kuztompitch #custom #microphone",
        permalink: "https://instagram.com/kuztompitch_official",
        type: "IMAGE",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        username: "kuztompitch_official",
        userAvatar: "https://picsum.photos/40/40?random=10",
    },
    {
        id: "fallback-2",
        media_url: "https://picsum.photos/400/400?random=2",
        caption:
            "Behind the scenes of our latest project 🎨 #bts #design #creation",
        permalink: "https://instagram.com/kuztompitch_official",
        type: "IMAGE",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        username: "kuztompitch_official",
        userAvatar: "https://picsum.photos/40/40?random=10",
    },
    {
        id: "fallback-3",
        media_url: "https://picsum.photos/400/400?random=3",
        caption:
            "Client spotlight: Premium metallic finish ⚡ #premium #metallic #quality",
        permalink: "https://instagram.com/kuztompitch_official",
        type: "IMAGE",
        timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
        username: "kuztompitch_official",
        userAvatar: "https://picsum.photos/40/40?random=10",
    },
    {
        id: "fallback-4",
        media_url: "https://picsum.photos/400/400?random=4",
        caption:
            "New color options available now! 🌈 #newcolors #options #customize",
        permalink: "https://instagram.com/kuztompitch_official",
        type: "IMAGE",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        username: "kuztompitch_official",
        userAvatar: "https://picsum.photos/40/40?random=10",
    },
]

const isInstagramPost = (value: unknown): value is InstagramPostType => {
    if (typeof value !== "object" || value === null) {
        return false
    }

    const candidate = value as Partial<InstagramPostType>

    return (
        typeof candidate.id === "string" &&
        typeof candidate.media_url === "string"
    )
}

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
    const [posts, setPosts] = useState<InstagramPostType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
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

    useEffect(() => {
        let isMounted = true

        const loadInstagramPosts = async () => {
            setIsLoading(true)
            try {
                const response = await fetch("/api/instagram-posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`)
                }

                const payload: unknown = await response.json()
                const candidateMedia = (payload as { mediaData?: unknown }).mediaData
                const mediaData = Array.isArray(candidateMedia)
                    ? candidateMedia
                    : Array.isArray(payload)
                    ? payload
                    : []

                const sanitized = mediaData.filter(isInstagramPost)

                if (!isMounted) {
                    return
                }

                if (sanitized.length === 0) {
                    setPosts(fallbackPosts)
                    setError("No Instagram posts available right now. Showing sample posts.")
                } else {
                    setPosts(
                        sanitized.map((item) => ({
                            ...item,
                            caption: item.caption ?? "",
                        }))
                    )
                    setError(null)
                }
            } catch (err) {
                console.error("Failed to load Instagram posts", err)

                if (!isMounted) {
                    return
                }

                setPosts(fallbackPosts)
                setError("We had trouble loading the Instagram feed. Showing sample posts.")
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadInstagramPosts()

        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        if (posts.length > 0) {
            setCurrentSlide(0)
        }
    }, [posts.length])

    const hasPosts = posts.length > 0

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

                <div className='relative min-h-[22rem]'>
                    {isLoading && (
                        <div className='flex items-center justify-center h-full text-slate-400'>
                            Loading latest posts...
                        </div>
                    )}

                    {!isLoading && !hasPosts && (
                        <div className='flex items-center justify-center h-full text-slate-400'>
                            No Instagram posts to display right now.
                        </div>
                    )}

                    {hasPosts && (
                        <>
                            <FlowCarousel
                                key={posts.length}
                                slidesPerView='auto'
                                spaceBetween={20}
                                loop={posts.length > 1}
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
                                {posts.map((post) => (
                                    <SwiperSlide key={post.id} className='!w-auto'>
                                        <InstagramPost post={post} />
                                    </SwiperSlide>
                                ))}
                            </FlowCarousel>

                            {posts.length > 1 && (
                                <ProgressBar
                                    currentSlide={currentSlide}
                                    totalSlides={posts.length}
                                    autoplayDelay={autoplayDelay}
                                    transitionSpeed={transitionSpeed}
                                    isPaused={isPaused}
                                />
                            )}
                        </>
                    )}
                </div>

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

                {error && (
                    <p className='text-center text-xs text-slate-500 mt-4'>
                        {error}
                    </p>
                )}
            </div>
        </section>
    )
}

export default News
