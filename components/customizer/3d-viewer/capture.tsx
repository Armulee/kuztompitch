import { useThree } from "@react-three/fiber"
import { useCustomizeContext } from "../provider"
import { useEffect, useMemo } from "react"
import * as THREE from "three"

const Capture = () => {
    const { gl, scene, size } = useThree()
    const { capturing, setCapturing, setSnapshot } = useCustomizeContext()

    // Define a hidden camera with a fixed position
    const hiddenCamera = useMemo(() => {
        const aspect = size.width / size.height
        const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
        camera.position.set(0, 2, 5) // Adjust as needed
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        return camera
    }, [size])

    useEffect(() => {
        if (capturing) {
            const timeout = setTimeout(() => {
                // const prevSize = gl.getSize(new THREE.Vector2())
                const renderTarget = new THREE.WebGLRenderTarget(1496, 786)

                // Temporarily render to off-screen render target
                gl.setRenderTarget(renderTarget)
                gl.render(scene, hiddenCamera)
                gl.setRenderTarget(null)

                // Read pixels from off-screen render target
                gl.render(scene, hiddenCamera) // Render again for domElement update
                const dataUrl = gl.domElement.toDataURL("image/png")

                setSnapshot(dataUrl)
                setCapturing(false)

                renderTarget.dispose()
            }, 300)

            return () => clearTimeout(timeout)
        }
    }, [capturing, gl, scene, hiddenCamera, setCapturing, setSnapshot])

    return null
}

export default Capture
