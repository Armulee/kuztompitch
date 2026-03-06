import Image from "next/image"
import { InstagramPostType } from "./news"
import { useEffect, useRef, useState } from "react"
import { FaPlay, FaInstagram } from "react-icons/fa"

const InstagramPost = ({
    post,
    isActive = false,
}: {
    post: InstagramPostType
    isActive?: boolean
}) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [imgError, setImgError] = useState(false)

    useEffect(() => {
        if (videoRef.current && post.type === "VIDEO") {
            if (isActive) {
                videoRef.current.play().catch((err) => {
                    console.error("Error playing video:", err)
                })
            } else {
                videoRef.current.pause()
            }
        }
    }, [isActive, post.type])

    const handleClick = () => {
        if (post.permalink) {
            window.open(post.permalink, "_blank", "noopener,noreferrer")
        }
    }

    const MediaFallback = () => (
        <div className='w-full h-full bg-surface flex flex-col items-center justify-center gap-3'>
            <FaInstagram className='text-4xl text-zinc-600' />
            <span className='text-sm text-zinc-500 font-medium'>View on Instagram</span>
        </div>
    )

    return (
        <div
            className={`bg-surface-light rounded-2xl overflow-hidden max-w-sm mx-auto border border-white/[0.06] flex flex-col h-[500px] transition-all duration-300 ${
                post.permalink
                    ? "cursor-pointer hover:border-white/15 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
                    : ""
            } ${isActive ? "border-white/15 shadow-[0_0_30px_rgba(139,92,246,0.08)]" : ""}`}
            onClick={handleClick}
        >
            {/* Header */}
            <div className='flex items-center p-3 border-b border-white/[0.06] flex-shrink-0 h-[60px]'>
                <div className='w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center mr-3 flex-shrink-0'>
                    <Image
                        width={16}
                        height={16}
                        src='/assets/white-logo.png'
                        alt='kuztompitch logo'
                        className='w-1/2 h-auto object-contain'
                    />
                </div>
                <div className='flex-1 min-w-0'>
                    <p className='font-semibold text-sm text-white truncate'>
                        kuztompitch
                    </p>
                </div>
                <span className='text-zinc-500 text-xs flex-shrink-0 ml-2'>
                    {post.timestamp}
                </span>
            </div>

            {/* Media */}
            <div className='relative flex-shrink-0 h-80'>
                {imgError ? (
                    <MediaFallback />
                ) : post.type === "VIDEO" ? (
                    <div className='relative w-full h-full'>
                        <video
                            ref={videoRef}
                            src={post.imageUrl}
                            className='w-full h-full object-cover'
                            loop
                            muted
                            playsInline
                            onError={() => setImgError(true)}
                            onMouseEnter={(e) => {
                                if (isActive && e.currentTarget) {
                                    e.currentTarget.play().catch(() => {})
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive && e.currentTarget) {
                                    e.currentTarget.pause()
                                }
                            }}
                        />
                        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                            <FaPlay className='text-white text-3xl opacity-70 drop-shadow-lg' />
                        </div>
                    </div>
                ) : (
                    <Image
                        width={300}
                        height={400}
                        src={post.imageUrl}
                        alt={post.caption || "Instagram post"}
                        className='w-full h-full object-cover'
                        unoptimized
                        onError={() => setImgError(true)}
                    />
                )}
            </div>

            {/* Caption */}
            <div className='px-3 pt-3 pb-2 border-t border-white/[0.06] flex-shrink-0 flex-1 min-h-0 overflow-hidden'>
                <div className='text-sm h-full flex flex-col'>
                    <div className='line-clamp-3 overflow-hidden whitespace-pre-wrap break-words'>
                        <span className='font-semibold mr-1 text-white'>
                            kuztompitch
                        </span>
                        <span className='text-zinc-400'>{post.caption}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstagramPost
