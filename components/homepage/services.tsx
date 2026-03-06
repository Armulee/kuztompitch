"use client"

import { FaFileSignature, FaLightbulb, FaHeadphonesAlt } from "react-icons/fa"
import { motion } from "framer-motion"

const Services = () => {
    const services = [
        [
            {
                key: "tailored-planning",
                icon: <FaFileSignature />,
                topic: "Tailored Planning",
                content:
                    "We take the time to understand your needs, ensuring that every piece of equipment is perfectly matched to your style and sound. Our thoughtful planning process guarantees that you get the most out of your gear.",
            },
            {
                key: "creative-designing",
                icon: <FaLightbulb />,
                topic: "Creative Designing",
                content:
                    "Our design process is driven by a passion for individuality. We don't just customize; we capture the essence of who you are, crafting designs that express your personality and set your band apart on any stage.",
            },
        ],
        [
            {
                key: "comprehensive-service",
                icon: <FaHeadphonesAlt />,
                topic: "Comprehensive Service",
                content:
                    "From the initial concept to the final delivery, we manage every aspect of the customization process. Our 1-stop service is designed to make your experience smooth and effortless, leaving you with a product that's as exceptional as your music.",
            },
            {
                key: "extensive-experience",
                icon: <FaHeadphonesAlt />,
                topic: "Extensive Experience",
                content:
                    "With over 5 years in the band equipment customization industry, we bring a wealth of knowledge and expertise to every project. Our experience ensures high-quality results and a refined approach to meeting your unique needs.",
            },
        ],
    ]

    return (
        <section id='services' className='container py-20 relative'>
            <div className='absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none' />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
            >
                <span className='inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-white/5 border border-white/10 text-accent-cyan mb-4'>
                    What We Do
                </span>
                <h6 className='text-4xl font-bold mb-10 gradient-text font-display'>
                    Services
                </h6>
            </motion.div>

            <div className='flex flex-col md:flex-row gap-5 justify-center items-stretch text-sm'>
                {services.map((group, groupIndex) => (
                    <div
                        className='flex flex-col gap-5 flex-1'
                        key={`services-${groupIndex + 1}`}
                    >
                        {group.map((service, serviceIndex) => (
                            <motion.div
                                key={service.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.5,
                                    delay:
                                        (groupIndex * 2 + serviceIndex) * 0.1,
                                }}
                                className='group flex flex-col justify-start gap-5 items-start rounded-2xl w-full p-8 bg-white/[0.03] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-500 h-full'
                            >
                                <div className='w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center text-white text-xl group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-shadow duration-500'>
                                    {service.icon}
                                </div>
                                <div className='font-bold text-xl text-white'>
                                    {service.topic}
                                </div>
                                <p className='text-zinc-400 leading-relaxed'>
                                    {service.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services
