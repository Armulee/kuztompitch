"use client"
import { useEffect, useState } from "react"
import Header from "./header"
import Menu from "./menu"
import Hero from "./hero"
import AboutUs from "./about-us"
import Services from "./services"
import OurProject from "./our-projects"
import OurCustomers from "./our-customers"
import ContactUs from "./contact-us"
// import { Swiper, SwiperSlide } from "swiper/react"
// import { Mousewheel } from "swiper/modules"

export type Navs = {
    name: string
    href: string
    key: string
}[]

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
    }, [])

    const navs: { name: string; href: string; key: string }[] = [
        { name: "Home", href: "/", key: "home" },
        { name: "About us", href: "#about", key: "about-us" },
        { name: "Services", href: "#services", key: "about-us" },
        { name: "Our Project", href: "#our-projects", key: "our-projects" },
        { name: "Contact Us", href: "#contact-us", key: "contact-us" },
    ]

    const [menu, setMenu] = useState<boolean>(false)
    useEffect(() => {
        if (menu) {
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.body.removeAttribute("style")
        }
    }, [menu])

    // set page when clicked
    // const [page, setPage] = useState<number>(0)
    return (
        <main className='overflow-x-hidden relative'>
            <Menu navs={navs} menu={menu} />
            <Header navs={navs} menu={menu} setMenu={setMenu} />
            <Hero />
            <AboutUs />
            <Services />
            <OurProject />
            <OurCustomers />
            <ContactUs />
        </main>
    )
}

export default HomePage
