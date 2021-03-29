/* eslint-disable */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import { ERROR_TRY_LATER } from '_constants'
import callApi from 'utils/callApi'

// form data
// firstName:str *
// lastName:str *
// email:str *
// phone:str *
// avatarlocation:str
// avatartype:str (eg:gravater) (hide in frontend)
// status:enum(active/hold)
// image:file
// userTypeId:int * (use 4 for patient)
// zipcode:int *
// dob:date *
// patient_status:enum (new,existing)* (hide)
// gender:enum(male,female,other)*
// branch_id
// hospital_id
async function getFormsData(values) {
  console.log('values', values)
  const {
    firstName,
    lastName,
    email,
    phone,
    status,
    // hospital_id,
    // branch_id,
    userTypeId,
    dob,
    image,
    gender,
    zipcode,
    patient_status,
    hospitalId,
    address,
  } = values
  const formData = new FormData()
  const obj = {
    firstName,
    lastName,
    email,
    phone,
    status,
    // hospital_id,
    // branch_id,
    userTypeId,
    dob,
    gender,
    zipcode,
    patient_status,
    hospitalId,
    address,
  }
console.log(hospitalId)
  // if (image && image[0]?.originFileObj) formData.append('image', image[0].originFileObj)
  Object.entries(obj).forEach(([key, value]) => {
    console.log('key', key, value)
    formData.append(key, value)
  })

  // formData.append('title', title)
  // formData.append('content', content)
  // formData.append('view_type',viewType)
  // formData.append('status', status)
  return formData
}

export async function addPatient(values) {
  const url = '/api/backend/v1/users/patiant'
  console.log('44433', values, values.image)
  const formData = await getFormsData(values)
  if (values.image && values.image[0]?.originFileObj) {
    formData.append('image', values.image[0].originFileObj)
  }
  console.log('formData', formData)
  // formData.append('fullName',`${values.firstName} ${values.lastName}`)
  const options = {
    method: 'POST',
    body: formData,
  }

  try {
    const res = await callApi(url, options)
    // const { DATA } = res
    console.log(res)
    if (res && (res?.success || res?.DATA)) return true
  } catch (error) {
    // console.log("error",error,{...error})
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export async function editPatient(id, values) {
  const url = `/api/backend/v1/users/patiant/${id}`
  console.log('44433', values )

  const formData = await getFormsData(values)
  if (values.image && values.image.length === 0) {
    // formData.append('image', values.image)
    formData.append('deletedImage', values.deletedImage)
  }
  if (values.image && values.image[0]?.originFileObj) {
    formData.append('image', values.image[0].originFileObj)
    formData.append('deletedImage', values.deletedImage)
  }
  console.log('formData', formData)
  // formData.append('fullName',`${values.firstName} ${values.lastName}`)
  const options = {
    method: 'PUT',
    body: formData,
  }

  try {
    const res = await callApi(url, options)
    // const { DATA } = res
    console.log(res.status)
    if (res && (res?.success || res?.DATA)) return true
  } catch (error) {
    console.log("error45",error)
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export async function addHospital(values) {
  const url = '/api/backend/v1/users/register'
  console.log('44433', values)
  const formData = new FormData()

  const { fullName, email, phone, password, status, packageId, userTypeId } = values
  const obj = {
    fullName,
    email,
    phone,
    password,
    status,
    userTypeId,
    packageId
  }

  if (values?.logo && values?.logo[0]?.originFileObj)
    formData.append('logo', values.logo[0].originFileObj)

  console.log('values', values)
  Object.entries(obj).forEach(([key, value]) => {
    console.log('key', key, value)
    formData.append(key, value)
  })
  console.log('formData', formData)
  // formData.append('fullName',`${values.firstName} ${values.lastName}`)
  const options = {
    method: 'POST',
    body: formData,
  }

  try {
    const res = await callApi(url, options)
    const { data } = res
    console.log(res)
    if (data) return data
  } catch (error) {
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}
 
export async function editHospital(id,values) {
  const url = `/api/backend/v1/users/${id}`
  console.log('44433', values)
  const formData = new FormData()
  const { fullName, email, phone, password, status, packageId, userTypeId } = values
  let obj = {
    fullName,
    email,
    phone,
    status,
    userTypeId,
    packageId
  }
 
  if(password!==undefined){
    obj = {
      fullName,
      email,
      phone,
      password,
      status,
      userTypeId,
      packageId
    }
  }
  // if (values.logo.length === 0) {
  // //   // formData.append('image', values.image)
  //   formData.append('deletedImage', values.deletedImage)
  // // //  delete values?.logo
  // }

  if (values?.logo && values?.logo[0]?.originFileObj){
    formData.append('logo', values.logo[0].originFileObj)
    formData.append('deletedImage', values.deletedImage)
  }
  // formData.append('packageId',parseInt(packageId))
  

  // delete values?.logo
  // delete hospital
  console.log('values', values)
  Object.entries(obj).forEach(([key, value]) => {
    console.log('key', key, value)
    formData.append(key, value)
  })
 
  console.log('formData', formData)
  // formData.append('fullName',`${values.firstName} ${values.lastName}`)
  const options = {
    method: 'PUT',
    body: formData,
  }

  try {
    const res = await callApi(url, options)
    // const { data } = res
    console.log("suceess",res)
    if (res && res.success) return true
  } catch (error) {
    console.log("errror",error)
    notification.error({
      error: 'Error',
      message: error.message||ERROR_TRY_LATER,
    })
    return false
  }
  return null
}


export async function editBranch(id,values) {
  const url = `/api/backend/v1/users/${id}`
  console.log('44433', values)
  const formData = new FormData()
  // const { fullName, email, phone, password, status, packageId, userTypeId } = values
  // const obj = {
  //   fullName,
  //   email,
  //   phone,
  //   password,
  //   status,
  //   userTypeId,
  //   // packageId
  // }

  // if (values?.logo && values?.logo[0]?.originFileObj){
  //   formData.append('logo', values.logo[0].originFileObj)
  //   formData.append('deletedImage', values.deletedImage)
  // }

  // if (values.logo && values.logo.length === 0) {
  //   // formData.append('image', values.image)
  //   formData.append('deletedImage', values.deletedImage)
  // }
  // delete values.branches
  // delete values.user_type
  console.log('values', values)
  Object.entries(values).forEach(([key, value]) => {
    console.log('key', key, value)
    formData.append(key, value)
  })
 
  console.log('formData', formData)
  // formData.append('fullName',`${values.firstName} ${values.lastName}`)
  const options = {
    method: 'PUT',
    body: formData,
  }

  try {
    const res = await callApi(url, options)
    const { data } = res
    console.log(res)
    if (data) return data
  } catch (error) {
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export async function addBranch(values) {
  const url = '/api/backend/v1/users/register'
  console.log('44433', values)
  const formData = new FormData()

  // const { fullName, email, phone, status, address, userTypeId, hospitalId } = values
  // const obj = {
  //   fullName,
  //   email,
  //   phone,
  //   status,
  //   userTypeId,
  //   hospitalId,
  //   address,
  // }
  // if (values.logo) {
  //   if (values?.logo && values?.logo[0]?.originFileObj)
  //     formData.append('image', values.logo[0].originFileObj)
  // }
  console.log('values', values)
  Object.entries(values).forEach(([key, value]) => {
    console.log('key', key, value)
    formData.append(key, value)
  })

  console.log('formData', formData)
  // formData.append('fullName',`${values.firstName} ${values.lastName}`)
  const options = {
    method: 'POST',
    body: formData,
  }

  try {
    const res = await callApi(url, options)
    const { data } = res
    console.log(res)
    if (data) return data
  } catch (error) {
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export async function addUser(values) {
  const url = '/api/backend/v1/users/user'
  console.log('44433', values)
  const formData = new FormData()

  const { fullName, email, phone, password, status, hospitalId } = values
  const obj = {
    fullName,
    email,
    phone,
    password,
    status,
    // userTypeId,
   hospitalId,
  //  ref_id:hospitalId
  }

  if (values?.profile_image && values?.profile_image[0]?.originFileObj)
    formData.append('profile_image', values.profile_image[0].originFileObj)

  console.log('values', values)
  Object.entries(obj).forEach(([key, value]) => {
    console.log('key', key, value)
    formData.append(key, value)
  })
  console.log('formData', formData)
  // formData.append('fullName',`${values.firstName} ${values.lastName}`)
  const options = {
    method: 'POST',
    body: formData,
  }

  try {
    const res = await callApi(url, options)
    const { data } = res
    console.log(res)
    if (res?.success && data) return data
  } catch (error) {
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}
 
export async function editUser(id,values) {
  const url = `/api/backend/v1/users/user`
  console.log('44433', values)
  const formData = new FormData()
  const { fullName, email, phone, password, status, hospitalId } = values
  let obj = {
    id,
    fullName,
    email,
    phone,
    status,
    // userTypeId,
    hospitalId,
    // ref_id:hospitalId
  }
 
  if(password!==undefined){
    obj = {
      id,
      fullName,
      email,
      phone,
      password,
      status,
      // userTypeId,
     hospitalId,
    //  ref_id:hospitalId
    }
  }
  // if (values.logo.length === 0) {
  // //   // formData.append('image', values.image)
  //   formData.append('deletedImage', values.deletedImage)
  // // //  delete values?.logo
  // }

  if (values?.profile_image && values?.profile_image[0]?.originFileObj){
    formData.append('profile_image', values.profile_image[0].originFileObj)
    formData.append('deletedImage', values.deletedImage)
  }
  // formData.append('packageId',parseInt(packageId))
  

  // delete values?.logo
  // delete hospital
  console.log('values', values)
  Object.entries(obj).forEach(([key, value]) => {
    console.log('key', key, value)
    formData.append(key, value)
  })
 
  console.log('formData', formData)
  // formData.append('fullName',`${values.firstName} ${values.lastName}`)
  const options = {
    method: 'POST',
    body: formData,
  }

  try {
    const res = await callApi(url, options)
    // const { data } = res
    console.log("suceess",res)
    if (res && res.success) return true
  } catch (error) {
    console.log("errror",error)
    notification.error({
      error: 'Error',
      message: error.message||ERROR_TRY_LATER,
    })
    return false
  }
  return null
}
