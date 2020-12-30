import { Canvas } from 'react-three-fiber'

import CameraControls from './camera-controls'
import Mol from './mol'

export default function Viewer ({ items = [] }) {
  return (
    <Canvas style={{ background: 'black' }} camera={{ position: [0, 0, 10] }}>
      <ambientLight />
      <CameraControls />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, 10, 10]} />
      {items.map((item) => <Mol key={JSON.stringify(item)} {...item}/>)}
    </Canvas>
  )
}
