import { Layout, Row } from 'antd'

import FileUpload from './file-upload'
import FileDownload from './file-download'
import Viewer from './viewer'
import BoxControls from './box-controls'
import ResetBox from './reset-box-button'

const { Header, Content, Sider } = Layout

function Shell () {
  return (
    <Layout style={{ height: '100%', width: '100%' }}>
      <Header>
        <FileUpload />
        <FileDownload />
      </Header>
      <Layout>
        <Content>
          <Viewer />
        </Content>
        <Sider width="250px">
          <BoxControls/>
          <Row justify="center">
            <ResetBox />
          </Row>
        </Sider>
      </Layout>
    </Layout>
  )
}

export default Shell
