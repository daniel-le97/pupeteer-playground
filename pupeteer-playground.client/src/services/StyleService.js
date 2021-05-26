import { AppState } from '../AppState'
import { generateParams } from '../utils/Generators'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class StyleService {
  async scrapeStyle(search) {
    try {
      const res = await api.put('api/style/sheet', search)
      logger.log(res.data)
    } catch (err) {
      logger.error(err)
    }
  }

  async scrapeColors(search, options) {
    try {
      const res = await api.put('api/style/color' + generateParams(options), search)
      logger.log(res.data)
    } catch (err) {
      logger.error(err)
    }
  }

  // From Sockets

  foundColors(colors) {
    AppState.styleResults.colors = colors
  }

  foundStyles(styles) {
    AppState.styleResults.styles = styles
  }
}

export const styleService = new StyleService()
