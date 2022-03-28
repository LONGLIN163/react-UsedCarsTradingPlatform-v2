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
        disableNextInStep2:true,
        step3:{
            files:[]
        }
    },
    reducers:{
        changeStep1(state,{propname,value}){
            
            return R.set(
                      R.lensProp("step1"), 
                      R.set( 
                        R.lensProp(propname), 
                        value, //1. focus on propname, set new value for the prop with this propname, return new step1 obj
                        state.step1
                      ), // 2. focus on step1, set the value of step1 in state
                   state)

        },
        changeStep2Next(state,{activeNextBtn}){
            return R.set(R.lensProp("disableNextInStep2"),activeNextBtn,state)
        },    
        changeStep2(state,{obj}){
            return R.set(R.lensProp("step2"),obj,state)
        },    
        changeStep3(state,{arr}){
            var files=R.clone(state.step3.files)// deep clone 
            files=files.concat(arr)
            return R.set(
                R.lensProp("step3"),
                R.set(
                    R.lensProp("files"),
                    files,
                    state.step3
                ),
                state)
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
        },    
        delStep3OneFilename(state,{itemDel}){
            console.log
            return R.set(
                R.lensProp("step3"),
                R.set(
                    R.lensProp("files"),
                    state.step3.files.filter(({filename})=>filename!==itemDel),
                    state.step3),
                state)
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

