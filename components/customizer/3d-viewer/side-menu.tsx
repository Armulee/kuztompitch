import CapsuleIconBlack from "../../../public/assets/capsule-icon-black.png"
import TopHandleIconBlack from "../../../public/assets/top-handle-icon-black.png"
import BottomHandleIconBlack from "../../../public/assets/bottom-handle-icon-black.png"

import CapsuleIconWhite from "../../../public/assets/capsule-icon-white.png"
import TopHandleIconWhite from "../../../public/assets/top-handle-icon-white.png"
import BottomHandleIconWhite from "../../../public/assets/bottom-handle-icon-white.png"

import Image from "next/image"
import { useCustomizeContext } from "../provider"
import { IoIosHelpCircle } from "react-icons/io"

const SideMenu = () => {
    const { part, setPart, setFocusedPart, setFocusStartTime, setTour } =
        useCustomizeContext()
    const handleClick = (e: React.MouseEvent<HTMLDivElement>, part: string) => {
        e.stopPropagation()
        setPart(part)
        setFocusedPart(part)
        setFocusStartTime(performance.now())
    }
    return (
        <>
            <div id='side-menu' className='absolute top-0 right-4 z-10'>
                <div
                    onClick={(e) => handleClick(e, "Capsule")}
                    className={`rounded px-4 py-2 ${
                        part === "Capsule" ? "bg-black" : "bg-transparent"
                    } text-center my-2`}
                >
                    <Image
                        className='w-[20px]'
                        alt=''
                        src={
                            part === "Capsule"
                                ? CapsuleIconWhite
                                : CapsuleIconBlack
                        }
                    />
                </div>
                <div
                    onClick={(e) => handleClick(e, "Top Handle")}
                    className={`rounded px-4 py-2 ${
                        part === "Top Handle" ? "bg-black" : "bg-transparent"
                    } text-center my-2`}
                >
                    <Image
                        className='w-[20px]'
                        alt=''
                        src={
                            part === "Top Handle"
                                ? TopHandleIconWhite
                                : TopHandleIconBlack
                        }
                    />
                </div>
                <div
                    onClick={(e) => handleClick(e, "Bottom Handle")}
                    className={`rounded px-4 py-2 ${
                        part === "Bottom Handle" ? "bg-black" : "bg-transparent"
                    } text-center my-2`}
                >
                    <Image
                        className='w-[20px]'
                        alt=''
                        src={
                            part === "Bottom Handle"
                                ? BottomHandleIconWhite
                                : BottomHandleIconBlack
                        }
                    />
                </div>
            </div>

            <IoIosHelpCircle
                onClick={() => setTour(true)}
                className='w-10 h-10 text-black absolute -bottom-5 right-4 z-30'
            />
        </>
    )
}

export default SideMenu
