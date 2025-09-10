import SocialMedias from "./social-medias"

const ContactUs = () => {
    return (
        <section id='contact-us' className='container'>
            <h6 className='font-bold text-3xl mt-4 mb-5 text-center text-white'>
                Contact Us
            </h6>
            <div className='w-full flex justify-center mb-10'>
                <SocialMedias />
            </div>
            <div className='flex flex-col md:flex-row gap-8'>
                <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.6092008357323!2d100.53445239999999!3d13.8624812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ca8dab97f63%3A0x95fb63bb1fb19d82!2sKuztom%20Pitch!5e0!3m2!1sen!2sth!4v1730739960363!5m2!1sen!2sth'
                    className='h-[400px] w-full rounded-lg mb-4'
                    loading='lazy'
                />
                <div className='flex flex-col justify-center items-center max-w-[786px] md:text-start text-center'>
                    <div className='w-full'>
                        <span className='font-bold text-3xl mb-3 text-white'>
                            Company Address
                        </span>
                        <div className='mb-4 text-slate-400'>
                            12 Soi Ngamwongwan 23 Yeak 5, Ngamwongwan Rd. Bang
                            Khen, Nonthaburi, 11000, Thailand
                        </div>
                    </div>
                    <div className='w-full'>
                        <span className='font-bold text-3xl mb-3 text-white'>
                            Email
                        </span>
                        <div className='mb-4 text-slate-400'>
                            <div>kuztompitch@gmail.com</div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <span className='font-bold text-3xl mb-3 text-white'>
                            Phone
                        </span>
                        <div className='mb-4 text-slate-400'>
                            <div>+66 6737 7160</div>
                            <div>+66 2591 7175</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs
