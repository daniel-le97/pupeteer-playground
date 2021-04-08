import { logger } from '../utils/Logger'
import { SocketHandler } from '../utils/SocketHandler'

export class PuppetHandler extends SocketHandler {
  /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   * @param {{ id: string; email: string; }} user
   * @param {{ id: string; email: string; }} profile
   */
  constructor(io, socket, user, profile) {
    logger.log("puppet handler registered")
    super(io, socket, user, profile)
    this
      .on('TEST_EVENT', this.testEvent)
      .on('join:room', this.joinRoom)
  }

  async joinRoom(payload){
    this.socket.join(payload)
    this.socket.emit('joined:room', payload)
  }
  async testEvent(payload) {
    this.socket.emit('THANKS', {
      user: this.user,
      profile: this.profile,
      payload
    })
  }

}
