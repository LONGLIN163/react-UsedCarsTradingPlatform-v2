import React from 'react'
import {Row,Col,Menu, Dropdown, Button,Input} from 'antd'
import {connect} from 'dva'
class Step3_rename extends React.Component {
    constructor(){
        super()
    }

  render() {
    const filename=this.props.item.filename
    const extName=filename.match(/\.(.+)$/g)[0]
    if(extName.toLowerCase()==".doc"||extName.toLowerCase()==".docx"){
      var icon="/images/DOC.png"
    }else if(extName.toLowerCase()==".jpg"||extName.toLowerCase()==".png"){
      var icon="/images/JPG.png"
    }else if(extName.toLowerCase()==".rar"||extName.toLowerCase()==".zip"){
      var icon="/images/ZIP.png"
    }else if(extName.toLowerCase()==".txt"){
      var icon="/images/TXT.png"
    }
    return (
        <div className="somerow">
            <Row>
                <Col span={4}>
                        <img src={icon} alt="" className="iconss"/>
                </Col>
                <Col span={20}>
                    <div>
                        <Input 
                            value={this.props.item.changedFilename} 
                            onChange={(e)=>{
                                this.props.dispatch({
                                    "type":"addCar/changeStep3OneFilename",
                                    "filename":filename,
                                    "changedFilename":e.target.value})
                        }}/>
                    </div>    
                </Col>
            </Row>
        </div>
    )
  }
}

export default connect()(Step3_rename)

