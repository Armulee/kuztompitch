import { useEffect, useState } from "react"
import { Material } from "./types"
import { useMediaQuery } from "react-responsive"

const useProviderSetup = () => {
    const [part, setPart] = useState<string>("Capsule")
    const [displayStyle, setDisplayStyle] = useState<string>("Solid")
    const [colorName, setColorName] = useState("Default")
    const [displayColor, setDisplayColor] = useState<string | string[]>(
        "#9a9a9a"
    )
    const [style, setStyle] = useState<string>("Solid")
    const [capsule, setCapsule] = useState<Material>({
        color: "#9a9a9a",
        displayColor: "#9a9a9a",
        roughness: 0.277,
        metalness: 1,
        style: "Solid",
        colorName: "Default",
        name: "Capsule",
    })
    const [topHandle, setTopHandle] = useState<Material>({
        color: "#2d2c2f",
        displayColor: "#2d2c2f",
        roughness: 0.277,
        metalness: 0.7,
        style: "Solid",
        colorName: "Default",
        name: "Top Handle",
    })
    const [bottomHandle, setBottomHandle] = useState<Material>({
        color: "#2d2c2f",
        displayColor: "#2d2c2f",
        roughness: 0.277,
        metalness: 0.7,
        style: "Solid",
        colorName: "Default",
        name: "Bottom Handle",
    })

    const [pricing, setPricing] = useState<number | "xx,xxx">("xx,xxx")
    const [loading, setLoading] = useState<boolean>(true)
    const [tour, setTour] = useState<boolean>(true)
    const [isRotating, setIsRotating] = useState(true)

    // Change display style when we change the style
    useEffect(() => {
        if (part === "Capsule") {
            setDisplayStyle(capsule.style)
            setColorName(capsule.colorName)
            setDisplayColor(capsule.displayColor)
        } else if (part === "Top Handle") {
            setDisplayStyle(topHandle.style)
            setColorName(topHandle.colorName)
            setDisplayColor(topHandle.displayColor)
        } else if (part === "Bottom Handle") {
            setDisplayStyle(bottomHandle.style)
            setColorName(bottomHandle.colorName)
            setDisplayColor(bottomHandle.displayColor)
        }
    }, [part, capsule, topHandle, bottomHandle])

    // Detect Iphone device
    const isIphone = useMediaQuery({ minWidth: 768 })

    // Store the capsule, top handle, bottom handle when user refresh
    useEffect(() => {
        if (capsule.colorName !== "Default") {
            window.localStorage.setItem("capsule", JSON.stringify(capsule))
        }
        if (topHandle.colorName !== "Default") {
            window.localStorage.setItem("topHandle", JSON.stringify(topHandle))
        }
        if (bottomHandle.colorName !== "Default") {
            window.localStorage.setItem(
                "bottomHandle",
                JSON.stringify(bottomHandle)
            )
        }
    }, [capsule, topHandle, bottomHandle])

    // Set the local storage to the states
    useEffect(() => {
        const localCapsule = window.localStorage.getItem("capsule")
        const localTopHandle = window.localStorage.getItem("topHandle")
        const localBottomHandle = window.localStorage.getItem("bottomHandle")
        const hasGuided = window.localStorage.getItem("tour")

        if (localCapsule) {
            setCapsule(JSON.parse(localCapsule))
        }
        if (localTopHandle) {
            setTopHandle(JSON.parse(localTopHandle))
        }
        if (localBottomHandle) {
            setBottomHandle(JSON.parse(localBottomHandle))
        }

        if (hasGuided) {
            setTour(false)
        }

        setLoading(false)
    }, [])

    // Check user has already guided or not
    useEffect(() => {
        const hasGuided = window.localStorage.getItem("tour")
        if (!tour && !hasGuided) {
            window.localStorage.setItem("tour", "true")
        }
    }, [tour])

    const value = {
        part,
        setPart,
        style,
        setStyle,
        capsule,
        setCapsule,
        displayStyle,
        setDisplayStyle,
        colorName,
        setColorName,
        displayColor,
        setDisplayColor,
        topHandle,
        setTopHandle,
        bottomHandle,
        setBottomHandle,
        pricing,
        setPricing,
        isIphone,
        loading,
        setLoading,
        tour,
        setTour,
        isRotating,
        setIsRotating,
    }

    return value
}

export default useProviderSetup
