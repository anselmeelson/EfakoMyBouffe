import React, {useState} from 'react'

import app from 'firebase/app';
import "firebase/database";
import 'firebase/storage'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASZZczKGaSIfO4pWGKZI0OoP6slsMxoTU",
  authDomain: "efakomybouffe.firebaseapp.com",
  projectId: "efakomybouffe",
  storageBucket: "efakomybouffe.appspot.com",
  messagingSenderId: "81414813154",
  appId: "1:81414813154:web:ac58e81f69a38ecb2f35bb"
};
// Initialize Firebase

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
  }

  database = () => app.database();
  storage = () => app.storage();
  firestore = () => this.db;

  restaurant = rid => this.db.doc(`restaurant/${rid}`);
  category = rid => this.db.doc(`category/${rid}`);
  produit = (rid, pid) => this.db.doc(`restaurant/${rid}/produit/${pid}`);

  
}

export default Firebase;