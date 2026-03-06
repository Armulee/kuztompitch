import { Microphone } from "./microphone"
import Viewer from "./viewer"
import SideMenu from "./side-menu"
import Head from "./head"
import { useMediaQuery } from "react-responsive"

const ThreeDimensionViewer = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })

    return (
        <>
            <SideMenu />
            <Viewer>
                <Microphone
                    rotation={[0, 0, 0]}
                    position={isDesktop ? [1.3, -1.4, 1.3] : [0, -1.4, 0]}
                    scale={0.55}
                />
            </Viewer>
            <Head />
        </>
    )
}

export default ThreeDimensionViewer
