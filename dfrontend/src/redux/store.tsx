/* For this file, we initialize the app using the firebase configuration we declared at src/firebase
By having a store, we'll be able to make quicker and cleaner reads and writes to our database.
*/

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { createStore, combineReducers  } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';
import { firebaseConfig } from './../firebase';

const app = initializeApp(firebaseConfig)
getFirestore(app);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

const initialState = {}
const store = createStore(rootReducer, initialState)

export {store};