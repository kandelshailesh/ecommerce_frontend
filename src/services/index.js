/* eslint-disable */
import callApi from 'utils/callApi'
import { getFormData } from 'utils'
import { notification } from 'antd'

export async function Delete(path, id) {
  console.log('delete', id)
  const url = `/api/backend/v1${path}/${id}`
  const options = {
    method: 'DELETE',
  }
  try {
    const res = await callApi(url, options)
    console.log('res', res)
    if (res && res.success) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error?.message,
    })
    return false
  }
}

let unrequiredFields = ['createdAt', 'updatedAt', 'deletedAt', 'image','']
// const requiredFields=['fullName','email','phone','status','gender','password','address']

export async function formAdd(path, values) {
  console.log('values add', values, Object.keys(values))
  const formData = new FormData()
  if (values?.image && values?.image[0]?.originFileObj) {
    formData.append('image', values.image[0].originFileObj)
    // delete values?.Image
  }
  if (values?.order_item && values?.order_item?.length > 0) {
    values?.order_item?.map((item,index) => {
      // console.log('order',key,val,)
      Object.entries(item).map(([key,value])=>{
        formData.append(`order_item[${index}][${key}]`,value)
      })
    })
    unrequiredFields = [...unrequiredFields, ...['orders_items', 'user','order_item']]
    
    // formData.append(`order_item`, JSON.stringify(values.order_item.map(({quantity,price,product_id})=>({product_id,quantity,price}))))
    // })


  }
  console.log("unrquired",unrequiredFields)
  Object.entries(values).map(([key, value]) => {
    if (!unrequiredFields.includes(key)) formData.append(key, value)
    return null
  })
  const url = `/api/backend/v1/${path.url}`
  const options = {
    method: `${path.method}`,
    // body: JSON.stringify(values),
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    console.log('response', res)
    if (res && res?.success) return res?.success
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error?.message,
    })
    return false
  }
}

export async function JsonAdd(path, values) {
  console.log('ttttttttttttt', values)
  const url = `/api/backend/v1/${path.url}`
  let finalValues = {}
  Object.entries(values).map(([key, value]) => {
    if (!unrequiredFields.includes(key)) {
      finalValues = { ...finalValues, [key]: value }
      console.log('object', finalValues)
      return finalValues
    }
    return null
  })
  console.log('object', finalValues)
  const options = {
    method: `${path.method}`,
    body: JSON.stringify(finalValues),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await callApi(url, options)
    console.log('Editresponse', res)
    if (res && res.success) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error?.message,
    })
    return false
  }
}

export async function editData(url, data, type = 'formdata', method = 'PATCH') {
  console.log('edddd', url, data, type)
  let body = null
  if (type === 'formdata') body = getFormData(data)
  if (type === 'json') body = JSON.stringify(data)
  try {
    const restOptions = type === 'json' ? { headers: { 'Content-Type': 'application/json' } } : {}
    const options = {
      method,
      body,
      ...restOptions,
    }
    const res = await callApi(url, options)
    if (res?.success) return res
    if (res?.error) throw new Error(res.error)
  } catch (error) {
    // notification.error({
    //   message: 'Error updating',
    //   description: error.message,
    // })
    return { error: error.message }
  }
  return null
}
