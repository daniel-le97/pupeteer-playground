import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { puppetService } from './PuppetService'
import { styleService } from './StyleService'

const services = {
  puppetService: puppetService,
  styleService: styleService
}

class QueService {
  addAction(payload) {
    logger.log('[Action added to Queue]', payload)
    if (AppState.loading == null) AppState.loading = 0
    AppState.actionQue = [...AppState.actionQue, payload]
  }

  nextAction() {
    if (AppState.actionQue.length > 0 && !AppState.working) {
      AppState.working = true
      const action = AppState.actionQue.shift()
      logger.log('[Performing Action]', action)
      services[action.service][action.action](action.search)
    } else {
      logger.log('[All Acitons Complete]')
    }
  }
}

export const queService = new QueService()
