"use client"

import { useEffect, useMemo, useState } from "react"
import Menu from "./menu"
import Header from "./header"
import { usePathname } from "next/navigation"

export type Nav = {
    name: string
    id: string
}

export default function Navbar() {
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

    const [active, setActive] = useState<string>("")

    const pathname = usePathname()
    if (pathname.includes("/customize")) {
        return
    }

    return (
        <>
            <Menu navs={navs} menu={menu} setMenu={setMenu} active={active} />
            <Header navs={navs} menu={menu} setMenu={setMenu} active={active} />
        </>
    )
}

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
