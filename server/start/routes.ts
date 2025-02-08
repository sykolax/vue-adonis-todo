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
const ProjectsController = () => import('#controllers/projects_controller')
const TasksController = () => import('#controllers/tasks_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('auth/register', [UsersController, 'register'])
  router.post('auth/login', [UsersController, 'login'])

  router.get('projects', [ProjectsController, 'index'])
  router.post('projects', [ProjectsController, 'create'])
  router.delete('projects/:id', [ProjectsController, 'destroy'])
  router.patch('projects/:id', [ProjectsController, 'update'])

  router.post('projects/:id/tasks', [TasksController, 'create'])
  router.get('projects/:id/tasks', [TasksController, 'index'])

}).prefix('/api')