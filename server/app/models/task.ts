import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Project from '#models/project'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare description: string

  @column()
  declare completed: boolean

  @column()
  declare projectId: number

  @belongsTo(() => Project, {
    foreignKey: 'projectId'
  }) 
  declare project: BelongsTo<typeof Project>
}