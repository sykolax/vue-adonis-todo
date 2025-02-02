/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('auth/register', [UsersController, 'register'])
  router.post('auth/login', [UsersController, 'login'])
}).prefix('/api')