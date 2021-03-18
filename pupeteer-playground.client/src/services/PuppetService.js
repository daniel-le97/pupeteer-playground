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
      const res = await api.put('/api/puppet/scrape', url)
      logger.log(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const puppetService = new PuppetService()
