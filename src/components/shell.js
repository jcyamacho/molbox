import { Layout } from 'antd'

import FileUpload from './file-upload'
import Viewer from './viewer'
import BoxControls from './box-controls'

const { Header, Content, Sider } = Layout

function Shell () {
  return (
    <Layout style={{ height: '100%', width: '100%' }}>
      <Header>
        <FileUpload />
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
