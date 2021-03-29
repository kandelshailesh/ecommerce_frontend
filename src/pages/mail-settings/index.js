/* eslint-disable */
import React from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import Form from './Form2'
import {Skeleton} from 'antd'
import { CATALOG_API_URL } from '_constants'

const FormIndex = () => {
   
  const form = (
    <Query url={CATALOG_API_URL.getMailSettings} loader={<Skeleton active />}>
      {({ data }) => {
        if (data)
          return <Form data={data}/>
        return <div>No data!</div>
      }}
    </Query>
  )

  return (
    <div>
      <Helmet title="Mail Settings" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Mail Settings</strong>
          </div>
        </div>
        <div className="card-body">
          {form}
        </div>
      </div>
    </div>
  )
}

export default withRouter(FormIndex)
 