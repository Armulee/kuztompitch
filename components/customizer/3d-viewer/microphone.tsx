/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 assets/normal-microphone.glb -t 
*/

import * as THREE from "three"
import { Decal, useGLTF, useTexture } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import { useCustomizeContext } from "../provider"
import { useEffect, useRef } from "react"
import {
    Euler,
    GroupProps,
    ThreeEvent,
    useFrame,
    Vector3,
} from "@react-three/fiber"
import { usePathname } from "next/navigation"
import { Logo } from "../provider/types"

type GLTFResult = GLTF & {
    nodes: {
        Shureobj001: THREE.Mesh
        Shureobj001_1: THREE.Mesh
        Shureobj001_2: THREE.Mesh
        Shureobj001_3: THREE.Mesh
        Plane: THREE.Mesh
    }
    materials: {
        ["Bottom handle"]: THREE.MeshStandardMaterial
        ["Capsule"]: THREE.MeshStandardMaterial
        ["Top handle"]: THREE.MeshStandardMaterial
        Material: THREE.MeshStandardMaterial
    }
}

export function Microphone(props: GroupProps) {
    const { nodes, materials } = useGLTF(
        "/assets/normal-microphone.glb"
    ) as GLTFResult

    const {
        capsule,
        topHandle,
        bottomHandle,
        isRotating,
        setIsRotating,
        logos,
        setPart,
        focusedPart,
        setFocusedPart,
        focusStartTime,
        setFocusStartTime,
    } = useCustomizeContext()

    // Handle the material changing for each style
    useEffect(() => {
        if (capsule) {
            materials["Capsule"].color = new THREE.Color(capsule.color)
            materials["Capsule"].roughness = capsule.roughness
            materials["Capsule"].metalness = capsule.metalness
        }
        if (topHandle) {
            materials["Top handle"].color = new THREE.Color(topHandle.color)
            materials["Top handle"].roughness = topHandle.roughness
            materials["Top handle"].metalness = topHandle.metalness
        }
        if (bottomHandle) {
            materials["Bottom handle"].color = new THREE.Color(
                bottomHandle.color
            )
            materials["Bottom handle"].roughness = bottomHandle.roughness
            materials["Bottom handle"].metalness = bottomHandle.metalness
        }
    }, [capsule, topHandle, bottomHandle, materials])

    // Rotate the model on the y-axis while `isRotating` is true
    const modelRef = useRef<THREE.Group>(null)
    const pathname = usePathname()

    // Handle focused part when click the mesh
    const handleClick = (e: ThreeEvent<MouseEvent>, part: string) => {
        e.stopPropagation()
        if (isOrbiting.current) return // Prevent click if dragging

        setPart(part)
        setFocusedPart(part)
        setFocusStartTime(performance.now())
    }
    const duration = 1000
    useFrame(() => {
        if (modelRef.current && isRotating && pathname === "/customize") {
            modelRef.current.rotation.y += 0.003
        }

        if (focusedPart && focusStartTime !== null) {
            const elapsed = performance.now() - focusStartTime
            const loopDuration = 1000 // 1s loop

            const glowStrength = Math.abs(
                Math.sin((elapsed / loopDuration) * Math.PI)
            )

            const partMat =
                focusedPart === "Capsule"
                    ? materials["Capsule"]
                    : focusedPart === "Top Handle"
                    ? materials["Top handle"]
                    : focusedPart === "Bottom Handle"
                    ? materials["Bottom handle"]
                    : null

            if (partMat) {
                partMat.emissive = new THREE.Color(0xffffff)
                partMat.emissiveIntensity = glowStrength
            }

            if (elapsed > duration) {
                if (partMat) {
                    partMat.emissiveIntensity = 0
                }
                setFocusedPart(null)
                setFocusStartTime(null)
            }
        }
    })

    // Handlers to toggle rotation on mouse events and detect is orbiting
    const pointerDownPos = useRef<{ x: number; y: number } | null>(null)
    const isOrbiting = useRef(false)
    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        setIsRotating(false)
        pointerDownPos.current = { x: e.clientX, y: e.clientY }
        isOrbiting.current = false
    }
    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!pointerDownPos.current) return
        const dx = e.clientX - pointerDownPos.current.x
        const dy = e.clientY - pointerDownPos.current.y
        if (Math.sqrt(dx * dx + dy * dy) > 5) {
            isOrbiting.current = true
        }
    }

    // Transform user uploaded images to textures for multiple decals
    const logoImages =
        logos.length > 0
            ? logos.map((logo) => logo.image)
            : ["/assets/transparent.png"]
    const logoTextures = useTexture(logoImages)
    const texturesArray = Array.isArray(logoTextures)
        ? logoTextures
        : [logoTextures]

    // Fix texture wrapping to prevent looping for all textures
    texturesArray.forEach((texture, index) => {
        if (texture && logos[index]?.image) {
            texture.wrapS = THREE.ClampToEdgeWrapping
            texture.wrapT = THREE.ClampToEdgeWrapping
            texture.repeat.set(1, 1)
            texture.offset.set(0, 0)
        }
    })

    // const transformControls = useControls("Decal Adjustment", {
    //     position: {
    //         value: { x: 0, y: 2.2, z: 0.5 },
    //         step: 0.01,
    //     },
    //     rotation: {
    //         value: { x: 0, y: 0, z: 0 },
    //         step: 0.01,
    //     },
    //     scale: {
    //         value: { x: 1, y: 1, z: 1 },
    //         step: 0.01,
    //     },
    // })

    // handle decal adjusting by dragging the Decal component
    // const [isDragging, setIsDragging] = useState(false)
    // const [startY, setStartY] = useState<number | null>(null)
    // const handlePointerDownDecal = (e: ThreeEvent<PointerEvent>) => {
    //     e.stopPropagation()
    //     setEditLogo(true)
    //     setIsDragging(true)
    //     setStartY(e.clientY)
    // }
    // const handlePointerUpDecal = (e: ThreeEvent<PointerEvent>) => {
    //     e.stopPropagation()
    //     setIsDragging(false)
    //     setStartY(null)
    // }
    // const handlePointerMoveDecal = (e: ThreeEvent<PointerEvent>) => {
    //     if (isDragging && startY !== null) {
    //         e.stopPropagation()
    //         const deltaY = (e.clientY - startY) * -0.01 // Adjust sensitivity
    //         setStartY(e.clientY)

    //         setLogo((prev) => {
    //             const newY = parseFloat((prev.position[1] + deltaY).toFixed(2))
    //             return {
    //                 ...prev,
    //                 position: [prev.position[0], newY, prev.position[2]],
    //             }
    //         })
    //     }
    // }
    // useEffect(() => {
    //     if (props.orbitControlsRef?.current && isDragging) {
    //         props.orbitControlsRef.current.enabled = !isDragging
    //     }
    // }, [isDragging])
    // console.log("Logos:", logos.length)

    const position: (logo: Logo) => Vector3 = (logo: Logo) => [
        Math.sin(logo.position[0]) * 0.5,
        logo.position[1],
        Math.cos(logo.position[0]) * 0.5 + 0.05,
    ]

    const rotation: (logo: Logo) => Euler & (number | Euler) = (logo: Logo) => [
        0,
        logo.position[0],
        0,
    ]

    const scale: (logo: Logo) => Vector3 = (logo: Logo) =>
        logo.aspect > 1
            ? [
                  (logo.flipHorizontal ? -1.2 : 1.2) * logo.scale,
                  (logo.flipVertical
                      ? -(1.2 / logo.aspect)
                      : 1.2 / logo.aspect) * logo.scale,
                  1.2 * logo.scale,
              ]
            : [
                  (logo.flipHorizontal ? -logo.aspect : logo.aspect) *
                      logo.scale,
                  (logo.flipVertical ? -1.2 : 1.2) * logo.scale,
                  1.2 * logo.scale,
              ]

    return (
        <group
            dispose={null}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
        >
            <group ref={modelRef} {...props}>
                <mesh
                    geometry={nodes.Shureobj001_2.geometry}
                    material={materials["Capsule"]}
                    onClick={(e) => handleClick(e, "Capsule")}
                    castShadow
                />
                <mesh
                    geometry={nodes.Shureobj001_3.geometry}
                    material={materials["Top handle"]}
                    onClick={(e) => handleClick(e, "Top Handle")}
                    castShadow
                >
                    {logos.map((logo, index) => (
                        <Decal
                            key={logo.id}
                            position={position(logo)}
                            rotation={rotation(logo)}
                            scale={scale(logo)}
                        >
                            <meshStandardMaterial
                                roughness={1}
                                transparent
                                polygonOffset
                                polygonOffsetFactor={-5}
                                polygonOffsetUnits={-1}
                                map={texturesArray[index]}
                                depthTest={true}
                                depthWrite={false}
                                side={THREE.FrontSide}
                            />
                        </Decal>
                    ))}
                </mesh>
                <mesh
                    geometry={nodes.Shureobj001_1.geometry}
                    material={materials["Bottom handle"]}
                    onClick={(e) => handleClick(e, "Bottom Handle")}
                    castShadow
                >
                    {logos.map((logo, index) => (
                        <Decal
                            key={logo.id}
                            position={position(logo)}
                            rotation={rotation(logo)}
                            scale={scale(logo)}
                        >
                            <meshStandardMaterial
                                roughness={1}
                                transparent
                                polygonOffset
                                polygonOffsetFactor={-5}
                                polygonOffsetUnits={-1}
                                map={texturesArray[index]}
                                depthTest={true}
                                depthWrite={false}
                                side={THREE.FrontSide}
                            />
                        </Decal>
                    ))}
                </mesh>

                {/* Microphone Base */}
                <mesh
                    geometry={nodes.Shureobj001.geometry}
                    material={materials["Bottom handle"]}
                />
            </group>
        </group>
    )
}

useGLTF.preload("assets/normal-microphone.glb")
