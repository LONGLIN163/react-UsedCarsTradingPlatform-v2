import React from 'react'
import { connect } from 'dva';

import FilterBox from './FilterBox'
import TableBox from './TableBox'

import BuyPage from '../../container/BuyPage'

import './carlist.less'

class Carlist extends React.Component {
  constructor(props){
    super(props)
    //call defalt data
    //props.dispatch({"type":"init"})
    props.dispatch({"type":"carlist/init"})
  }
  
  render() {
    return (
      <BuyPage>

          <div>
            <FilterBox></FilterBox>
            <TableBox></TableBox>
          </div>

      </BuyPage>
    )
  }
}
export default connect(
  ({carlist})=>({
    carlist:carlist
  })
)(Carlist)
