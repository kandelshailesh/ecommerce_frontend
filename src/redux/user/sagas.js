import { all, takeEvery, put, call, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import {
  loginSocial,
  logoutJwt,
  mockLoadCurrentAct,
  // mockLogin,
  login1,
  // currentAccountJwt,
  // , currentAccount, login, logout,
} from 'services/user'
import { getLeftMenuData, getTopMenuData } from 'services/menu'
import * as constants from '_constants'
import actions from './actions'

export function* LOGIN({ payload }) {
  console.log('payload', payload)
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(login1, email, password)
  console.log('successs', success)
  if (success) {
    notification.success({
      message: constants.LOGIN_SUCCESS,
      description: constants.LOGIN_SUCCESS_MESSAGE,
    })
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
      payload: {
        user: success,
      },
    })
  }
}

export function* LOGIN_SOCIAL({ payload }) {
  console.log('in social login ')
  console.log(payload)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const {
    name,
    email,
    imageUrl: avatar,

    accessToken,
  } = payload
  const response = yield call(loginSocial, email, accessToken)

  if (response) {
    console.log(response)
    notification.success({
      message: constants.LOGIN_SUCCESS,
      description: constants.LOGIN_SUCCESS_MESSAGE,
    })
    const { userId: id, role, phone } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        email,
        role,
        name,
        phone,
        avatar,
        authorized: true,
      },
    })
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
  }
}

export function* GET_MENU_DATA(role) {
  console.log('Role', role)
  let menuLeftData
  if (role === 'admin') {
    menuLeftData = yield call(getLeftMenuData)
  } 
  // else {
  //   console.log('inside')
  //   menuLeftData = yield call(getLeftMenuDataUser)
  // }

  const menuTopData = yield call(getTopMenuData)
  yield put({
    type: 'menu/SET_STATE',
    payload: {
      menuLeftData,
      menuTopData,
    },
  })
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })

  // const data = yield call(currentAccountJwt)
  const data = yield call(mockLoadCurrentAct)
  if (data) {
    const { user } = data
    console.log('data', data)
    yield put({
      type: actions.SET_STATE,
      payload: {
        ...user,
        loading: false,
        token: data?.token,
        id: user?.id,
        // id: user.userId,
        email: user.email,
        role: user?.isAdmin?'admin':'',
        name: user?.fullName !== null ? user.fullName : 'Ecommerce',
        phone: user?.phone,
        firstName: user.fullName !== null ? user.fullName : 'Ecommerce',
        authorized: true,
      },
    })
    yield GET_MENU_DATA('admin')
    // yield GET_MENU_DATA(user.role)
  } else {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        authorized: false,
      },
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield call(logoutJwt)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.LOGIN, LOGIN),
    takeEvery(actions.LOGIN_SOCIAL, LOGIN_SOCIAL),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(),
  ])
}
