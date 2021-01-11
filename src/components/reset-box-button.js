import { useCallback } from 'react'
import { useResetRecoilState } from 'recoil'
import { Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

import { boxRotation, boxSize } from 'state'

function ResetBoxButton () {
  const resetRotation = useResetRecoilState(boxRotation)
  const resetSize = useResetRecoilState(boxSize)

  const resetHandler = useCallback(() => {
    resetRotation()
    resetSize()
  }, [resetRotation, resetSize])

  return (
    <Button onClick={resetHandler} icon={<SyncOutlined/>}>Reset Box</Button>
  )
}

export default ResetBoxButton
