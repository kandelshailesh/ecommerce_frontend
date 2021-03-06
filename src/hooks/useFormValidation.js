import { useState, useEffect } from 'react'
import { notification } from 'antd'
import { STRINGS } from '_constants'

const useFormValidation = (
  initialState,
  validationSchema,
  callback,
  enableReinitialize = false,
) => {
  const [values, setValues] = useState(initialState)

  useEffect(() => {
    console.log('useFormValidation enableReinitialize', initialState, enableReinitialize)
    if (enableReinitialize) setValues(initialState)
  }, [initialState])

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)

  console.log("errors",errors,callback)

  useEffect(() => {
    // console.log('in useEffect errors', Object.keys(errors), isSubmitting)
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  }, [errors, isSubmitting])
 

  useEffect(() => {
    // console.log('useEffect isSubmitting', isSubmitting)
  }, [isSubmitting])

  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length !== 0) {
      // console.log('setting isSubmitting false')
      setSubmitting(false)
    }
  }, [errors, isSubmitting])

  const onSubmit = async (event, options) => {
    // console.log(options)
    if (event) event.preventDefault()
    let msg = null
    if (typeof options !== 'undefined' && options.notifyMsg) msg = options.notifyMsg
    await validateForm(msg)
    // console.log('validate() called', isSubmitting)
    setSubmitting(true)
    // setSubmitting(false)
  }

  const onChange = (event, cb) => {
    // console.log('use form validation on change', event.target.value)
    event.persist()
    setValues(val => ({ ...val, [event?.target?.name]: event?.target?.value }))

    if (cb) cb()
  }

  const validateForm = async notifyMsg => {
    console.log('touched', touched)

    return (
      // validationSchema?
        // .validate(a === 'touched' ? Object.keys(values).filter(i => touched[i] === true) : values, {
        //   abortEarly: false,
        // })
        validationSchema?.validate(values, { abortEarly: false })
        .then(() => {
          // console.log('values are valid')
          setErrors({})
        })
        .catch(err => {
          // // console.log(values)
          // console.log(err)
          if (err && err.inner) {
            const errorArray = err.inner.map(e => ({ [e.path]: e.message }))
            const errObject = Object.assign({}, ...errorArray)
            // console.log('errObject', errObject)
            if (notifyMsg) {
              notification.warning({
                message: STRINGS.error,
                description: notifyMsg,
              })
            }
            setErrors(errObject)
          }
        })
    )
  }

  // const validateFormTouched = () => {
  //   validationSchema
  //     .validate(values, { abortEarly: false })
  //     .then(a => {
  //       // console.log('values are valid', a)
  //       setErrors({})
  //     })
  //     .catch(err => {
  //       // console.log(values)
  //       // console.log(err)
  //       const errorArray = err.inner.map(e => ({ [e.path]: e.message }))
  //       const errObject = Object.assign({}, ...errorArray)
  //       const a = Object.entries(errObject).map(([k,v])=> (
  //         {[k]: touched[k] ? v : ''}
  //       ))
  //       // console.log(a)
  //       const b = Object.assign({}, ...a)
  //       // console.log(b)
  //       setErrors(b)
  //     })
  // }

  const onBlur = event => {
    event.persist()
    // console.log('onBlur', event)
    setTouched(a => ({ ...a, [event.target.name]: true }))
    // validateForm()
    // if (event.target.type === "button") return;
    // setValues(val => ({ ...val, [event.target.name]: event.target.value }))
  }

  return {
    // reset,
    setErrors,
    values,
    setValues,
    onChange,
    onSubmit,
    onBlur,
    isSubmitting,
    errors,
    setSubmitting,
    validateForm,
    // touched,
    // setTouched,
  }
}

export default useFormValidation
