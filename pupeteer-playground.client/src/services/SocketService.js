import { AppState } from '../AppState'
import { catNameGenerator, generateId } from '../utils/Generators'
import { logger } from '../utils/Logger'
import { SocketHandler } from '../utils/SocketHandler'
import { puppetService } from './PuppetService'
import { queService } from './QueService'

class SocketService extends SocketHandler {
  // register listeners for the room messages/emits that come from the server
  constructor() {
    super()
    this
      .on('joined:room', this.joinedRoom)
      .on('download:image', this.downloadImage)
      .on('found:image', this.foundImage)
      .on('action:done', this.nextAction)
  }

  getSocketRoom() {
    AppState.socketUser = catNameGenerator()
    AppState.socketRoom = AppState.socketUser + ':' + generateId()
    this.authenticate(AppState.socketRoom)
    this.emit('join:room', AppState.socketRoom)
  }

  downloadImage(payload) {
    puppetService.downloadImage(payload)
  }

  foundImage(payload) {
    puppetService.foundImage(payload)
  }

  nextAction() {
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
    console.log(payload.message)
  }
}

export const socketService = new SocketService()
