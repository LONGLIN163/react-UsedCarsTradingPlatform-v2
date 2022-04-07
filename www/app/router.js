import React from 'react'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import Carlist from './components/Carlist/Carlist.js'
import AddCar from './components/AddCar/AddCar'
import Picshow from './components/Picshow/Picshow'

export default ({history })=>{
   return (
      <ConnectedRouter  history={history}>
         <div>
            <Route path="/" exact component={Carlist} />
            <Route path="/sale/addcar" exact component={AddCar} />
            <Route path="/picshow/:id" exact component={Picshow} />
         </div>
      </ConnectedRouter >
   )
}