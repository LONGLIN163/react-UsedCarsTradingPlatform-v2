import React from 'react'
import {Layout, Menu} from 'antd';
import { connect } from 'dva';
import {push} from 'react-router-redux'
const {Header} = Layout;

import './app.less'

class App extends React.Component {

  render() {
    return (
      <div>
          <Layout>
              <Header className="header">
                <div />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={[this.props.pathname]}
                  style={{ lineHeight: '64px' }}
                  onClick={(e)=>{
                    if(e.key==this.props.pathname) return;
                    this.props.dispatch(push(e.key))
                  }}
                >
                  <Menu.Item key="/">Find Your Car</Menu.Item>
                  <Menu.Item key="/sale/addcar">Sell Your Car</Menu.Item>
                </Menu>
              </Header>
              <Row className="comm-main" type="flex" justify="center">
        {/* <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
              <Breadcrumb.Item>
                <Link href="/"><a>Home</a></Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{results.data[0].typeName ? results.data[0].typeName : "other"}</Breadcrumb.Item>
          </div>
        </Col> */}
      </Row>
              {this.props.children}
          </Layout>
      </div>
    )
  }
}

export default connect(
  ({routing})=>({
    pathname:routing.location.pathname
  })
)(App)