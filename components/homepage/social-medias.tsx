import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6"

const SocialMedias = ({ className }: { className?: string }) => {
    return (
        <div className={`${className} flex items-center gap-5`}>
            <FaFacebook className='w-5 h-auto' />
            <FaInstagram className='w-5 h-auto' />
            <FaXTwitter className='w-5 h-auto' />
            <FaTiktok className='w-5 h-auto' />
        </div>
    )
}

export default SocialMedias
