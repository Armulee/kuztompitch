import { useEffect, useState } from "react"
import { Material } from "./types"
import { useMediaQuery } from "react-responsive"

const useProviderSetup = () => {
    const [part, setPart] = useState<string>("Capsule")
    // focus part when click
    const [focusedPart, setFocusedPart] = useState<string | null>(null)
    const [focusStartTime, setFocusStartTime] = useState<number | null>(null)

    const [displayStyle, setDisplayStyle] = useState<string>("Glossy")
    const [colorName, setColorName] = useState("Default")
    const [displayColor, setDisplayColor] = useState<string | string[]>(
        "#9a9a9a"
    )
    const [style, setStyle] = useState<string>("Glossy")
    const [capsule, setCapsule] = useState<Material>({
        color: "#9a9a9a",
        displayColor: "#9a9a9a",
        // roughness: 0.277,
        // metalness: 1,
        roughness: 0,
        metalness: 1,
        style: "Glossy",
        colorName: "Default",
        name: "Capsule",
    })
    const [topHandle, setTopHandle] = useState<Material>({
        color: "#1b1c1c",
        displayColor: "#2d2c2f",
        // roughness: 0.277,
        // metalness: 0.7,
        roughness: 0,
        metalness: 0,
        style: "Glossy",
        colorName: "Default",
        name: "Top Handle",
    })
    const [bottomHandle, setBottomHandle] = useState<Material>({
        color: "#1b1c1c",
        displayColor: "#2d2c2f",
        // roughness: 0.277,
        // metalness: 0.7,
        roughness: 0,
        metalness: 0,
        style: "Glossy",
        colorName: "Default",
        name: "Bottom Handle",
    })

    const [model, setModel] = useState<string>("SM58")
    const [pricing, setPricing] = useState<number>(9900)
    // Change pricing when model change
    useEffect(() => {
        if (model === "SM58") {
            setPricing(9900)
        } else if (model === "BETA58") {
            setPricing(11900)
        } else if (model === "KSM8") {
            setPricing(20900)
        } else if (model === "NXN8") {
            setPricing(18900)
        }
    }, [model])

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
    const isIphone = useMediaQuery({ query: "(max-width: 768px)" })

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

    const [logos, setLogos] = useState<{
        id: string
        fileName: string
        position: number[]
        image: string
        aspect: number
        scale: number
        flipHorizontal: boolean
        flipVertical: boolean
    }[]>([])
    const [selectedLogoId, setSelectedLogoId] = useState<string | null>(null)

    // Helper functions for logo management
    const addLogo = (logoData: Omit<{
        id: string
        fileName: string
        position: number[]
        image: string
        aspect: number
        scale: number
        flipHorizontal: boolean
        flipVertical: boolean
    }, 'id'>) => {
        const newId = Date.now().toString()
        const newLogo = { ...logoData, id: newId }
        setLogos(prev => [...prev, newLogo])
        setSelectedLogoId(newId)
    }

    const updateLogo = (id: string, updates: Partial<{
        fileName: string
        position: number[]
        image: string
        aspect: number
        scale: number
        flipHorizontal: boolean
        flipVertical: boolean
    }>) => {
        setLogos(prev => prev.map(logo => 
            logo.id === id ? { ...logo, ...updates } : logo
        ))
    }

    const deleteLogo = (id: string) => {
        setLogos(prev => prev.filter(logo => logo.id !== id))
        if (selectedLogoId === id) {
            setSelectedLogoId(null)
        }
    }
    const [editLogo, setEditLogo] = useState<boolean>(false)
    const [bgOffsetY, setBgOffsetY] = useState<number>(-260)
    const [capturing, setCapturing] = useState<boolean>(false)
    const [snapshot, setSnapshot] = useState<string>("")
    const [checkout, setCheckout] = useState<boolean>(false)

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
        capturing,
        setCapturing,
        snapshot,
        setSnapshot,
        checkout,
        setCheckout,
        logos,
        setLogos,
        selectedLogoId,
        setSelectedLogoId,
        addLogo,
        updateLogo,
        deleteLogo,
        editLogo,
        setEditLogo,
        focusedPart,
        setFocusedPart,
        focusStartTime,
        setFocusStartTime,
        bgOffsetY,
        setBgOffsetY,
        model,
        setModel,
    }

    return value
}

export default useProviderSetup
