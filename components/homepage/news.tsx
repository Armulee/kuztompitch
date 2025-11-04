"use client"
import { useState, useEffect } from "react"
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

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}) => {
    const getPageNumbers = () => {
        const delta = 2
        const range = []
        const rangeWithDots = []

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...")
        } else {
            rangeWithDots.push(1)
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages)
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages)
        }

        return rangeWithDots
    }

    if (totalPages <= 1) return null

    return (
        <div className='flex justify-center items-center mt-8 space-x-2'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors'
            >
                Previous
            </button>

            {getPageNumbers().map((page, index) => {
                if (page === "...") {
                    return (
                        <span
                            key={`dots-${index}`}
                            className='px-2 text-gray-400'
                        >
                            ...
                        </span>
                    )
                }

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page as number)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === page
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                    >
                        {page}
                    </button>
                )
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-4 py-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors'
            >
                Next
            </button>
        </div>
    )
}

const News = () => {
    const [posts, setPosts] = useState<InstagramPostType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 12 // Number of posts per page

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
                        })
                    )

                    setPosts(mappedPosts)
                    setCurrentPage(1) // Reset to first page when new posts are loaded
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

    // Calculate pagination
    const totalPages = Math.ceil(posts.length / postsPerPage)
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    const currentPosts = posts.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
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
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {currentPosts.map((post) => (
                                <InstagramPost key={post.id} post={post} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
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
