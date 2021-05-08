import { AppState } from '../AppState'
import { catNameGenerator, generateId } from '../utils/Generators'
import { logger } from '../utils/Logger'
import { SocketHandler } from '../utils/SocketHandler'
import { puppetService } from './PuppetService'
import { queService } from './QueService'
import { styleService } from './StyleService'

class SocketService extends SocketHandler {
  // register listeners for the room messages/emits that come from the server
  constructor() {
    super()
    this
      .on('joined:room', this.joinedRoom)
      .on('download:image', this.downloadImage)
      .on('found:image', this.foundImage)
      .on('action:done', this.nextAction)
      .on('style:sheet', this.styleSheets)
      .on('style:colors', this.foundColors)
  }

  getSocketRoom() {
    AppState.socketUser = catNameGenerator()
    AppState.socketRoom = AppState.socketUser + ':' + generateId()
    this.authenticate(AppState.socketRoom)
    this.emit('join:room', AppState.socketRoom)
  }

  //  IMAGES ----------------
  downloadImage(payload) {
    puppetService.downloadImage(payload)
  }

  foundImage(payload) {
    puppetService.foundImage(payload)
  }

  // ---------------------
  //  STYLES ---------------
  styleSheets(payload) {
    logger.warn(payload)
  }

  foundColors(payload) {
    logger.warn(payload)
    styleService.foundColors(payload)
  }

  // -------------------
  nextAction() {
    AppState.working = false
    queService.nextAction()
  }

  authenticate(bearerToken) {
    this.socket.emit('authenticate', bearerToken)
  }

  connect() {
    this.socket.emit('connection')
  }

  joinedRoom(payload) {
    logger.log('your socket room is ', payload)
  }

  connected(payload) {
    logger.log(payload.message)
  }
}

export const socketService = new SocketService()
