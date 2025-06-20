"use client"
import { useEffect, useMemo, useState } from "react"
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

export type Nav = {
    name: string
    id: string
}

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

    const navs: Nav[] = useMemo(
        () => [
            { name: "About us", id: "about-us" },
            { name: "Services", id: "services" },
            { name: "Our Project", id: "our-projects" },
            { name: "Contact Us", id: "contact-us" },
        ],
        []
    )

    const [menu, setMenu] = useState<boolean>(false)
    useEffect(() => {
        if (menu) {
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.body.removeAttribute("style")
        }
    }, [menu])

    const [active, setActive] = useState<string>("")

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const pageHeight = document.body.scrollHeight
            const windowHeight = window.innerHeight
            let current = ""

            navs.forEach((nav) => {
                const section = document.getElementById(nav.id)
                if (section) {
                    const offsetTop = section.offsetTop
                    const offsetHeight = section.offsetHeight

                    if (
                        scrollY >= offsetTop - 100 &&
                        scrollY < offsetTop + offsetHeight - 100
                    ) {
                        current = nav.id
                    }
                }
            })

            // 🔽 Near bottom? Force active to "contact-us"
            if (windowHeight + scrollY >= pageHeight - 150) {
                const contactNav = navs.find((n) => n.id.includes("contact"))
                if (contactNav) {
                    current = contactNav.id
                }
            }

            setActive(current)
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // run on mount

        return () => window.removeEventListener("scroll", handleScroll)
    }, [navs])
    return (
        <main className='overflow-x-hidden relative'>
            <Menu navs={navs} menu={menu} setMenu={setMenu} active={active} />
            <Header navs={navs} menu={menu} setMenu={setMenu} active={active} />
            <Hero />
            <AboutUs />
            <Services />
            <section id='our-projects'>
                <OurProject />
                <OurCustomers />
            </section>
            <ContactUs />
        </main>
    )
}

export default HomePage

export const smoothScrollTo = (id: string) => {
    function smoothScroll(targetY: number, duration: number = 500) {
        const startY = window.scrollY
        const startTime = performance.now()

        function scroll(currentTime: number) {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeInOutQuad =
                progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress

            window.scrollTo(0, startY + (targetY - startY) * easeInOutQuad)

            if (elapsed < duration) {
                requestAnimationFrame(scroll)
            }
        }

        requestAnimationFrame(scroll)
    }

    const section = document.getElementById(id)
    if (section) {
        smoothScroll(section.offsetTop - 80) // slower, smooth scroll
    }
}
