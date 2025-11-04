"use client"
import Link from "next/link"
import SocialMedias from "./social-medias"
import { motion } from "framer-motion"

const Hero = () => {
    return (
        <section
            id='home'
            className='w-full h-screen overflow-hidden flex flex-col justify-center items-center relative'
        >
            {/* Video Background */}
            <video
                className='absolute inset-0 w-full h-full object-cover scale-110'
                autoPlay
                muted
                playsInline
                loop
            >
                <source src='/assets/hero.webm' type='video/webm' />
            </video>

            {/* Gradient Overlays */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10' />
            <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-10' />
            
            {/* Animated Background Elements */}
            <div className='absolute inset-0 overflow-hidden z-10'>
                <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse' />
                <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }} />
            </div>

            {/* Content */}
            <div className='relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col md:flex-row items-center justify-between min-h-[60vh]'>
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className='flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0'
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className='mb-6'
                        >
                            <h1 className='text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 leading-tight'>
                                <span className='block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent'>
                                    Kuztom Pitch
                                </span>
                            </h1>
                            <motion.h5
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className='text-xl md:text-2xl lg:text-4xl text-slate-300 font-light tracking-wide'
                            >
                                Band Equipment Customize
                            </motion.h5>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className='flex flex-col sm:flex-row gap-4 items-center md:items-start'
                        >
                            <Link href={"/customize"}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-lg shadow-purple-500/50 overflow-hidden'
                                >
                                    <span className='relative z-10 flex items-center gap-2'>
                                        Try Customize
                                        <svg className='w-5 h-5 transform group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                                        </svg>
                                    </span>
                                    <motion.div
                                        className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500'
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Social Icons - Desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className='hidden md:flex'
                    >
                        <SocialMedias className='flex-col gap-6' />
                    </motion.div>
                </div>
            </div>

            {/* Mobile Social Icons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className='md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-30'
            >
                <SocialMedias className='flex-col gap-5' />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className='absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:block'
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className='flex flex-col items-center gap-2 text-white/60'
                >
                    <span className='text-sm font-light'>Scroll</span>
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero
