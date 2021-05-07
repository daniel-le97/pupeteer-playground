import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { firebaseService } from './FireBaseService'

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
  scrapeHandler(options) {
    this.scrapeImages(options)
    this.scrapeBackgrounds(options)
    this.scrapeThumbnails(options)
  }

  async getScreenshot(url) {
    try {
      const res = await api.put('/api/puppet', url)
      logger.log(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  testData(size) {
    AppState.imageResults.downloadedImages = testPics[size]
  }

  async getScrape(url) {
    try {
      AppState.imageResults.downloadedImages = []
      AppState.imageResults.failedImages = []
      url.socketRoom = AppState.socketRoom
      logger.log('Getting images', url)
      const res = await api.put('/api/puppet/scrape', url)
      logger.log(res.data)
      AppState.imageResults.message = res.data.message
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
      if (err.message) {
        const message = err.message.split(':')
        AppState.imageResults.error = { error: message[message.length - 1] }
      } else {
        AppState.imageResults.error = { error: 'unknown error, please try again' }
      }
    }
  }

  async scrapeImages(search) {
    try {
      const res = await api.put('api/puppet/scrape/images', search)
      AppState.imageResults.message = res.data.message
      AppState.imageResults.found += res.data.count
    } catch (err) {
      logger.error(err)
      if (err.message) {
        const message = err.message.split(':')
        AppState.error = { error: message[message.length - 1] }
      } else {
        AppState.error = { error: 'unknown error, please try again' }
      }
    }
  }

  async scrapeBackgrounds(search) {
    try {
      const res = await api.put('api/puppet/scrape/backgrounds', search)
      AppState.imageResults.message = res.data.message
      AppState.imageResults.found += res.data.count
    } catch (err) {
      logger.error(err)
      if (err.message) {
        const message = err.message.split(':')
        AppState.error = { error: message[message.length - 1] }
      } else {
        AppState.error = { error: 'unknown error, please try again' }
      }
    }
  }

  async scrapeThumbnails(search) {
    try {
      const res = await api.put('api/puppet/scrape/thumbnails', search)
      AppState.imageResults.message = res.data.message
      AppState.imageResults.found += res.data.count
    } catch (err) {
      logger.error(err)
      if (err.message) {
        const message = err.message.split(':')
        AppState.error = { error: message[message.length - 1] }
      } else {
        AppState.error = { error: 'unknown error, please try again' }
      }
    }
  }

  foundImage(image) {
    logger.log(image)
    AppState.imageResults.foundImages.push(image)
  }

  downloadImage(image) {
    // logger.log(image)
    switch (image.status) {
      case 'ok': AppState.imageResults.downloadedImages.push(image)
        AppState.loading++
        firebaseService.addToFireBase(image.data, image.url)
        break
      case 'bad': AppState.imageResults.downloadedImages.push(image); break
    }
    AppState.imageResults.found--
  }

  clearResults() {
    AppState.imageResults = {
      downloadedImages: [],
      failedImages: [],
      message: null,
      error: null,
      found: 0
    }
  }
}

export const puppetService = new PuppetService()
