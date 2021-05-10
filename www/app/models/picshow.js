import * as R from "ramda"
export default {
    namespace:"picshow",
    state:{
        nowid:1000038,
        nowalbum:"view",
        nowidx:0,
        carinfo:{},
        carlike:[]
    },
    reducers:{
        
        changeNowid(state,action){
            return R.set(R.lensProp("nowid"),action.nowid,state);
        },
        changeCarinfo(state,action){
            return R.set(R.lensProp("carinfo"),action.carinfo,state);
        },
        changeNowalbum(state,action){
            return R.set(R.lensProp("nowalbum"),action.nowalbum,state);
        },
        changeNowidx(state,action){
            return R.set(R.lensProp("nowidx"),action.nowidx,state);
        },
        changeCarlike(state,action){
            return R.set(R.lensProp("carlike"),action.carlike,state);
        },

    },
    effects:{
        //initialize the page info,especially for getting the data of carinfo and carlike
        *init(action,{put,call,select}){
            //get now id
            //const {nowid} = yield select(state=>state.picshow)
            // alert(nowid)

            //change nowid by action
            yield put({"type":"changeNowid","nowid":action.nowid})

            //set request to get carinfo
            //const {result}=yield fetch("/carinfo/"+nowid).then(data=>data.json());
            const {result}=yield fetch("/carinfo/"+action.nowid).then(data=>data.json());
            //console.log(result)
            //now we have change carinfo and carlike data,so we need reducers(up)
            
            //after complete the reducers,change carinfo
            yield put({"type":"changeCarinfo","carinfo":result})
            //console.log(123)
            
            //sent request to get carlike,then change carlike
            const {results}=yield fetch("/carlike/"+action.nowid).then(data=>data.json());

            //change carlike info
            yield put({"type":"changeCarlike","carlike":results})

            yield put({"type":"changeNowalbum","nowalbum":"view"})
            //change nowidx
            yield put({"type":"changeNowidx","nowidx":0})

        },
        //change album and change nowidx to 0,when change nowalbum value.
        *changealbum(action,{put,call,select}){
            yield put({"type":"changeNowalbum","nowalbum":action.nowalbum})
            yield put({"type":"changeNowidx","nowidx":0})
        },
        *goNext(action,{put,call,select}){
            //get nowidx first
            const {nowidx} = yield select(state=>state.picshow)

            //is the end of this album?
            //get this album
            const {nowalbum}= yield select(state=>state.picshow)
            
            //get imgs first
            const {carinfo:{imgs}}=yield select(state=>state.picshow)
            
            //alert(imgs[nowalbum].length)

            if(nowidx<imgs[nowalbum].length-1){
                //plus 1 for change next pic
                yield put({"type":"changeNowidx","nowidx":nowidx+1})
            }else{
                // album order
                const albumarr=["view","inner","engine","more"];
                // get the current subalbum position in all album
                var currentAlbumPosition=albumarr.indexOf(nowalbum);
                //get next folder position
                currentAlbumPosition++;
                //change folder now
                //yield put({"type":"changeNowalbum","nowalbum":albumarr[currentAlbumPosition]})
                yield put({"type":"changeNowalbum","nowalbum":albumarr[currentAlbumPosition%4]})
                yield put({"type":"changeNowidx","nowidx":0})

            }
        },
        *goPre(action,{put,call,select}){
                //get nowidx first
                const {nowidx} = yield select(state=>state.picshow)
    
                //is the end of this album?
                //get this album
                const {nowalbum}= yield select(state=>state.picshow)
                
                //get imgs first
                const {carinfo:{imgs}}=yield select(state=>state.picshow)
                
                //alert(imgs[nowalbum].length)
    
                if(nowidx>0){
                    //plus 1 for change next pic
                    yield put({"type":"changeNowidx","nowidx":nowidx-1})
                }else{
                    // album order
                    const albumarr=["view","inner","engine","more"];
                    // get the current subalbum position in all album
                    var currentAlbumPosition=albumarr.indexOf(nowalbum);
                    //get next folder position
                    currentAlbumPosition--;
                    //point to the last album of the previous big album
                    if( currentAlbumPosition==-1){
                        currentAlbumPosition=3
                    }
                    //change folder now
                    //yield put({"type":"changeNowalbum","nowalbum":albumarr[currentAlbumPosition]})
                    yield put({"type":"changeNowalbum","nowalbum":albumarr[currentAlbumPosition]})
                    yield put({"type":"changeNowidx","nowidx":imgs[albumarr[currentAlbumPosition]].length-1})
                }
    
        }
    }
}