import React from 'react'
import { Row, Col, Button, Modal } from 'antd';
import { Table } from 'antd';
import moment from 'moment'
import { connect } from 'dva'
import MyModal from './MyModal'
import * as columns from './columns'
import {push} from 'react-router-redux'


class TableBox extends React.Component {
  constructor(props) {
    super(props)

    //-----------use localStorage to persistent data onOk-------------:
    //1.make judge if there is data in localStorage
    //2.use localStorage to persistent data onOk()
    if(!localStorage.getItem("coolcars-cols")){
      var initialCols= ["id", "thumnails", "km", "price","color", "buydate"]
    }else{  
      var initialCols= JSON.parse(localStorage.getItem("coolcars-cols"))
    }

    this.state = {
      isShowModal: false,
      cols: ["id", "thumnails", "km", "price","color", "buydate"]
    }
    console.log("this.props.sortInfo.sortDirection1---------------", this.props.sortInfo.sortDirection)

  }

  componentDidMount(){
    var self=this
    //give all div with data-img attr onClick event
   $(this.refs.tableBox).delegate("div[data-img]","click",function(){
      self.props.dispatch(push("/picshow/"+$(this).data("img")))
    })
  }



  render() {
    //use the order of cols in state to change or define table columns
    const columnsArr = this.state.cols.map(item => columns[item])

    //receive new cols order from child(drag tag),change cols(for ok button)
    var tempCol=[];
    const getColsInfo=(colsOrder)=>{
      tempCol=colsOrder;
      console.log("tempCol:",tempCol)
    }
    return <div className="tableBox" ref="tableBox">
      <Row>
        <Col span={6}>
          <h3>{this.props.count} cars match the filter criteria.current page:{this.props.pageInfo.page}/{this.props.pageInfo.pagesize}</h3>
        </Col>
        <Col span={12}></Col>
        <Col span={2}>
          <Button
            type="primary"
            shape="circle"
            icon="setting"
            onClick={() => {
              this.setState({
                isShowModal: true
              })
            }}
            />
        </Col>
        <Col span={4}>
          <Button type="primary" shape="circle" icon="search" />B
            </Col>
      </Row>

      <Modal
        title="Basic Modal"
        visible={this.state.isShowModal}
        //close Modal panel,by the way change cols
        onOk={() => {
          this.setState({
            isShowModal: false,
            cols:tempCol
          })
          //change localStorage
          //check application in concle to check if store success
          localStorage.setItem("coolcars-cols",JSON.stringify(tempCol))
        }}
        //only close Modal panel
        onCancel={() => {
          this.setState({
            isShowModal: false
          })
        }}
        destroyOnClose={true}
      >
        <MyModal cols={this.state.cols} getColsInfo={getColsInfo.bind(this)}></MyModal>

      </Modal>

      <Table
        dataSource={this.props.cars}
        //dataSource={[]} 
        columns={columnsArr}
        pagination={{
          current: this.props.pageInfo.page,
          pageSize: this.props.pageInfo.pagesize,
          total: this.props.count,
          showSizeChanger: true//what if we want user chouse how many item show in each page???
        }}
        onChange={(pagination, filters, sorter) => {
          //console.log("sorter---------------", sorter)
          //console.log("columnKey---------------", sorter.columnKey)
          //console.log("sortDirection---------------", sorter.order)
          //console.log("this.props.sortInfo.sortDirection2---------------", this.props.sortInfo.sortDirection)

          //console.log("pagination",pagination)
          this.props.dispatch({
            "type": "carlist/changePageOrSort",
            "page": pagination.current,
            "pagesize": pagination.pageSize,
            "sortBy": sorter.columnKey,
            "sortDirection": sorter.order == 'ascend' ? 1 : -1
            //"sortDirection":sorter.order=="ascend"?1:-1
          })
        }}
        rowKey="id"
      />
    </div>
  }
}
export default connect(
  ({ carlist }) => ({
    cars: carlist.cars,
    pageInfo: carlist.pageInfo,
    count: carlist.count,
    sortInfo: carlist.sortInfo
  })
)(TableBox)

