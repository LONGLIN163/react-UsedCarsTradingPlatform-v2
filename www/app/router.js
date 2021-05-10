import React from 'react'

//import { Router, Route, browserHistory } from 'react-router'
import { Router, Route, hashHistory,IndexRedirect,Redirect } from 'react-router'
import { syncHistoryWithStore, routerReducer,ConnectedRouter } from 'react-router-redux'


import Carlist from './components/Carlist/Carlist.js'
import Community from './components/Community/Community.js'
import AddCar from './components/AddCar/AddCar'
import Picshow from './components/Picshow/Picshow'
import Index from './components/Index/Index'

export default ({history })=>{
   return <ConnectedRouter  history={history}>
      <div>

         <Route path="/" exact component={Index} />
         <Route path="/buy/carlist" exact component={Carlist} />
         <Route path="/sale/community" exact component={Community} />
         <Route path="/sale/addcar" exact component={AddCar} />
         <Route path="/picshow/:id" exact component={Picshow} />

      </div>
 </ConnectedRouter >
}

// export default ()=>{
//    //return <Carlist></Carlist>
//    return <Picshow></Picshow>
// }