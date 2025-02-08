import Project from '#models/project'
import Task from '#models/task'
import { editProject } from '#abilities/main'
import type { HttpContext } from '@adonisjs/core/http'
import InvalidAccessException from "#exceptions/invalid_access_exception"
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'

export default class TasksController {

    async index({ auth, params, bouncer }: HttpContext) {
        await auth.authenticate()
        const project = await Project.find(params.id)
        if(project == null) {
            // null or undefined
            throw new ResourceNotFoundException()
        }

        if (await bouncer.allows(editProject, project)) {
            return await project.related('tasks').query()
        }
    }

    async create({ auth, request, params, bouncer } : HttpContext) {
        await auth.authenticate()
        const { description } = request.only(['description'])
        const id = params.id
        const project = await Project.find(id)

        if(project == null) {
            throw new ResourceNotFoundException()
        }

        if (await bouncer.allows(editProject, project)) {
            const task = new Task()
            task.description = description
            task.completed = false
            project.related('tasks').save(task)
            return task
        } else {
            throw new InvalidAccessException()
        }
    }

    async update({ auth, request, bouncer, params } : HttpContext) {
        await auth.authenticate()
        const id = params.id
        const { description, completed } = request.only(['description', 'completed'])
        const task = await Task.find(id)
        
        if (task == null) {
            throw new ResourceNotFoundException()
        } 
        
        const project = await task.related('project').query().first()
        if (project == null) {
            throw new ResourceNotFoundException()
        }

        if (await bouncer.allows(editProject, project)) {
            await task.merge({
                description: description,
                completed: completed
            }).save()
            return task
        } else {
            throw new InvalidAccessException()
        }

    }

    async destroy({ auth, params, bouncer} : HttpContext) {
        await auth.authenticate()
        const id = params.id
        const task = await Task.find(id) 
        if (task == null) {
            throw new ResourceNotFoundException()
        }

        const project = await task.related('project').query().first()
        if (project == null) {
            throw new ResourceNotFoundException()
        }

        if (await bouncer.allows(editProject, project)) {
            task.delete()
            return task
        } else {
            throw new InvalidAccessException()
        }
    }
}