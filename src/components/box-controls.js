import { useRecoilValue, useRecoilState } from 'recoil'
import { Slider } from 'antd'
import { box, bounds } from 'state'

function BoxControls () {
  const [mx, my, mz] = useRecoilValue(bounds)
  const [[x, y, z], setBox] = useRecoilState(box)
  return (
    <div>
      <Slider value={x} max={mx} step={0.1} onChange={nx => setBox([nx, y, z])}/>
      <Slider value={y} max={my} step={0.1} onChange={ny => setBox([x, ny, z])}/>
      <Slider value={z} max={mz} step={0.1} onChange={nz => setBox([x, y, nz])}/>
    </div>
  )
}

export default BoxControls
