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
    permalink?: string
    type: string
}

interface GASPost {
    id: string
    caption: string
    media_url: string
    permalink: string
    type: string
    timestamp: string
}

interface GASResponse {
    success: boolean
    posts: GASPost[]
}

const PaginationDots = ({
    currentSlide,
    totalSlides,
    onDotClick,
}: {
    currentSlide: number
    totalSlides: number
    onDotClick: (index: number) => void
}) => {
    if (totalSlides <= 1) return null

    const getVisibleDots = () => {
        const delta = 2 // Show 2 dots on each side of active = 4 total visible around active
        const dots: (number | string)[] = []

        // Always show first dot
        dots.push(0)

        // Calculate range around current slide
        const start = Math.max(1, currentSlide - delta)
        const end = Math.min(totalSlides - 2, currentSlide + delta)

        // Add ellipsis before if there's a gap
        if (start > 2) {
            dots.push("...")
        } else if (start === 2) {
            // Show dot 1 if we're close enough
            dots.push(1)
        }

        // Add dots in range around current slide
        for (let i = start; i <= end; i++) {
            if (i > 0 && i < totalSlides - 1) {
                dots.push(i)
            }
        }

        // Add ellipsis after if there's a gap
        if (end < totalSlides - 3) {
            dots.push("...")
        } else if (end === totalSlides - 3 && totalSlides > 3) {
            // Show second-to-last if we're close enough
            dots.push(totalSlides - 2)
        }

        // Always show last dot if there's more than one slide
        if (totalSlides > 1) {
            dots.push(totalSlides - 1)
        }

        // Remove duplicates while preserving order
        const seen = new Set()
        return dots.filter((dot) => {
            if (dot === "...") return true
            if (seen.has(dot)) return false
            seen.add(dot)
            return true
        })
    }

    const visibleDots = getVisibleDots()

    return (
        <div className='flex justify-center items-center mt-6 space-x-2'>
            {visibleDots.map((dot, index) => {
                if (dot === "...") {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className='px-2 text-gray-400 text-sm'
                        >
                            ...
                        </span>
                    )
                }

                const dotIndex = dot as number
                const isActive = dotIndex === currentSlide

                return (
                    <button
                        key={dotIndex}
                        onClick={() => onDotClick(dotIndex)}
                        className={`transition-all duration-300 rounded-full ${
                            isActive
                                ? "w-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500"
                                : "w-2 h-2 bg-gray-600 hover:bg-gray-500"
                        }`}
                        aria-label={`Go to slide ${dotIndex + 1}`}
                    />
                )
            })}
        </div>
    )
}

const News = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [posts, setPosts] = useState<InstagramPostType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const swiperRef = useRef<SwiperType | null>(null)

    useEffect(() => {
        const fetchInstagramPosts = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch("/api/ig-posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const data: GASResponse | { success: false; message: string; details?: string; statusCode?: number; rawHtml?: string } = await response.json()

                if (!response.ok || !data.success) {
                    const errorData = data as { success: false; message: string; details?: string; statusCode?: number; rawHtml?: string }
                    let errorMessage = errorData.message || "Failed to fetch Instagram posts"
                    
                    if (errorData.details) {
                        errorMessage = `${errorMessage}\n${errorData.details}`
                    }
                    
                    if (errorData.rawHtml) {
                        errorMessage = `${errorMessage}\n\nRaw HTML (first 1000 chars):\n${errorData.rawHtml}`
                    }
                    
                    throw new Error(errorMessage)
                }

                if (data.success && data.posts) {
                    // Map GAS response to InstagramPostType
                    const mappedPosts: InstagramPostType[] = data.posts.map(
                        (post) => ({
                            id: post.id,
                            imageUrl: post.media_url,
                            caption: post.caption || "",
                            username: "kuztompitch",
                            userAvatar:
                                "/assets/dummy-profile-pic.jpg",
                            likes: 0, // Default value since GAS doesn't provide likes
                            timestamp: post.timestamp || "",
                            permalink: post.permalink,
                            type: post.type || "IMAGE",
                        })
                    )

                    setPosts(mappedPosts)
                } else {
                    throw new Error("Invalid response format")
                }
            } catch (err) {
                console.error("Error fetching Instagram posts:", err)
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load Instagram posts"
                )
            } finally {
                setLoading(false)
            }
        }

        fetchInstagramPosts()
    }, [])

    const handleSlideChange = (swiper: SwiperType) => {
        setCurrentSlide(swiper.realIndex)
    }

    const handleSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper
    }

    const handleDotClick = (index: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(index)
        }
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

                {loading ? (
                    <div className='flex justify-center items-center py-20'>
                        <div className='text-white text-lg'>Loading posts...</div>
                    </div>
                ) : error ? (
                    <div className='flex flex-col justify-center items-center py-20 px-4'>
                        <div className='max-w-2xl w-full'>
                            <div className='bg-red-900/20 border border-red-500/50 rounded-lg p-6'>
                                <h3 className='text-red-400 text-xl font-semibold mb-2'>
                                    Error Loading Instagram Posts
                                </h3>
                                <p className='text-red-300 text-sm whitespace-pre-wrap break-words'>
                                    {error}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className='flex justify-center items-center py-20'>
                        <div className='text-white text-lg'>
                            No posts available
                        </div>
                    </div>
                ) : (
                    <>
                        <FlowCarousel
                            slidesPerView={1}
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
                            {posts.map((post, index) => (
                                <SwiperSlide key={post.id}>
                                    <InstagramPost 
                                        post={post} 
                                        isActive={currentSlide === index}
                                    />
                                </SwiperSlide>
                            ))}
                        </FlowCarousel>

                        <PaginationDots
                            currentSlide={currentSlide}
                            totalSlides={posts.length}
                            onDotClick={handleDotClick}
                        />
                    </>
                )}

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
