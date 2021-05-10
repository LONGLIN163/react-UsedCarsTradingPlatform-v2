import React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'

class Smallpics extends React.Component {
    constructor(props){
        super(props)
    }

    // componentDidUpdate(){
    //   $(this.refs.pageNav).delegate("span","click",function(){
    //     alert($(this).index())
    //   })
    // }

  render() {
    if(!this.props.imgs) return null;

    //show ul and li
    const showUlLis=()=>{
      //create an ul arr
      var ARR=[];
      //create an li array
      var arr=this.props.imgs[this.props.nowalbum];
      for(let i=0;i<arr.length/4;i++){
        ARR.push(
          <ul key={i}>
            {
              arr.slice(i*4,i*4+4).map((item,index)=>{
                return <li 
                key={index} 
                className={classnames({
                "cur":this.props.nowidx==i*4+index
                })}
                onClick={()=>{this.props.dispatch({"type":"picshow/changeNowidx","nowidx":i*4+index})}}
                >
                  <img src={`carimgs_small/${this.props.nowid}/${this.props.nowalbum}/tb${item}`}></img>
                </li>
              })
            }
          </ul>
        )
      }
    return ARR;
    }

    //get current page
    const currPage=parseInt(this.props.nowidx/4);

    //get all page
    const pageamount=Math.ceil(this.props.imgs[this.props.nowalbum].length/4)

    const showSpans=()=>{
      var ARR=[];
      for(let i=0;i<pageamount;i++){
        ARR.push(<span 
              key={i} 
              style={{"width":100/pageamount+"%"}}
              className={classnames({
                cur:i==currPage
              })}
              onMouseEnter={(e)=>{
                //use dom to pull unit
                $(this.refs.unit).css("left",290*i+"px")
                //use dom to change the class of the spans,whose class is "cur"
                $(e.target).addClass("cur").siblings().removeClass("cur")
              }}
              
           ></span>)
      }
      return ARR;
    }

    return (
      <div className="smallpics" onMouseLeave={()=>{
        const currPage=parseInt(this.props.nowidx/4);
        $(this.refs.unit).css("left",290*currPage+"px");
        $(this.refs.pageNav).find("span").eq(currPage).addClass("cur").siblings().removeClass("cur");

      }}>
                {/* {JSON.stringify(this.props.imgs[this.props.nowalbum])} */}
              <div className="unit" ref="unit" style={{"left":-290*currPage+"px"}}>
                {
                  showUlLis()
                }
              </div>
              <div className="pageNav" ref="pageNav">
                {
                  showSpans()
                }
              </div>
      </div>
    )
  }
}
export default connect(
  ({picshow})=>({
    imgs:picshow.carinfo.imgs,
    nowalbum:picshow.nowalbum,
    nowidx:picshow.nowidx,
    nowid:picshow.nowid
  })

)(Smallpics)