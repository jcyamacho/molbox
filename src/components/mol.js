import { useMemo } from 'react'

const COLORS = {
  Dy: 'black',
  O: 'red',
  C: 'gray',
  H: 'rgb(250, 250, 250)',
  N: 'blue',
  U: 'green',
  F: 'yellow',
  Cs: 'purple'
}

function Mol ({ name, x, y, z, internal = false }) {
  const color = useMemo(() => COLORS[name] ?? 'red', [name])
  return (
    <mesh position={[x, y, z]}>
      <sphereBufferGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent={!internal}
        opacity={internal ? 1 : 0.1}/>
    </mesh>
  )
}

export default Mol
