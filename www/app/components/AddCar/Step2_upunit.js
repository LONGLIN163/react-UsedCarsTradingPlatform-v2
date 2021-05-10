import React from 'react'
import { Row, Col } from 'antd'
import uploadfiles from './utils/uploadfiles'

export default class Step2_upunit extends React.Component {
    constructor(props) {
        super(props)
    }

    //pack element(will up to dom) to a function
    createFileReaderAndUpload(files){
        var self = this;
        for (let i = 0; i < files.length; i++) {
            //create div for every img
            let $div = $(`<div class="preDiv"><em></em><i></i><b>x</b></div>`);
            //display imgs
            let fr = new FileReader()
            //read imgs
            fr.readAsDataURL(files[i])

            //then
            fr.onload = function (e) {
                //create instance of img
                var image = new Image()
                //local img url
                //console.log(e.currentTarget.result)
                image.src = e.currentTarget.result
                //set div bgi
                $div.css("background-image", `url(${image.src})`)
                //up to dom
                $(self.refs.imgsbox).append($div)
                //console.log("....",$div)

            }

            uploadfiles(
                files[i],
                function (pathname) {
                    //callback function,get randam file name
                    //alert("Done--"+pathname)

                    //after finish upload,remove...
                    $div.find("em").remove()
                    $div.find("i").remove()

                    //customlize attribute
                    $div.attr("data-pathname",pathname)
                },
                function (e) {
                    $div.find("i").html(parseInt(e.loaded / e.total * 100) + "%")
                },
                "/uploadPic"
           );
        }
    }

    componentDidMount() {
        var self = this;
        //sort
        $(this.refs.imgsbox).sortable()

        //close button -<b> listener
        $(this.refs.imgsbox).delegate("b","click",function(){
            //delete its own parent el..
            $(this).parents(".preDiv").remove()

        })

        //****************listion the click event***************************** */
        $(this.refs.filectrl).bind("change",function(e){
            var files=$(this)[0].files;
            self.createFileReaderAndUpload(files)
        });

        //****************listion the drag event****************** */
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
            //console.log(e.originalEvent.dataTransfer.files)
            var files = e.originalEvent.dataTransfer.files
            $(this).removeClass("cur")
            self.createFileReaderAndUpload(files)
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
                            <div className="uploadFild" ref="uploadFild" onClick={()=>{
                                $(this.refs.filectrl).trigger("click");
                            }}>+</div>
                            <input ref="filectrl" type="file" hidden multiple/>
                        </Col>
                    </Row>
                </div>

                <div ref="imgsbox" className="imgsbox" data-album={this.props.album}></div>
            </div>
        )
    }
}
