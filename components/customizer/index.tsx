"use client"

import { createContext, useEffect } from "react"
import ThreeDimensionViewer from "./3d-viewer"
import Menu from "./menu"
import { usePathname } from "next/navigation"
import Tutorial from "./tutorial"
import Pricing from "./menu/pricing"
import { useCustomizeContext } from "./provider"
import Display from "./menu/display"

export const CustomizeContext = createContext(null)

const Customizer = () => {
    const pathname = usePathname()
    useEffect(() => {
        if (pathname === "/customize") {
            document.body.style.background = "#efefef"
        }
        return () => document.body.removeAttribute("style")
    }, [pathname])

    const { checkout } = useCustomizeContext()

    return (
        <section
            style={{ overflow: checkout ? "visible" : "hidden" }}
            className='w-full h-[100dvh] z-0 relative'
        >
            <div className={`w-[100vw] h-[52dvh] relative`}>
                <ThreeDimensionViewer />
            </div>

            <div className={`w-full h-[48dvh] overflow-x-hidden relative`}>
                <Display />
                <Menu />
            </div>

            <Pricing />

            <Tutorial />
        </section>
    )
}

export default Customizer
