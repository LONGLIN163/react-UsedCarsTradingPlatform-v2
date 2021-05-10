import React from 'react'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import {connect} from 'dva'
import classnames from 'classnames'
// import './calist.less'


class Brand extends React.Component {
    constructor(props){
        super(props)

        this.state={
          options:{}
        }

        this.loadServer((result)=>{
          console.log("loadServer---",result)
          this.setState({
            options:result
          })
          //console.log("loadServer2---",this.state.options)
        })

        //console.log("brandprops---",props)
        //console.log("brandoptions---",this.state.options)
    }
    
  async loadServer(callback){
    const result=await fetch("/brandAndSeries").then(data=>data.json());
    callback(result);
  }


  render() {

    return (
      <div>
            <Tabs ActiveKey="A">
            {
            Object.keys(this.state.options).map(item=>{
            return <TabPane tab={item} key={item}>
                          {
                            this.state.options[item].map((_item,index)=>{
                            return <em 
                                key={index} 
                                className={classnames({"cur":this.props.filters.brand==Object.keys(_item)[0]})}
                                onClick={()=>{                       
                                      this.props.setnowseries(Object.values(_item)[0]);
                                      this.props.dispatch({
                                        "type":"carlist/changeFilter",
                                        "propsname":"brand",
                                        "value":Object.keys(_item)[0]
                                      })
                                    }}>
                                    {Object.keys(_item)[0]}
                              </em>
                                
                            })
                          }
                      </TabPane>
                 })
            }
            </Tabs>

      </div>
    )
  }
}

export default connect(
  ({carlist})=>({
    filters:carlist.filters
  })
)(Brand)





{/* <Tabs ActiveKey="A">

{
  Object.keys(this.state.options).map(item=>{
    return <TabPane tab={item} key={item}>
              {
                this.state.options[item].map((_item,index)=>{
                  return <Button key={index} onClick={()=>{
                      //call carlist's function
                      //this.props.setnowseries(Object.values(_item)[0]);
                      //console.log(123)
                      alert(123)
                    }}>
                    {Object.keys(_item)[0]}
                    {/* ---
                    // {Object.values(_item)[0]} */}

//                     </Button>
                    
//                 })
//               }
//           </TabPane>
//   })
// }

// </Tabs> */}