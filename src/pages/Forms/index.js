
/* eslint-disable */
import React, { useEffect, useReducer } from 'react'
import { Form, Input, Button, Radio,Select, InputNumber, notification, Upload, Icon } from 'antd'
 

export const userformItems = [
    { heading: 'General' },
    {
      type: <Input value={values.fullName} name="fullName"/>,
      key: 'fullName',
      label: 'Full Name',
      error:errors.fullName
    },
    {
      type: <Input value={values.email} name="email"/>,
      key: 'email',
      label: 'Email',
      error:errors.email
    },
    // {
    //   type: <Input type="password" name="password" value={values.password} />,
    //   key: 'password',
    //   label: 'Password',
    //   error: errors.password,
    // },
    {
      type: <Input type="password" name="password" value={values.password} type="password"/>,
      key: 'password',
      label: 'Password',
      error: errors.password,
    },
    {
      type: (
        <Radio.Group name="gender" defaultValue="male" buttonStyle="solid">
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
      type: <Input value={values.phone} name="phone"/>,
      key: 'phone',
      label: 'Mobile',
      error:errors.phone
    },
    {
      type: (
        <Radio.Group name="status" defaultValue="hold" buttonStyle="solid">
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
      type: (
        <Radio.Group name="isAdmin" defaultValue={false} buttonStyle="solid">
          <Radio.Button checked={values.isAdmin === true} value={true}>
            Admin
          </Radio.Button>
          <Radio.Button checked={values.isAdmin === false} value={false}>
            Guest
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'isAdmin',
      label: 'Role',
      error: errors.isAdmin,
    },
    // {
    //   type: (
    //     <Select
    //       mode="default"
    //       // showSearch
    //       value={values.category}
    //       placeholder="Select Category"
    //       // notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
    //       filterOption={false}
    //       // onSearch={fetchProducts}
    //       onChange={(e) => {
    //         console.log("val",e)
    //         setValues(a => ({
    //           ...a,
    //           category: e,
    //         }))
    //       }}
    //       style={{ width: '100%' }}
    //       // onPopupScroll={this.handlePopupScroll}
    //     >
    //       {categories?.map((d) => (
    //         <Select.Option key={d.value} value={d.value}>
    //           {d.label}
    //         </Select.Option>
    //       ))}
    //     </Select>
    //   ),
    //   key: 'category',
    //   label: 'Category',
    //   error: errors.category,
    //   // dependency: 'prescriptionNeeded',
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
      type: <Input value={values.address} name="address"/>,
      key: 'address',
      label: 'Address',
      error:errors.address
    },
]

export const categoryformItems = [
    { heading: 'General' },
    {
      type: <Input value={values.name} name="name" />,
      key: 'name',
      label: 'Name',
      error: errors.name,
    },
    {
      type: (
        <Radio.Group name="status" defaultValue="hold" buttonStyle="solid">
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