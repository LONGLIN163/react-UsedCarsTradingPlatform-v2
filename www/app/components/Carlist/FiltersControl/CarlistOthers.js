import React from 'react'
import {Menu, Dropdown,Button,Icon, message} from 'antd';
import {connect} from "dva"

class CarlistOthers extends React.Component {
    constructor(props){
        super(props)
    }
  render() {
    const menu = (
        <Menu onClick={(value)=>{
            this.props.dispatch({
                "type":"carlist/changeFilter",
                "propsname":this.props.propsname,
                "value":value.key
            })
        }}>
                {
                    this.props.options.map(item=>{
                        return  <Menu.Item key={item}>{item}</Menu.Item>
                    })
                }
        </Menu>
      );
    return (
      <div> 
            {/* if it has licence */}
            {this.props.otherInfo}
            <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                    {this.props.filters[this.props.propsname]||"Any"} <Icon type="down" />
                </Button>
            </Dropdown>
      </div>
    )
  }
}
export default connect(
    ({carlist})=>({
        filters:carlist.filters
    })
)(CarlistOthers)