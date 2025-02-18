import { Auth0Provider } from '@bcwdev/auth0provider'
import SocketIO from 'socket.io'
import { attachHandlers } from '../../Setup'
import { logger } from '../utils/Logger'
import { accountService } from './AccountService'
class SocketService {
  io = SocketIO();
  /**
   * @param {SocketIO.Server} io
   */
  setIO(io) {
    try {
      this.io = io
      // Server listeners
      io.on('connection', this._onConnect())
    } catch (e) {
      logger.error('[SOCKETSTORE ERROR]', e)
    }
  }

  /**
   * @param {SocketIO.Socket} socket
   */
  async authenticate(socket, bearerToken) {
    const user = await Auth0Provider.getUserInfoFromBearerToken(bearerToken).catch(err => logger.log(err))
    try {
      let limitedProfile ={}
      if(user != null){
        const profile = await accountService.getAccount(user).catch(err => logger.log(err))
         limitedProfile = {
          id: profile.id,
          email: profile.email,
          picture: profile.picture
        }
        await attachHandlers(this.io, socket, user, limitedProfile)
        socket.join(user.id)
         this.io.emit('UserConnected', user)
        } else{
        let user = bearerToken.split(':')
         limitedProfile ={
           id:user[1],
           email: user[0],
          picture: 'https://thiscatdoesnotexist.com'
        }
        await attachHandlers(this.io, socket, user, limitedProfile)
        socket.join(user)
        this.io.emit('UserConnected', user.id)
      }
      socket.emit('authenticated', limitedProfile)
    } catch (e) {
      socket.emit('error', e)
    }
  }

  /**
   * Sends a direct message to a user
   * @param {string} userId
   * @param {string} eventName
   * @param {any} payload
   */
  messageUser(userId, eventName, payload) {
    try {
      this.io.to(userId).emit(eventName, payload)
    } catch (e) {
      logger.error('[SOCKET_ERROR] messageUser', e, { userId, eventName, payload })
    }
  }

  messageRoom(room, eventName, payload) {
    this.io.to(room).emit(eventName, payload)
  }

  _onConnect() {
    return socket => {
      this._newConnection(socket)
      socket.on('disconnect', this._onDisconnect(socket))
      socket.on('authenticate', (bearerToken) => this.authenticate(socket, bearerToken))
    }
  }

  _onDisconnect(socket) {
    return () => {
      try {
        if (!socket.userInfo) {
          return
        }
        this.io.emit('UserDisconnected', socket.userInfo.id)
      } catch (e) {}
    }
  }

  _newConnection(socket) {
    // Handshake / Confirmation of Connection
    socket.emit('connected', {
      socket: socket.id,
      message: 'Successfully Connected, let the villainy commence...'
    })
  }
}

const socketService = new SocketService()

export default socketService
