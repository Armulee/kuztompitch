"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { OrbitControls } from "@react-three/drei"

const Viewer = ({
    className = "bg-[#efefef]",
    children,
    position,
    noOrbit = false,
}: {
    className?: string
    children: React.ReactNode
    position?: [number, number, number]
    noOrbit?: boolean
}) => {
    return (
        <Canvas
            id='model'
            className={`w-full h-full ${className}`}
            camera={{
                position: position ?? [0, 1.75, -Math.PI],
                fov: 62,
            }}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={3} />
                {/* Key Light */}
                <directionalLight position={[5, 5, 10]} intensity={4} />
                {/* Fill Light */}
                <directionalLight position={[-5, 3, 10]} intensity={2.8} />
                {/* Dim Light */}
                <directionalLight position={[0, 5, -10]} intensity={2} />
                {children}

                <OrbitControls enabled={!noOrbit} />
            </Suspense>
        </Canvas>
    )
}

export default Viewer
