import React from 'react'
import {Slider} from 'antd';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { Button } from 'antd';

class CarlistKmSlider extends React.Component {
    constructor(props){
        super(props)
        this.state={
            min:props.filters.km[0],
            max:props.filters.km[1],
            km:props.km
        }
    }

    //before globle change,give the store data to local state first
    componentWillReceiveProps(props){
        this.setState({km:props.filters.km.map(i=>{
            return i/10000;
        })})
    }



  render() {
    return (
        <div>

            <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                
                        <Slider 
                            range 
                            min={0} 
                            max={30}
                            defaultValue={this.props.filters.km.map(i=>{
                                return i/10000
                            })}
                            value={this.state.km}
                            onAfterChange={(value)=>{//sent the action to the models
                                //console.log(value)
                                this.props.dispatch({"type":"carlist/changeFilter","propsname":"km","value":value.map(i=>{
                                    return i*10000
                                })})
                            }}
                            onChange={(value)=>{//make use can see the price when move slider
                                //console.log(value)
                                this.setState({
                                    min:value[0],
                                    max:value[1],
                                    km:value
                                })
                            }}
                        ></Slider>
                        
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={7}>
                            <Button onClick={(value)=>{
                                this.props.dispatch({"type":"carlist/changeFilter","propsname":"km","value":[0,100000]})
                                this.setState({
                                    km:[0,10]
                                })}}>0-10</Button> 
                        </Col>
                        <Col span={7}>
                            <Button onClick={(value)=>{
                                this.props.dispatch({"type":"carlist/changeFilter","propsname":"km","value":[100000,200000]})
                                this.setState({
                                    km:[10,20]
                                })}}>10-20</Button> 
                        </Col>
                        <Col span={7}>
                            <Button onClick={(value)=>{
                                this.props.dispatch({"type":"carlist/changeFilter","propsname":"km","value":[200000,300000]})
                                this.setState({
                                    km:[20,30]
                                })}}>20-30</Button> 
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
)(CarlistKmSlider)
