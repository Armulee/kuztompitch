import CapsuleIconBlack from "../../../public/assets/capsule-icon-black.png"
import TopHandleIconBlack from "../../../public/assets/top-handle-icon-black.png"
import BottomHandleIconBlack from "../../../public/assets/bottom-handle-icon-black.png"

import CapsuleIconWhite from "../../../public/assets/capsule-icon-white.png"
import TopHandleIconWhite from "../../../public/assets/top-handle-icon-white.png"
import BottomHandleIconWhite from "../../../public/assets/bottom-handle-icon-white.png"

import Image from "next/image"
import { useCustomizeContext } from "../provider"

const SideMenu = () => {
    const { part, setPart } = useCustomizeContext()
    return (
        <>
            <div id='side-menu' className='absolute top-0 right-4 z-10'>
                <div
                    onClick={() => setPart("Capsule")}
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
                    onClick={() => setPart("Top Handle")}
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
                    onClick={() => setPart("Bottom Handle")}
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
        </>
    )
}

export default SideMenu
