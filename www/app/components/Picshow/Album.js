import React from 'react'
import { connect } from 'dva';
import classnames from 'classnames'

class Album extends React.Component {
    constructor(props){
        super(props)
    }
  render() {
    if(!this.props.carinfo.imgs) return null;

    return (
        <div className="album">
            <ul>
              <li 
                onClick={()=>{
                  this.props.dispatch({"type":"picshow/changealbum","nowalbum":"view"})
                }}
                className={classnames({"cur":this.props.nowalbum=="view"})}>view({this.props.carinfo.imgs.view.length})</li>
              <li 
                onClick={()=>{
                  this.props.dispatch({"type":"picshow/changealbum","nowalbum":"inner"})
                }}
                className={classnames({"cur":this.props.nowalbum=="inner"})}>inner({this.props.carinfo.imgs.inner.length})</li>
              <li
                onClick={()=>{
                  this.props.dispatch({"type":"picshow/changealbum","nowalbum":"engine"})
                }} 
                className={classnames({"cur":this.props.nowalbum=="engine"})}>engine({this.props.carinfo.imgs.engine.length})</li>
              <li 
                onClick={()=>{
                  this.props.dispatch({"type":"picshow/changealbum","nowalbum":"more"})
                }}
                className={classnames({"cur":this.props.nowalbum=="more"})}>more({this.props.carinfo.imgs.more.length})</li>
            </ul>
        </div>
    )
  }
}

export default connect(
  ({picshow})=>({
    carinfo:picshow.carinfo,
    nowid:picshow.nowid,
    nowalbum:picshow.nowalbum
  })

)(Album)



