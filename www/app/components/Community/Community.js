import React from 'react'
import { connect } from 'dva';

import BuyPage from '../../container/BuyPage'



class Community extends React.Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <BuyPage>

          <div>
             <h1>This part is on progress.....</h1>
          </div>

      </BuyPage>
    )
  }
}
export default connect(
  
)(Community)
