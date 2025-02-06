/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import { Bouncer } from '@adonisjs/bouncer'
import User from '#models/user'
import Project from '#models/project'

/**
 * Delete the following ability to start from
 * scratch
 */

export const editProject = Bouncer.ability((user: User, project: Project) => {
  return user.id === project.userId
})