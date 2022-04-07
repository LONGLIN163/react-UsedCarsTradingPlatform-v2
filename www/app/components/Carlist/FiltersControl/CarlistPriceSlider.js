import React from 'react'
import {Slider} from 'antd';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { Button } from 'antd';

class CarlistPriceSlider extends React.Component {
    constructor(props){
        super(props)
        this.state={
            min:props.filters.price[0],
            max:props.filters.price[1],
            price:props.price
        }
    }

    //before globle change,give the store data to local state first
    componentWillReceiveProps(props){
        this.setState({price:props.filters.price})
    }



  render() {
    return (
        <div>

            <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                
                        <Slider 
                            range 
                            min={0} 
                            max={100}
                            defaultValue={this.props.filters.price}
                            value={this.state.price}
                            onAfterChange={(value)=>{//sent the action to the models
                                this.props.dispatch({"type":"carlist/changeFilter","propsname":"price",value})
                            }}
                            onChange={(value)=>{//make use can see the price when move slider
                                this.setState({
                                    min:value[0],
                                    max:value[1],
                                    price:value
                                })
                            }}
                        ></Slider>
                        
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={4}>
                            <Button onClick={(value)=>{
                                //alert(123)
                                this.props.dispatch({"type":"carlist/changeFilter","propsname":"price","value":[0,20]})
                                this.setState({
                                    price:[0,20]
                                })}}>0-20</Button> 
                        </Col>
                        <Col span={6}>
                            <Button onClick={(value)=>{
                                this.props.dispatch({"type":"carlist/changeFilter","propsname":"price","value":[20,50]})
                                this.setState({
                                    price:[20,50]
                                })}}>20-50</Button> 
                        </Col>
                        <Col span={6}>
                            <Button onClick={(value)=>{
                                this.props.dispatch({"type":"carlist/changeFilter","propsname":"price","value":[50,70]})
                                this.setState({
                                    price:[50,70]
                                })}}>50-70</Button> 
                        </Col>
                        <Col span={6}>
                            <Button onClick={(value)=>{
                                this.props.dispatch({"type":"carlist/changeFilter","propsname":"price","value":[70,100]})
                                this.setState({
                                    price:[70,100]
                                })}}>70-100</Button> 
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
)(CarlistPriceSlider)
