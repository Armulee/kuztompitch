"use client"

import { createContext, useContext } from "react"
import { CustomizeContextType } from "./types"
import useProviderSetup from "./setup"

export const CustomizeContext = createContext<CustomizeContextType | null>(null)
export const useCustomizeContext = () =>
    useContext(CustomizeContext) as CustomizeContextType

const CustomizeProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useProviderSetup()
    return (
        <CustomizeContext.Provider value={value}>
            {children}
        </CustomizeContext.Provider>
    )
}

export default CustomizeProvider
