"use client"

import { createContext, useContext, useState } from "react"

export type CheckoutContextType = {
    part: string
    setPart: React.Dispatch<React.SetStateAction<string>>
}

export const CheckoutContext = createContext<CheckoutContextType | null>(null)
export const useCheckoutContext = () =>
    useContext(CheckoutContext) as CheckoutContextType

const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [part, setPart] = useState<string>("Capsule")

    return (
        <CheckoutContext.Provider
            value={{
                part,
                setPart,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}

export default CheckoutProvider
