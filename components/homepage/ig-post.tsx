import Image from "next/image"
import { InstagramPostType } from "./news"

const InstagramPost = ({ post }: { post: InstagramPostType }) => {
    const handleClick = () => {
        if (post.permalink) {
            window.open(post.permalink, "_blank", "noopener,noreferrer")
        }
    }

    return (
        <div
            className={`bg-black rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto ${
                post.permalink ? "cursor-pointer hover:shadow-xl transition-shadow" : ""
            }`}
            onClick={handleClick}
        >
            {/* Header */}
            <div className='flex items-center p-3'>
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
                    <p className='font-semibold text-sm text-white'>
                        kuztompitch
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
                    alt={post.caption || 'Instagram post'}
                    className='w-full h-80 object-cover'
                    unoptimized
                />
            </div>

            {/* Caption */}
            <div className='p-3'>
                <div className='text-sm'>
                    <span className='font-semibold mr-1 text-white'>
                        kuztompitch
                    </span>
                    <span className='text-slate-300'>{post.caption}</span>
                </div>
            </div>
        </div>
    )
}

export default InstagramPost
