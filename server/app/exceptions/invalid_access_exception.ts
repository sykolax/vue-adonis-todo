import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class InvalidAccessException extends Exception {
  // When user tries to edit projects of other users(unauthorized action)
  static status = 403
  static code = 'E_UNAUTHORIZED'
  
  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send(error.message)
  }
}