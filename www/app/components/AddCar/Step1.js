import React from 'react'
import { Form } from 'antd'
import Step1_form from './Step1_form'
import {connect} from 'dva'

class Step1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            brandAndSeriesOption: []
        }
    }

    componentDidMount() {
        //get all the brand and series
        this.loadBrandAndSeries((brandAndSeries) => {
            var brandAndSeriesOption = []
            for (var k in brandAndSeries) {
                brandAndSeriesOption.push({
                    value: k,
                    label: k,
                    children: brandAndSeries[k].map(item => ({
                        value: Object.keys(item)[0],
                        label: Object.keys(item)[0],
                        children: Object.values(item)[0].map(_item=>({
                            value: _item,
                            label: _item
                        }))
                    }))
                })
            }
            this.setState({
                brandAndSeriesOption
            })
        })
    }

    //get all the brand and series
    async loadBrandAndSeries(callback) {
        const brandAndSeries = await fetch("/brandAndSeries").then(data => data.json())
        callback(brandAndSeries)
    }

    render() {
        //create form package copo
        const WrappedRegistrationForm = Form.create(
            { 
                onFieldsChange:(fields)=>{
                    //console.log("fields***",fields)
                    this.props.dispatch({
                        "type":"addCar/changeStep1",
                        "propname":Object.keys(fields)[0],
                        "value":Object.values(fields)[0]
                    })
                }
            }
        )(Step1_form);

        return (
            <div>
                <h1>
                    <WrappedRegistrationForm brandAndSeriesOption={this.state.brandAndSeriesOption}></WrappedRegistrationForm>
                </h1>
            </div>
        )
    }
}

export default connect()(Step1)
