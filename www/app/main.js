import dva from 'dva'
import logger from 'redux-logger'
import router from "./router"

import picshow from "./models/picshow"
import carlist from "./models/carlist"
import addCar from "./models/addCar"

//create app
const app=dva({
    onAction:logger
})

app.router(router)

//model regist
app.model(picshow)
app.model(carlist)
app.model(addCar)

//mount app to the dom
app.start("#app")