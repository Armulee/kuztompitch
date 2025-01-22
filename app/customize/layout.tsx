import CustomizeProvider from "@/components/customizer/provider"
import React from "react"

export default function CustomizationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <CustomizeProvider>{children}</CustomizeProvider>
}
