import React from 'react'
import {Row,Col,Menu, Dropdown, Button} from 'antd'

export default class Step3_filebar extends React.Component {
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
      <div className="somerow">
         <Row>
              <Col span={4}>
                <div className="flow">
                    <img src={icon} alt="" className="iconss"/>
                    <span>{this.props.item.changedFilename}</span>
                </div>
              </Col>
              <Col span={10}>
                <div className="tools">
                    <a href="javascript:;" onClick={()=>{
                        this.props.changeShowModalRename(true,this.props.item.filename)
                    }}>Rename</a>
                    <a href="javascript:;">Delete</a>
                </div>
              </Col>
            </Row>
      </div>
    )
  }
}
