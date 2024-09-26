import { createMongoAbility } from '@casl/ability'

export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage'

export interface Rule { action: Actions; subject: string }

export const ability = createMongoAbility<[Actions, string]>()
