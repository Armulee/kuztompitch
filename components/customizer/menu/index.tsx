import { useCustomizeContext } from "../provider"
import { useCallback, useEffect, useState } from "react"
import { Material } from "../provider/types"
import {
    bottomHandleStyle,
    capsuleStyle,
    topHandleStyle,
} from "./styleMaterial"
import Colors from "./colors"
import EditLogo from "./edit-logo"

export type Color = {
    code: string
    name: string
    color: string | string[]
    style: string
} | null

const Menu = () => {
    const {
        part,
        style,
        setCapsule,
        setTopHandle,
        setBottomHandle,
        setDisplayColor,
        setColorName,
        setIsRotating,
        editLogo,
        isIphone,
    } = useCustomizeContext()

    const [color, setColor] = useState<Color>(null)

    // // handle click to set the part
    const handleColor = useCallback(
        (color: string, displayColor: string | string[]) => {
            setIsRotating(false)
            if (part === "Capsule") {
                // if (style === "Solid") {
                //     setCapsule((prev: Material) => ({
                //         ...prev,
                //         color: color,
                //         displayColor: displayColor,
                //         ...capsuleStyle.solid,
                //         style,
                //     }))
                // } else
                if (style === "Glossy") {
                    setCapsule((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...capsuleStyle.glossy,
                        style,
                    }))
                } else if (style === "Matte") {
                    setCapsule((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...capsuleStyle.matte,
                        style,
                    }))
                }
            } else if (part === "Top Handle") {
                // if (style === "Solid") {
                //     setTopHandle((prev: Material) => ({
                //         ...prev,
                //         color: color,
                //         displayColor: displayColor,
                //         ...topHandleStyle.solid,
                //         style,
                //     }))
                // } else
                if (style === "Glossy") {
                    setTopHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...topHandleStyle.glossy,
                        style,
                    }))
                } else if (style === "Matte") {
                    setTopHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...topHandleStyle.matte,
                        style,
                    }))
                }
            } else if (part === "Bottom Handle") {
                // if (style === "Solid") {
                //     setBottomHandle((prev: Material) => ({
                //         ...prev,
                //         color: color,
                //         displayColor: displayColor,
                //         ...bottomHandleStyle.solid,
                //         style,
                //     }))
                // } else
                if (style === "Glossy") {
                    setBottomHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...bottomHandleStyle.glossy,
                        style,
                    }))
                } else if (style === "Matte") {
                    setBottomHandle((prev: Material) => ({
                        ...prev,
                        color: color,
                        displayColor: displayColor,
                        ...bottomHandleStyle.matte,
                        style,
                    }))
                }
            }
        },
        [part, style, setCapsule, setTopHandle, setBottomHandle, setIsRotating]
    )

    // // when click the color
    useEffect(() => {
        if (color) {
            handleColor(color.code, color.color)
            // setColorName(color.name)
            if (part === "Capsule") {
                setCapsule((prev) => ({ ...prev, colorName: color.name }))
            } else if (part === "Top Handle") {
                setTopHandle((prev) => ({ ...prev, colorName: color.name }))
            } else if (part === "Bottom Handle") {
                setBottomHandle((prev) => ({ ...prev, colorName: color.name }))
            }
            setDisplayColor(color.color)
        }

        return () => setColor(null)
    }, [
        color,
        part,
        setCapsule,
        setTopHandle,
        setBottomHandle,
        setColorName,
        setDisplayColor,
        handleColor,
    ])

    return (
        <div className={`h-full bg-black relative`}>
            <div className={`${isIphone ? "py-4 px-2" : "p-4"} h-full`}>
                {!editLogo ? <Colors setColor={setColor} /> : <EditLogo />}
            </div>
        </div>
    )
}

export default Menu
