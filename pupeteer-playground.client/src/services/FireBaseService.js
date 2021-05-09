import saveAs from 'file-saver'
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

// TODO Delete folder on user Download
// TODO Cleaner Download naming
// TODO Clear Firebase folder on new search

class FirebaseService {
  addToFireBase(buffer, filePath) {
    const paths = filePath.split('/')
    paths.shift()
    const fileName = paths.join('_')
    const dbRef = db.ref().child('/tests/' + AppState.socketUser + '/' + fileName)
    const image = new Uint8Array(buffer)
    dbRef.put(image).then((snapshot) => {
      AppState.loading--
      logger.log('uploaded picture ' + fileName[fileName.length - 1])
    }).catch(err => logger.error(err))
  }

  async downloadFireBase() {
    AppState.zipCount = 0
    AppState.zipped = 0
    const folderPath = '/tests/' + AppState.socketUser
    const jszip = new JSZip()
    const folderRef = firebase.storage().ref(folderPath)
    const files = (await folderRef.listAll()).items
    const downloadUrls = []
    await Promise.all(
      files.map(async({ name }) => folderRef.child(name).getDownloadURL().then(res => downloadUrls.push(res)))
    )
    AppState.zipCount = downloadUrls.length
    logger.log('urls', downloadUrls)
    const downloadedFiles = []
    await Promise.all(downloadUrls.map(url => fetch(url).then(async(res) => {
      downloadedFiles.push(await res.blob())
      AppState.zipped += 0.5
    }).catch(err => logger.error(err))))

    logger.warn('blobs', downloadedFiles)
    downloadedFiles.forEach((file, i) => {
      jszip.file(files[i].name, file)
      AppState.zipped += 0.5
    })
    const content = await jszip.generateAsync({ type: 'blob' })
    saveAs(content, 'test')
  }
}

export const firebaseService = new FirebaseService()
