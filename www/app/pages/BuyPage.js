import React from 'react'
import { connect } from 'dva';
import {Layout} from 'antd';
import {push} from 'react-router-redux'

const { Content, Sider} = Layout;

import './app.less'
import App from './App'


class BuyPage extends React.Component {
    constructor(){
        super()
    }
  render() {
    const targetDefalt=this.props.pathname.match(/^\//g)[0]
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

export default connect(
  ({routing})=>({
    pathname:routing.location.pathname
  })
)(BuyPage)