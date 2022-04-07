import React from 'react'
import { connect } from 'dva';

import {Row,Col,Breadcrumb,Icon } from 'antd';


import FilterBox from './FilterBox'
import TableBox from './TableBox'

import BuyPage from '../../pages/BuyPage'

import './carlist.less'

class Carlist extends React.Component {
  constructor(props){
    super(props)
    props.dispatch({"type":"carlist/init"})
  }
  
  render() {
    return (
      <BuyPage>

          <Row className="breadNav" type="flex" justify="left">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
              <div>
                <Breadcrumb.Item href="">
                   <Icon type="unordered-list" /> All Cars 
                </Breadcrumb.Item>
              </div>
            </Col>
          </Row>
          

          <div>
            <FilterBox></FilterBox>
            <TableBox></TableBox>
          </div>

      </BuyPage>
    )
  }
}
export default connect(
  ({carlist})=>({
    carlist:carlist
  })
)(Carlist)



