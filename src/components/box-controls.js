import { useMemo, useEffect, useCallback } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Slider, Form, Divider } from 'antd'
import { boxSize, boxRotation, bounds } from 'state'

const MAX_ANGLE = 2 * Math.PI
const SIZE_STEP = 0.1
const ROTATION_STEP = 0.05

function Vector3Form ({ value, onChange, max, step = 0.1 }) {
  const [form] = Form.useForm()

  useEffect(() => {
    const [x, y, z] = value || [0, 0, 0]
    form.setFieldsValue({ x, y, z })
  }, [value])

  const updateHandler = useCallback(() => {
    const { x, y, z } = form.getFieldsValue()
    onChange && onChange([x, y, z])
  }, [form])

  return (
    <Form form={form} onFieldsChange={updateHandler}>
      <Form.Item name={'x'} label="X">
        <Slider max={max} step={step}/>
      </Form.Item>
      <Form.Item name={'y'} label="Y">
        <Slider max={max} step={step}/>
      </Form.Item>
      <Form.Item name={'z'} label="Z">
        <Slider max={max} step={step}/>
      </Form.Item>
    </Form>
  )
}

function RotationForm () {
  const [rotation, setRotation] = useRecoilState(boxRotation)

  return (
    <Vector3Form value={rotation} onChange={setRotation} max={MAX_ANGLE} step={ROTATION_STEP}/>
  )
}

function SizeForm () {
  const boxBounds = useRecoilValue(bounds)
  const max = useMemo(() => Math.max(...boxBounds), [boxBounds])
  const [size, setSize] = useRecoilState(boxSize)

  return (
    <Vector3Form value={size} onChange={setSize} max={max} step={SIZE_STEP}/>
  )
}

function BoxControls () {
  return (
    <div style={{ padding: 10 }}>
      <Divider>Size</Divider>
      <SizeForm />
      <Divider>Rotation</Divider>
      <RotationForm />
    </div>
  )
}

export default BoxControls
