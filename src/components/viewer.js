import { useRecoilValue } from 'recoil'
import { Canvas } from 'react-three-fiber'
import { elements, boxSize, boxRotation } from 'state'
import * as THREE from 'three'

import CameraControls from './camera-controls'
import Mol from './mol'

function Box ({ size, rotation }) {
  const [dx, dy, dz] = size
  return (
    <mesh rotation={rotation}>
      <boxBufferGeometry args={[dx * 2, dy * 2, dz * 2]} />
      <meshStandardMaterial
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Viewer () {
  const points = useRecoilValue(elements)
  const size = useRecoilValue(boxSize)
  const rotation = useRecoilValue(boxRotation)

  return (
    <Canvas style={{ background: 'black' }} camera={{ position: [0, 0, 20] }}>
      <ambientLight />
      <CameraControls />
      <axesHelper args={[5]}/>
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, 10, 10]} />
      {points.map((p) => <Mol
        key={p.id}
        name={p.name}
        center={p.center}
        internal={p.internal}
      />)}
      <Box size={size} rotation={rotation} />
    </Canvas>
  )
}

export default Viewer
