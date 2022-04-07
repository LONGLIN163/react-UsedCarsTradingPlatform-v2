import React from 'react'
import {connect} from 'dva'

import "./Picshow.less"
import Carinfo from './Carinfo'
import Album from './Album'
import Carlike from './Carlike'
import Smallpics from './Smallpics'
import BigImgbox from './BigImgbox'
import App from '../../pages/App'
import {Row, Col, Breadcrumb, Icon} from 'antd';


class Picshow extends React.Component {
  constructor(props){
    super(props)
    this.props.dispatch({"type":"picshow/init","nowid":props.match.params.id})
  }
  render() {
    return (
      <div className="picshow">

        <App></App>

        <div  style={{ padding: '20px 20px 0 20px' }}>
          <Row className="breadNav">
              <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                <div>
                  <Breadcrumb.Item href="">
                    <Icon type="profile" /> Car Details 
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="" disabled>
                    <span>{this.props.match.params.id}</span>
                  </Breadcrumb.Item>
                </div>
              </Col>
          </Row>
        </div>

        <div>
          <Row>
              <Col xs={24} sm={24} md={16} lg={18} xl={20}  >
                  <BigImgbox></BigImgbox>
              </Col>
              <Col xs={24} sm={24} md={16} lg={6} xl={4}  >
                <div className="rightPart">
                  <Carinfo></Carinfo>
                  <Album></Album>
                  <Carlike></Carlike>
                  <Smallpics></Smallpics>
                </div>
              </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(
  ({routing})=>({
    location:routing.location
  })
)(Picshow)
