import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const EDIT_USER = 'EDIT_USER';


/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const editUser = user => ({ type: EDIT_USER, user});

/**
 * THUNK CREATORS
 */

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data || defaultUser))
      })
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/account-settings')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        return axios.get('/auth/me')
      })
      .then(() => location.reload(true))
      .catch(err => console.log(err))

  export const updateUser = user => dispatch => {
    axios.put(`/api/users/${user.id}`, user)
      .then(res => {
        dispatch(editUser(res.data))
        history.push(`/account-settings`)
      })
      .catch(err => console.error(`Error updating product: ${user}`, err));
  }

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
      case EDIT_USER:
        return defaultUser.map(user => (
          user.id === action.user.id ? action.user : user
        ));

    default:
      return state
  }
}
