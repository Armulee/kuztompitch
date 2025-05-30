import { useThree } from "@react-three/fiber"
import { useCustomizeContext } from "../provider"
import { useEffect } from "react"

const Capture = () => {
    const { gl, scene, camera } = useThree()
    const { capturing, setCapturing, snapshot, setSnapshot } =
        useCustomizeContext()

    useEffect(() => {
        if (capturing && !snapshot) {
            // Wait a moment in case scene is not ready yet
            const timeout = setTimeout(() => {
                gl.render(scene, camera)
                const dataUrl = gl.domElement.toDataURL("image/png")
                setSnapshot(dataUrl)
            }, 300)

            return () => {
                clearTimeout(timeout)
                setCapturing(false)
            }
        }
    }, [capturing, snapshot, camera, gl, scene, setCapturing, setSnapshot])

    return null
}

export default Capture
