import { Decal, Edges } from "@react-three/drei"
import { Vector3 } from "@react-three/fiber"
import { useEffect, useState } from "react"
import * as THREE from "three"

export default function ImageDecal({
    logo,
    texture,
    setDraggingId,
}: {
    logo: {
        id: string
        fileName: string
        position: number[]
        image: string
        cloneImage?: string
        aspect: number
        scale: number
        flipHorizontal: boolean
        flipVertical: boolean
    }
    texture: THREE.Texture
    setDraggingId: React.Dispatch<React.SetStateAction<string | null>>
}) {
    const [selectedDecalId, setSelectedDecalId] = useState<string | null>(null)

    const isSelected = selectedDecalId === logo.id

    const position: Vector3 = [
        Math.sin(logo.position[0]) * 0.5,
        logo.position[1],
        Math.cos(logo.position[0]) * 0.5 + 0.05,
    ]

    const rotation: [number, number, number] = [0, logo.position[0], 0]

    const scale: Vector3 =
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

    useEffect(() => {
        console.log(selectedDecalId)
    }, [selectedDecalId])
    return (
        <>
            <Decal
                key={logo.id}
                onClick={(e) => {
                    e.stopPropagation()
                    setSelectedDecalId(logo.id)
                }}
                position={position}
                rotation={rotation}
                scale={scale}
                onPointerDown={(e) => {
                    e.stopPropagation()
                    setDraggingId(logo.id)
                }}
                onPointerUp={(e) => {
                    e.stopPropagation()
                    setDraggingId(null)
                }}
            >
                <meshStandardMaterial
                    roughness={1}
                    transparent
                    polygonOffset
                    polygonOffsetFactor={-5}
                    polygonOffsetUnits={-1}
                    map={texture}
                    depthTest={true}
                    depthWrite={false}
                    side={THREE.FrontSide}
                />
                {isSelected && (
                    <Edges
                        // If you don’t pass “geometry”, Edges will pick up the parent decal’s geometry
                        color='blue'
                        threshold={15} // only sharp edges
                        scale={0.8}
                    >
                        <lineBasicMaterial
                            polygonOffset
                            polygonOffsetFactor={-1}
                            polygonOffsetUnits={1}
                        />
                    </Edges>
                )}
            </Decal>

            {/* click on the background to clear selection */}
            <mesh
                onPointerMissed={() => setSelectedDecalId(null)}
                visible={false}
                // cover your clickable area
            />
        </>
    )
}
