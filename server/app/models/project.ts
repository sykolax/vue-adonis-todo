import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Task from '#models/task'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column() 
  declare title: string

  @column()
  declare userId: number

  @belongsTo(() => User, {
    foreignKey: 'user_id'
  }) 
  declare user: BelongsTo<typeof User>

  @hasMany(() => Task) 
  declare tasks: HasMany<typeof Task>
}