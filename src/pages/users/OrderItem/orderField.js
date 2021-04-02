/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Button, Form, Select, Radio, Input, InputNumber } from 'antd'
import useFetching from 'hooks/useFetching'
const widthStyle = { width: 300 }

const OrderItem = ({ values, setValues, index, i, errors,products }) => {
  console.log('cvalues',values.order_item,products)
  // const [{ response: products }] = useFetching(`/api/backend/v1/products`)
  // console.log('Categories Response', products)
const [Products, setProducts] = useState([])
  useEffect(()=>{
    if(products){
      setProducts(products)
    }
  },[])
console.log("product",Products)
  const formItems = [
    {
      type: (
        <Select
          name="product_id"
          value={i.product_id}
          // showSearch
          style={widthStyle}
          placeholder="Select Products"
          // optionFilterProp="children"
          onChange={(e) => {
            console.log('products in',e)
            setValues((a) => {
              a.order_item[index].product_id = e
              return { ...a }
            })
            const filterProduct=Products.filter(item=>item.id!==e)
            if(filterProduct.length>0) setProducts(filterProduct)
            // setProducts([])
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {Products?.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'product_id',
      label: 'Product',
      error: errors.product_id,
    },
    {
      type: (
        <InputNumber
          name="quantity"
          value={i.quantity}
          onChange={(e) =>{
            setValues((a) => {
              a.order_item[index].quantity = e
              return { ...a }
            })
          
           
            const quantitysum=values.order_item?.map(item=>item.quantity).reduce((acc,curr)=>acc+curr)
            console.log(quantitysum)
            setValues((a) => ({...a,total_quantity:quantitysum}))
            // const quantitysum=values.order_item?.map(item=>item.quantity).reduce((acc,curr)=>acc+curr)
            
          
          }
          }
          min={1}
        />
      ),
      key: 'quantity',
      label: 'Quantity',
      error: errors.quantity,
    },
    {
      type: (
        <Input
          value={i.price}
          name="price"
          onChange={(e) =>
            setValues((a) => {
              a.order_item[index].price = e?.target?.value
              return { ...a }
            })
          }
          type="number"
        />
      ),
      key: 'price',
      label: 'Price',
      error: errors.price,
    },
  ]

  return (
    <>
      {formItems.map((item) => {
        if (item.heading)
          return (
            <h4 key={item.heading} className="text-black mb-3">
              <strong>{item.heading}</strong>
            </h4>
          )
        return (
          <Form.Item
            key={item.key}
            label={item.label}
            validateStatus={item.error && 'error'}
            help={item.error}
          >
            {item.type}
          </Form.Item>
        )
      })}
    </>
  )
}

export default OrderItem
