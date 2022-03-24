import React from 'react'
import { Button,Modal,message } from 'antd';
import uploadfiles from './utils/uploadfiles'
import Step3_ModalItem from './Step3_ModalItem'
import Step3_filebar from './Step3_filebar'
import Step3_rename from './Step3_rename'

import {connect} from 'dva'

class Step3 extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      showModal:false,
      showModalRename:false,
      currentUpload:[],
      renamedFilename:""
    }
  }

  changeShowModalRename(b,renamedFilename){
    this.setState({
        showModalRename:b,
        renamedFilename
    })
  }

  changeFileName(filename,changedFilename){
    this.setState({
      currentUpload:this.state.currentUpload.map(item=>
          item.filename==filename ? {...item,changedFilename} : item
        )
    })
  }
  componentDidMount() {
    //****************listion the click event***************************** */
    var self=this
    $(this.refs.filectrl).bind("change", function (e) {
      var files = $(this)[0].files;
      //conver files to an arr
      files=[...files] 
      console.log("files******",files)
      //loop files and change currentUpload
      var arr=files.map(item=>(
          {
            "filename":item.name, // original name
            "changedFilename":item.name,
            "progress":0
          }
      ));
      self.setState({
        currentUpload:arr
      })

      // upload files
      for(let i=0;i<files.length;i++){
        let filename=files[i].name
        uploadfiles(
          files[i],
          function(){
            //done
          },
          function(e){
            console.log(123)
            if (files[i].size > 5*1024*1024) { 
              message.info('Please upload a file less than 5MB,thank you!');// excute twice???
              return;
            }
            //progress
            var progress=parseInt(e.loaded / e.total * 100)
            console.log("progress******",progress)
            self.setState({
              currentUpload:self.state.currentUpload.map(item=>{
                if(item.filename==filename){
                  return {
                    ...item,
                    progress // only change progress
                  }
                }
                return item
              })
            })
  
          },
          "/uploadInfo")
      }
            
      //alert Modal
      self.setState({
        showModal:true
      })


    });

  }

  render() {
    return (
      <div className="hd">
        <h1>Required materials</h1>
        <Button type="primary" onClick={() => {
          $(this.refs.filectrl).trigger("click");
        }}>Upload</Button>
        <input type="file" hidden multiple ref="filectrl" />
        <br></br>
        <div className="filebox">
            {
              this.props.files.map((item,index)=>{         
               return <Step3_filebar 
                  key={index} 
                  item={item}
                  changeShowModalRename={this.changeShowModalRename.bind(this)}
               ></Step3_filebar>
              })
            }
            <Modal
              title="Upload"
              visible={this.state.showModal}
              onOk={()=>{
                this.props.dispatch({"type":"addCar/changeStep3","arr":this.state.currentUpload})
                 this.setState({
                  showModal:false
                 })
                }}
              onCancel={()=>{
                  this.setState({ 
                  showModal:false
                  })

              }}
              width={"600px"}
              destroyOnClose={true}
            >
            {
              this.state.currentUpload.map(item=>{
                return <Step3_ModalItem 
                    key={item.filename} 
                    item={item}
                    changeFileName={this.changeFileName.bind(this)}
                ></Step3_ModalItem>
              })
            }

          </Modal>

          <Modal
              title="Rename"
              visible={this.state.showModalRename}
              onOk={()=>{
                 this.setState({
                  showModalRename:true
                 })
                }}
              onCancel={()=>{
                  this.setState({
                    showModalRename:false
                  })

              }}
              width={"600px"}
              destroyOnClose={true}
            >
           <Step3_rename 
              item={this.props.files.filter(item=>item.filename==this.state.renamedFilename)[0]}
           ></Step3_rename>

          </Modal>
        </div>
      </div>
    )
  }
}
export default connect(
  ({addCar})=>({
    files:addCar.step3.files
  })
)(Step3)
