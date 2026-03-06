"use client"
import { useEffect } from "react"
import Hero from "./hero"
import AboutUs from "./about-us"
import Services from "./services"
// import OurProject from "./our-projects"
// import OurCustomers from "./our-customers"
import ContactUs from "./contact-us"
import News from "./news"

const HomePage = () => {
    useEffect(() => {
        const topHandle = localStorage.getItem("topHandle")
        const capsule = localStorage.getItem("capsule")
        const bottomHandle = localStorage.getItem("bottomHandle")

        if (topHandle) {
            localStorage.removeItem("topHandle")
        }
        if (capsule) {
            localStorage.removeItem("capsule")
        }
        if (bottomHandle) {
            localStorage.removeItem("bottomHandle")
        }

        if (window.location.hash) {
            const id = window.location.hash.slice(1)
            setTimeout(() => {
                const section = document.getElementById(id)
                if (section) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" })
                }
            }, 300)
        }
    }, [])

    return (
        <main className='overflow-x-hidden relative'>
            <Hero />
            <AboutUs />
            <Services />
            {/* <section id='our-projects'> */}
            <News />

            {/* </section> */}
            <ContactUs />
        </main>
    )
}

export default HomePage
