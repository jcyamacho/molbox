import { useRecoilValue } from 'recoil'
import { Canvas } from 'react-three-fiber'
import { elements, box } from 'state'

import CameraControls from './camera-controls'
import Mol from './mol'

function Box ({ dx, dy, dz }) {
  return (
    <mesh>
      <boxBufferGeometry args={[dx * 2, dy * 2, dz * 2]} />
      <meshStandardMaterial transparent opacity={0.3}/>
    </mesh>
  )
}

function Viewer () {
  const points = useRecoilValue(elements)
  const [dx, dy, dz] = useRecoilValue(box)

  return (
    <Canvas style={{ background: 'black' }} camera={{ position: [0, 0, 20] }}>
      <ambientLight />
      <CameraControls />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, 10, 10]} />
      {points.map((p) => <Mol key={p.id} {...p}/>)}
      <Box dx={dx} dy={dy} dz={dz} />
    </Canvas>
  )
}

export default Viewer
