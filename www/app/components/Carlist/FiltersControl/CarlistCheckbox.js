import React from 'react'
import {Checkbox} from 'antd';
const CheckboxGroup = Checkbox.Group;
import { connect } from 'dva';

class CarlistCheckbox extends React.Component {
  constructor(props){
      super(props)

  }
  render() {
    return (
      <div>
            <CheckboxGroup 
                options={
                   this.props.options.map(item=>{
                       return {"label":item,"value":item}
                   })
                }
                //value={this.props.filters.color}
                value={this.props.filters[this.props.propsname]}
                onChange={(value)=>{

                    //change the value on target property
                    this.props.dispatch({
                        "type":"carlist/changeFilter",
                        "propsname":this.props.propsname,
                        value
                    })
                }}
            />
      </div>
    )
  }
}
export default connect(
    ({carlist})=>({
      filters:carlist.filters
    })
  )(CarlistCheckbox)