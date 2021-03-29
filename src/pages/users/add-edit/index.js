/* eslint-disable no-underscore-dangle */
import React from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import useFetching from 'hooks/useFetching'
import { Skeleton } from 'antd'

// import { BANNER_API_URL } from '_constants'

import Form from './Form'

const FormIndex = (props) => {
  const { match } = props
  const { params } = match
  const { id } = params
  const url = match.url?.replace('/', '').replace('/add-edit', '')
  console.log('url', url, url.slice(0, -2))
  //  console.log("props",props,match.url.replace('/add-edit','').replace("/"))

  const [{ response: categories }] = useFetching(`/api/backend/v1/category?status=active`)
  console.log('Categories Response', categories)

  const [{ response: units }] = useFetching(`/api/backend/v1/unit`)
  console.log('Categories Response', units)

  const [{ response: users }] = useFetching(`/api/backend/v1/users`)
  console.log('Categories Response', users)

  const obj = {
    url,
    method: 'POST',
  }
  let form = (
    <Form path={obj} categories={categories?.DATA} units={units?.DATA} users={users?.data} />
  )
  if (id) {
    form = (
      <Query
        url={
          url.slice(0, -2) === 'users'
            ? `/api/backend/v1/${url}`
            : `/api/backend/v1/${url.slice(0, -2)}?id=${id}`
        }
        loader={<Skeleton active />}
      >
        {(res) => {
          if (res?.DATA || res?.data) {
            const datas = res?.DATA || res?.data

            return (
              <Form
                data={Array.isArray(datas) ? datas[0] : datas}
                path={{ ...obj, method: 'PATCH' }}
                categories={categories?.DATA}
                units={units?.DATA}
                users={users?.data}
              />
            )
          }
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? `Edit ${url.slice(0, -2)}` : `Add ${url}`
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default withRouter(FormIndex)
