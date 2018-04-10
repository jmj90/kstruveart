import axios from 'axios';
import history from '../history'

// PRODUCT ACTION TYPES
const INIT_PRODUCTS = 'INIT_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

// PRODUCT ACTION CREATORS
const initProduct = products => ({ type: INIT_PRODUCTS, products});
const createProduct = product => ({ type: CREATE_PRODUCT, product });
const editProduct = product => ({ type: EDIT_PRODUCT, product});
const deleteProduct = id => ({ type: DELETE_PRODUCT, id });

// PRODUCT REDUCER
export default function reducer(products = [], action) {
  switch (action.type) {

    case INIT_PRODUCTS:
      return action.products;

    case CREATE_PRODUCT:
      return [...products, action.product];

    case EDIT_PRODUCT:
      return products.map(product => (
        product.id === action.product.id ? action.product : product
      ));

    case DELETE_PRODUCT:
      return products.filter(product => product.id !== action.id);

    default:
      return products;
  }
}

// PRODUCTS THUNK CREATORS
export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => dispatch(initProduct(res.data)))
    .catch(err => console.error('Error fetching products!', err));
}

export const addProduct = product => dispatch => {
  axios.post('/api/products', product)
    .then(res => {
      dispatch(createProduct(res.data))
      window.location.href = `/products/${res.data.id}`
    })
    .catch(err => console.error(`Error adding product: ${product}`, err));
}


export const updateProduct = product => dispatch => {
  axios.put(`/api/products/${product.id}`, product)
    .then(res => {
      dispatch(editProduct(res.data))
      history.push(`/products/${product.id}`)
    })
    .catch(err => console.error(`Error updating product: ${product}`, err));
}


export const removeProduct = id => dispatch => {
  dispatch(deleteProduct(id));
  axios.delete(`/api/products/${id}`)
    .catch(err => console.error(`Error deleting product: ${id}!`, err));
}
