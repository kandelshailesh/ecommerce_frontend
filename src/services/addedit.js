/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'
// import { BANNER_API_URL } from '_constants'

// const INFORMATIONS_URL = BANNER_API_URL.getBanners

export async function getModules() {
  console.log('In*****')
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await callApi('/api/catalog/v1/users', options)
    console.log('response get', res)
    if (res.DATA) return { data: res.DATA.rows }
  } catch (error) {
    console.log(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
  }
  return null
}

export async function deleteOp(path, id) {
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
      description: error.message,
    })
    return false
  }
}

const unrequiredFields = ['createdAt', 'updatedAt', 'deletedAt', 'image']
// const requiredFields=['fullName','email','phone','status','gender','password','address']

export async function add(path, values) {
  console.log('values add', values, Object.keys(values))
  const formData = new FormData()
  if (values?.image && values?.image[0]?.originFileObj) {
    formData.append('image', values.image[0].originFileObj)
    // delete values?.Image
  }

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
      description: error.message,
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
      finalValues={ ...finalValues, [key]: value }
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
      description: error.message,
    })
    return false
  }
}
