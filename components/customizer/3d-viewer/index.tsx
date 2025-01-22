import Display from "./display"
import { Microphone } from "./microphone"
import Viewer from "./viewer"
import SideMenu from "./side-menu"

const ThreeDimensionViewer = () => {
    return (
        <>
            <div className='w-full h-full'>
                {/* Side Menu */}
                <SideMenu />
                <Display />
                <Viewer>
                    <Microphone
                        rotation={[0, 0, 0]}
                        position={[0, -1.3, 0]}
                        scale={0.55}
                    />
                </Viewer>
            </div>
        </>
    )
}

export default ThreeDimensionViewer
