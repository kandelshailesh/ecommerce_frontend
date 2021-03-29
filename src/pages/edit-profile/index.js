import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'
// import Query from 'components/Query'
import { profileSchema } from 'utils/Schema'
import { editUser } from 'services/user'
import Form from 'components/Form'
import { connect } from 'react-redux'
import { Input ,notification } from 'antd'
import { STRINGS } from '_constants'

const EditProfile = ({ user ,dispatch}) => {
  console.log('editprofile', user)
  // const loader = (
  //   <div className="card-body">
  //     <Skeleton active />
  //   </div>
  // )

  const profileFormItems = [
    // {
    //   type: <Input name="firstName" />,
    //   key: 'firstName',
    //   label: 'First Name',
    // },
    // {
    //   type: <Input />,
    //   key: 'lastName',
    //   label: 'Last Name',
    // },
    {
      type: <Input />,
      key: 'email',
      label: 'Email',
    },
    {
      type: <Input type="number" />,
      key: 'phone',
      label: 'Phone',
    },
    {
      type: <Input type="password" />,
      key: 'password',
      label: 'Password',
    },
    {
      type: <Input type="password" />,
      key: 'confirmPassword',
      label: 'Confirm password',
    },
  ]
  const initialValuesProfile = useMemo(() => {
    if (user && user.id && user.id !== '') {
      return {
        // firstName: user.firstName,
        email:user.email,
        phone:user.phone
        // lastName: user.lastName,
      }
    }
    return {}
  }, [user])

  const submitForm = async values => {
    console.log("Values",values,user.id)
    const res = await editUser(values, user.id)
    console.log("res,res",res)
    if (res && res.success) {
      notification.success({
        message: STRINGS.editSuccess,
      })
      dispatch({
        type: 'user/SET_STATE',
        payload: {
          // firstName: values.firstName,
          // lastName: values.lastName,
          email:values.email,
          phone:values.phone
        },
      })
    }
  }

  return (
    <div>
      <Helmet title="Edit Profile" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Edit Profile</strong>
          </div>
        </div>
        <div className="card-body">
          <Form

            initialValues={initialValuesProfile}
            formItems={profileFormItems}
            schema={profileSchema}
            onSubmit={submitForm}
          />
          {/* <Query url={`/api/backend/v1/merchant/${user?.id}`} loader={loader}>
            {({ data }) => {
              const initialValues = useMemo(() => data || {}, [])
              return <Form initialValues={initialValues} />
            }}
          </Query> */}
        </div>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(EditProfile)
