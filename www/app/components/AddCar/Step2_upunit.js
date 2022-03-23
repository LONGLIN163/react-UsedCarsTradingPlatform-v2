import React from 'react'
import { Row, Col } from 'antd'
import uploadfiles from './utils/uploadfiles'
import {connect} from 'dva';


class Step2_upunit extends React.Component {
    constructor(props) {
        super(props)
    }

    createFileReaderAndUpload(files){
        var self = this;
        for (let i = 0; i < files.length; i++) {
            //the boxes for every img
            let $imgbox = $(`<div class="preDiv"><em></em><i></i><b>x</b></div>`);
             
            //******real-time display imgs******
            let fr = new FileReader()
            fr.readAsDataURL(files[i])
            fr.onload = function (e) { // what to do after uploading
                //create instance of img
                var image = new Image()
                //local img url
                image.src = e.currentTarget.result
                //set div bgi
                $imgbox.css("background-image", `url(${image.src})`)
                //up to dom
                $(self.refs.imgsbox).append($imgbox)
            }

            uploadfiles(
                files[i],
                function (pathname) {
                    //after finish upload,remove...
                    $imgbox.find("em").remove()
                    $imgbox.find("i").remove()
                    //customlize attribute
                    $imgbox.attr("data-pathname",pathname)
                },
                function (e) {
                    // display progress while on uploading
                    $imgbox.find("i").html(parseInt(e.loaded / e.total * 100) + "%")
                },
                "/uploadPic"
           ); 
        }
    }

    componentDidMount() {

        const props=this.props
        const {getImagesObj}=this.props

        var self = this;
        //allow imagbox removable or sortable
        $(this.refs.imgsbox).sortable()

        //close button -<b> listener
        $(this.refs.imgsbox).delegate("b","click",function(){
            //delete its own parent el..
            $(this).parents(".preDiv").remove()
        })

        //****************click event***************************** */
        $(this.refs.filectrl).bind("change",function(e){
            var files=$(this)[0].files;
            self.createFileReaderAndUpload(files) 

            // because xhr onprogerss needed, then use setTimeout here
            setTimeout(()=>{
                var activeNextBtn=true 
                const imagesObj=getImagesObj()
                for(var k in imagesObj){
                    if(imagesObj[k].length==0){
                        activeNextBtn=false
                    }
                }
                if(activeNextBtn){
                    props.dispatch({
                        "type":"addCar/changeStep2Next",
                        activeNextBtn:!activeNextBtn
                    })
                }
            },600)   

        })

        //****************drag event****************** */
        $(this.refs.imgsbox).bind("dragover", function (e) {
            e.preventDefault();
            $(this).addClass("cur")
        });
        $(this.refs.imgsbox).bind("dragleave", function (e) {
            e.preventDefault();
            $(this).removeClass("cur")
        });
        $(this.refs.imgsbox).bind("drop", function (e) {
            e.preventDefault();
            // get files after drop images
            var files = e.originalEvent.dataTransfer.files 
            $(this).removeClass("cur")
            self.createFileReaderAndUpload(files)// triggle upload after mouse drop 
        });
    }

    render() {
        return (
            <div>
                <div className="hd">
                    <Row>
                        <Col span={4}>
                            <h3>Please add {this.props.title} images</h3>
                        </Col>
                        <Col span={4}>
                            <div 
                                className="uploadFiled" 
                                ref="uploadFiled" 
                                onClick={()=>{ // mock 'input' click
                                 $(this.refs.filectrl) 
                                 .trigger("click");
                                }}
                            >+</div>
                            {/* this input field can upload files, but we will hide it */}
                            <input ref="filectrl" type="file" hidden multiple/>
                        </Col>
                    </Row>
                </div>

                <div ref="imgsbox" className="imgsbox" data-album={this.props.album}></div>
            </div>
        )
    }
}

export default connect(
    ({addCar})=>({
      disableNextInStep2:addCar.disableNextInStep2
    })
  )(Step2_upunit)
