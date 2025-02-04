// import type { HttpContext } from '@adonisjs/core/http'
import { HttpContext } from "@adonisjs/core/http";
import Project from "#models/project";
import db from '@adonisjs/lucid/services/db'

export default class ProjectsController {
    async index( { auth } : HttpContext) {
        // returns all the projects associated with the user
        const user = await auth.authenticate()
        // find from project table
        return await db.from('projects')
        .where('user_id', user.id)
    }

    async create( { auth, request } : HttpContext) {
        const user = await auth.authenticate()
        const { title } = request.only(['title'])
        const project = new Project()
        project.title = title
        await user.related('projects').save(project)

        return project
    }
}