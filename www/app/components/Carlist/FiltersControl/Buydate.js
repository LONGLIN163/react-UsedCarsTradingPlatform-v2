import React from 'react'
import { connect } from 'dva';
import { DatePicker, Button,Row,Col} from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;

class Buydate extends React.Component {
    constructor(props){
        super(props)
    }

  render() {
    const buydate=this.props.filters.buydate;
    return (
      <div>
        <Row>
          <Col className='buyDateInput' xs={24} sm={24} md={12} lg={12} xl={12}>
              <RangePicker
                  allowClear={false} 
                  value={[moment(buydate[0]),moment(buydate[1])]}
                  onChange={(value)=>{
                      this.props.dispatch({
                          "type":"carlist/changeFilter",
                          "propsname":"buydate",
                          "value":[value[0].unix()*1000,value[1].unix()*1000]
                        })
                  }} />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Row>
              <Col span={3}></Col>
              <Col span={7}>
                  <Button onClick={(value)=>{
                      this.props.dispatch({
                        "type":"carlist/changeFilter",
                        "propsname":"buydate",
                        "value":[Date.parse(new Date())-365*86400*1000,Date.parse(new Date())]
                      })
                      }}>1 year</Button> 
              </Col>
              <Col span={7}>
                  <Button onClick={(value)=>{
                      this.props.dispatch({
                        "type":"carlist/changeFilter",
                        "propsname":"buydate",
                        "value":[Date.parse(new Date())-365*86400*1000*2,Date.parse(new Date())]
                      })
                      }}>2 years</Button> 
              </Col>
              <Col span={7}>
                  <Button onClick={(value)=>{
                      this.props.dispatch({
                        "type":"carlist/changeFilter",
                        "propsname":"buydate",
                        "value":[Date.parse(new Date())-365*86400*1000*3,Date.parse(new Date())]
                    })
                      }}>3 years</Button> 
              </Col>
            </Row>
          </Col>
              
        </Row>




      </div>
    )
  }
}

export default connect(
  ({carlist})=>({
    filters:carlist.filters
  })
)(Buydate)
