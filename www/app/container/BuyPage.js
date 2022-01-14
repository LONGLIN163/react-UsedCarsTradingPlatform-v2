import React from 'react'
import { connect } from 'dva';
import {Layout, Menu} from 'antd';
import {push} from 'react-router-redux'

const { Content, Sider} = Layout;

import './app.less'
import App from './App'


class BuyPage extends React.Component {
    constructor(){
        super()
    }
  render() {
    const targetDefalt=this.props.pathname.match(/^\/(.+)\//g)[0]
    return (
      <App>
        <Layout>
            <Sider width={200} style={{ background: 'fff' }}>
                <Menu
                mode="inline"
                defaultSelectedKeys={[targetDefalt]}
                style={{ height: '100%', borderRight: 0 }}
                 onClick={(e)=>{
                    console.log(e)
                    if(e.item.props.href==this.props.pathname) return;
                    this.props.dispatch(push(e.item.props.href))
                  }}
                >
                    <Menu.Item key="/buy/" href="/buy/carlist">carlist</Menu.Item>
                    <Menu.Item key="/sale/" href="/sale/community">community</Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280,}}>
                    {this.props.children}
                </Content>
            </Layout>
        </Layout>
      </App>   
    )
  }
}

export default connect(
  ({routing})=>({
    pathname:routing.location.pathname
  })
)(BuyPage)