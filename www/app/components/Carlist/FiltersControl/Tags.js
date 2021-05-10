import React from 'react'
import { Tag } from 'antd';
import { connect } from 'dva';
import moment from 'moment'

class Tags extends React.Component {
  constructor(props){
      super(props)

  }
   

  render() {
    return (
      <div>
            {
            Object.keys(this.props.filters).map(item=>{
                //if the obj of this key is empty,dont put any thing
                if(this.props.filters[item].length==0) return null;
                
                if(item=="price"){
                  if(this.props.filters[item][0]==0&&this.props.filters[item][1]==100) return null;
                  return <Tag closable 
                              key={item}
                              onClose={(e)=>{
                                  e.preventDefault();
                                  this.props.dispatch({"type":"carlist/changeFilter","propsname":item,"value":[0,100]})
                              }}>
                              {item}:{this.props.filters[item].map(i=>i+"00€").join("~")}
                  </Tag>
                  } else if(item=="km"){
                    if(this.props.filters[item][0]==0&&this.props.filters[item][1]==300000) return null;
                    return <Tag closable 
                                key={item}
                                onClose={(e)=>{
                                    e.preventDefault();
                                    this.props.dispatch({"type":"carlist/changeFilter","propsname":item,"value":[0,300000]})
                                }}>
                                {item}:{this.props.filters[item].map(i=>i/10000+"tkm").join("~")}
                    </Tag>
                    }else if(item=="brand"){
                      return <Tag closable 
                                  key={item}
                                  onClose={(e)=>{
                                      e.preventDefault();
                                      this.props.dispatch({"type":"carlist/changeFilter","propsname":item,"value":[]})
                                      //this.props.dispatch({"type":"carlist/changeFilter","propsname":"series","value":[]})
                                  }}>
                                  {item}:{this.props.filters[item]}
                      </Tag>
                      }else if(item=="series" || item=="licenseplate" || item=="locality"){
                        return <Tag closable 
                                    key={item}
                                    onClose={(e)=>{
                                        e.preventDefault();
                                        this.props.dispatch({"type":"carlist/changeFilter","propsname":item,"value":[]})
                                    }}>
                                    {item}:{this.props.filters[item]}
                        </Tag>
                        }else if(item=="buydate"){
                          return <Tag closable 
                                      key={item}
                                      onClose={(e)=>{
                                          e.preventDefault();
                                          this.props.dispatch({"type":"carlist/changeFilter","propsname":"buydate","value":[]})
                                      }}>

                                      {item}:{this.props.filters[item].map(m=>{
                                          return moment(m).format('YYYY-MM-DD')
                                        }).join("~")}

                          </Tag>
                          }else{
                    return <Tag closable 
                              key={item}
                              onClose={(e)=>{
                                  e.preventDefault();
                                  this.props.dispatch({"type":"carlist/changeFilter","propsname":item,"value":[]})
                              }}>
                              {item}:{this.props.filters[item].join("/")}
                  </Tag>
                  }

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
  )(Tags)


