export type CustomizeContextType = {
    part: string
    setPart: React.Dispatch<React.SetStateAction<string>>
    style: string
    setStyle: React.Dispatch<React.SetStateAction<string>>
    capsule: Material
    setCapsule: React.Dispatch<React.SetStateAction<Material>>
    topHandle: Material
    setTopHandle: React.Dispatch<React.SetStateAction<Material>>
    bottomHandle: Material
    setBottomHandle: React.Dispatch<React.SetStateAction<Material>>
    displayStyle: string
    setDisplayStyle: React.Dispatch<React.SetStateAction<string>>
    colorName: string
    setColorName: React.Dispatch<React.SetStateAction<string>>
    displayColor: string | string[]
    setDisplayColor: React.Dispatch<React.SetStateAction<string | string[]>>
    pricing: number | "xx,xxx"
    setPricing: React.Dispatch<React.SetStateAction<number | "xx,xxx">>
    isIphone: boolean
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    tour: boolean
    setTour: React.Dispatch<React.SetStateAction<boolean>>
    isRotating: boolean
    setIsRotating: React.Dispatch<React.SetStateAction<boolean>>
    capturing: boolean
    setCapturing: React.Dispatch<React.SetStateAction<boolean>>
    snapshot: string
    setSnapshot: React.Dispatch<React.SetStateAction<string>>
    checkout: boolean
    setCheckout: React.Dispatch<React.SetStateAction<boolean>>
    logo: string | undefined
    setLogo: React.Dispatch<React.SetStateAction<string | undefined>>
    focusedPart: string | null
    setFocusedPart: React.Dispatch<React.SetStateAction<string | null>>
    focusStartTime: number | null
    setFocusStartTime: React.Dispatch<React.SetStateAction<number | null>>
}

export type Material = {
    color: string
    displayColor: string | string[]
    roughness: number
    metalness: number
    style: string
    colorName: string
    name: string
}
