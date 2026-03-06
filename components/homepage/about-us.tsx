"use client"

import aboutUs from "../../public/assets/about-us.jpg"
import ParallaxContent from "./parallax-content"
import { motion } from "framer-motion"

const AboutUs = () => {
    return (
        <section id='about-us' className='flex flex-col md:flex-row shrink-0 relative'>
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[150px]' />
            </div>
            <div className='w-full'>
                <div className='flex flex-col justify-center items-start'>
                    <div className='w-full h-[70vh] relative'>
                        <ParallaxContent
                            src={aboutUs}
                            heading='Through Luxury Customization.'
                            subheading='We redefine the essence of band equipment'
                        />
                    </div>
                    <motion.div
                        className='container py-12'
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <span className='inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-white/5 border border-white/10 text-accent-purple mb-6'>
                            About Us
                        </span>
                        <p className='text-white text-lg md:text-xl mb-5 leading-relaxed max-w-3xl'>
                            For us KUZTOM PITCH, our passion lies in
                            transforming standard gear into powerful statements
                            that resonate with your unique style.
                        </p>
                        <p className='text-zinc-400 leading-relaxed max-w-3xl'>
                            With a keen eye for innovation and detail, we
                            specialize in crafting bespoke microphones and band
                            equipment that not only perform exceptionally but
                            also exude elegance and individuality. Our
                            commitment to quality and artistry ensures that
                            every piece we customize amplifies your presence,
                            both on and off the stage.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
