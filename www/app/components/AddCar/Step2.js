import React from 'react'
import Step2_upunit from './Step2_upunit'


export default class Step2 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        
        {/* <input type="file" ref="myfilectrl" hidden multiple /> */}
        <Step2_upunit album="view" title="VIEW"></Step2_upunit>
        <Step2_upunit album="inner" title="INNER"></Step2_upunit>
        <Step2_upunit album="engine" title="ENGINE"></Step2_upunit>
        <Step2_upunit album="more" title="MORE"></Step2_upunit>
  
      </div>
    )
  }
}


