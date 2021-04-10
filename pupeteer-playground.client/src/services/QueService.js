import { AppState } from '../AppState'
import { puppetService } from './PuppetService'
import { logger } from '../utils/Logger'

const services = {
  puppetService: puppetService
}

class QueService {
  addAction(payload) {
    logger.log('[Action added to Queue]', payload)
    AppState.loading++
    AppState.actionQue = [...AppState.actionQue, payload]
  }

  nextAction() {
    if (AppState.actionQue.length > 0) {
      const action = AppState.actionQue.shift()
      logger.log('[Performing Action]', action)
      services[action.service][action.action](action.search)
    } else {
      logger.log('[All Acitons Complete]')
    }
  }
}

export const queService = new QueService()
