import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBvJ6rEaqaQMLWwOkX2c41Iukr5itsEn1M',
  authDomain: 'notes-app-fbfb5.firebaseapp.com',
  projectId: 'notes-app-fbfb5',
  storageBucket: 'notes-app-fbfb5.appspot.com',
  messagingSenderId: '33509595582',
  appId: '1:33509595582:web:dc75402f59f504cdce41ef'
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
