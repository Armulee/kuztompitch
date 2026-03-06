import Link from "next/link"
import SocialMedias from "./social-medias"
import { smoothScrollTo } from "../navbar"

const Hero = () => {
    return (
        <section
            id='home'
            className='w-full h-[100dvh] overflow-hidden flex flex-col justify-center items-center relative'
        >
            {/* Decorative gradient orbs */}
            <div className='absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-accent-purple/10 blur-[120px] animate-glow-pulse pointer-events-none' />
            <div
                className='absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent-cyan/10 blur-[100px] animate-glow-pulse pointer-events-none'
                style={{ animationDelay: "2s" }}
            />

            <div className='z-30 absolute top-[18%] md:top-1/2 md:left-1/2 md:-translate-y-1/2'>
                <div className='w-full flex-col justify-center items-center mb-6'>
                    <h1 className='text-[44px] md:text-6xl lg:text-8xl text-center md:text-start font-display text-white leading-tight tracking-tight'>
                        Kuztom Pitch
                    </h1>
                    <h5 className='text-zinc-400 text-[18px] md:text-2xl lg:text-3xl text-center md:text-start tracking-wide mt-2'>
                        Band Equipment Customize
                    </h5>
                </div>
                <div className='flex justify-center md:justify-start items-center gap-4'>
                    <Link href={"/customize"}>
                        <button className='rounded-full bg-gradient-accent px-8 py-3 text-white font-medium hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300 hover:scale-105'>
                            Try Customize
                        </button>
                    </Link>
                    <button
                        onClick={() => smoothScrollTo("about-us")}
                        className='rounded-full px-8 py-3 text-white/80 font-medium border border-white/20 hover:border-white/40 hover:text-white transition-all duration-300 backdrop-blur-sm'
                    >
                        Learn More
                    </button>
                </div>
            </div>

            {/* Social medias at bottom center */}
            <SocialMedias className='absolute bottom-8 right-4 -translate-x-1/2 z-30 flex-col' />

            {/* Video Overlay */}
            <div className='absolute w-full h-full z-20 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]' />
            {/* Video */}
            <video
                className='absolute -bottom-1/2 right-10 translate-x-0 md:left-1/4 md:-bottom-[25%] md:-translate-x-1/2 w-full h-[120vh] object-cover -z-10'
                autoPlay
                muted
                playsInline
                loop
            >
                <source src='/assets/hero.webm' type='video/webm' />
            </video>
        </section>
    )
}

export default Hero
