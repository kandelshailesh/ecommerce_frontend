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

// export async function getAdminDeliveryLocation(merchantId) {
//   console.log('In*****',merchantId)
//   const options = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }
//   try {
//     const res = await callApi(`/api/catalog/v1/availabilitypincode/?merchantId=${merchantId}`, options)
//     console.log('response get', res)
//     if (res.data) return { data: res.data }
//   } catch (error) {
//     console.log(error)
//     notification.error({
//       message: 'Error!',
//       description: error.message,
//     })
//   }
//   return null
// }

// export async function editModuleStatus(id, status) {
//   console.log('edit', id)
//   const url = `/api/catalog/v1/availabilitypincode/${id}?status=${status}`
//   const options = {
//     method: 'PATCH',
//   }
//   try {
//     const res = await callApi(url, options)
//     if (res.data && res.data.status === status) {
//       notification.success({
//         message: 'Success!',
//         description: 'Status updated successfully',
//       })
//       return true
//     }
//     return false
//   } catch (error) {
//     notification.error({
//       message: 'Error!',
//       description: error.message,
//     })
//     return false
//   }
// }

export async function deleteEmployee(id) {
  console.log('delete', id)
  const url = `/api/backend/v1/employee/${id}`
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
const requiredFields=['fullName','email','phone','status','category']

export async function addEmployees(values) {
  console.log('values add', values)
    const formData = new FormData()
    if (values?.Image && values?.Image[0]?.originFileObj)
    {
      formData.append('image', values.Image[0].originFileObj)
      // delete values?.Image
    }


    Object.entries(values).map(([key, value]) => {
    if(requiredFields.includes(key))  formData.append(key, value)
      return null
    })
  const url = `/api/backend/v1/employee`
  const options = {
    method: 'POST',
    // body: JSON.stringify(values),
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body:formData
  }
  try {
    const res = await callApi(url, options)
    console.log('response', res)
    if (res && res.data) return res.data
    return null
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return null
  }
}

export async function editEmployees(id, values) {
  console.log('ttttttttttttt', values)
  const url = `/api/backend/v1/employee/${id}`
  const formData = new FormData()
    if (values?.Image && values?.Image[0]?.originFileObj)
    {
      formData.append('image', values.Image[0].originFileObj)
      formData.append('deletedImage', values.deletedImage)
      // delete values?.Image
    }
    
    if (values.Image && values.Image.length === 0) {
      // formData.append('image', values.image)
      formData.append('deletedImage', values.deletedImage)
    }

    Object.entries(values).map(([key, value]) => {
      if(requiredFields.includes(key))  formData.append(key, value)
      return null
    })
  const options = {
    method: 'PUT',
    // body: JSON.stringify(values),
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body:formData
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
// email:str*,
// Leadgen_id:refer user table,
// Bussiness_developement_id:refer user table,
// Description:long text,
// Image:file,
// status:enum(open(default)/completed/no response/cancelled)


const requiredLeadfields=['email','leadgen_id','bussiness_development_id','description','status']

export async function addLeads(values) {
  console.log('values add', values)
    const formData = new FormData()
    if (values?.Image && values?.Image[0]?.originFileObj)
    {
      formData.append('image', values.Image[0].originFileObj)
      delete values?.Image
    }


    Object.entries(values).map(([key, value]) => {
    if(requiredLeadfields.includes(key))  formData.append(key, value)
      return null
    })
  const url = `/api/backend/v1/leads`
  const options = {
    method: 'POST',
    // body: JSON.stringify(values),
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body:formData
  }
  try {
    const res = await callApi(url, options)
    console.log('response', res)
    if (res && res.data) return res.data
    return null
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return null
  }
}

export async function editLeads(id, values) {
  console.log('ttttttttttttt', values)
  const url = `/api/backend/v1/leads/${id}`
  const formData = new FormData()
    if (values?.Image && values?.Image[0]?.originFileObj)
    {
      formData.append('image', values.Image[0].originFileObj)
      formData.append('deletedImage', values.deletedImage)
      // delete values?.Image
    }

    Object.entries(values).map(([key, value]) => {
      if(requiredLeadfields.includes(key))  formData.append(key, value)
      return null
    })
  const options = {
    method: 'PATCH',
    // body: JSON.stringify(values),
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body:formData
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
