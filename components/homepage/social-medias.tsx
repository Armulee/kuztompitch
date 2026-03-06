import { FaFacebook, FaInstagram, FaLine, FaTiktok } from "react-icons/fa6"

const SocialMedias = ({ className }: { className?: string }) => {
    return (
        <div className={`${className} flex items-center gap-5`}>
            <a
                href='https://www.facebook.com/share/1ApdBRs7wV/?mibextid=wwXIfr'
                target='_blank'
                className='group'
            >
                <FaFacebook className='w-5 h-auto text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-200' />
            </a>
            <a
                href='https://www.instagram.com/kuztompitch?igsh=MTQxbHM2Y3BpcTNndA%3D%3D&utm_source=qr'
                target='_blank'
                className='group'
            >
                <FaInstagram className='w-5 h-auto text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-200' />
            </a>
            <a href='https://lin.ee/AvwUPdl' target='_blank' className='group'>
                <FaLine className='w-5 h-auto text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-200' />
            </a>
            <a
                href='https://www.tiktok.com/@kuztompitch?_t=ZS-8x3lkEv1byk&_r=1'
                target='_blank'
                className='group'
            >
                <FaTiktok className='w-5 h-auto text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-200' />
            </a>
        </div>
    )
}

export default SocialMedias
