import { useMemo } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Slider } from 'antd'
import { boxSize, boxRotation, bounds } from 'state'

const MAX_ANGLE = 2 * Math.PI

function BoxControls () {
  const [mx, my, mz] = useRecoilValue(bounds)
  const max = useMemo(() => Math.max(mx, my, mz), [mx, my, mz])
  const [[bx, by, bz], setBox] = useRecoilState(boxSize)
  const [[rx, ry, rz], setRotation] = useRecoilState(boxRotation)
  return (
    <div>
      <Slider value={bx} max={max} step={0.1} onChange={nx => setBox([nx, by, bz])}/>
      <Slider value={by} max={max} step={0.1} onChange={ny => setBox([bx, ny, bz])}/>
      <Slider value={bz} max={max} step={0.1} onChange={nz => setBox([bx, by, nz])}/>

      <Slider value={rx} max={MAX_ANGLE} step={0.1} onChange={nx => setRotation([nx, ry, rz])}/>
      <Slider value={ry} max={MAX_ANGLE} step={0.1} onChange={ny => setRotation([rx, ny, rz])}/>
      <Slider value={rz} max={MAX_ANGLE} step={0.1} onChange={nz => setRotation([rx, ry, nz])}/>
    </div>
  )
}

export default BoxControls
