"use client"
import { FaFacebook, FaInstagram, FaLine, FaTiktok } from "react-icons/fa6"
import { motion } from "framer-motion"

const SocialMedias = ({ className }: { className?: string }) => {
    const socialLinks = [
        {
            name: "Facebook",
            href: "https://www.facebook.com/share/1ApdBRs7wV/?mibextid=wwXIfr",
            icon: <FaFacebook className='w-5 h-5' />,
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/kuztompitch?igsh=MTQxbHM2Y3BpcTNndA%3D%3D&utm_source=qr",
            icon: <FaInstagram className='w-5 h-5' />,
        },
        {
            name: "Line",
            href: "https://lin.ee/AvwUPdl",
            icon: <FaLine className='w-5 h-5' />,
        },
        {
            name: "TikTok",
            href: "https://www.tiktok.com/@kuztompitch?_t=ZS-8x3lkEv1byk&_r=1",
            icon: <FaTiktok className='w-5 h-5' />,
        },
    ]

    return (
        <div className={`${className} flex items-center gap-5`}>
            {socialLinks.map((social, index) => (
                <motion.a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className='relative group'
                >
                    <div className='w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:border-white/50 group-hover:bg-white/20 group-hover:shadow-lg group-hover:shadow-white/20'>
                        {social.icon}
                    </div>
                    <span className='absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
                        {social.name}
                    </span>
                </motion.a>
            ))}
        </div>
    )
}

export default SocialMedias
