// import { Storage } from '@google-cloud/storage';
// import fetch from 'node-fetch';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { logger } from '../utils/Logger';
const appToken = process.env.GOOGLE_APPLICATION_CREDENTIALS
// admin.initializeApp({
//   credential: admin.credential.cert(appToken),
//   storageBucket: 'puppeteer-playground-2bec8.appspot.com/'
// })
// const store = admin.database()
// const db = store.ref()



// const storageKey = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)

 firebase.initializeApp({
  apiKey: "AIzaSyDEvPcGuUQZ6LQY6cRWhUumIVJps0zx5UQ",
  authDomain: "puppeteer-playground-2bec8.firebaseapp.com",
  projectId: "puppeteer-playground-2bec8",
  storageBucket: "puppeteer-playground-2bec8.appspot.com",
  messagingSenderId: "895362677537",
  appId: "1:895362677537:web:812c1aa1ce590cc67a1c60"
})
const db = firebase.storage()

// Private Methods


class FireBaseService {
  constructor(){


  }
  testFireBase(buffer, filePath){
    let fileName = filePath.split('/')
    let dbRef = db.ref().child('/tests/'+ fileName[fileName.length -1])
    let image = buffer
    logger.warn(image)
    dbRef.put(image).then((snapshot)=>{logger.log('uploaded blob ' + fileName[fileName.length -1])}).catch(err => logger.error(err))
}

}

export const fbsService = new FireBaseService()
