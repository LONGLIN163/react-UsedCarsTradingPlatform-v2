import React from 'react'
import Step2_upunit from './Step2_upunit'


export default class Step2 extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div>
        <Step2_upunit getImagesObj={this.props.getImagesObj} album="view" title="VIEW"></Step2_upunit>
        <Step2_upunit getImagesObj={this.props.getImagesObj} album="inner" title="INNER"></Step2_upunit>
        <Step2_upunit getImagesObj={this.props.getImagesObj} album="engine" title="ENGINE"></Step2_upunit>
        <Step2_upunit getImagesObj={this.props.getImagesObj} album="more" title="MORE"></Step2_upunit>
      </div>
    )
  }
}


