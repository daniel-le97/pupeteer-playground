import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

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
      AppState.loading = true
      AppState.imageResults.downloadedImages = []
      AppState.imageResults.failedImages = []
      url.socketRoom = AppState.socketRoom
      logger.log('Getting images', url)
      const res = await api.put('/api/puppet/scrape', url)
      logger.log(res.data)
      AppState.imageResults.message = res.data.message
      AppState.loading = false
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
      AppState.loading = false
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
      AppState.loading -= 1
    } catch (err) {
      logger.error(err)
      AppState.loading -= 1
      if (err.message) {
        const message = err.message.split(':')
        AppState.imageResults.error = { error: message[message.length - 1] }
      } else {
        AppState.imageResults.error = { error: 'unknown error, please try again' }
      }
    }
  }

  async scrapeBackgrounds(search) {
    try {
      const res = await api.put('api/puppet/scrape/backgrounds', search)
      AppState.imageResults.message = res.data.message
      AppState.imageResults.found += res.data.count
      AppState.loading -= 1
    } catch (err) {
      logger.error(err)
      AppState.loading -= 1
      if (err.message) {
        const message = err.message.split(':')
        AppState.imageResults.error = { error: message[message.length - 1] }
      } else {
        AppState.imageResults.error = { error: 'unknown error, please try again' }
      }
    }
  }

  async scrapeThumbnails(search) {
    try {
      const res = await api.put('api/puppet/scrape/thumbnails', search)
      AppState.imageResults.message = res.data.message
      AppState.imageResults.found += res.data.count
      AppState.loading -= 1
    } catch (err) {
      logger.error(err)
      AppState.loading -= 1
      if (err.message) {
        const message = err.message.split(':')
        AppState.imageResults.error = { error: message[message.length - 1] }
      } else {
        AppState.imageResults.error = { error: 'unknown error, please try again' }
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
      case 'ok': AppState.imageResults.downloadedImages.push(image); break
      case 'bad': AppState.imageResults.downloadedImages.push(image); break
    }
    AppState.imageResults.found--
  }
}

export const puppetService = new PuppetService()
