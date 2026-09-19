"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import SocialMedias from "./social-medias"
import { smoothScrollTo } from "../navbar"

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null)

    // The background video is decorative, so it must never compete with the
    // hero copy for bandwidth. The poster renders immediately and the video
    // only starts downloading once the page itself has finished loading.
    useEffect(() => {
        const el = videoRef.current
        if (!el) return

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches
        if (reduceMotion) return

        let idleId: number | undefined
        const startLoading = () => {
            el.src = "/assets/hero.webm"
            el.load()
            el.play().catch(() => {
                /* autoplay blocked - the poster stays, which is fine */
            })
        }

        const schedule = () => {
            idleId = window.requestIdleCallback
                ? window.requestIdleCallback(startLoading, { timeout: 2000 })
                : window.setTimeout(startLoading, 500)
        }

        if (document.readyState === "complete") {
            schedule()
        } else {
            window.addEventListener("load", schedule, { once: true })
        }

        return () => {
            window.removeEventListener("load", schedule)
            if (idleId === undefined) return
            if (window.cancelIdleCallback) window.cancelIdleCallback(idleId)
            else window.clearTimeout(idleId)
        }
    }, [])

    return (
        <section
            id='home'
            className='w-full h-[100vh] overflow-hidden flex flex-col justify-center items-center relative'
        >
            {/* Decorative gradient orbs */}
            <div className='absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-white/10 blur-[120px] animate-glow-pulse pointer-events-none' />
            <div
                className='absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-white/10 blur-[100px] animate-glow-pulse pointer-events-none'
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
                        <button className='rounded-full bg-white px-8 py-3 text-black font-medium hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-105'>
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
            <SocialMedias className='absolute bottom-16 right-4 -translate-x-1/2 z-30 flex-col' />

            {/* Video Overlay */}
            <div className='absolute w-full h-full z-20 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]' />
            {/* Video */}
            <video
                ref={videoRef}
                className='absolute -bottom-1/2 right-10 translate-x-0 md:left-1/4 md:-bottom-[25%] md:-translate-x-1/2 w-full h-[120dvh] object-cover -z-10'
                poster='/assets/hero-poster.webp'
                preload='none'
                muted
                playsInline
                loop
            />
        </section>
    )
}

export default Hero
