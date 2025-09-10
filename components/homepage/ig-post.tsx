import Image from "next/image"
import { InstagramPostType } from "./news"

const InstagramPost = ({ post }: { post: InstagramPostType }) => {
    return (
        <div className='bg-black rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto'>
            {/* Header */}
            <div className='flex items-center p-3'>
                <Image
                    width={20}
                    height={20}
                    src={post.userAvatar}
                    alt={post.username}
                    className='w-8 h-8 rounded-full mr-3'
                />
                <div className='flex-1'>
                    <p className='font-semibold text-sm text-white'>
                        {post.username}
                    </p>
                </div>
                <span className='text-white text-xs'>{post.timestamp}</span>
            </div>

            {/* Image */}
            <div className='relative'>
                <Image
                    width={300}
                    height={400}
                    src={post.imageUrl}
                    alt='Instagram post'
                    className='w-full h-80 object-cover'
                />
            </div>

            {/* Actions */}
            <div className='p-3'>
                <div className='flex items-center mb-2'>
                    <button className='mr-4'>
                        <svg
                            className='w-6 h-6 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                            />
                        </svg>
                    </button>
                    <button className='mr-4'>
                        <svg
                            className='w-6 h-6 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                            />
                        </svg>
                    </button>
                    <button>
                        <svg
                            className='w-6 h-6 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
                            />
                        </svg>
                    </button>
                </div>

                {/* Likes */}
                <p className='font-semibold text-sm mb-1 text-white'>
                    {post.likes} likes
                </p>

                {/* Caption */}
                <div className='text-sm'>
                    <span className='font-semibold mr-1 text-white'>
                        {post.username}
                    </span>
                    <span className='text-slate-300'>{post.caption}</span>
                </div>
            </div>
        </div>
    )
}

export default InstagramPost
