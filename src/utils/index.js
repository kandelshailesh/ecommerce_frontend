/* eslint-disable no-underscore-dangle */
/* eslint-disable no-global-assign */
/* eslint-disable func-names */
 
export const GlobalDebug = (function() {
  const savedConsole = console
  return function(debugOn = true, suppressAll) {
    const suppress = suppressAll || false

    if (debugOn === false) {
      console = {}
      console.log = function() {}
      if (suppress) {
        console.info = function() {}
        console.warn = function() {}
        console.error = function() {}
      } else {
        console.info = savedConsole.info
        console.warn = savedConsole.warn
        console.error = savedConsole.error
      }
    } else {
      console = savedConsole
    }
  }
})()
  

export const getBaseName = path => {
  // console.log(path)
  if (path) {
    const parsed = path.split('/')
    return parsed[parsed.length - 1]
  }
  return ''
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
    lg: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    lg: { span: 12 },
    // lg: { span: 18 },
  },
}

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      // span: 16,
      // offset: 8,
      span: 16,
      offset: 4,
    },
  },
}
 
export const getFormData = (data, fields = []) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value && (value.constructor === Array || value.constructor === Object))
      value = JSON.stringify(value)
    if (fields.length === 0) formData.append(key, value)
    else if (fields.includes(key)) {
      if (value) formData.append(key, value)
    }
  })
  return formData
}
 

export const getFileExtension = (str = '') => {
  return str.split('.').pop()
}
