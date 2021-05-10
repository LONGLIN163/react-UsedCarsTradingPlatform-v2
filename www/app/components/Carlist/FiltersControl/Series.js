import React from 'react'
import {connect} from 'dva'
import classnames from 'classnames'

class Series extends React.Component {
    constructor(props){
        super(props)
        //console.log("Series---",props)
    }
    
  //stop the dead connect loop between Tags and Carlist
  //actually here it dosent mattter which life-circle function
  //if brand tag is dispear,series dispear
  shouldComponentUpdate(nextProps){
    //console.log("-------------:",nextProps)
    if(nextProps.filters.brand=="" && this.props.filters.brand!=""){
      this.props.setnowseries([]);
      //also can play like this
      this.props.dispatch({"type":"carlist/changeFilter","propsname":"series","value":[]})
    } 
    return true;
  }


  render() {

    return (
      <div>

         {
             this.props.nowseries.map(item=>{
                 //return <em key={item}>{item}</em>
                 return <em 
                    key={item}
                    className={classnames({"cur":this.props.filters.series==item})}
                    onClick={()=>{                       
                          //this.props.setnowseries(Object.values(_item)[0]);
                          this.props.dispatch({
                            "type":"carlist/changeFilter",
                            "propsname":"series",
                            "value":item
                          })
                        }}
                 >{item}
                 </em>
             })
         }
      </div>
    )
  }
}

export default connect(
  ({carlist})=>({
    filters:carlist.filters
  })
)(Series)


