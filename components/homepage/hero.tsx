import Link from "next/link"
import SocialMedias from "./social-medias"

const Hero = () => {
    return (
        <section
            id='home'
            className='w-full h-[100vh] flex flex-col justify-center items-center relative'
        >
            <div>
                <div className='w-full flex-col justify-center items-center mb-4'>
                    <h1 className='text-[40px] text-center md:text-start'>
                        Kuztom Pitch
                    </h1>
                    <h5 className='text-slate-400 text-[20px] text-center md:text-start'>
                        Band Equipment Customize
                    </h5>
                </div>
                <div className='flex justify-center items-center gap-8'>
                    <Link href={"/customize"}>
                        <button className='rounded-full bg-slate-500 px-8 py-2'>
                            Try Customize
                        </button>
                    </Link>
                    <SocialMedias className='absolute right-4 top-1/2 -translate-y-1/2 flex-col md:relative md:translate-y-0 md:flex-row' />
                </div>
            </div>
            {/* <Image className='absolute' alt='kuztom pitch' src={hero} /> */}
            {/* MP4 */}
            <video
                className='absolute bottom-10 right-4 w-full h-[80dvh] object-cover -z-10'
                autoPlay
                muted
                playsInline
                loop
            >
                {/* <source src='/assets/hero.mp4' type='video/mp4' /> */}
            </video>
            <div className='absolute bottom-0 w-full h-[70px] bg-gradient-to-t from-white to-black opacity-50' />
        </section>
    )
}

export default Hero
