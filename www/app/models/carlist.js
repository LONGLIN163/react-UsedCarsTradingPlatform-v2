import * as R from "ramda"
import {fetchServer} from './utils/server'
export default {
    namespace:"carlist",
    state:{
        "filters":{
           "brand":"",
           "series":"",
           "type":[],
           "color":[],
           "eco":[],
           "gearbox":[],
           "displacement":[],
           "fuel":[],
           "price":[0,100],
           "km":[0,30000000],
           "buydate":[],//jus can not use null none or undifine to fill it.
           "licenseplate":"",
           "locality":""

        },
        "pageInfo":{
            "page":1,
            "pagesize":10
        },
        "sortInfo":{
            "sortBy":"id",
            "sortDirection":1 
        },
        "cars":[],
        "count":0

    },
    reducers:{
        changeFilter_sync(state,{propsname,value}){
           return R.set(R.lensProp("filters"),R.set(R.lensProp(propsname),value,state.filters),
           state);
        },
        changeCars(state,{cars}){
           return R.set(R.lensProp("cars"),cars,state);
        },
        changeCount(state,{count}){
           return R.set(R.lensProp("count"),count,state);
        },
        changePage_sync(state,{page=state.pageInfo.page}){//give defalut value in case of getting undefine value
            return R.set(R.lensProp("pageInfo"),R.set(R.lensProp("page"),page,state.pageInfo),
            state);
        },
        changePageSize_sync(state,{pagesize=state.pageInfo.pagesize}){//give defalut value in case of getting undefine valu
            return R.set(R.lensProp("pageInfo"),R.set(R.lensProp("pagesize"),pagesize,state.pageInfo),
            state);
        },
        changeSortBy_sync(state,{sortBy=state.sortInfo.sortBy}){//give defalut value in case of getting undefine valu
            return R.set(R.lensProp("sortInfo"),R.set(R.lensProp("sortBy"),sortBy,state.sortInfo),
            state);
        },
        changeSortDirection_sync(state,{sortDirection=state.sortInfo.sortDirection}){//give defalut value in case of getting undefine valu
            return R.set(R.lensProp("sortInfo"),R.set(R.lensProp("sortDirection"),sortDirection,state.sortInfo),
            state);
        }
    },
    effects:{
        * changeFilter({propsname,value},{put,select,call}){
            //call sync
            yield put({"type":"changeFilter_sync",propsname,value});
            //sent request to server to get current filters 
            const {filters}=yield select(data=>data.carlist);
            
            //sent request to server to get current pageInfo
            const {pageInfo}=yield select(data=>data.carlist);
            //get current sortInfo
            const {sortInfo}=yield select(data=>data.carlist);

            //receive the result data from fetchserver(server.js)
            const {results,count}=yield call(fetchServer,filters,pageInfo,sortInfo);//pack the fetch filed to a component server.js
            
            //change the cars in filters
            yield put({"type":"changeCars","cars":results});
            yield put({"type":"changeCount","count":count});
            
        },
        
        //initialize the data
        * init(action,{put,select,call}){
            //sent request to server to get current filters 
            const {filters}=yield select(data=>data.carlist);
            
            //sent request to server to get current pageInfo
            const {pageInfo}=yield select(data=>data.carlist);

            //get current sortInfo
            const {sortInfo}=yield select(data=>data.carlist);
            
            //receive the result data from fetchserver(server.js)
            const {results,count}=yield call(fetchServer,filters,pageInfo,sortInfo);//pack the fetch filed to a component server.js
            
            //change the cars in filters
            yield put({"type":"changeCars","cars":results});
            yield put({"type":"changeCount","count":count});
            
        },
        * changePageOrSort({page,pagesize,sortBy,sortDirection},{put,select,call}){
            //get current pagesize first to see if user want to change pagesize
            var {pageInfo}=yield select(data=>data.carlist);
            var {sortInfo}=yield select(data=>data.carlist);
            console.log("sortInfo******",sortInfo)
            if(pagesize){
                //if user select option and change pagesize,different with last pagesize.change page to 1.
                page=pagesize!=pageInfo.pagesize?1:page;//first pagesize is the data passed here,the second pagesize is last pagesize
            }
            if(sortBy){
                //if user select option and change pagesize,different with last pagesize.change page to 1.
                page=sortBy!=sortInfo.sortBy?1:page;//first pagesize is the data passed here,the second pagesize is last pagesize
            }
            if(sortDirection){
                //if user select option and change pagesize,different with last pagesize.change page to 1.
                page=sortDirection!=sortInfo.sortDirection?1:page;//first pagesize is the data passed here,the second pagesize is last pagesize
            }

            //call sync
            yield put({"type":"changePage_sync",page});
            yield put({"type":"changePageSize_sync",pagesize});
            yield put({"type":"changeSortBy_sync",sortBy});
            yield put({"type":"changeSortDirection_sync",sortDirection});
            //sent request to server to get current filters 
            var {filters}=yield select(data=>data.carlist);
            
            //sent request to server to get current pageInfo
            var {pageInfo}=yield select(data=>data.carlist);

            //get current sortInfo
            var {sortInfo}=yield select(data=>data.carlist);

            //receive the result data from fetchserver(server.js)
            var {results,count}=yield call(fetchServer,filters,pageInfo,sortInfo);//pack the fetch filed to a component server.js
            
            //change the cars in filters
            yield put({"type":"changeCars","cars":results});
            yield put({"type":"changeCount","count":count});
        },   
    }
}
