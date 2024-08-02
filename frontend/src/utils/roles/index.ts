import type { Actions } from "@/plugins/casl/ability";
import type { AbilityRule, Permission } from "@/types/roles/Role";
import { snakeToCamel, splitOnce } from "@/utils/helprers";

export const permissionToAbilityRule = (
  permission: Permission
): AbilityRule => {
  const { name } = permission;
  const nameParts = splitOnce(name, "_");

  return {
    action: nameParts[0].toLowerCase() as Actions,
    subject: snakeToCamel(nameParts[1].toLowerCase()),
  };
};

export const groupPermissions = (permissions: AbilityRule[]): AbilityRule[] => {
  const groupedPermissions: { [key: string]: Set<string> } = {};

  permissions.forEach((permission) => {
    if (!groupedPermissions[permission.subject]) {
      groupedPermissions[permission.subject] = new Set();
    }

    groupedPermissions[permission.subject].add(permission.action);
  });

  const optimizedPermissions: AbilityRule[] = [];

  Object.entries(groupedPermissions).forEach(([subject, actions]) => {
    const hasAllActions =
      actions.size === 4 &&
      actions.has("read") &&
      actions.has("update") &&
      actions.has("create") &&
      actions.has("delete");

    if (hasAllActions) {
      optimizedPermissions.push({ action: "manage", subject });
    } else {
      actions.forEach((action) => {
        optimizedPermissions.push({ action: action as Actions, subject });
      });
    }
  });

  return optimizedPermissions;
};
