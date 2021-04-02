/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup'

export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  // 'image/gif',
  'image/png',
  // 'image/svg+xml',
]
const regExMobNo = /[0-9]\d{9}$/
// ^[0-9()\\-\\.\\s]+$
// const regExMobNo= /^\+(?:[0-9] ?){6,14}[0-9]$/
// const regExMobNo=/^\+(1)([0-9]{10})/
// eslint-disable-next-line func-names
Yup.addMethod(Yup.string, 'phone', function () {
  return this.test('phone', 'Phone number is not valid', (value) => regExMobNo.test(value))
})

const passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

Yup.addMethod(Yup.string, 'password', function () {
  return this.test(
    'password',
    'Password must be between 6 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter',
    (value) => passRegEx.test(value),
  )
})

const checkFileType = (files, supportedFormats) => {
  let valid = true
  const formatReq = supportedFormats || SUPPORTED_FORMATS

  console.log('aaa', files)
  if (files && files.length > 0) {
    files.map((file) => {
      // console.log("file.type",file.type)
      if (file.type && !formatReq.includes(file.type)) {
        valid = false
      } else if (!file.type && !file.url) valid = false
      return ''
    })
  }
  return valid
}
 
export const usersSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  email: Yup.string().email('Email is not valid').required('Required'),
  phone: Yup.string().phone().min(10).max(10).required('required'),
  status: Yup.string().nullable().required('required'),
  gender: Yup.string().nullable().required('required'),
  image: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType),
 
})

export const unitSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
})

export const categorySchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  status: Yup.string().nullable().required('required'),
})

export const doctorsSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  status: Yup.string().nullable().required('required'),
  phone: Yup.string().phone().min(10).max(10).required('required'),
  image: Yup.array()
  .nullable()
  .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType),
  hospital: Yup.string().required('Required'),
})


export const productsSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  // status: Yup.string().nullable().required('required'),
  discount_amount: Yup.string().nullable().required('required'),
  image: Yup.array()
  .nullable()
  .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType),
  category_id: Yup.string().required('Required'),
  unit_id: Yup.string().required('Required'),
  unit_price: Yup.string().required('Required'),
  total_quantity: Yup.string().required('Required'),
  min_quantity: Yup.string().required('Required'),
  max_quantity: Yup.string().required('Required'),
  old_price: Yup.string().required('Required'),
  discountable: Yup.string().required('Required'),
  // discount_type: Yup.string().required('Required'),
  isSubscribable: Yup.string().required('Required'),
})

export const ordersSchema = Yup.object().shape({
  user_id: Yup.string().required('Required'),
  // gross_amount: Yup.string().required('required'),
  // discount: Yup.string().required('Required'),
  // shipping_charge: Yup.string().required('Required'),
  // total_amount: Yup.string().required('Required'),
  // total_quantity: Yup.string().required('Required'),
  order_item:
  Yup.array().of(
    Yup.object().shape({
    product_id: Yup.string().required('Required'),
    // quantity: Yup.string().required('required'),
    // price: Yup.string().required('required')
  })).nullable().required('required')
  // ordered_date: Yup.string().required('Required'),
  // shipping_date: Yup.string().required('Required'),
  // payment_date: Yup.string().required('Required'),
  // comment: Yup.string().required('Required'),
})
 