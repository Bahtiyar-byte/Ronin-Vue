import type { AbilityRule, Permission } from '@/types/roles/roles'
import { snakeToCamel, splitOnce } from '@/utils/helprers'
import type { Actions } from '@/plugins/casl/ability'

export const permissionToAbilityRule = (permission: Permission): AbilityRule => {
  const { name } = permission
  const nameParts = splitOnce(name, '_')

  return {
    action: nameParts[0].toLowerCase() as Actions,
    subject: snakeToCamel(nameParts[1].toLowerCase()),
  }
}
