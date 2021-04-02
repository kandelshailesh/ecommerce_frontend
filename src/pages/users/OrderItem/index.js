/* eslint-disable */
import React, { useEffect } from 'react'
import {
  Button,
  Form, // Input,Upload,
  Select,
  Row,
  Col,
  InputNumber,
} from 'antd'
import AddNew from 'components/AddNew'
import Dynamic from './orderField'

const FormIndex = (props) => {
  console.log('FormIndex props', props)
  const { values, setValues, errors, products } = props

  // useEffect(()=>{
  //   setValues({
  //     ...values,
  //     order_item:values?.order_item
  //   })
  // },[])

  const onClickAddAttr = () => {
    setValues((a) => {
      const newData = {
        product_id: '',
        quantity: 1,
        price: 0,
      }
      a.order_item = [...a.order_item, newData]
      return { ...a }
    })
  }

  const handleDeleteAttr = (ind) => {
    setValues((a) => {
      const filtered = a.order_item.filter((i, index) => index !== ind)
      return { ...a, order_item: filtered }
    })
  }

  return (
    <div>
      <Row>
        <Col xs={4} sm={4} md={2} lg={2} xl={2}>
          <AddNew add onClick={onClickAddAttr} attribute="Order Item" />
        </Col>
      </Row>
      {values?.order_item?.map((i, index, array) => {
        console.log('ffffffffffffff', array, values.order_item.length, i, index)
        return (
          <Row key={index} gutter={10}>
            <Dynamic
              key={index}
              index={index}
              values={values}
              setValues={setValues}
              i={i}
              errors={errors}
              products={products}
            />
            {
              <Col span={24}>
                <AddNew onRemove={() => handleDeleteAttr(index)} attribute="Order Item" />
              </Col>
            }
          </Row>
        )
      })}
    </div>
  )
}

export default FormIndex
