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
                    console.log(e)
                    if(e.key==this.props.pathname) return;
                    this.props.dispatch(push(e.key))
                  }}
                >
                  <Menu.Item key="/">Find Your Car</Menu.Item>
                  {/* <Menu.Item key="/buy/carlist">buy</Menu.Item> */}
                  <Menu.Item key="/sale/addcar">Sell Your Car</Menu.Item>
                </Menu>
              </Header>
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