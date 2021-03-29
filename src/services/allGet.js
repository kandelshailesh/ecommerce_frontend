import { notification } from 'antd'
import callApi from 'utils/callApi'
import { ERROR_TRY_LATER } from '_constants'

export  async function getHospital(userID) {
  const url = `/api/backend/v1/users?userTypeId==${userID}`
  try {
    const res = await callApi(url)
    // const { products } = res
    const { success } = res
    if (res && success) return res?.data
  } catch (error) {
    console.error(error)
    notification.error({
      error: 'Error',
      message: ERROR_TRY_LATER,
    })
  }
  return null
}



export  async function getAppointmentType(branchId) {
    const url = `/api/backend/v1/appointment_type?branchId=${branchId}`
    try {
      const res = await callApi(url)
      // const { products } = res
      const { success } = res
      if (res && success) return res?.DATA
    } catch (error) {
      console.error(error)
      notification.error({
        error: 'Error',
        message: ERROR_TRY_LATER,
      })
    }
    return null
  }

  
export  async function getProviderType(branchId) {
    const url = `/api/backend/v1/provider_type?branchId=${branchId}`
    try {
      const res = await callApi(url)
      // const { products } = res
      const { success } = res
      if (res && success) return res?.DATA
    } catch (error) {
      console.error(error)
      notification.error({
        error: 'Error',
        message:ERROR_TRY_LATER,
      })
    }
    return null
  }

    
export  async function getProvider(id='') {
  console.log("idinside",id)
  // /api/backend/v1/providers/admin?&hospitalId=6
  const url = `/api/backend/v1/providers/admin?status=active&${id!==''?`hospitalId=${id}`:''}`
  try {
    const res = await callApi(url)
    // const { products } = res
    const { success } = res
    if (res && success) return res?.data?.users
  } catch (error) {
    console.error(error)
    notification.error({
      error: 'Error',
      message:ERROR_TRY_LATER,
    })
  }
  return null
}

  
export  async function getPackages() {
    const url = `/api/backend/v1/packages`
    try {
      const res = await callApi(url)
      // const { products } = res
      const { success } = res
      if (res && success) return res?.DATA?.rows
    } catch (error) {
      console.error(error)
      notification.error({
        error: 'Error',
        message:ERROR_TRY_LATER,
      })
    }
    return null
  }

  export  async function getBranches() {
    const url = `/api/backend/v1/branches`
    try {
      const res = await callApi(url)
      // const { products } = res
      const { success } = res
      if (success && res) return res?.data?.users
    } catch (error) {
      console.error(error)
      notification.error({
        error: 'Error',
        message: ERROR_TRY_LATER,
      })
    }
    return null
  }


export const getCustomFormByHospital=async(id)=>{
    const url = `/api/backend/v1/custom_form/${id}`
    try {
      const res = await callApi(url)
      // const { products } = res
      const { success } = res
      if (res && success) return res?.DATA
    } catch (error) {
      console.error(error)
      // notification.error({
      //   error: 'Error',
      //   message:ERROR_TRY_LATER,
      // })
    }
    return null
  }

// get PRovider type by hospitalId
  export  async function getProviderTypeById(hospitalId) {
    console.log("*****************")
    // /api/backend/v1/provider_types/all?&hospitalId=6
    const url = `/api/backend/v1/provider_types/all?&status=active&hospitalId=${hospitalId}`
    try {
      const res = await callApi(url)
      // const { products } = res
      const { success } = res
      if (res?.DATA && success) return res?.DATA?.rows
    } catch (error) {
      console.error(error)
      notification.error({
        error: 'Error',
        message:ERROR_TRY_LATER,
      })
    }
    return null
  }


// get branch By hospital ID
  export  async function getBranchById(hospitalId) {
    // /api/backend/v1/branches?&hospitalId=6&page=1&limit=20
    const url = `/api/backend/v1/branches?&status=active&hospitalId=${hospitalId}`
    try {
      const res = await callApi(url)
      // const { products } = res
      const { success } = res
      if (res?.data && success) return res?.data?.users
    } catch (error) {
      console.error(error)
      notification.error({
        error: 'Error',
        message:ERROR_TRY_LATER,
      })
    }
    return null
  }

  // get appointment by hospitalID
  export  async function getAppointmentTypeByID(hospitalId) {
    // /api/backend/v1/appointment_types?&hospitalId=4
    const url = `/api/backend/v1/appointment_types?&hospitalId=${hospitalId}`
    try {
      const res = await callApi(url)
      // const { products } = res
      const { success } = res
      if (res?.DATA && success) return res?.DATA?.rows
    } catch (error) {
      console.error(error)
      notification.error({
        error: 'Error',
        message:ERROR_TRY_LATER,
      })
    }
    return null
  }