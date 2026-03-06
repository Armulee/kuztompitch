"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useContext } from "react"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import Capture from "./capture"
import { CustomizeContext } from "../provider"

function SmartOrbitControls({ noOrbit }: { noOrbit: boolean }) {
    const context = useContext(CustomizeContext)
    const isDragging = context?.isDraggingDecal ?? false
    return <OrbitControls enabled={!noOrbit && !isDragging} />
}

type ViewerProps = {
    noOrbit?: boolean
    children: React.ReactNode
    className?: string
    position?: [number, number, number]
}

const Viewer = ({
    className = "bg-gradient-to-b from-[#141418] via-[#18181c] to-[#0a0a0a]",
    children,
    position,
    noOrbit = false,
}: ViewerProps) => {
    return (
        <Canvas
            id='model'
            className={`w-full h-full ${className}`}
            camera={{
                position: position ?? [0, 1.75, -Math.PI],
                fov: 62,
            }}
            shadows
        >
            <Suspense fallback={null}>
                <ambientLight intensity={0.7} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={2.2}
                    castShadow
                />
                <directionalLight
                    position={[-5, 3, 10]}
                    intensity={2.8}
                    castShadow
                />
                <directionalLight
                    position={[0, 5, -10]}
                    intensity={2}
                    castShadow
                />

                {children}

                <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.5}
                    scale={10}
                    blur={2.5}
                    far={5}
                />

                <Environment preset='studio' />

                <SmartOrbitControls noOrbit={noOrbit} />

                <Capture />
            </Suspense>
        </Canvas>
    )
}

export default Viewer
