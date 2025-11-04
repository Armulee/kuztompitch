import Image from "next/image"
import { InstagramPostType } from "./news"
import { useEffect, useRef } from "react"

const InstagramPost = ({ 
    post, 
    isActive = false 
}: { 
    post: InstagramPostType
    isActive?: boolean 
}) => {
    const videoRef = useRef<HTMLVideoElement>(null)

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

    return (
        <div
            className={`bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto border border-gray-200 ${
                post.permalink ? "cursor-pointer hover:shadow-xl transition-shadow" : ""
            }`}
            onClick={handleClick}
        >
            {/* Header */}
            <div className='flex items-center p-3 border-b border-gray-200'>
                {/* Avatar - black rounded div with logo centered */}
                <div className='w-8 h-8 rounded-full bg-black flex items-center justify-center mr-3'>
                    <Image
                        width={16}
                        height={16}
                        src='/assets/white-logo.png'
                        alt='kuztompitch logo'
                        className='w-1/2 h-auto object-contain'
                    />
                </div>
                <div className='flex-1'>
                    <p className='font-semibold text-sm text-black'>
                        kuztompitch
                    </p>
                </div>
                <span className='text-gray-600 text-xs'>{post.timestamp}</span>
            </div>

            {/* Media - Image or Video */}
            <div className='relative'>
                {post.type === "VIDEO" ? (
                    <video
                        ref={videoRef}
                        src={post.imageUrl}
                        className='w-full h-80 object-cover'
                        loop
                        muted
                        playsInline
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
                ) : (
                    <Image
                        width={300}
                        height={400}
                        src={post.imageUrl}
                        alt={post.caption || 'Instagram post'}
                        className='w-full h-80 object-cover'
                        unoptimized
                    />
                )}
            </div>

            {/* Caption */}
            <div className='p-3 border-t border-gray-200'>
                <div className='text-sm'>
                    <span className='font-semibold mr-1 text-black'>
                        kuztompitch
                    </span>
                    <span className='text-gray-700'>{post.caption}</span>
                </div>
            </div>
        </div>
    )
}

export default InstagramPost
