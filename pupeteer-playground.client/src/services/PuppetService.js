import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { socketService } from './SocketService'

const testPics = {
  smallest: [
    { url: 'https://thiscatdoesnotexist.com' },
    { url: 'https://source.unsplash.com/800x900/?animals,cat' },
    { url: 'https://source.unsplash.com/800x800/?animals,cat' }
  ],
  small: [
    { url: 'https://thiscatdoesnotexist.com' },
    { url: 'https://source.unsplash.com/800x900/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/900x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x900/?animals,cat' },
    { url: 'https://source.unsplash.com/600x1200/?animals,cat' },
    { url: 'https://source.unsplash.com/600x1200/?animals,cat' },
    { url: 'https://source.unsplash.com/500x500/?animals,cat' },
    { url: 'https://source.unsplash.com/800x800/?animals,cat' }
  ],
  big: [
    { url: 'https://thiscatdoesnotexist.com' },
    { url: 'https://source.unsplash.com/800x900/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/900x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x900/?animals,cat' },
    { url: 'https://source.unsplash.com/600x1200/?animals,cat' },
    { url: 'https://source.unsplash.com/600x1200/?animals,cat' },
    { url: 'https://source.unsplash.com/500x500/?animals,cat' },
    { url: 'https://source.unsplash.com/1000x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/900x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/550x700/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/900x2000/?animals,cat' },
    { url: 'https://source.unsplash.com/900x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x1000/?animals,cat' },
    { url: 'https://source.unsplash.com/800x800/?animals,cat' }
  ]
}

class PuppetService {
  async getScreenshot(url) {
    try {
      const res = await api.put('/api/puppet', url)
      logger.log(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  testData(size) {
    AppState.pictureResults.downloadedImages = testPics[size]
  }

  async getScrape(url) {
    try {
      socketService.emit('join:room', AppState.socketRoom)
      AppState.loading = true
      logger.log('Getting images', url)
      AppState.pictureResults = {}
      AppState.pictureResults.downloadedImages = []
      AppState.pictureResults.failedImages = []
      const res = await api.put('/api/puppet/scrape', url)
      logger.log(res.data)
      res.data.downloadedImages.forEach(image => {
        AppState.pictureResults.downloadedImages.push(image)
      })
      res.data.failedImages.forEach(image => {
        AppState.pictureResults.failedImages.push(image)
      })
      AppState.loading = false
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
      AppState.loading = false
      if (err.message) {
        const message = err.message.split(':')
        AppState.pictureResults = { error: message[message.length - 1] }
      } else {
        AppState.pictureResults = { error: 'unknown error, please try again' }
      }
    }
  }
}

export const puppetService = new PuppetService()
