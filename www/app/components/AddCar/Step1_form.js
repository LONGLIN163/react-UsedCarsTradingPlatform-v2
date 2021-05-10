import React from 'react'
import { Steps } from 'antd';
const Step = Steps.Step;
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Radio,DatePicker 
} from 'antd';
const Option = Select.Option;
import { parse } from 'path';

const RadioGroup = Radio.Group;

export default class Step1_form extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {/**********************BrandAndSeries************************** */}
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="BrandAndSeries"
          >
            {getFieldDecorator('brandAndSeries', {
              rules: [
                {
                  required: true, message: "Required",
                }
            ],
            })(
              <Cascader options={this.props.brandAndSeriesOption} />
            )}
          </Form.Item>

           {/**********************gearbox************************** */}

          <Form.Item
            label="Gearbox"
          >
            {getFieldDecorator('gearbox', {
              rules: [
                  {
                    required: true, message: "Required",
                  }
              ],
            })(
              <Select>
                {
                  ["automatic","manual","AMT"].map(item=>{
                    return <Option value={item} key={item}>{item}</Option>
                  })
                }
              </Select>
            )}
          </Form.Item>

           {/**********************displacement************************** */}

          <Form.Item
            label="displacement"
          >
            {getFieldDecorator('displacement', {
              rules: [
                  {
                    required: true, message: "Required",
                  }
              ],
            })(
              <Select>
                {
                  ["1.0L","1.2L","1.6L","1.6T","2.0L","2.0T","5.0L"].map(item=>{
                    return <Option value={item} key={item}>{item}</Option>
                  })
                }
              </Select>
            )}
          </Form.Item>

           {/**********************Fuel************************** */}

          <Form.Item
            label="Fuel"
          >
            {getFieldDecorator('fuel', {
              rules: [
                  {
                    required: true, message: "Required",
                  }
              ],
            })(
              <Select>
                {
                  ["electric","Hybrid ","gasoline","diesel"].map(item=>{
                    return <Option value={item} key={item}>{item}</Option>
                  })
                }
              </Select>
            )}
          </Form.Item>

           {/**********************eco************************** */}

          <Form.Item
            label="Eco"
          >
            {getFieldDecorator('eco', {
              rules: [
                  {
                    required: true, message: "Required",
                  }
              ],
            })(
              <Select>
                {
                  ["E1","E2","E3","E4","E5"].map(item=>{
                    return <Option value={item} key={item}>{item}</Option>
                  })
                }
              </Select>
            )}
          </Form.Item>
          
           {/**********************Buydate************************** */}

          <Form.Item
            label="Buydate"
          >
            {getFieldDecorator('buydate', {
              rules: [
                  {
                    required: true, message: "Required",
                  }
              ],
            })(
             <DatePicker ></DatePicker >
            )}
          </Form.Item> 

           {/**********************licenseplate************************** */}

          <Form.Item
            label="Licenseplate"
          >
            {getFieldDecorator('licenseplate', {
              rules: [
                  {
                    required: true, message: "Required",
                  }
              ],
            })(
              <Select>
                <Option value={0}>Yes</Option>
                <Option value={1}>No</Option>
              </Select>
            )}
          </Form.Item>

           {/**********************Locality************************** */}

          <Form.Item
            label="Locality"
          >
            {getFieldDecorator('locality', {
              rules: [
                  {
                    required: true, message: "Required",
                  }
              ],
            })(
              <Select>
                <Option value={0}>Yes</Option>
                <Option value={1}>No</Option>
              </Select>
            )}
          </Form.Item>

           {/**********************Color************************** */}

          <Form.Item
            label="Color"
          >
            {getFieldDecorator('color', {
              rules: [
                  {
                    required: true, message: "Required",
                  }
              ],
            })(
              <Select>
                {
                  ["black","white","red","green","silver","grey","brown"].map(item=>{
                    return <Option value={item} key={item}>{item}</Option>
                  })
                }
              </Select>
            )}
          </Form.Item>

           {/**********************Type************************** */}

          <Form.Item
            label="Type"
          >
            {getFieldDecorator('type', {
              rules: [ 
                  {
                    required: true, message: "Required",
                  }
              ],
            })(
              <Select>
                {
                  ["high","middle","luxury","SUV","economic"].map(item=>{
                    return <Option value={item} key={item}>{item}</Option>
                  })
                }
              </Select>
            )}
          </Form.Item>
          
           {/**********************Price************************** */}

          <Form.Item
            label="Price(€)"
          >
            {getFieldDecorator('price', {
              rules: [
                {
                  // "pattern": /^\d+$/, //regax way to limit number input

                  //input a number in a scope
                  validator: function(rule, value, callback){
                    //console.log(value)
                    value=Number(value);//it gonna be NaN if value is not number,NaN can not be compared 
                    if(!(parseFloat(value)>=0&&parseFloat(value)<=100)){
                      callback("Please input number between 0-100");
                      return;
                    }
                    callback()
                  }
                  // "message": "Please input the number",
                }, 
                {
                    "required": true, "message": "Required",
                }
              ],
            })(
              <Input></Input> 
            )}
          </Form.Item>

           {/**********************Km(km)************************** */}

          <Form.Item
            label="Km(km)"
          >
            {getFieldDecorator('km', {
              rules: [
                {
                  // "pattern": /^\d+$/, //regax way to limit number input

                  //input a number in a scope
                  validator: function(rule, value, callback){
                    //console.log(value)
                    value=Number(value);//it gonna be NaN if value is not number,NaN can not be compared 
                    if(!(parseFloat(value)>=0&&parseFloat(value)<=10000)){
                      callback("Please input number between 0-10000");
                      return;
                    }
                    callback()
                  }
                  // "message": "Please input the number",
                }, 
                {
                    "required": true, "message": "Required",
                }
              ],
            })(
              <Input></Input> 
            )}
          </Form.Item>
        </Form>
      </div>
    )
  }
}
