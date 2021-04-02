/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  InputNumber,
  notification,
  Upload,
  Icon,
  DatePicker,
} from 'antd'
import {
  unitSchema,
  usersSchema,
  categorySchema,
  ordersSchema,
  productsSchema,
  doctorsSchema,
} from 'utils/Schema'
import { formItemLayout, tailFormItemLayout, getBaseName } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import { formAdd, JsonAdd } from 'services'
import { STRINGS, LINKS } from '_constants'
import isEmpty from 'lodash/isEmpty'
import useUpload from 'hooks/useUpload'
// import {userformItems} from '../../Forms'
import moment from 'moment'
const dateFormat = 'l'
import OrdersItem from '../OrderItem'

const widthStyle={ width: '100%' }
const FormA = ({ data, path, categories, units, users, products }) => {
  console.log('path', path, path?.url.slice(0, -2), units)
  const { url } = path
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

  const checkpath = url.includes('/') ? url.slice(0, -2) : url

  const initialValues =
    checkpath === 'orders'
      ? {
          order_item: [],
          status: 'PENDING',
          ordered_date: moment().format(dateFormat),
          total_quantity: 1,
          shipping_charge: 0,
        }
      : {}

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1)

  useEffect(() => {
    if (!isEmpty(data)) {
      let image = []
      if (data?.image && data?.image !== null) {
        // const {hospital}=data
        image = [
          {
            uid: data.id,
            name: getBaseName(data?.image),
            url: data?.image,
            thumbUrl: data?.image,
          },
        ]
      }
      setFileListImages(image)
      console.log('image', data?.orders_items)
      data?.orders_items
        ? setValues({
            ...data,
            order_item: data?.orders_items?.map(item=>({product_id:item?.product_id,quantity:item?.quantity,price:item?.price})) || [],
            deleted_item: data?.orders_items?.map(item=>item?.id)||[]
          })
        : setValues({
            ...data,
          })
      // console.log(initialValues)
      // setFileListImages(himg)
    }
  }, [data])

  useEffect(() => {
    setValues((a) => ({ ...a, image: fileListImages }))
  }, [fileListImages])

  const propsImages = {
    // multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  const [success, setSuccess] = useState(false)

  const fetchSubmit = async () => {
    const format =
      checkpath === 'products' ||
      checkpath === 'doctors' ||
      checkpath === 'users' ||
      checkpath === 'orders'
      console.log("Values passed",values)
    const a = format ? await formAdd(path, values) : await JsonAdd(path, values)
    setSubmitting(false)
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      setSuccess(true)
    }
  }

  const submitForm = () => {
    try {
    
      console.log('will submitform', values)
      fetchSubmit()
    } catch (err) {
      setSubmitting(false)
    }
  }

  console.log(initialValues)
  const schema = {
    users: usersSchema,
    unit: unitSchema,
    category: categorySchema,
    orders: ordersSchema,
    doctors: doctorsSchema,
    products: productsSchema,
  }
  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
    // validateForm,
    // touched,
    // setTouched,
  } = useFormValidation(initialValues, schema[checkpath], submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log('values', values, errors, initialValues)

  let formItems = [
    { heading: 'General' },
    {
      type: <Input value={values.fullName} name="fullName" />,
      key: 'fullName',
      label: 'Full Name',
      error: errors.fullName,
    },
    {
      type: <Input value={values.email} name="email" />,
      key: 'email',
      label: 'Email',
      error: errors.email,
    },

    {
      type: <Input type="password" name="password" value={values.password} type="password" />,
      key: 'password',
      label: 'Password',
      error: errors.password,
    },
    {
      type: (
        <Radio.Group name="gender" buttonStyle="solid">
          <Radio checked={values.gender === 'male'} value="male">
            Male
          </Radio>
          <Radio checked={values.gender === 'female'} value="female">
            Female
          </Radio>
          <Radio checked={values.gender === 'other'} value="other">
            Other
          </Radio>
        </Radio.Group>
      ),
      key: 'gender',
      label: 'Gender',
      error: errors.gender,
    },
    {
      type: (
        <Radio.Group name="status" buttonStyle="solid">
          <Radio.Button checked={values.status === 'active'} value="active">
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'hold'} value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      type: <Input value={values.phone} name="phone" />,
      key: 'phone',
      label: 'Mobile',
      error: errors.phone,
    },

    // {
    //   type: (
    //     <Radio.Group name="isAdmin" defaultValue={false} buttonStyle="solid">
    //       <Radio.Button checked={values.isAdmin === true} value={true}>
    //         Admin
    //       </Radio.Button>
    //       <Radio.Button checked={values.isAdmin === false} value={false}>
    //         Guest
    //       </Radio.Button>
    //     </Radio.Group>
    //   ),
    //   key: 'isAdmin',
    //   label: 'Role',
    //   error: errors.isAdmin,
    // },
    {
      label: 'Image',
      error: errors.image,
      key: 'image',
      name: 'image',
      type: (
        <>
          <Upload listType="picture-card" name="image" {...propsImages}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </>
      ),
    },
    {
      type: <Input value={values.address} name="address" />,
      key: 'address',
      label: 'Address',
      error: errors.address,
    },
  ]
  const categoryformItems = [
    { heading: 'General' },
    {
      type: <Input value={values.name} name="name" />,
      key: 'name',
      label: 'Name',
      error: errors.name,
    },
    {
      type: (
        <Radio.Group name="status" buttonStyle="solid">
          <Radio.Button checked={values.status === 'active'} value="active">
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'hold'} value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      type: <Input.TextArea value={values.description} name="description" />,
      key: 'description',
      label: 'Description',
      error: errors.description,
    },
  ]

  const productField = [
    {
      type: (
        <Select
          mode="default"
          // showSearch
          value={values.category_id}
          placeholder="Select Category"
          // notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
          filterOption={false}
          // onSearch={fetchProducts}
          onChange={(e) => {
            console.log('val', e)
            setValues((a) => ({
              ...a,
              category_id: e,
            }))
          }}
          style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {categories?.map((d) => (
            <Select.Option key={d.id} value={d.id}>
              {d?.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'category_id',
      label: 'Category',
      error: errors.category_id,
      // dependency: 'prescriptionNeeded',
    },
    {
      type: (
        <Select
          mode="default"
          // showSearch
          value={values.unit_id}
          placeholder="Select Unit"
          // notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
          filterOption={false}
          // onSearch={fetchProducts}
          onChange={(e) => {
            console.log('val', e)
            setValues((a) => ({
              ...a,
              unit_id: e,
            }))
          }}
          style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {units?.map((d) => (
            <Select.Option key={d.id} value={d.id}>
              {d?.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'unit_id',
      label: 'Unit',
      error: errors.unit_id,
      // dependency: 'prescriptionNeeded',
    },
    {
      type: (
        <InputNumber
          name="unit_price"
          value={values.unit_price}
          onChange={(val) => setValues((a) => ({ ...a, unit_price: val }))}
          min={0}
        />
      ),
      key: 'unit_price',
      label: 'Unit Price',
      error: errors.unit_price,
    },
    {
      type: (
        <InputNumber
          name="total_quantity"
          value={values.total_quantity}
          onChange={(val) => setValues((a) => ({ ...a, total_quantity: val }))}
          min={0}
        />
      ),
      key: 'total_quantity',
      label: 'Total Quantity',
      error: errors.total_quantity,
    },
    {
      type: (
        <InputNumber
          name="min_quantity"
          value={values.min_quantity}
          onChange={(val) => setValues((a) => ({ ...a, min_quantity: val }))}
          min={0}
        />
      ),
      key: 'min_quantity',
      label: 'Minimum Quantity',
      error: errors.min_quantity,
    },
    {
      type: (
        <InputNumber
          name="max_quantity"
          value={values.max_quantity}
          onChange={(val) => setValues((a) => ({ ...a, max_quantity: val }))}
          min={0}
        />
      ),
      key: 'max_quantity',
      label: 'Maximum Quantity',
      error: errors.max_quantity,
    },
    {
      type: (
        <InputNumber
          name="old_price"
          value={values.old_price}
          onChange={(val) => setValues((a) => ({ ...a, old_price: val }))}
          min={0}
        />
      ),
      key: 'old_price',
      label: 'Old Price',
      error: errors.old_price,
    },
    {
      type: (
        <Radio.Group name="discountable" defaultValue={values.discountable} buttonStyle="solid">
          <Radio.Button checked={values.discountable === true} value={true}>
            Yes
          </Radio.Button>
          <Radio.Button checked={values.discountable === false} value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'discountable',
      label: 'Discountable',
      error: errors.discountable,
    },
    {
      type: (
        // <Input
        //   name="discount_amount"
        //   suffix={
        //     <Select
        //     mode="default"
        //     // showSearch
        //     value={values.discount_type}
        //     placeholder="Select Type"
        //     // notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
        //     filterOption={false}
        //     // onSearch={fetchProducts}
        //     onChange={(e) => {
        //       console.log("val",e)
        //       setValues(a => ({
        //         ...a,
        //         discount_type: e,
        //       }))
        //     }}
        //     // style={{ width: '100%' }}
        //     // onPopupScroll={this.handlePopupScroll}
        //   >

        //       <Select.Option key="%" value="%"> % </Select.Option>
        //       <Select.Option key="Rs" value="Rs"> Rs </Select.Option>
        //   </Select>
        //   }
        //  type="number"
        //   value={values.discount_amount}
        //   // onChange={(val) => setValues((a) => ({ ...a, discount_amount: val }))}
        //   // min={0}
        // />
        <Input.Group compact>
          <Input
            style={{ width: '50%' }}
            name="discount_amount"
            type="number"
            value={values.discount_amount}
          />
          <Select
            value={values.discount_type}
            placeholder="Select Discount Type"
            onChange={(e) => {
              console.log('val', e)
              setValues((a) => ({
                ...a,
                discount_type: e,
              }))
            }}
          >
            <Select.Option key="%" value="%">
              {' '}
              %{' '}
            </Select.Option>
            <Select.Option key="Rs" value="Rs">
              {' '}
              Rs{' '}
            </Select.Option>
          </Select>
        </Input.Group>
      ),
      key: 'discount_amount',
      label: 'Discount Amount',
      error: errors.discount_amount,
    },
    {
      type: (
        <Radio.Group name="isSubscribable" defaultValue={values.isSubscribable} buttonStyle="solid">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button checked={values.isSubscribable === true} value={true}>
            Yes
          </Radio.Button>
          <Radio.Button checked={values.isSubscribable === false} value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'isSubscribable',
      label: 'Subscribe',
      error: errors.isSubscribable,
    },
  ]

  const orderStatus = [
    {
      key: 'PENDING',
      title: 'PENDING',
    },
    {
      key: 'ACTIVE',
      title: 'ACTIVE',
    },
    {
      key: 'CANCELLED',
      title: 'CANCELLED',
    },
    {
      key: 'SHIPPING',
      title: 'SHIPPING',
    },
    {
      key: 'COMPLETED',
      title: 'COMPLETED',
    },
  ]

  const subscribtionStatus= [
    {
      key: 'active',
      title: 'Active',
    },
    {
      key: 'cancelled',
      title: 'Cancelled',
    },
  ]

  const orderFields = [
    {
      type: (
        <Select
          mode="default"
          value={values.user_id}
          placeholder="Select Users"
          filterOption={false}
          onChange={(e) => {
            console.log('val', e)
            setValues((a) => ({
              ...a,
              user_id: e,
            }))
          }}
          style={{ width: '100%' }}
        >
          {users?.map((d) => (
            <Select.Option key={d.id} value={d.id}>
              {d?.fullName}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'user_id',
      label: 'User',
      error: errors.user_id,
    },
    {
      type: (
        <Select
          mode="default"
          value={values.status}
          placeholder="Select Status"
          filterOption={false}
          onChange={(e) => {
            setValues((a) => ({
              ...a,
              status: e,
            }))
          }}
          style={{ width: '100%' }}
 
        >
          {orderStatus?.map((d) => (
            <Select.Option key={d.key} value={d.key}>
              {d.title}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      type: (
        <InputNumber
          name="gross_amount"
          value={values.gross_amount}
          onChange={(val) => setValues((a) => ({ ...a, gross_amount: val }))}
          min={0}
          disabled
        />
      ),
      key: 'gross_amount',
      label: 'Gross Amount',
      error: errors.gross_amount,
    },
    {
      type: (
        <InputNumber
          name="discount"
          value={values.discount}
          onChange={(val) => setValues((a) => ({ ...a, discount: val }))}
          min={0}
          disabled
        />
      ),
      key: 'discount',
      label: 'Discount',
      error: errors.discount,
    },

    {
      type: (
        <InputNumber
          name="shipping_charge"
          value={values.shipping_charge}
          onChange={(val) => setValues((a) => ({ ...a, shipping_charge: val }))}
          min={0}
          type="number"
        />
      ),
      key: 'shipping_charge',
      label: 'Shipping Charge',
      error: errors.shipping_charge,
    },
    {
      type: (
        <InputNumber
          name="total_amount"
          value={values.total_amount}
          onChange={(val) => setValues((a) => ({ ...a, total_amount: val }))}
          min={0}
          disabled
        />
      ),
      key: 'total_amount',
      label: 'Total Amount',
      error: errors.total_amount,
    },
    {
      type: (
        <InputNumber
          name="total_quantity"
          value={values.total_quantity}
          onChange={(val) => setValues((a) => ({ ...a, total_quantity: val }))}
          min={0}
          disabled
        />
      ),
      key: 'total_quantity',
      label: 'Total Quantity',
      error: errors.total_quantity,
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          allowClear={false}
          // showToday
          value={moment(values.ordered_date)}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, ordered_date: moment(e).format(dateFormat) }))
          }}
          // disabledDate={data ? null : disabledDate}
        />
      ),
      key: 'ordered_date',
      label: 'Ordered Date',
      error: errors.ordered_date,
    },
    // {
    //   type: (
    //     <DatePicker
    //       format={dateFormat}
    //       allowClear={false}
    //       showToday
    //       value={moment(values.payment_date)}
    //       onChange={(e)=>{
    //         setValues(prev => ({ ...prev, ordered_date: moment(e).format(dateFormat) }))
    //       }}
    //       // disabledDate={data ? null : disabledDate}
    //     />
    //   ),
    //   key: 'payment_date',
    //   label: 'Payment Date',
    //   error: errors.payment_date,
    // },
    // {
    //   type: (
    //     <DatePicker
    //       format={dateFormat}
    //       allowClear={false}
    //       showToday
    //       value={moment(values.shipping_date)}
    //       onChange={(e)=>{
    //         setValues(prev => ({ ...prev, shipping_date: moment(e).format(dateFormat) }))
    //       }}
    //       // disabledDate={data ? null : disabledDate}
    //     />
    //   ),
    //   key: 'shipping_date',
    //   label: 'Shipping Date',
    //   error: errors.shipping_date,
    // },
    // {
    //   type: (
    //     <DatePicker
    //       format={dateFormat}
    //       allowClear={false}
    //       showToday
    //       value={moment(values.completed_date)}
    //       onChange={(e)=>{
    //         setValues(prev => ({ ...prev, completed_date: moment(e).format(dateFormat) }))
    //       }}
    //       // disabledDate={data ? null : disabledDate}
    //     />
    //   ),
    //   key: 'completed_date',
    //   label: 'Completed Date',
    //   error: errors.completed_date,
    // },
    {
      label: 'Prescription',
      error: errors.image,
      key: 'image',
      name: 'image',
      type: (
        <>
          <Upload listType="picture" name="image" {...propsImages}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </>
      ),
    },
    {
      type: <Input value={values.comment} name="comment" />,
      key: 'comment',
      label: 'Comment',
      error: errors.comment,
    },
  ]
const subscriberFields=[
  {
    type: (
      <Radio.Group name="status" buttonStyle="solid">
        {subscribtionStatus?.map((d) => (
          <Radio.Button checked={values.status === d.key} value={d.key}>
           {d.title}
          </Radio.Button>
                  ))}
        </Radio.Group>
    ),
    key: 'status',
    label: 'Status',
    error: errors.status,
  },
  {
      type: (
       <Select
          name="product_id"
          value={values.product_id}
          // showSearch
          style={widthStyle}
          placeholder="Select Product"
          // optionFilterProp="children"
          onChange={(e) => {
 
            setValues((a) => ({
              ...a,
              product_id: e,
            }))
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
         {products?.map((d) => (
            <Select.Option key={d.id} value={d.id}>
              {d?.name}
            </Select.Option>
          ))}
        </Select>
      
      ),
      key: 'product_id',
      label: 'Product',
      error: errors.product_id
    },
    {
      type: (
        <InputNumber
          name="quantity"
          value={values.quantity}
          type="number"
          onChange={(e) => {
            setValues((a) => ({
              ...a,
              quantity: e,
            }))
 
          }}
          min={1}
        />
      ),
      key: 'quantity',
      label: 'Quantity',
      error: errors.quantity,
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          allowClear={false}
          // showToday
          value={values?.subscribed_date? moment(values.subscribed_date):''}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, subscribed_date: moment(e).format(dateFormat) }))
          }}
        />
      ),
      key: 'subscribed_date',
      label: 'Subscribed Date',
      error: errors.subscribed_date,
    }, 
    {
      type: (
        <DatePicker
          format={dateFormat}
          allowClear={false}
          // showToday
          value={values?.last_send_date?moment(values.last_send_date):''}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, last_send_date: moment(e).format(dateFormat) }))
          }}
        />
      ),
      key: 'last_send_date',
      label: 'Last Send Date',
      error: errors.last_send_date,
    },
 
]
  if (checkpath == 'category') {
    formItems = categoryformItems
  } else if (checkpath == 'unit') {
    formItems = categoryformItems.filter((item) => item.key === 'name')
  } else if (checkpath == 'doctors') {
    const hospitalfied = [
      {
        type: <Input value={values.hospital} name="hospital" />,
        key: 'hosital',
        label: 'Hospital Name',
        error: errors.hospital,
        // dependency: 'prescriptionNeeded',
      },
    ]
    formItems = [
      ...categoryformItems.filter((item) => item.key !== 'description'),
      ...formItems.filter((item) => item.key === 'phone' || item.key === 'image'),
      ...hospitalfied,
    ]
  } else if (checkpath == 'products') {
    formItems = [
      ...categoryformItems.filter((item) => item.key !== 'status'),
      ...formItems.filter((item) => item.key === 'image'),
      ...productField,
    ]
  } else if (checkpath === 'orders') {
    formItems = orderFields
  }
  else if (checkpath === 'subscriber') {
    formItems = [...orderFields.filter(item=>item.key=='user_id'),...subscriberFields]
  }

  if (success) return <Redirect to={`/${checkpath}`} />

  // console.log("discount Amount",values.qunatity*values.price+values.gross_amount-values.discount)

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map((item) => {
        if (item.heading)
          return (
            <h4 key={item.heading} className="text-black mb-3">
              <strong>{item.heading}</strong>
            </h4>
          )
        return (
          <Form.Item
            key={item.key}
            label={item.label}
            validateStatus={item.error && 'error'}
            help={item.error}
          >
            {item.type}
          </Form.Item>
        )
      })}
      {checkpath === 'orders' && (
        <>
          <OrdersItem values={values} setValues={setValues} errors={errors} products={products} />
          <span style={{ color: 'red' }}>{errors.order_item}</span>
        </>
      )}
      <Form.Item {...tailFormItemLayout}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(FormA)
