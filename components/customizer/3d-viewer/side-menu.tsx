import CapsuleIconWhite from "../../../public/assets/capsule-icon-white.png"
import TopHandleIconWhite from "../../../public/assets/top-handle-icon-white.png"
import BottomHandleIconWhite from "../../../public/assets/bottom-handle-icon-white.png"

import Image from "next/image"
import { useCustomizeContext } from "../provider"
import { IoIosHelpCircle } from "react-icons/io"

const parts = [
    { name: "Capsule", icon: CapsuleIconWhite, short: "Cap" },
    { name: "Top Handle", icon: TopHandleIconWhite, short: "Top" },
    { name: "Bottom Handle", icon: BottomHandleIconWhite, short: "Bot" },
]

const SideMenu = () => {
    const { part, setPart, setFocusedPart, setFocusStartTime, setTour } =
        useCustomizeContext()
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, partName: string) => {
        e.stopPropagation()
        setPart(partName)
        setFocusedPart(partName)
        setFocusStartTime(performance.now())
    }
    return (
        <>
            <div id='side-menu' className='absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex flex-col gap-1 sm:gap-1.5'>
                {parts.map((p) => (
                    <button
                        key={p.name}
                        onClick={(e) => handleClick(e, p.name)}
                        className={`flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 cursor-pointer transition-all duration-300 ${
                            part === p.name
                                ? "bg-white/15 border border-accent-purple/50 shadow-[0_0_12px_rgba(139,92,246,0.25)]"
                                : "bg-black/30 backdrop-blur-sm border border-white/[0.08] hover:bg-white/10 hover:border-white/15"
                        }`}
                    >
                        <Image
                            className='w-[14px] sm:w-[18px] h-auto'
                            alt={p.name}
                            src={p.icon}
                        />
                        <span className={`hidden sm:inline text-[10px] font-medium tracking-wide ${
                            part === p.name ? "text-white" : "text-white/50"
                        }`}>
                            {p.short}
                        </span>
                    </button>
                ))}
            </div>

            <button
                onClick={() => setTour(true)}
                className='absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/[0.08] flex items-center justify-center hover:bg-white/10 hover:border-white/15 transition-all'
            >
                <IoIosHelpCircle className='w-4 h-4 sm:w-5 sm:h-5 text-white/40 hover:text-white/70 transition-colors' />
            </button>
        </>
    )
}

export default SideMenu
