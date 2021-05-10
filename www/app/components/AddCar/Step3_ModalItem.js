import React from 'react'
import { Card, Col, Row, Button,Modal,Progress,Input } from 'antd';

export default class Step3_ModalItem extends React.Component {
    constructor(props){
        super(props)
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
      <div>
         <Row>
              <Col span={4}>
                <img src={icon} alt="" className="icons"/>
              </Col>
              <Col span={20}>
                {
                  this.props.item.progress!=100
                  ?
                  <div>
                      {filename}
                      <Progress percent={this.props.item.progress} status="active" />
                  </div>
                  :
                  <div>
                      <Input 
                          value={this.props.item.changedFilename} 
                          onChange={(e)=>{
                            this.props.changeFileName(filename,e.target.value)
                      }}/>
                  </div>    
                }
              </Col>
            </Row>
      </div>
    )
  }
}
