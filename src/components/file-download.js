import { useCallback, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import { elements } from 'state'

const spaces = (n, text) => new Array(
  (text
    ? 8 - (text.length - 1)
    : 6
  ) - (n < 0 ? 1 : 0)).fill(' ').join('')

function FileDownload () {
  const ref = useRef()
  const items = useRecoilValue(elements)

  const downloadHandler = useCallback(() => {
    const content = items
      .filter(({ internal }) => internal)
      .map(({ name, center }) => `${name}${spaces(center.x, name)}${center.x}${spaces(center.y)}${center.y}${spaces(center.z)}${center.z}`)
      .reduce((text, line) => `${text}\n${line}`, '')

    ref.current.href = `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`
    ref.current.click()
  }, [items])

  return (
    <>
      <a ref={ref} download="download.txt" style={{ display: 'none' }}/>
      <Button disabled={!items.length} onClick={downloadHandler} icon={<DownloadOutlined/>}></Button>
    </>
  )
}

export default FileDownload
