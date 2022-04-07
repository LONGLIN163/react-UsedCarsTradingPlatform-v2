import React from 'react'
import { Steps, Button,Row,Col,Breadcrumb,Icon} from 'antd';
const Step = Steps.Step;

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

import './AddCar.less'
import {connect} from 'dva';
import SalePage from '../../pages/SalePage'

import {push} from 'react-router-redux'


class AddCar extends React.Component {
  constructor(props) {
    super(props)
    this.getImagesObj=this.getImagesObj.bind(this)
    this.state = {
      current: 1,
    };
  }

  getImagesObj(){
    var view=[]
    $(".imgsbox[data-album=view]").find("div.preDiv").each(function(){
      view.push($(this).data("pathname"))
    })
    var inner=[]
    $(".imgsbox[data-album=inner]").find("div.preDiv").each(function(){
      inner.push($(this).data("pathname"))
    })
    var engine=[]
    $(".imgsbox[data-album=engine]").find("div.preDiv").each(function(){
      engine.push($(this).data("pathname"))
    })
    var more=[]
    $(".imgsbox[data-album=more]").find("div.preDiv").each(function(){
      more.push($(this).data("pathname"))
    })
    return {view,inner,engine,more}
  }

  createCarYgoToNewCar() {
    new Promise( (resolve,err) => {
      this.props.dispatch({
        "type":"addCar/addCar",
        "payload":{
          resolve
        }
      })
    }).then(res=>{
      this.props.dispatch(push("/picshow/"+res))
    })
    
  }

  render() {
    const checkStep1Disabled=()=>{
      var step1=this.props.step1
      var hasErr=true // initial data is empty, then it should be an error
      for(var k in step1){
        if(step1[k].errors != undefined ){ 
          // If any one is not undefined, which means there is some errors with k field
          hasErr=false 
        }
      }
      return !hasErr //if hasErr is true, we need to disable the button
    }
    
    const showButton=()=>{
      if(this.state.current==1){
        return <Button 
        type="primary"
        disabled={checkStep1Disabled()}
        onClick={()=>{
          this.setState({
            "current":2
          })
        }}
        >Next</Button>
      }else if(this.state.current==2){
        return <Button 
        type="primary"
        disabled={this.props.disableNextInStep2}
        onClick={()=>{
          const imagesObj=this.getImagesObj()
          //change global data 
          this.props.dispatch({
            "type":"addCar/changeStep2",
            "obj":imagesObj
          })
          //go to the next step
          this.setState({
            current:3
          })
        }}
        >Next</Button>
      }else if(this.state.current==3){
        return <Button
        type="primary"
        onClick={()=>{
          this.createCarYgoToNewCar()
        }}
        >Submit</Button>
 
      }
    }

    const steps = [{
      title: 'Info',
      content:<Step1/>
    }, {
      title: 'Imgs',
      content:<Step2 getImagesObj={this.getImagesObj}/>
    }, {
      title: 'Attachment',
      content:<Step3/>
    }];

    return (
      <SalePage>
          <Row className="breadNav">
            <Col xs={24} sm={24} md={16} lg={18} xl={14}  >
              <div>
                <Breadcrumb.Item href="">
                    <Icon type="edit" /> Sell Cars             
                </Breadcrumb.Item>
              </div>
            </Col>
          </Row>
        <Steps current={this.state.current-1}>
          {
            steps.map(item => <Step 
              key={item.title} 
              title={item.title} 
            />)
          }
        </Steps>
        <div className="content_box">
          {
            steps[this.state.current-1].content
          }
        </div>
        <div className="btn_box">
          {
            showButton()
          }
        </div>
      </SalePage>
    )
  }
}

export default connect(
  ({addCar})=>({
    step1:addCar.step1,
    step2:addCar.step2,
    disableNextInStep2:addCar.disableNextInStep2,
    newCarId:addCar.newCarId
  })
)(AddCar)