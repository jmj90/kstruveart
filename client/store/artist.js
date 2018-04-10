import axios from 'axios';
import history from '../history'

// PRODUCT ACTION TYPES
const INIT_ARTISTS = 'INIT_ARTISTS';
const CREATE_ARTIST = 'CREATE_ARTIST';
const EDIT_ARTIST = 'EDIT_ARTIST';
const REMOVE_ARTIST = 'REMOVE_ARTIST';

// PRODUCT ACTION CREATORS
const initArtist = artists => ({ type: INIT_ARTISTS, artists});
const createArtist = artist => ({ type: CREATE_ARTIST, artist });
const editArtist = artist => ({ type: EDIT_ARTIST, artist});
const deleteArtist = id => ({ type: REMOVE_ARTIST, id });

// PRODUCT REDUCER
export default function (artists = [], action) {
  switch (action.type) {

    case INIT_ARTISTS:
      return action.artists;

    case CREATE_ARTIST:
      return [...artists, action.artist];

    case EDIT_ARTIST:
      return artists.map(artist => (
        artist.id === action.artist.id ? action.artist : artist
      ));

    case REMOVE_ARTIST:
      return artists.filter(artist => artist.id !== action.id);

    default:
      return artists;
  }
}

// PRODUCTS THUNK CREATORS
export const fetchArtists = () => dispatch => {
  axios.get('/api/artists')
    .then(res => dispatch(initArtist(res.data)))
    .catch(err => console.error('Error fetching artists!', err));
}

export const addArtist = artist => dispatch => {
  axios.post('/api/artists', artist)
    .then(res => {
      dispatch(createArtist(res.data))
       window.location.href = `/artists/${res.data[0].id}`
    })
    .catch(err => console.error(`Error adding artist: ${artist}`, err));
}


export const updateArtist = artist => dispatch => {
  axios.put(`/api/artists/${artist.id}`, artist)
    .then(res => {
      dispatch(editArtist(res.data))
      history.push(`/artists/${artist.id}`)
    })
    .catch(err => console.error(`Error updating artist: ${artist}`, err));
}


export const removeArtist = id => dispatch => {
  dispatch(deleteArtist(id));
  axios.delete(`/api/artists/${id}`)
    .catch(err => console.error(`Error deleting artist: ${id}!`, err));
}
