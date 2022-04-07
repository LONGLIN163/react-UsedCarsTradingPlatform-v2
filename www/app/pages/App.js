import React from 'react'
import {Layout, Menu, Row, Col} from 'antd';
import { connect } from 'dva';
import {push} from 'react-router-redux'
const {Header} = Layout;

import './app.less'

class App extends React.Component {

  render() {
    return (
      <div>
          <Layout>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Header className="header">
                  <div className='logo'><img src="images/car-2-icon-11-256.png" alt="" /></div>
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
              </Col>
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