import React from 'react'
import {connect} from 'dva'

class BigImgbox extends React.Component {
  constructor(props){
      super(props)
      this.state={
        loadDone:false
      }
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.imgs) return;
    //instead of common text,use thumbnail to set waiting info
    $(this.refs.bigImg).attr("src",`carimgs_small/${nextProps.nowid}/${nextProps.nowalbum}/tb${nextProps.imgs[nextProps.nowalbum][nextProps.nowidx]}`)
    //show the waiting pic
    //sent img request,and get load event callback
    var img=new Image();
    img.src=`carimgs/${nextProps.nowid}/${nextProps.nowalbum}/${nextProps.imgs[nextProps.nowalbum][nextProps.nowidx]}`;
    var self=this;
    //callback,only one time
    img.onload=function(){
      //alert("nnnnnnnnnnnnnnnnnnnn")
      $(self.refs.bigImg).attr("src",img.src)
      //hide loading info
      self.setState({
        loadDone:true
      })
    }
    
    //*********** preload imgs to improve the user exprierence************
    //get all imgs to one arr
    const allArr=nextProps.imgs.view.concat(nextProps.imgs.inner,nextProps.imgs.engine,nextProps.imgs.more);
    console.log(allArr)
    //find the current img position that user click in the allArr
    const currImgIndex=allArr.indexOf(nextProps.imgs[nextProps.nowalbum][nextProps.nowidx])
    //the end of the loop
    const end=currImgIndex+5<allArr.length?currImgIndex+5:allArr.length
    //but fuck!!!how can i kowh the current img in which folder?
    //create a new arr,build corresponding relation
    const dirarr=[].concat(
      new Array(nextProps.imgs.view.length).fill("view"),
      new Array(nextProps.imgs.inner.length).fill("inner"),
      new Array(nextProps.imgs.engine.length).fill("engine"),
      new Array(nextProps.imgs.more.length).fill("more")
      )
      console.log(dirarr)
    
    //now load next five imgs
    for(var i=currImgIndex;i<end;i++){
        //console.log(`carimgs/${nextProps.nowid}/${dirarr[i]}/${allArr[i]}`);
        var _img=new Image();
        _img.src=`carimgs/${nextProps.nowid}/${dirarr[i]}/${allArr[i]}`;
      }
    this.currImgIndex=currImgIndex;
    this.totalNum=allArr.length
  }


  render() {
    if(!this.props.imgs) return null;
    return (
      <div className="bigImgBox">
        <div className="inner">
              {/* <img src={`carimgs/${this.props.nowid}/${this.props.nowalbum}/${this.props.imgs[this.props.nowalbum][this.props.nowidx]}`} className="bigImg"/> */}
              <img className="bigImg" ref="bigImg"/>

              <div onClick={()=>{
                  this.props.dispatch({"type":"picshow/goPre",})
                  //click show loading
                  this.setState({
                    loadDone:false
                  })
              }} className="leftbtn"></div>

              <div onClick={()=>{
                  this.props.dispatch({"type":"picshow/goNext",})
                  //click show loading
                  this.setState({
                    loadDone:false
                  })
              }} className="rightbtn"></div>

              {
                !this.state.loadDone
                ?
                <div className="loadStatus">loading......</div>
                :
                null
              }
              <div className="numbox">
                { this.currImgIndex}/{this.totalNum}
              </div>
              
        </div>


      </div>
    )
  }
}

export default connect(
    ({picshow})=>({
        imgs:picshow.carinfo.imgs,
        nowid:picshow.nowid,
        nowidx:picshow.nowidx,
        nowalbum:picshow.nowalbum
      })
)(BigImgbox)
