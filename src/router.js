import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
// import Loadable from 'react-loadable'

import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'pages/404'
import { ROLES } from '_constants'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

const loadable = (loader) => React.lazy(loader) // added
// Loadable({
//   loader,
//   // delay: false,
//   loading: () => <Loader />,
//   delay: 200
// })

const routes = [
  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('pages/user/login')),
    exact: true,
    // authorize:false
  },
  {
    path: '/users',
    component: loadable(() => import('pages/users/list')),
    exact: true,
    // authorize: true
  },
  {
    path: '/users/add-edit',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },

  {
    path: '/users/add-edit/:id',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },
  // // category
  {
    path: '/category',
    component: loadable(() => import('pages/users/list')),
    exact: true,
    // authorize:true
  },
  {
    path: '/category/add-edit',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },

  {
    path: '/category/add-edit/:id',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },
  // // unit
  {
    path: '/unit',
    component: loadable(() => import('pages/users/list')),
    exact: true,
    // authorize:true
  },
  {
    path: '/unit/add-edit',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },

  {
    path: '/unit/add-edit/:id',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },
  // // products
  {
    path: '/products',
    component: loadable(() => import('pages/users/list')),
    exact: true,
    // authorize:true
  },
  {
    path: '/products/add-edit',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },

  {
    path: '/products/add-edit/:id',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },
  // // orders
  {
    path: '/orders',
    component: loadable(() => import('pages/users/list')),
    exact: true,
    // authorize:true
  },
  {
    path: '/orders/add-edit',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },

  {
    path: '/orders/add-edit/:id',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },
  // // doctors
  {
    path: '/doctors',
    component: loadable(() => import('pages/users/list')),
    exact: true,
    // authorize:true
  },
  {
    path: '/doctors/add-edit',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },

  {
    path: '/doctors/add-edit/:id',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },

   // // subscriber
   {
    path: '/subscriber',
    component: loadable(() => import('pages/users/list')),
    exact: true,
    // authorize:true
  },
  {
    path: '/subscriber/add-edit',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },

  {
    path: '/subscriber/add-edit/:id',
    component: loadable(() => import('pages/users/add-edit')),
    exact: true,
    // authorize:true
  },
]

@connect(({ user }) => ({ user }))
class Router extends React.Component {
  render() {
    const { history, user } = this.props
    console.log('9999', user)
    return (
      <Suspense fallback={<Loader />}>
        <ConnectedRouter history={history}>
          <IndexLayout>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  // return <Redirect to="/dash" />
                  console.log('fffffffffffff', user.role)
                  switch (user.role) {
                    case ROLES.admin:
                      console.log('444')
                      return <Redirect to="/users" />
                    default:
                      return <Redirect to="/user/login" />
                  }
                }}
              />
              <Suspense fallback={<Loader />}>
                {routes.map((route) => {
                  console.log('ffffttttttttt', route.authorize)
                  if (route.authorize) return <PrivateRoute key={route.path} {...route} />
                  return (
                    <Route
                      path={route.path}
                      component={route.component}
                      key={route.path}
                      exact={route.exact}
                    />
                  )
                })}
              </Suspense>
              <Route component={NotFoundPage} />
            </Switch>
          </IndexLayout>
        </ConnectedRouter>
      </Suspense>
    )
  }
}

export default Router
