// import { Storage } from '@google-cloud/storage';
// import fetch from 'node-fetch';
// import { logger } from '../utils/Logger';
const appToken = process.env.GOOGLE_APPLICATION_CREDENTIALS
import firebase from 'firebase/app'
// import admin from 'firebase-admin'
// admin.initializeApp({
//   credential: admin.credential.cert(appToken),
//   storageBucket: 'puppeteer-playground-2bec8.appspot.com/'
// })
// const store = admin.database()
// const db = store.ref()

const firebaseConfig = firebase.initializeApp(process.env.firebaseConfig)

const db = firebaseConfig.storage().ref()


// const storageKey = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)


// Private Methods


class FireBaseService {
testFireBase(bytes){
  db.put(bytes)
}

}

export const fbsService = new FireBaseService()
