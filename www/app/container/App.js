import React from 'react'
import {Layout, Menu, Breadcrumb, Icon,} from 'antd';
import { connect } from 'dva';
import {push} from 'react-router-redux'

const { SubMenu } = Menu;
const {Header, Content, Footer, Sider,} = Layout;

import './app.less'

class App extends React.Component {
    constructor(){
        super()
    }
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
                  <Menu.Item key="/">home</Menu.Item>
                  <Menu.Item key="/buy/carlist">buy</Menu.Item>
                  <Menu.Item key="/sale/addcar">sale</Menu.Item>
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