import { AppState } from '../AppState'
import { catNameGenerator, generateId } from '../utils/Generators'
import { logger } from '../utils/Logger'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  // register listeners for the room messages/emits that come from the server
  constructor() {
    super()
    this
      .on('create:post', this.createPost)
      .on('remove:post', this.removePost)
      .on('update:post', this.updatePost)
      .on('joined:room', this.joinedRoom)
  }

  getSocketRoom() {
    AppState.socketUser = catNameGenerator()
    AppState.socketRoom = AppState.socketUser + ':' + generateId()
    this.authenticate(AppState.socketRoom)
    this.emit('join:room', AppState.socketRoom)
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

  createPost(payload) {
    console.log(payload)
    AppState.posts.push(payload)
  }

  removePost(id) {
    const index = AppState.posts.findIndex(p => p.id === id)
    AppState.posts.splice(index, 1)
  }

  updatePost(payload) {
    const index = AppState.posts.findIndex(p => p.id === payload.id)
    AppState.posts.splice(index, 1, payload)
  }
}

export const socketService = new SocketService()
