import { Microphone } from "./microphone"
import Viewer from "./viewer"
import SideMenu from "./side-menu"
import Head from "./head"

const ThreeDimensionViewer = () => {
    return (
        <>
            <SideMenu />
            <Viewer>
                <Microphone
                    rotation={[0, 0, 0]}
                    position={[0, -1.5, 0]}
                    scale={0.6}
                />
            </Viewer>
            <Head />
        </>
    )
}

export default ThreeDimensionViewer
