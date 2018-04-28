import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const deleteUser = userId => ({type: DELETE_USER, userId})
const updateUser = (userId, key, value) => ({ type: UPDATE_USER, userId, key, value})

/**
 * THUNK CREATORS
 */

export const fetchUsers = () =>
  dispatch =>
    axios.get(`/api/users`)
      .then(res => res.data)
      .then(users => {
        const action = getUsers(users)
        dispatch(action)
      })
      .catch(err => console.error(err))

export const deleteUserThunkCreator = (userId) =>
dispatch =>
  axios.delete(`/api/users/${userId}`)
    .then(res => res)
    .then(() => {
      const action = deleteUser(userId)
      dispatch(action)
    })
    .catch(err => console.error(err))

export const updateUserThunkCreator = (userId, key, value) =>
  dispatch => {
    const action = updateUser(userId, key, value)
    dispatch(action)
    axios.put(`/api/users/${userId}`, { [key]: value })
      .catch(err => console.error(err))
  }


/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  let newState = state.slice()
  switch (action.type) {
    case GET_USERS:
      return action.users
    case DELETE_USER:
      return newState.filter(user => {
        return user.id !== +action.userId
      })
    case UPDATE_USER:
      newState.forEach(user => {
        if (user.id === action.userId) {
          user[action.key] = action.value
        }
      })
      return newState
    default:
      return newState
  }
}
