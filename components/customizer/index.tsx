"use client"

import { createContext, useEffect } from "react"
import { useCustomizeContext } from "./provider"
import ThreeDimensionViewer from "./3d-viewer"
import Menu from "./menu"
import { usePathname } from "next/navigation"
import Tutorial from "./tutorial"

export const CustomizeContext = createContext(null)

const Customizer = () => {
    const pathname = usePathname()
    useEffect(() => {
        if (pathname === "/customize") {
            document.body.style.background = "#efefef"
        }
        return () => document.body.removeAttribute("style")
    }, [pathname])

    const { isIphone } = useCustomizeContext()

    return (
        <div className='w-full h-[100vh] overflow-hidden z-0 relative'>
            <section
                className={`w-[100vw] ${
                    isIphone ? "h-[55vh]" : "h-[67vh]"
                } relative`}
            >
                <ThreeDimensionViewer />
            </section>

            <section
                className={`w-full ${
                    isIphone ? "h-[33vh]" : "h-[33vh]"
                } overflow-hidden relative`}
            >
                <Menu />
            </section>
            <Tutorial />
        </div>
    )
}

export default Customizer
