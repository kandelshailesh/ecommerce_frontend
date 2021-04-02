import { store } from 'index'
import { notification } from 'antd'

export default async function callApi(url, options = {}) {
  try {
    let apiUrl = url
    
    if (url.startsWith('/')) {
      // if relative url
      if (typeof options.headers === 'undefined') options = { ...options, headers: {} }
      // apiUrl = baseURL + url
      apiUrl = url
      options.headers.Authorization = `${localStorage.getItem('token')}`
    }
    console.log('yoyoing', options);
    const response = await fetch(apiUrl, options)
    if (response.status === 401) {
      store.dispatch({
        type: 'user/LOGOUT',
      })
      notification.error({
        message: 'Logged out!',
        description: 'Your session has expired or you have invalid credentials',
      })
      return null
      // throw new Error('Unauthorized!');
    }
    console.log('status 500')
    if (response.status === 500) {
      // notification.error({
      //   message: 'Internal server error!',
      //   description: 'Please try again later.',
      // })
      // return null
    }
    if (response.success ||response.ok) {
      const a = await response.json().catch(() => {
        throw new Error('Server error!')
      })
      console.log(a)
      return a
    }
    if (!response.success || !response.ok) {
      const a = await response.json().catch(() => {
        throw new Error('Server error!')
      })
      console.log("in",a)
      const err = new Error(a.error ? a.error : response.statusText)
      err.status = response.status
      throw err
    }
    return null
  } catch (err) {
    console.log('catch block',err)
    throw err
  }
}
