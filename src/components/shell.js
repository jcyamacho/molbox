import { useState, useCallback } from 'react'
import { Upload, Button, Layout } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { readData } from 'api/data'

import Viewer from './viewer'

const { Header, Content } = Layout

export default function Shell () {
  const [data, setData] = useState([])
  const handleUpload = useCallback(file => {
    readData(file).then(setData)
    return false
  }, [])
  return (
    <Layout style={{ height: '100%', width: '100%' }}>
      <Header>
        <Upload beforeUpload={handleUpload}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Header>
      <Content>
        <Viewer items={data}/>
      </Content>
    </Layout>
  )
}
