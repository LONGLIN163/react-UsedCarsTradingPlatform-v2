import dva from 'dva'
import logger from 'redux-logger'

//create app
const app=dva({
    onAction:logger
})

import picshow from "./models/picshow"
import carlist from "./models/carlist"
import addCar from "./models/addCar"
import router from "./router"

//use router() to return a jsx obj
app.router(router)

//model regist
app.model(picshow)
app.model(carlist)
app.model(addCar)

//mount app to the dom
app.start("#app")