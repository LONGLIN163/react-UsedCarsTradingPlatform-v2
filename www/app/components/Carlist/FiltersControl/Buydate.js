import React from 'react'
import { connect } from 'dva';
import { DatePicker, Button,Row,Col} from 'antd';
import moment from 'moment'


const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


class Buydate extends React.Component {
    constructor(props){
        super(props)
    }


  render() {
    const buydate=this.props.filters.buydate;
    return (
      <div>
        <Row>
          <Col span={6}>

              <RangePicker
                  allowClear={false} 
                  value={[moment(buydate[0]),moment(buydate[1])]}
                  //value={[moment(this.props.filters.buydate[0]),moment(this.props.filters.buydate[1])]}
                  onChange={(value)=>{
                      //value is an arr of moment obg,so we can get moment obj,and convert the time
                      //console.log([value[0].unix()*1000,value[0].unix()*1000])
                      this.props.dispatch({
                          "type":"carlist/changeFilter",
                          "propsname":"buydate",
                          "value":[value[0].unix()*1000,value[1].unix()*1000]
                        })
                  }} />
          
          </Col>
          <Col span={1}></Col>
          <Col span={3}>
                    <Button onClick={(value)=>{
                        this.props.dispatch({
                          "type":"carlist/changeFilter",
                          "propsname":"buydate",
                          "value":[Date.parse(new Date())-365*86400*1000,Date.parse(new Date())]
                        })
                         }}>1 year</Button> 
                </Col>
                <Col span={3}>
                    <Button onClick={(value)=>{
                        this.props.dispatch({
                          "type":"carlist/changeFilter",
                          "propsname":"buydate",
                          "value":[Date.parse(new Date())-365*86400*1000*2,Date.parse(new Date())]
                        })
                         }}>2 years</Button> 
                </Col>
                <Col span={3}>
                    <Button onClick={(value)=>{
                        this.props.dispatch({
                          "type":"carlist/changeFilter",
                          "propsname":"buydate",
                          "value":[Date.parse(new Date())-365*86400*1000*3,Date.parse(new Date())]
                      })
                        }}>3 years</Button> 
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
