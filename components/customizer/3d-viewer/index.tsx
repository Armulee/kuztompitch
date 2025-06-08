import { Microphone } from "./microphone"
import Viewer from "./viewer"
import SideMenu from "./side-menu"

const ThreeDimensionViewer = () => {
    return (
        <>
            <div className='w-full h-full'>
                <div className='w-full h-full relative'>
                    <SideMenu />
                    <Viewer>
                        <Microphone
                            rotation={[0, 0, 0]}
                            position={[0, -1.7, 0]}
                            scale={0.62}
                        />
                    </Viewer>
                </div>
            </div>
        </>
    )
}

export default ThreeDimensionViewer
