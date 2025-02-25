// import type { HttpContext } from '@adonisjs/core/http'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {

    async login({ request }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        console.log(email, password)
        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user)

        return token 
    }

    async register ({ request }: HttpContext) { 
        const { email, password } = request.only(['email', 'password'])
        const user = await User.create({ 
            username: email, 
            email: email,
            password: password,
        })

        const token = await User.accessTokens.create(user)
        return token
    }
}
