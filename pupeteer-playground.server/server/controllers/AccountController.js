import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class AccountController extends BaseController {
  constructor() {
    logger.log("account controller loaded")
    super('account')
    this.router
      // .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
