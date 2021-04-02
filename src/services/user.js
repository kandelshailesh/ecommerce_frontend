// import firebase from 'firebase/app'
import { notification } from 'antd'
// import 'firebase/auth'
// import decode from 'jwt-decode'
import * as constants from '_constants'
import callApi from 'utils/callApi'

export async function loginSocial(email, accessToken) {
  console.log('in loginSocial services')
  const loginData = {
    email,
    accessToken,
  }
  const loginResponse = await fetch('/api/users/login_google', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })

  const resJSON = await loginResponse.json()
  console.log(loginResponse)
  console.log(resJSON)
  if (loginResponse.ok) {
    setToken(resJSON.token)
    return true
  }
  return notification.warning({
    message: loginResponse.status,
    description: resJSON.message,
  })
}

export function mockLogin(email, password) {
  console.log(email, password)
  return true
}

export function mockLoadCurrentAct() {
  const token = getToken()
  const details = getDetails()

  console.log('dsfg*********************', token, details, JSON.parse(details))
  if (typeof token !== 'undefined' && details) {
    const data = {
      user: JSON.parse(details),
      token,
    }
    return data
  }
  return null
}

export async function login1(email, password) {
  try {
    // /api/backend/v1/users/login
    const loginResponse = await callApi('/api/backend/v1/user/login', {
      method: 'POST',
      // body: formData,
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    console.log('response', loginResponse)
    if (loginResponse && (loginResponse.token || loginResponse.success)) {
      console.log('setting token', loginResponse.token)
      // setToken(loginResponse.token)
      setToken(loginResponse?.token, loginResponse?.data)
      return loginResponse
    }
    return null
  } catch (err) {
    console.log(err)
    return notification.warning({
      message: constants.STRINGS.error,
      description: err.message,
    })
  }
}

const setToken = (token, data) => {
  console.log('Data************1', token, data)
  localStorage.setItem('token', token)
  localStorage.setItem('details', JSON.stringify(data))
}
const getToken = () => {
  return localStorage.getItem('token')
  // return null
}

const getDetails = () => {
  return localStorage.getItem('details')
  // return null
}

const removeToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('details')
}
// const isTokenExpired = token => {
//   console.log(token.exp, Date.now())
//   if (token.exp < Date.now() / 1000) return true
//   return false
// }

export async function deleteUser(userId) {
  try {
    const res = await callApi(`/api/backend/v1/users/${userId}`, {
      method: 'DELETE',
    })
    if (res) return res
    return null
  } catch (err) {
    notification.error({
      message: 'Error deleting!',
      description: err.message,
    })
    return null
  }
}

export async function currentAccountJwt() {
  const token = getToken()
  console.log('dsfg', token)
  if (typeof token !== 'undefined') {
    try {
      const loginResponse = await fetch('/api/backend/v1/users', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      })
      console.log(loginResponse.status)
      if (!loginResponse.ok) {
        notification.warning({
          message: constants.STRINGS.error,
          description: 'Invalid user credentials!',
        })
        return null
      }
      const resJSON = await loginResponse.json()
      console.log(resJSON)
      if (loginResponse.status === 200) {
        return resJSON
      }
      // removeToken(token)
      notification.warning({
        message: constants.SESSION_EXPIRED_MESSAGE,
        description: constants.SESSION_EXPIRED_MESSAGE_DESC,
      })

      return null
    } catch (error) {
      return null
    }
  }
  return null
}

export async function logoutJwt() {
  removeToken()
  return true
}
