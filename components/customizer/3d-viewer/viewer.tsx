"use client"

import { Canvas } from "@react-three/fiber"
import { LegacyRef, RefObject, Suspense, useRef } from "react"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import Capture from "./capture"
import { OrbitControls as OrbitControlsElement } from "three-stdlib"

const Viewer = ({
    className = "bg-[#efefef]",
    children,
    position,
    noOrbit = false,
    orbitControlsRef,
}: {
    className?: string
    children: React.ReactNode
    position?: [number, number, number]
    noOrbit?: boolean
    orbitControlsRef: RefObject<OrbitControlsElement>
}) => {
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
                <ambientLight intensity={0.6} />
                {/* Key Light */}
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={2}
                    castShadow
                    // shadow-mapSize-width={2048}
                    // shadow-mapSize-height={2048}
                    // shadow-camera-near={0.5}
                    // shadow-camera-far={20}
                    // shadow-camera-left={-10}
                    // shadow-camera-right={10}
                    // shadow-camera-top={10}
                    // shadow-camera-bottom={-10}
                />

                {/* Fill Light */}
                <directionalLight
                    position={[-5, 3, 10]}
                    intensity={2.8}
                    castShadow
                />
                {/* Dim Light */}
                <directionalLight
                    position={[0, 5, -10]}
                    intensity={2}
                    castShadow
                />

                {children}

                {/* <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -1.35, 0]}
                    receiveShadow
                >
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color='#999999' />
                </mesh> */}

                {/* Optional: Contact shadows for soft base shadows */}
                <ContactShadows
                    position={[0, -1.2, 0]}
                    opacity={0.4}
                    scale={10}
                    blur={2}
                    far={5}
                />

                {/* Optional: HDR environment reflections */}
                <Environment preset='studio' />

                <OrbitControls enabled={!noOrbit} ref={orbitControlsRef} />

                <Capture />
            </Suspense>
        </Canvas>
    )
}

export default Viewer
