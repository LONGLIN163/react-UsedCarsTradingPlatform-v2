import React from 'react'
import {Layout, Menu} from 'antd';

const { Content, Sider} = Layout;

import './app.less'
import App from './App'


export default class SalePage extends React.Component {
    constructor(){
        super()
    }
  render() {
    return (
      <App>
        <Layout>
            <Layout style={{ padding: '0 30px 0 30px' }}>
                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280,}}>
                    {this.props.children}
                </Content>
            </Layout>
        </Layout>
      </App>   
    )
  }
}
