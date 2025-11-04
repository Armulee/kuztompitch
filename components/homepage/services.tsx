"use client"
import { FaFileSignature, FaLightbulb, FaHeadphonesAlt } from "react-icons/fa"
import { motion } from "framer-motion"

const Services = () => {
    const className = "w-12 h-12 mb-6 text-white"
    const services = [
        [
            {
                key: "tailored-planning",
                icon: <FaFileSignature className={className} />,
                topic: "Tailored Planning",
                content:
                    "We take the time to understand your needs, ensuring that every piece of equipment is perfectly matched to your style and sound. Our thoughtful planning process guarantees that you get the most out of your gear.",
            },
            {
                key: "creative-designing",
                icon: <FaLightbulb className={className} />,
                topic: "Creative Designing",
                content:
                    "Our design process is driven by a passion for individuality. We don't just customize; we capture the essence of who you are, crafting designs that express your personality and set your band apart on any stage.",
            },
        ],
        [
            {
                key: "comprehensive-service",
                icon: <FaHeadphonesAlt className={className} />,
                topic: "Comprehensive Service",
                content:
                    "From the initial concept to the final delivery, we manage every aspect of the customization process. Our 1-stop service is designed to make your experience smooth and effortless, leaving you with a product that's as exceptional as your music.",
            },
            {
                key: "extensive-experience",
                icon: <FaHeadphonesAlt className={className} />,
                topic: "Extensive Experience",
                content:
                    "With over 5 years in the band equipment customization industry, we bring a wealth of knowledge and expertise to every project. Our experience ensures high-quality results and a refined approach to meeting your unique needs.",
            },
        ],
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    }

    return (
        <section id='services' className='relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden'>
            {/* Background Decoration */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl' />
                <div className='absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl' />
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
                            Our Services
                        </span>
                    </h2>
                    <p className='text-lg md:text-xl text-slate-400 max-w-2xl mx-auto'>
                        Comprehensive solutions for your band equipment customization needs
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, margin: "-100px" }}
                    className='flex flex-col md:flex-row gap-6 lg:gap-8 justify-center items-stretch'
                >
                    {services.map((serviceGroup, groupIndex) => {
                        return (
                            <div
                                className='flex flex-col gap-6 lg:gap-8 flex-1'
                                key={`services-group-${groupIndex + 1}`}
                            >
                                {serviceGroup.map((service, index) => (
                                    <motion.div
                                        key={service.key}
                                        variants={itemVariants}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className='group relative h-full'
                                    >
                                        <div className='relative h-full bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden'>
                                            {/* Hover Gradient Overlay */}
                                            <div className='absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300' />
                                            
                                            {/* Content */}
                                            <div className='relative z-10'>
                                                {/* Icon Container */}
                                                <div className='mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300'>
                                                    <div className='text-purple-300 group-hover:text-pink-300 transition-colors duration-300'>
                                                        {service.icon}
                                                    </div>
                                                </div>

                                                <h3 className='font-bold text-2xl md:text-3xl mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300'>
                                                    {service.topic}
                                                </h3>
                                                <p className='text-slate-300 leading-relaxed text-base md:text-lg'>
                                                    {service.content}
                                                </p>
                                            </div>

                                            {/* Decorative Corner */}
                                            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

export default Services
