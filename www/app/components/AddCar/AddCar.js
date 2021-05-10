import React from 'react'
import { Steps, Button, message,Row,Col} from 'antd';
const Step = Steps.Step;

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

import './AddCar.less'
import {connect} from 'dva';
import SalePage from '../../container/SalePage'

class AddCar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 2
    };
    console.log("/////////////////",props)
  }

  render() {
    const steps = [{
      title: 'Info',
      content:<Step1></Step1> 

    }, {
      title: 'Imgs',
      content:<Step2></Step2> 
    }, {
      title: 'Attachment',
      content:<Step3></Step3> 
    }];

    const checkStep1Disabled=()=>{
      var noError=true
      var step1=this.props.step1
      console.log("step1",step1)
      console.log([]==undefined)
      for(var k in step1){

        //console.log("k",k.errors)
        
        if(step1[k].errors!=undefined){
          //console.log("name---",step1[k].name,"errors---",step1[k].errors)
          noError=false
          //console.log("noErrorfucccck---",noError)
        }
        // else{
        //   noError=true
        // }
      }
      console.log("noError222---",noError)
      return !noError
    }

    //console.log("checccccccccccccccccck",checkStep1Disabled())

    const showButton=()=>{
       if(this.state.current==1){
         return <Button 
         type="primary"
         disabled={checkStep1Disabled()}
         //disabled={false}
         onClick={()=>{
           this.setState({
             "current":2
           })
         }}
         >Next</Button>
       }else if(this.state.current==2){
        return <Button 
        type="primary"
        onClick={()=>{
          //alert($(".imgsbox").length)
          //console.log($(".imgsbox"))
          var view=[]
          $(".imgsbox[data-album=view]").find("div.preDiv").each(function(){
            view.push($(this).data("pathname"))
          })
          console.log(view)

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

          if(view.length*inner.length*engine.length*more.length==0){
            alert("please upload img for all of albums")
            return
          }

          var obj={view,inner,engine,more}
          console.log("mmmmmmmmmmmmmmm",obj)

          //change global data
          this.props.dispatch({
            "type":"addCar/changeStep2",
            obj
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
          this.props.dispatch({"type":"addCar/addCar"})
        }}
        >Submit</Button>
 
      }
    }

    return (
      <SalePage>
        <Steps current={this.state.current-1}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="content_box">{steps[this.state.current-1].content}</div>
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
    step2:addCar.step2
  })
)(AddCar)