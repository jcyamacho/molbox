import { useCallback, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { elements } from 'state'
import { readData } from 'api/data'

function FileUpload () {
  const input = useRef()
  const setData = useSetRecoilState(elements)

  const changeHandler = useCallback(ev => {
    const [file] = ev.target.files
    readData(file).then(setData)
  }, [])

  const clickHandler = useCallback(() => input.current.click(), [])

  return (
    <>
      <input ref={input} type="file" onChange={changeHandler} style={{ display: 'none' }}/>
      <Button onClick={clickHandler} icon={<UploadOutlined />}>Click to Upload</Button>
    </>
  )
}

export default FileUpload
