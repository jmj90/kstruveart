import axios from 'axios'

// CATEGORY ACTION TYPES
const INIT_CATEGORIES = 'INIT_CATEGORIES'
const CREATE_CATEGORY = 'CREATE_CATEGORY'
const EDIT_CATEGORY = 'EDIT_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'

// CATEGORY ACTION CREATORS
const initCategories = categories => ({type: INIT_CATEGORIES, categories})
const createCategory = category => ({type: CREATE_CATEGORY, category})
const editCategory = category => ({type: EDIT_CATEGORY, category})
const deleteCategory = category => ({type: DELETE_CATEGORY, category})

// CATEGORY REDUCER
export default function reducer(categories = [], action) {
  switch (action.type) {
    case INIT_CATEGORIES:
      return action.categories
    case CREATE_CATEGORY:
      return [...categories, action.category]
    case EDIT_CATEGORY:
      return categories.map(category => (
        category.id === action.category.id ? action.category : category
      ))
    case DELETE_CATEGORY:
      return categories.filter(category => category.id !== action.category.id)
    default:
      return categories
  }
}

// CATEGORY THUNK CREATORS
export const fetchCategories = () => dispatch => {
  axios.get('/api/artistStyleCategories')
    .then(res => dispatch(initCategories(res.data)))
    .catch(err => console.error('Error fetching categories: ', err))
}

export const addCategory = (category) => dispatch => {
  axios.post('/api/artistStyleCategories', category)
    .then(res => dispatch(createCategory(res.data)))
    .catch(err => console.error(`Error creating category ${category}`, err))
}

export const updateCategory = (category) => dispatch => {
  axios.put(`/api/artistStyleCategories/${category.id}`, category)
    .then(res => dispatch(editCategory(res.data)))
    .catch(err => console.error(`Error updating category ${category}`, err))
}

export const removeCategory = (category) => dispatch => {
  dispatch(deleteCategory(category.id))
  axios.delete(`/api/artistStyleCategories/${category.id}`)
    .catch(err => console.error(`Error deleting category: ${category}`, err))
}
