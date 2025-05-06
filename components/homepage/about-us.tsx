// import aboutUs from "../../public/assets/about-us.png"
import dummy from "../../public/assets/dummy-profile-pic.jpg"
import ParallaxContent from "./parallax-content"

const AboutUs = () => {
    // Use the scroll position

    return (
        <section id='about-us' className='flex flex-col md:flex-row shrink-0'>
            <div className='w-full'>
                <div className='flex flex-col justify-center items-start'>
                    <div className='w-full h-screen relative'>
                        <ParallaxContent
                            imgUrl={dummy}
                            heading='Through Luxury Customization.'
                            subheading='We redefine the essence of band equipment'
                        />
                    </div>
                    <div className='container'>
                        <p className='text-white mb-4'>
                            For us KUZTOM PITCH, our passion lies in
                            transforming standard gear into powerful statements
                            that resonate with your unique style.
                        </p>
                        <p className='text-slate-400'>
                            With a keen eye for innovation and detail, we
                            specialize in crafting bespoke microphones and band
                            equipment that not only perform exceptionally but
                            also exude elegance and individuality. Our
                            commitment to quality and artistry ensures that
                            every piece we customize amplifies your presence,
                            both on and off the stage.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
