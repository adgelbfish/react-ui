import { browserHistory } from 'react-router'

if (typeof window === "undefined" || window === null) {
  var localStorage = {
    getItem: () => {},
    setItem: () => {}
  };
  var history = {}
} else {
  var localStorage = window.localStorage;
}

export const REQUEST_CHANNELS = 'REQUEST_CHANNELS'
export const requestChannels = () => ({
  type: REQUEST_CHANNELS,
})

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'
export const receiveChannels = (json) => ({
  type: RECEIVE_CHANNELS,
  channels: json,
  receivedAt: Date.now()
})

export const SEARCH_CHANNELS = 'SEARCH_CHANNELS'
export const searchChannels = (search) => ({
  type: SEARCH_CHANNELS,
  search,
})

export const SET_LOCATION = 'SET_LOCATION'
export const setLocation = (location) => ({
  type: SET_LOCATION,
  location,
})

export const SET_QUERY = 'SET_QUERY'
export const setQuery = (search) => ({
  type: SET_QUERY,
  search,
})


export const ACTIVATE_SEARCH = 'ACTIVATE_SEARCH'
export const activateSearch = (search) => ({
  type: ACTIVATE_SEARCH,
})



export const DEACTIVATE_SEARCH = 'DEACTIVATE_SEARCH'
export const deactivateSearch = (search) => ({
  type: DEACTIVATE_SEARCH,
})

export const fetchChannels = () => (dispatch, getState) => {
  if(getState().channels.visibleChannelIds <= 0) {
    dispatch(requestChannels())
    return fetch(`http://www.eternityready.com/api/channels/all`,
      {mode:"cors"})
      .then(response => response.json())
      .then(json => dispatch(receiveChannels(json)))
    }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

const LOGIN_URL = '/login'
const SIGNUP_URL = '/signup'


const requestLogin = (creds) => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
})

const receiveLogin = (user) => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token,
  username: user.username
})

const loginError = (message) => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
})

export const loginUser = (creds) => {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestLogin(creds))
    return fetch(LOGIN_URL, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          localStorage.setItem('id_token', user.id_token)
          localStorage.setItem('username', user.username)
          dispatch(receiveLogin(user))
          browserHistory.push(`/browse`)
        }
      }).catch(err => console.log("Error: ", err))
  }
}

const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true
})

const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false
})

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout())
  localStorage.removeItem('id_token')
  dispatch(receiveLogout())
  location.href = '/'
}

const requestSignup = (creds) => ({
  type: SIGNUP_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
})

const receiveSignup = (user) => ({
  type: SIGNUP_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token,
  username: user.username
})

const signupError = (message) => ({
  type: SIGNUP_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
})

export const signupUser = (creds) => {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestLogin(creds))
    return fetch(SIGNUP_URL, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          localStorage.setItem('id_token', user.id_token)
          localStorage.setItem('username', user.username)
          dispatch(receiveLogin(user))
          browserHistory.push(`/browse`)
        }
      }).catch(err => console.log("Error: ", err))
  }
}

