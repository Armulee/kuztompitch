import Link from "next/link"
import SocialMedias from "./social-medias"

const Hero = () => {
    return (
        <section
            id='home'
            className='w-full h-[100vh] overflow-hidden flex flex-col justify-center items-center relative'
        >
            <div className='z-30 absolute top-[18%] md:top-1/2 md:left-1/2 md:-translate-y-1/2'>
                <div className='w-full flex-col justify-center items-center mb-4'>
                    <h1 className='text-[40px] md:text-5xl lg:text-7xl text-center md:text-start text-white'>
                        Kuztom Pitch
                    </h1>
                    <h5 className='text-slate-400 text-[20px] md:text-2xl lg:text-4xl text-center md:text-start'>
                        Band Equipment Customize
                    </h5>
                </div>
                <div className='flex justify-center items-center gap-8'>
                    <Link href={"/customize"}>
                        <button className='rounded-full bg-slate-500 px-8 py-2 text-white'>
                            Try Customize
                        </button>
                    </Link>
                    <SocialMedias className='hidden absolute right-4 top-1/2 md:flex relative translate-y-0 z-50' />
                </div>
            </div>
            <SocialMedias className='md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex-col z-30' />

            {/* Video Overlay  */}
            <div className='bg-black/20 md:bg-black/20 absolute w-full h-full z-20' />
            {/* MP4 */}
            <video
                className='absolute -bottom-1/2 right-10 translate-x-0 md:left-1/4 md:-bottom-[25%] md:-translate-x-1/2 w-full h-[120vh] object-cover -z-10'
                autoPlay
                muted
                playsInline
                loop
            >
                <source src='/assets/hero.webm' type='video/webm' />
            </video>
            {/* <div className='absolute bottom-0 w-full h-[70px] bg-gradient-to-t from-white to-black opacity-50 -z-20' /> */}
        </section>
    )
}

export default Hero
