import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PuppetService {
  async getScreenshot(url) {
    try {
      const res = await api.put('/api/puppet', url)
      logger.log(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getScrape(url) {
    try {
      AppState.loading = true
      logger.log(url)
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
        AppState.pictureResults = { error: err.response.data.error.message.split(':')[2] }
      } else {
        AppState.pictureResults = { error: 'unknown error, please try again' }
      }
    }
  }
}

export const puppetService = new PuppetService()
