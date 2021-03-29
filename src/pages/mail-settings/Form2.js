/* eslint-disable */
import React, { useEffect } from 'react'
import { withRouter } from 'react-router'
import { Input, Select, Form, Button, notification, Skeleton } from 'antd'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import callApi from 'utils/callApi'
import { editMailSettings } from 'services'
import { mailSettingsSchema } from 'utils/Schema'
import { STRINGS, CATALOG_API_URL } from '_constants'
// import Form2 from 'components/Form'
import { formItemLayout, tailFormItemLayout, getBaseName } from 'utils'
import useFormValidation from 'hooks/useFormValidation'
import isEmpty from 'lodash/isEmpty'

// const widthStyle = { width: 300 }
const mailTypes = [
  // {
  //   value: 'none',
  //   name: 'None',
  // },
  {
    value: 'ssl',
    name: 'SSL',
  },
  {
    value: 'tls',
    name: 'TLS',
  },
]

const FormIndex = ({ data }) => {
  useEffect(() => {
    if (!isEmpty(data)) {
      setValues({
        ...data,
      })
    }
  }, [data])

  const submitForm = async () => {
    console.log('data')
    try {
      const a = await editMailSettings(values)
      setSubmitting(false)
      if (a && a.success)
        notification.success({
          message: STRINGS.editSuccess,
        })
    } catch (err) {
      setSubmitting(false)
    }
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
  } = useFormValidation({}, mailSettingsSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log(values)

  const verifyEmail = async () => {
    try {
      const res = await callApi('/api/backend/v1/mailSettings/verify', { method: 'POST' })
      console.log('res***********', res)
      notification.success({
        message: 'Success!',
        description: STRINGS.Verified,
      })
    } catch (err) {
      console.log('res***********', err)
      notification.error({
        message: 'Error!',
        description: err?.data?.status || 'Not Verified!',
      })
    }
  }

  //   mailSecuritySetting:enum(ssl,tls)
  // smtpHost:str *
  // smtpUsername:str *
  // smtpPassword:str *
  // smtpPort:int *
  // smtpTimeout:int *
  const formItems = [
    {
      type: (
        <Select
          placeholder="Select security setting"
          optionFilterProp="children"
          // filterOption={(input, option) =>
          //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          // }
          //   style={widthStyle}
          name="mailSecuritySetting"
          value={values.mailSecuritySetting}
          onChange={(e) => {
            setValues((a) => ({
              ...a,
              mailSecuritySetting: e,
            }))
          }}
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {mailTypes.map((i) => (
            <Select.Option key={i.value} value={i.value}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'mailSecuritySetting',
      label: 'Mail setting',
      error: errors.mailSecuritySetting,
    },
    {
      type: <Input name="smtpHost" value={values.smtpHost} />,
      key: 'smtpHost',
      label: 'SMTP Host',
      error: errors.smtpHost,
    },
    {
      type: <Input name="smtpUsername" value={values.smtpUsername} />,
      key: 'smtpUsername',
      label: 'SMTP Username',
      error: errors.smtpUsername,
    },
    {
      type: <Input type="password" name="smtpPassword" value={values.smtpPassword} />,
      key: 'smtpPassword',
      label: 'SMTP Password',
      error: errors.smtpPassword,
    },
    {
      type: <Input type="number" name="smtpPort" value={values.smtpPort} />,
      key: 'smtpPort',
      label: 'SMTP Port',
      error: errors.smtpPort,
    },
    {
      type: <Input type="number" name="smtpTimeout" value={values.smtpTimeout} />,
      key: 'smtpTimeout',
      label: 'SMTP Timeout (in seconds) ',
      error: errors.smtpTimeout,
    },
  ]

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
      <Form.Item {...tailFormItemLayout}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </Button>
        &nbsp; &nbsp; &nbsp;
        <Button
          type="dashed"
          style={{
            color:"black"
            // backgroundColor: 'lightgray',
          }}
          onClick={verifyEmail}
        >
          Verify
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(FormIndex)
