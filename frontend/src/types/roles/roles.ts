import type Entity from '@/types/common/Entity'
import type { Rule } from '@/plugins/casl/ability'

export interface Permission extends Entity {
  name: string
}

export interface AbilityRule extends Rule { }
