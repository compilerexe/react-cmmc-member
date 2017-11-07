import * as firebase from 'firebase'

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyCZ7dPhgIMD4sv1dtJ_yvy1pCi1ksGOHRs',
  authDomain: 'company-network-1481121239049.firebaseapp.com',
  databaseURL: 'https://company-network-1481121239049.firebaseio.com',
  projectId: 'company-network-1481121239049',
  storageBucket: 'company-network-1481121239049.appspot.com',
  messagingSenderId: '7040751884'
}

firebase.initializeApp(config)

export default firebase