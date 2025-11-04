import Link from "next/link"
import Image from "next/image"

import { InstagramPostType } from "./news"

const FALLBACK_IMAGE = "/assets/test.png"
const FALLBACK_AVATAR = "/assets/dummy-profile-pic.jpg"
const DEFAULT_USERNAME = "kuztompitch"

const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) {
        return ""
    }

    const parsed = new Date(timestamp)

    if (Number.isNaN(parsed.getTime())) {
        return ""
    }

    return parsed.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

const InstagramPost = ({ post }: { post: InstagramPostType }) => {
    const username = post.username ?? DEFAULT_USERNAME
    const avatarSrc = post.userAvatar ?? FALLBACK_AVATAR
    const mediaSrc = post.media_url || FALLBACK_IMAGE
    const formattedTimestamp = formatTimestamp(post.timestamp)
    const mediaAltText = post.caption ? post.caption.slice(0, 80) : "Instagram post"

    const mediaContent = (
        <Image
            width={300}
            height={400}
            src={mediaSrc}
            alt={mediaAltText}
            className='w-full h-80 object-cover'
            unoptimized
            priority={false}
        />
    )

    return (
        <div className='bg-black rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto border border-slate-800'>
            <div className='flex items-center p-3 gap-3'>
                <Image
                    width={32}
                    height={32}
                    src={avatarSrc}
                    alt={`${username} avatar`}
                    className='w-8 h-8 rounded-full object-cover'
                />
                <div className='flex-1 min-w-0'>
                    <p className='font-semibold text-sm text-white truncate'>{username}</p>
                    {post.type && (
                        <span className='text-xs uppercase tracking-wide text-purple-300'>{post.type}</span>
                    )}
                </div>
                {formattedTimestamp && (
                    <span className='text-white text-xs whitespace-nowrap'>{formattedTimestamp}</span>
                )}
            </div>

            <div className='relative'>
                {post.permalink ? (
                    <Link
                        href={post.permalink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500'
                    >
                        {mediaContent}
                    </Link>
                ) : (
                    mediaContent
                )}
            </div>

            <div className='p-4 space-y-3'>
                {post.caption && (
                    <p className='text-sm text-slate-300 leading-5'>{post.caption}</p>
                )}

                {post.permalink && (
                    <Link
                        href={post.permalink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 text-sm font-medium text-purple-300 hover:text-purple-200 transition-colors'
                    >
                        <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            aria-hidden='true'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M14 3h7m0 0v7m0-7L10 14'
                            />
                        </svg>
                        View on Instagram
                    </Link>
                )}
            </div>
        </div>
    )
}

export default InstagramPost
