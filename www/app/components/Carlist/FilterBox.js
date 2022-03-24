import React from 'react'
import { Row, Col,Checkbox,Tag } from 'antd';
const CheckboxGroup = Checkbox.Group;

import Tags from './FiltersControl/Tags'
import CarlistCheckbox from './FiltersControl/CarlistCheckbox'
import CarlistPriceSlider from './FiltersControl/CarlistPriceSlider'
import CarlistKmSlider from './FiltersControl/CarlistKmSlider'
import Buydate from './FiltersControl/Buydate'
import Brand from './FiltersControl/Brand'
import Series from './FiltersControl/Series'
import CarlistOthers from './FiltersControl/CarlistOthers'

export default class FilterBox extends React.Component {
  constructor(props){
    super(props)
    this.state={
      nowseries:[]
    }
  }
  setnowseries(nowseries){
    console.log("currentSeries",nowseries)
    this.setState({nowseries});
  }
  render() {
    return (
      <div>
         <Row>
            <Col span={3}>
                Brand
            </Col>
            <Col span={21}>
                <Brand setnowseries={this.setnowseries.bind(this)}></Brand>
            </Col>
          </Row>

         <Row>
            <Col span={3}>
                Series
            </Col>
            <Col span={21}>
                <Series nowseries={this.state.nowseries} setnowseries={this.setnowseries.bind(this)}></Series>
            </Col>
          </Row>


         <Row>
            <Col span={3}>
                Type:
            </Col>
            <Col span={21}>
                <CarlistCheckbox options={["high","middle","luxury","SUV","economic"]} propsname="type"></CarlistCheckbox>
                
            </Col>
          </Row>

         <Row>
            <Col span={3}>
                Color
            </Col>
            <Col span={21}>
                <CarlistCheckbox options={["black","white","red","green","silver","grey","brown"]} propsname="color"></CarlistCheckbox>
            </Col>
          </Row>


          <Row>
            <Col span={3}>
                Eco
            </Col>
            <Col span={21}>
                <CarlistCheckbox options={["E1","E2","E3","E4","E5"]} propsname="eco"></CarlistCheckbox>
            </Col>
          </Row>


          <Row>
            <Col span={3}>
             Gearbox
            </Col>
            <Col span={21}>
                <CarlistCheckbox options={["automatic","manual","AMT"]} propsname="gearbox"></CarlistCheckbox>
            </Col>
          </Row>


          <Row>
            <Col span={3}>
             Displacement
            </Col>
            <Col span={21}>
                <CarlistCheckbox options={["1.0L","1.2L","1.6L","1.6T","2.0L","2.0T","5.0L"]} propsname="displacement"></CarlistCheckbox>
            </Col>
          </Row>

          <Row>
            <Col span={3}>
             Fuel
            </Col>
            <Col span={21}>
                <CarlistCheckbox options={["electric","Hybrid ","gasoline","diesel"]} propsname="fuel"></CarlistCheckbox>
            </Col>
          </Row>


          <Row>
            <Col span={3}>
             Price(€)
            </Col>
            <Col span={21}>
               <CarlistPriceSlider></CarlistPriceSlider>
            </Col>
          </Row>

          <Row>
            <Col span={3}>
            ODO(tkm)
            </Col>
            <Col span={21}>
               <CarlistKmSlider></CarlistKmSlider>
            </Col>
          </Row>

          <Row>
            <Col span={3}>
            BuyDate:
            </Col>
            <Col span={21}>
               <Buydate></Buydate>
            </Col>
          </Row>

          <Row>
            <Col span={3}>
            Others:
            </Col>
            <Col span={21}>
                <Row>
                  <Col span={6}>
                      <CarlistOthers otherInfo="licenseUp" options={["Yes","No"]} propsname="licenseplate"></CarlistOthers>
                  </Col>
                  <Col span={6}>
                      <CarlistOthers otherInfo="localUp" options={["Yes","No"]} propsname="locality"></CarlistOthers>
                  </Col>
                </Row>

            </Col>
          </Row>

          <Row className="lastRow">
              <Col span={3}>
                  current:
              </Col>
              <Col span={21}>
                  <Tags></Tags> 
              </Col>
          </Row>
     </div>
    )
  }
}
