import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { Upload, Button, Layout } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { readData } from 'api/data'
import { elements } from 'state'

import Viewer from './viewer'
import BoxControls from './box-controls'

const { Header, Content, Sider } = Layout

function Shell () {
  const setData = useSetRecoilState(elements)

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
      <Layout>
        <Content>
          <Viewer />
        </Content>
        <Sider>
          <BoxControls/>
        </Sider>
      </Layout>
    </Layout>
  )
}

export default Shell
