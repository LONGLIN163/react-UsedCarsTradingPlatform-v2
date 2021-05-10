import * as R from "ramda"
export default {
    namespace:"addCar",
    state:{
        step1:{
          brandAndSeries:{value:"",errors:[]},
          color:{value:"",errors:[]},
          type:{value:"",errors:[]},
          price:{value:"",errors:[]},
          km:{value:"",errors:[]},
          gearbox:{value:"",errors:[]},
          displacement:{value:"",errors:[]},
          fuel:{value:"",errors:[]},
          buydate:{value:"",errors:[]},
          eco:{value:"",errors:[]},
          locality:{value:"",errors:[]},
          licenseplate:{value:"",errors:[]},
        },
        step2:{
            view:[],
            inner:[],
            engine:[],
            more:[]
        },
        step3:{
            //files:[{"filename":"ddddd.jpg"},{"realpath":"upload_ea548a2fc5e4298f31e09f11f702b30f.jpg"}]
            files:[]
        }
    },
    reducers:{
        // changeStep1(state,action){
        changeStep1(state,{propname,value}){
            return R.set(R.lensProp("step1"),R.set(R.lensProp(propname),value,state.step1),state)
        },
        changeStep2(state,{obj}){
            return R.set(R.lensProp("step2"),obj,state)
        },    
        changeStep3(state,{arr}){
            var files=R.clone(state.step3.files)
            files=files.concat(arr)
            return R.set(R.lensProp("step3"),R.set(R.lensProp("files"),files,state.step3),state)
        },
        changeStep3OneFilename(state,{filename,changedFilename}){
            return R.set(R.lensProp("step3"),R.set(R.lensProp("files"),state.step3.files.map(item=>{
                if(item.filename==filename){
                    return{
                        ...item,
                        changedFilename
                    }
                }
                return item
            }),state.step3),state)
        }    
    },
    effects:{
        *addCar(action,{put,select}){
            const {step1,step2,step3}=yield select(state=>state.addCar);
            yield fetch("/addCar",{
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json"
                },
                //we need to collect all the info together and to covert them to string for post
                "body":JSON.stringify({
                    step1,
                    step2,
                    step3
                })
            })
        }
        
    }
}

