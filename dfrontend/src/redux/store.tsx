import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { createStore, combineReducers  } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';

// Initialize firebase instance
const app = initializeApp(fbConfig)
getFirestore(app);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

const initialState = {}
const store = createStore(rootReducer, initialState)

export {store};