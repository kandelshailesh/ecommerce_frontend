/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Button, Form, Select, Radio, Input, InputNumber } from 'antd'
const widthStyle = { width: 300 }

const OrderItem = ({ values, setValues, index, i, errors, products }) => {
  console.log('cvalues', values.order_item, products,index,errors)
 
  useEffect(()=>{
    let newArray=[]
    if(values?.order_item?.length>0){
          const finalOrder=values.order_item.forEach(item=>{
            const order=products?.filter(pitem=>pitem.id===item.product_id)?.map((ditem)=>{
                
                  return {
                    product_id:item.product_id,
                    name:ditem.name,
                    quantity:Number(item.quantity),
                    price:Number(item.price),
                    discount_type:ditem.discount_type,
                    discount_amount : Number(ditem.discount_amount),
                    product_old_price:ditem.old_price,
                    quantity:Number(values.quantity),
                    gAmount:Number(item?.quantity*item?.price),
                    discount:ditem?.discountable?(ditem?.discount_type=="%"?Number(item?.quantity*item.price*ditem.discount_amount/100):Number(ditem.discount_amount)):0
                    // discount:ditem.discount_type==="%"?ditem.old_price*ditem.discount_amount/100:ditem.discount_amount
                  }
                
              })
              // setValues((a)=>({...a,finalOrder:[.]}))
              console.log("productDiscount",order)
             if(order) newArray=[...newArray,...order]
              console.log("NewArrayt",newArray)
            return null
          })
          // .filter(item=>item.id===e).map((item)=>{
          //   if(item.discountable){
          //     return {
          //       discount:item.discount_type==="%"?item.old_price*item.discount_amount/100:item.discount_amount
          //     }
          //   }
          // })
          console.log("discountAmount",finalOrder,newArray)
          if(newArray?.length>0) {
              const discountAmount=newArray?.map(item=>item?.discount)?.reduce((acc,curr)=>acc+curr,0)
              setValues((a)=>({...a,discount:discountAmount}))
              const grossAmount=newArray?.map(item=>item?.gAmount)?.reduce((acc,curr)=>acc+curr,0)
              setValues((a)=>({...a,gross_amount:grossAmount}))
              setValues((a)=>({...a,total_amount:grossAmount-discountAmount+values?.shipping_charge}))
          }
    }

  },[i.quantity,i.product_id,values.shipping_charge])
  // console.log("product",ProductFinal)
  const formItems = [
    {
      type: (
        <><Select
          name="product_id"
          value={i.product_id}
          // showSearch
          style={widthStyle}
          placeholder="Select Product"
          // optionFilterProp="children"
          onChange={(e) => {
            console.log('products in', e)
            setValues((a) => {
              a.order_item[index].product_id = e
              return { ...a }
            })
            const showprice=products?.find(item=>item.id==e)
            if(showprice)  setValues((a) => {
              a.order_item[index].price = showprice?.unit_price
              return { ...a }
            })
          }}
          // filterOption={(input, option) =>
          //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          // }
        >
          {products?.map((i) => {
            return (
              // !values.order_item.map((re) => re.product_id).includes(i?.id) && (
                <Select.Option key={i.id} value={Number(i.id)}>
                  {i.name}
                </Select.Option>
              // )
            )
          })}
        </Select>
      {/* <span style={{color:'red'}}>{ errors.order_item
      ? errors.order_item[index].product_id
        ? errors.order_item[index].product_id
          ? errors.order_item[index].product_id
          : 'Required'
        : '' || ''
      : ''}
      </span>   */}
        </>
      ),
      key: 'product_id',
      label: 'Product',
      error: errors.order_item
      ? errors.order_item[index].product_id
        ? errors.order_item[index].product_id
          ? errors.order_item[index].product_id
          : ''
        : '' || ''
      : '',
    },
    {
      type: (
        <InputNumber
          name="quantity"
          value={i.quantity}
          type="number"
          onChange={(e) => {
            setValues((a) => {
              a.order_item[index].quantity = e
              return { ...a }
            })

            const quantitysum = values.order_item
              ?.map((item) => item.quantity)
              .reduce((acc, curr) => acc + curr)
            console.log(quantitysum)
            setValues((a) => ({ ...a, total_quantity: quantitysum }))
            // const quantitysum=values.order_item?.map(item=>item.quantity).reduce((acc,curr)=>acc+curr)
          }}
          min={1}
        />
      ),
      key: 'quantity',
      label: 'Quantity',
      // error: errors.order_item[index]?.quantity,
    },
    {
      type: (
        <Input
          value={i.price}
          name="price"
          onChange={(e) =>{
            setValues((a) => {
              a.order_item[index].price = e?.target?.value
              return { ...a }
            })
            //  let newArray=[]
            // const finalOrder=values.order_item.forEach(item=>{
            //   const order=products.filter(pitem=>pitem.id===item.product_id)?.map((ditem)=>{
                  
            //         return {
            //           product_id:item.product_id,
            //           name:ditem.name,
            //           quantity:Number(item.quantity),
            //           price:Number(item.price),
            //           discount_type:ditem.discount_type,
            //           discount_amount : Number(ditem.discount_amount),
            //           product_old_price:ditem.old_price,
            //           price:Number(e?.target?.value),
            //           quantity:Number(values.quantity),
            //           gAmount:Number(item?.quantity*item?.price),
            //           discount:ditem?.discountable?(ditem?.discount_type=="%"?Number(item?.quantity*item.price*ditem.discount_amount/100):Number(ditem.discount_amount)):0
            //           // discount:ditem.discount_type==="%"?ditem.old_price*ditem.discount_amount/100:ditem.discount_amount
            //         }
                  
            //     })
            //     // setValues((a)=>({...a,finalOrder:[.]}))
            //     console.log("productDiscount",order)
            //     newArray=[...newArray,...order]
            //     console.log("NewArrayt",newArray)
            //     setProductFinal((a)=>({...a,...order}))
            //   return {...order}
            // })
            // // .filter(item=>item.id===e).map((item)=>{
            // //   if(item.discountable){
            // //     return {
            // //       discount:item.discount_type==="%"?item.old_price*item.discount_amount/100:item.discount_amount
            // //     }
            // //   }
            // // })
            // console.log("discountAmount",finalOrder,ProductFinal,newArray)
            // if(newArray?.length>0) {
            //      setProductFinal(newArray)
            //     const discountAmount=newArray?.map(item=>item?.discount)?.reduce((acc,curr)=>acc+curr,0)
            //     setValues((a)=>({...a,discount:discountAmount}))
            //     const grossAmount=newArray?.map(item=>item?.gAmount)?.reduce((acc,curr)=>acc+curr,0)
            //     setValues((a)=>({...a,gross_amount:grossAmount}))
            //     setValues((a)=>({...a,total_amount:grossAmount-discountAmount+values?.shipping_charge}))
            // }
            } }
          type="number"
          disabled
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
