import React from 'react'
import { connect } from 'dva';

class Carinfo extends React.Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
        <div className="carinfo">
            <h1>
              {this.props.carinfo.brand}
              {this.props.carinfo.series}
          <small>[{this.props.nowid}]</small>
            </h1>
            <h3>
              {this.props.carinfo.color}
              {this.props.carinfo.price}
              {new Date(this.props.carinfo.buydate).getFullYear()}
              {this.props.carinfo.displacement}
              {Math.round(this.props.carinfo.km/1000)}
              </h3>
      </div>
    )
  }
}

export default connect(
  ({picshow})=>({
    carinfo:picshow.carinfo,
    nowid:picshow.nowid
  })

)(Carinfo)


