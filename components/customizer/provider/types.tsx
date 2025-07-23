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
    pricing: number
    setPricing: React.Dispatch<React.SetStateAction<number>>
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
    logos: {
        id: string
        fileName: string
        position: number[]
        image: string
        cloneImage?: string
        aspect: number
        scale: number
        flipHorizontal: boolean
        flipVertical: boolean
    }[]
    setLogos: React.Dispatch<
        React.SetStateAction<{
            id: string
            fileName: string
            position: number[]
            image: string
            cloneImage?: string
            aspect: number
            scale: number
            flipHorizontal: boolean
            flipVertical: boolean
        }[]>
    >
    selectedLogoId: string | null
    setSelectedLogoId: React.Dispatch<React.SetStateAction<string | null>>
    addLogo: (logo: Omit<{
        id: string
        fileName: string
        position: number[]
        image: string
        cloneImage?: string
        aspect: number
        scale: number
        flipHorizontal: boolean
        flipVertical: boolean
    }, 'id'>) => void
    updateLogo: (id: string, updates: Partial<{
        fileName: string
        position: number[]
        image: string
        cloneImage?: string
        aspect: number
        scale: number
        flipHorizontal: boolean
        flipVertical: boolean
    }>) => void
    deleteLogo: (id: string) => void
    bgOffsetY: number
    setBgOffsetY: React.Dispatch<React.SetStateAction<number>>
    focusedPart: string | null
    setFocusedPart: React.Dispatch<React.SetStateAction<string | null>>
    focusStartTime: number | null
    setFocusStartTime: React.Dispatch<React.SetStateAction<number | null>>
    editLogo: boolean
    setEditLogo: React.Dispatch<React.SetStateAction<boolean>>
    model: string
    setModel: React.Dispatch<React.SetStateAction<string>>
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
