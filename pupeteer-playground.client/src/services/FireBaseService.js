import { saveAs } from 'file-saver'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import JSZip from 'jszip'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'


firebase.initializeApp({
  apiKey: 'AIzaSyDEvPcGuUQZ6LQY6cRWhUumIVJps0zx5UQ',
  authDomain: 'puppeteer-playground-2bec8.firebaseapp.com',
  projectId: 'puppeteer-playground-2bec8',
  storageBucket: 'puppeteer-playground-2bec8.appspot.com',
  messagingSenderId: '895362677537',
  appId: '1:895362677537:web:812c1aa1ce590cc67a1c60'
})
const db = firebase.storage()

class FirebaseService {
  addToFireBase(buffer, filePath) {
    const fileName = filePath.split('/')
    const dbRef = db.ref().child('/tests/' + AppState.socketUser + '/' + fileName[fileName.length - 1])
    const image = new Uint8Array(buffer)
    dbRef.put(image).then((snapshot) => { logger.log('uploaded picture ' + fileName[fileName.length - 1]) }).catch(err => logger.error(err))
  }

  async downloadFireBase() {
    const jszip = new JSZip();
    const folderRef = firebase.storage().ref(folderPath);
    const files = (await folderRef.listAll()).items;
    const downloadUrls: Array<string> = await Promise.all(
        files.map(({ name }) => folderRef.child(name).getDownloadURL())
    );
    const downloadedFiles = await Promise.all(downloadUrls.map(url => fetch(url).then(res => res.blob())));
    downloadedFiles.forEach((file, i) => jszip.file(files[i].name, file));
    const content = await jszip.generateAsync({ type: 'blob' });
    saveAs(content, folderPath);
  }
}

export const firebaseService = new FirebaseService()
