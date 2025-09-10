import { FaFileSignature, FaLightbulb, FaHeadphonesAlt } from "react-icons/fa"

const Services = () => {
    const className = "w-10 h-auto mb-5 text-white"
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
                    "Our design process is driven by a passion for individuality. We don’t just customize; we capture the essence of who you are, crafting designs that express your personality and set your band apart on any stage.",
            },
        ],
        [
            {
                key: "comprehensive-service",
                icon: <FaHeadphonesAlt className={className} />,
                topic: "Comprehensive Service",
                content:
                    "From the initial concept to the final delivery, we manage every aspect of the customization process. Our 1-stop service is designed to make your experience smooth and effortless, leaving you with a product that’s as exceptional as your music.",
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
    return (
        <section id='services' className='container mt-6'>
            <h6 className='text-3xl font-bold mb-6 text-white'>Services</h6>
            <div className='flex flex-col md:flex-row gap-4 justify-center items-center text-sm'>
                {services.map((services, index) => {
                    return (
                        <div
                            className='flex flex-col gap-4'
                            key={`services-${index + 1}`}
                        >
                            {services.map((service) => (
                                <div
                                    key={service.key}
                                    className='flex flex-col justify-center gap-6 items-start bg-gradient-to-tr from-[#5C6A7260] to-[#4E4E4E20] rounded-lg w-full md:h-[400px] lg:h-full p-8'
                                >
                                    <div className='font-bold text-2xl mb-2 text-white'>
                                        {service.topic}
                                    </div>
                                    <p className='text-slate-400'>
                                        {service.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Services
