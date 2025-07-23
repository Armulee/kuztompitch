import { Microphone } from "./microphone"
import Viewer from "./viewer"
import SideMenu from "./side-menu"
import Head from "./head"
import { useState } from "react"

const ThreeDimensionViewer = () => {
    const [decalDraggingId, setDecalDraggingId] = useState<string | null>(null)

    return (
        <>
            <SideMenu />
            <Viewer noOrbit={!!decalDraggingId}>
                <Microphone
                    rotation={[0, 0, 0]}
                    position={[0, -1.5, 0]}
                    scale={0.6}
                    draggingId={decalDraggingId}
                    setDraggingId={setDecalDraggingId}
                />
            </Viewer>
            <Head />
        </>
    )
}

export default ThreeDimensionViewer
