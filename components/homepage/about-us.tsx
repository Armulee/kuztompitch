"use client"
import aboutUs from "../../public/assets/about-us.jpg"
import ParallaxContent from "./parallax-content"
import { motion } from "framer-motion"

const AboutUs = () => {
    return (
        <section id='about-us' className='relative bg-gradient-to-b from-black via-gray-900 to-black py-20 md:py-32'>
            {/* Background Decoration */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl' />
                <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl' />
            </div>

            <div className='relative z-10'>
                {/* Parallax Image Section */}
                <div className='w-full h-[70vh] relative mb-16 md:mb-24'>
                    <ParallaxContent
                        src={aboutUs}
                        heading='Through Luxury Customization.'
                        subheading='We redefine the essence of band equipment'
                    />
                </div>

                {/* Content Section */}
                <div className='container'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className='max-w-4xl mx-auto'
                    >
                        <div className='bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl'>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h2 className='text-3xl md:text-4xl font-bold mb-6 text-white'>
                                    About Kuztom Pitch
                                </h2>
                                <p className='text-lg md:text-xl text-white/90 mb-6 leading-relaxed'>
                                    For us <span className='font-semibold text-white'>KUZTOM PITCH</span>, our passion lies in
                                    transforming standard gear into powerful statements
                                    that resonate with your unique style.
                                </p>
                                <p className='text-base md:text-lg text-slate-300 leading-relaxed'>
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
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
