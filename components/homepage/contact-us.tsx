"use client"

import SocialMedias from "./social-medias"
import { motion } from "framer-motion"
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa"
import Image from "next/image"
import whiteLogo from "../../public/assets/white-logo.png"

const ContactUs = () => {
    return (
        <section id='contact-us' className='relative py-20'>
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-[150px]' />
            </div>

            <div className='container'>
                <motion.div
                    className='text-center md:text-left mb-12'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className='inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-white/5 border border-white/10 text-accent-cyan mb-4'>
                        Get In Touch
                    </span>
                    <h6 className='font-bold text-4xl mb-6 gradient-text font-display'>
                        Contact Us
                    </h6>
                    <SocialMedias className='justify-center md:justify-start' />
                </motion.div>

                <div className='flex flex-col lg:flex-row gap-8'>
                    <motion.div
                        className='flex-1 rounded-2xl overflow-hidden border border-white/[0.06]'
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.6092008357323!2d100.53445239999999!3d13.8624812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ca8dab97f63%3A0x95fb63bb1fb19d82!2sKuztom%20Pitch!5e0!3m2!1sen!2sth!4v1730739960363!5m2!1sen!2sth'
                            className='h-[400px] w-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500'
                            loading='lazy'
                        />
                    </motion.div>

                    <motion.div
                        className='flex flex-col gap-5 flex-1 text-left'
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className='p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors'>
                            <div className='flex items-start gap-4'>
                                <div className='w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0'>
                                    <FaMapMarkerAlt className='text-white w-4 h-4' />
                                </div>
                                <div>
                                    <span className='font-bold text-lg text-white block mb-1'>
                                        Company Address
                                    </span>
                                    <div className='text-zinc-400 text-sm leading-relaxed'>
                                        12 Soi Ngamwongwan 23 Yeak 5,
                                        Ngamwongwan Rd. Bang Khen, Nonthaburi,
                                        11000, Thailand
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors'>
                            <div className='flex items-start gap-4'>
                                <div className='w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0'>
                                    <FaEnvelope className='text-white w-4 h-4' />
                                </div>
                                <div>
                                    <span className='font-bold text-lg text-white block mb-1'>
                                        Email
                                    </span>
                                    <div className='text-zinc-400 text-sm'>
                                        kuztompitch@gmail.com
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors'>
                            <div className='flex items-start gap-4'>
                                <div className='w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0'>
                                    <FaPhone className='text-white w-4 h-4' />
                                </div>
                                <div>
                                    <span className='font-bold text-lg text-white block mb-1'>
                                        Phone
                                    </span>
                                    <div className='text-zinc-400 text-sm space-y-0.5'>
                                        <div>+66 6737 7160</div>
                                        <div>+66 2591 7175</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <div className='container mt-20 pt-8 border-t border-white/[0.06]'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    <div className='flex items-center gap-3'>
                        <Image
                            className='w-auto h-[30px] opacity-60'
                            src={whiteLogo}
                            alt='Kuztompitch'
                        />
                        <span className='text-zinc-500 text-sm'>
                            &copy; {new Date().getFullYear()} Kuztom Pitch. All
                            rights reserved.
                        </span>
                    </div>
                    <SocialMedias />
                </div>
            </div>
        </section>
    )
}

export default ContactUs
