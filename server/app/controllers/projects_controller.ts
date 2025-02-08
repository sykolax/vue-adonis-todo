// import type { HttpContext } from '@adonisjs/core/http'
import { HttpContext } from "@adonisjs/core/http";
import Project from "#models/project";
import { editProject } from '#abilities/main'
import InvalidAccessException from "#exceptions/invalid_access_exception"
import ResourceNotFoundException from "#exceptions/resource_not_found_exception"

export default class ProjectsController {
    async index( { auth } : HttpContext) {
        // returns all the projects associated with the user
        const user = await auth.authenticate()
        // find from project table
        // return await db.from('projects')
        // .where('user_id', user.id)
        return await user.related('projects').query()
    }

    async create( { auth, request } : HttpContext) {
        const user = await auth.authenticate()
        const { title } = request.only(['title'])
        const project = new Project()
        project.title = title
        await user.related('projects').save(project)

        return project
    }

    async destroy( { auth, params, bouncer } : HttpContext) {
        await auth.authenticate()
        const id = params.id
        const project = await Project.find(id) 

        if (!project) {
            throw new ResourceNotFoundException()
        }
        if (await bouncer.allows(editProject, project)) {
            project.delete()
        } else {
            throw new InvalidAccessException()
        }
        return project
    }

    async update({ auth, params, bouncer, request } : HttpContext) {
        await auth.authenticate()
        const id = params.id
        const project = await Project.find(id)
        
        if (!project) {
            throw new ResourceNotFoundException()
        }

        if (await bouncer.allows(editProject, project)) {
            await project.merge(request.only(['title'])).save()
        } else {
            throw new InvalidAccessException()
        }
        return project
    }
}