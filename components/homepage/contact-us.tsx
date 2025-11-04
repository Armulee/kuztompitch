"use client"
import SocialMedias from "./social-medias"
import { motion } from "framer-motion"
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa"

const ContactUs = () => {
    const contactInfo = [
        {
            icon: <FaMapMarkerAlt className='w-6 h-6' />,
            title: "Company Address",
            content: "12 Soi Ngamwongwan 23 Yeak 5, Ngamwongwan Rd. Bang Khen, Nonthaburi, 11000, Thailand",
        },
        {
            icon: <FaEnvelope className='w-6 h-6' />,
            title: "Email",
            content: "kuztompitch@gmail.com",
        },
        {
            icon: <FaPhone className='w-6 h-6' />,
            title: "Phone",
            content: ["+66 6737 7160", "+66 2591 7175"],
        },
    ]

    return (
        <section id='contact-us' className='relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden'>
            {/* Background Decoration */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl' />
                <div className='absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl' />
            </div>

            <div className='container relative z-10'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-16'
                >
                    <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
                        <span className='bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent'>
                            Contact Us
                        </span>
                    </h2>
                    <p className='text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8'>
                        Get in touch with us for your customization needs
                    </p>
                    <div className='flex justify-center'>
                        <SocialMedias className='gap-6' />
                    </div>
                </motion.div>

                <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch'>
                    {/* Map Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className='flex-1'
                    >
                        <div className='relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm'>
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.6092008357323!2d100.53445239999999!3d13.8624812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ca8dab97f63%3A0x95fb63bb1fb19d82!2sKuztom%20Pitch!5e0!3m2!1sen!2sth!4v1730739960363!5m2!1sen!2sth'
                                className='h-[400px] md:h-[500px] w-full'
                                loading='lazy'
                                allowFullScreen
                            />
                            <div className='absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20' />
                        </div>
                    </motion.div>

                    {/* Contact Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className='flex-1 flex flex-col justify-center'
                    >
                        <div className='bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl'>
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className='mb-8 last:mb-0 group'
                                >
                                    <div className='flex items-start gap-4'>
                                        <div className='flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300'>
                                            {info.icon}
                                        </div>
                                        <div className='flex-1'>
                                            <h3 className='font-bold text-xl md:text-2xl mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300'>
                                                {info.title}
                                            </h3>
                                            {Array.isArray(info.content) ? (
                                                <div className='space-y-1'>
                                                    {info.content.map((item, i) => (
                                                        <p key={i} className='text-slate-300 text-base md:text-lg'>
                                                            {item}
                                                        </p>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className='text-slate-300 text-base md:text-lg leading-relaxed'>
                                                    {info.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs
