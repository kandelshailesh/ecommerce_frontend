/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup'

export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  // 'image/gif',
  'image/png',
  // 'image/svg+xml',
]

const EXCEL_FORMAT = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
const PDF_FORMAT = SUPPORTED_FORMATS.concat('application/pdf')

const NUMBER_ERROR_MSG = 'Must be a number'

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

// type:leadgen/bussiness_development
// fullName:str*
// email:str*
// Image:file
// Phone:str
// status:enum(active/hold),
// category:enum('leadgen','bussiness_development','admin')
export const usersSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  email: Yup.string().email('Email is not valid').required('Required'),
  phone: Yup.string().phone().min(10).max(10).required('required'),
  status: Yup.string().nullable().required('required'),
  gender: Yup.string().nullable().required('required'),
  // type: Yup.string().nullable().required('required'),
  // userTypeId: Yup.string().required('required'),
  image: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType),
  // .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
  // .required('Image(s) is required'),
  // category: Yup.string().required('required'),
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
  status: Yup.string().nullable().required('required'),
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
  gross_amount: Yup.string().required('required'),
  discount: Yup.string().required('Required'),
  shipping_charge: Yup.string().required('Required'),
  total_amount: Yup.string().required('Required'),
  total_quantity: Yup.string().required('Required'),
  // ordered_date: Yup.string().required('Required'),
  // shipping_date: Yup.string().required('Required'),
  // payment_date: Yup.string().required('Required'),
  // comment: Yup.string().required('Required'),
})

export const excelUploadSchema = Yup.object().shape({
  file: Yup.array()
    .test('fileFormat', 'Unsupported Format. Required: xlsx', (files) =>
      checkFileType(files, EXCEL_FORMAT),
    )
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
})

export const uploadDOCSchema = Yup.object().shape({
  file: Yup.array()
    .test('fileFormat', 'Unsupported Format. Required: pdf or image', (files) =>
      checkFileType(files, PDF_FORMAT),
    )
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
})

export const uploadAdminDOCSchema = Yup.object().shape({
  adminFiles: Yup.array()
    .test('fileFormat', 'Unsupported Format. Required: pdf or image', (files) =>
      checkFileType(files, PDF_FORMAT),
    )
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
})

export const prodImgsSchema = Yup.object().shape({
  file: Yup.array()
    .test('fileFormat', 'Unsupported Format. Required: jpg/ jpeg/ png', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
})

export const passwordSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  // password: Yup.string()
  //   .password(
  //     'Password must be between 6 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter',
  //   )
  //   .required('Required'),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //   .required('Required'),
})

export const mailSettingsSchema = Yup.object().shape({
  mailSecuritySetting: Yup.string().required('Required'),
  smtpHost: Yup.string().required('Required'),
  smtpUsername: Yup.string().required('Required'),
  smtpPassword: Yup.string().required('Required'),
  smtpPort: Yup.string().required('Required'),
  smtpTimeout: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
})

export const generalSettingsSchema = Yup.object().shape({
  projectName: Yup.string().required('Required'),
  projectLabel: Yup.string().required('Required'),
  shippingCost: Yup.number().typeError(NUMBER_ERROR_MSG),
  shippingAmount: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
  minCartValue: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
  codEnabled: Yup.boolean().required('Required'),
})

export const footerSettingsSchema = Yup.object().shape({
  projectName: Yup.string().required('Required'),
  socialmedia: Yup.array(),
  contacts: Yup.array(),
  text: Yup.string().required('Required'),
})

export const profileSchema = Yup.object().shape({
  // firstName: Yup.string().required('Required'),
  // lastName: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Required'),
  phone: Yup.string().required('Required'),
})
