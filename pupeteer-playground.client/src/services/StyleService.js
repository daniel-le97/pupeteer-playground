import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class StyleService {
  async stealStyleSheets(search) {
    try {
      const res = await api.put('api/style/sheet', search)
      logger.log(res.data)
    } catch (err) {
      logger.error(err)
    }
  }

  async stealSiteStyle(search) {
    try {
      const res = await api.put('api/style/site', search)
      logger.log(res.data)
    } catch (err) {
      logger.error(err)
    }
  }

  // From Sockets

  foundColors(colors) {
    AppState.styleResults.colors = colors
  }
}

export const styleService = new StyleService()
