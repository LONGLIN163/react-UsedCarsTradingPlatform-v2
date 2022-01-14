import React from 'react'
import {Layout, Menu} from 'antd';

const { Content, Sider} = Layout;

import './app.less'
import App from './App'


export default class BuyPage extends React.Component {
    constructor(){
        super()
    }
  render() {
    return (
      <App>
        <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                >
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
