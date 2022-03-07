import React from 'react'
import Slider from './Slider'
import App from '../../pages/App'
import './Slider.less'
import {connect} from 'dva'

class Index extends React.Component {
  constructor(props){
    super(props)
    console.log("....",props)
  }

  render() {
    
    return (

        <App>
            <Slider>
            </Slider>
        </App>
    )
  }
}

export default connect(
    ({carlist})=>({
      carlist:carlist
    })
  )(Index)