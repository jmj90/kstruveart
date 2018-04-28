import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const AUTHENTICATION_PASSWORD_RESET_HASH_CREATED = 'AUTHENTICATION_PASSWORD_RESET_HASH_CREATED'
const AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE = 'AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const passwordResetHashCreated = () => ({ type: AUTHENTICATION_PASSWORD_RESET_HASH_CREATED });
const passwordResetHashFailure = () => ({ type: AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE });

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))


      // send email to api and create hash token
      export const createHash = (email) => {
        return async (dispatch) => {
          // contact the API
          await fetch(
            // where to contact
            '/api/authentication/saveresethash',
            // what to send
            {
              method: 'POST',
              body: JSON.stringify({ email }),
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'same-origin',
            },
          )
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
            return null;
          })
          .then((json) => {
            if (json.email) {
              return dispatch(passwordResetHashCreated(json));
            }
            return dispatch(passwordResetHashFailure(new Error('Something went wrong From User.js Store. Please try again.')));
          })
          .catch(error => dispatch(passwordResetHashFailure(error)));
        };
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
    default:
      return state
  }
}
