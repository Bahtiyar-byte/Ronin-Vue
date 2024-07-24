/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

/// <reference types="unplugin-vue-router/client" />

import type {
  // type safe route locations
  RouteLocationTypedList,
  RouteLocationResolvedTypedList,
  RouteLocationNormalizedTypedList,
  RouteLocationNormalizedLoadedTypedList,
  RouteLocationAsString,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsPathTypedList,

  // helper types
  // route definitions
  RouteRecordInfo,
  ParamValue,
  ParamValueOneOrMore,
  ParamValueZeroOrMore,
  ParamValueZeroOrOne,

  // vue-router extensions
  _RouterTyped,
  RouterLinkTyped,
  RouterLinkPropsTyped,
  NavigationGuard,
  UseLinkFnTyped,

  // data fetching
  _DataLoader,
  _DefineLoaderOptions,
} from 'unplugin-vue-router/types'

declare module 'vue-router/auto/routes' {
  export interface RouteNamedMap {
    'root': RouteRecordInfo<'root', '/', Record<never, never>, Record<never, never>>,
    '$error': RouteRecordInfo<'$error', '/:error(.*)', { error: ParamValue<true> }, { error: ParamValue<false> }>,
    'appointments': RouteRecordInfo<'appointments', '/appointments', Record<never, never>, Record<never, never>>,
    'appointments-create': RouteRecordInfo<'appointments-create', '/appointments/create', Record<never, never>, Record<never, never>>,
    'appointments-details-id': RouteRecordInfo<'appointments-details-id', '/appointments/details/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'appointments-update-id': RouteRecordInfo<'appointments-update-id', '/appointments/update/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'auth-accept-estimate-id': RouteRecordInfo<'auth-accept-estimate-id', '/auth/accept-estimate/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'auth-login': RouteRecordInfo<'auth-login', '/auth/login', Record<never, never>, Record<never, never>>,
    'calendar': RouteRecordInfo<'calendar', '/calendar', Record<never, never>, Record<never, never>>,
    'chat': RouteRecordInfo<'chat', '/chat', Record<never, never>, Record<never, never>>,
    'contacts': RouteRecordInfo<'contacts', '/contacts', Record<never, never>, Record<never, never>>,
    'contacts-communications-id-type': RouteRecordInfo<'contacts-communications-id-type', '/contacts/communications/:id/:type', { id: ParamValue<true>, type: ParamValue<true> }, { id: ParamValue<false>, type: ParamValue<false> }>,
    'contacts-create': RouteRecordInfo<'contacts-create', '/contacts/create', Record<never, never>, Record<never, never>>,
    'contacts-details-id': RouteRecordInfo<'contacts-details-id', '/contacts/details/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'contacts-update-id': RouteRecordInfo<'contacts-update-id', '/contacts/update/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'email': RouteRecordInfo<'email', '/email', Record<never, never>, Record<never, never>>,
    'estimates': RouteRecordInfo<'estimates', '/estimates', Record<never, never>, Record<never, never>>,
    'estimates-builder': RouteRecordInfo<'estimates-builder', '/estimates/builder', Record<never, never>, Record<never, never>>,
    'estimates-builder-id': RouteRecordInfo<'estimates-builder-id', '/estimates/builder/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'estimates-builder-id-edit': RouteRecordInfo<'estimates-builder-id-edit', '/estimates/builder/:id/edit', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'estimates-create': RouteRecordInfo<'estimates-create', '/estimates/create', Record<never, never>, Record<never, never>>,
    'estimates-details-id': RouteRecordInfo<'estimates-details-id', '/estimates/details/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'estimates-update-id': RouteRecordInfo<'estimates-update-id', '/estimates/update/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'jobs': RouteRecordInfo<'jobs', '/jobs', Record<never, never>, Record<never, never>>,
    'jobs-communications-id-type': RouteRecordInfo<'jobs-communications-id-type', '/jobs/communications/:id/:type', { id: ParamValue<true>, type: ParamValue<true> }, { id: ParamValue<false>, type: ParamValue<false> }>,
    'jobs-create': RouteRecordInfo<'jobs-create', '/jobs/create', Record<never, never>, Record<never, never>>,
    'jobs-details-id': RouteRecordInfo<'jobs-details-id', '/jobs/details/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'jobs-update-id': RouteRecordInfo<'jobs-update-id', '/jobs/update/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'profile': RouteRecordInfo<'profile', '/profile', Record<never, never>, Record<never, never>>,
    'scheduler': RouteRecordInfo<'scheduler', '/scheduler', Record<never, never>, Record<never, never>>,
    'settings-profile': RouteRecordInfo<'settings-profile', '/settings/profile', Record<never, never>, Record<never, never>>,
    'settings-roles': RouteRecordInfo<'settings-roles', '/settings/roles', Record<never, never>, Record<never, never>>,
    'settings-roles-create': RouteRecordInfo<'settings-roles-create', '/settings/roles/create', Record<never, never>, Record<never, never>>,
    'settings-roles-details-id': RouteRecordInfo<'settings-roles-details-id', '/settings/roles/details/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'settings-roles-update-id': RouteRecordInfo<'settings-roles-update-id', '/settings/roles/update/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'tools-templates': RouteRecordInfo<'tools-templates', '/tools/templates', Record<never, never>, Record<never, never>>,
    'tools-templates-create': RouteRecordInfo<'tools-templates-create', '/tools/templates/create', Record<never, never>, Record<never, never>>,
    'tools-templates-details-id': RouteRecordInfo<'tools-templates-details-id', '/tools/templates/details/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'tools-templates-update-id': RouteRecordInfo<'tools-templates-update-id', '/tools/templates/update/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'tools-trades': RouteRecordInfo<'tools-trades', '/tools/trades', Record<never, never>, Record<never, never>>,
    'tools-trades-create': RouteRecordInfo<'tools-trades-create', '/tools/trades/create', Record<never, never>, Record<never, never>>,
    'tools-trades-details-id': RouteRecordInfo<'tools-trades-details-id', '/tools/trades/details/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'tools-trades-update-id': RouteRecordInfo<'tools-trades-update-id', '/tools/trades/update/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
  }
}

declare module 'vue-router/auto' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export type RouterTyped = _RouterTyped<RouteNamedMap>

  /**
   * Type safe version of `RouteLocationNormalized` (the type of `to` and `from` in navigation guards).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalized<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationNormalizedLoaded` (the return type of `useRoute()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalizedLoaded<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationResolved` (the returned route of `router.resolve()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationResolved<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationResolvedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocation` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocation<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationRaw` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationRaw<Name extends keyof RouteNamedMap = keyof RouteNamedMap> =
    | RouteLocationAsString<RouteNamedMap>
    | RouteLocationAsRelativeTypedList<RouteNamedMap>[Name]
    | RouteLocationAsPathTypedList<RouteNamedMap>[Name]

  /**
   * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParams<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['params']
  /**
   * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParamsRaw<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['paramsRaw']

  export function useRouter(): RouterTyped
  export function useRoute<Name extends keyof RouteNamedMap = keyof RouteNamedMap>(name?: Name): RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  export const useLink: UseLinkFnTyped<RouteNamedMap>

  export function onBeforeRouteLeave(guard: NavigationGuard<RouteNamedMap>): void
  export function onBeforeRouteUpdate(guard: NavigationGuard<RouteNamedMap>): void

  export const RouterLink: RouterLinkTyped<RouteNamedMap>
  export const RouterLinkProps: RouterLinkPropsTyped<RouteNamedMap>

  // Experimental Data Fetching

  export function defineLoader<
    P extends Promise<any>,
    Name extends keyof RouteNamedMap = keyof RouteNamedMap,
    isLazy extends boolean = false,
  >(
    name: Name,
    loader: (route: RouteLocationNormalizedLoaded<Name>) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>
  export function defineLoader<
    P extends Promise<any>,
    isLazy extends boolean = false,
  >(
    loader: (route: RouteLocationNormalizedLoaded) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>

  export {
    _definePage as definePage,
    _HasDataLoaderMeta as HasDataLoaderMeta,
    _setupDataFetchingGuard as setupDataFetchingGuard,
    _stopDataFetchingScope as stopDataFetchingScope,
  } from 'unplugin-vue-router/runtime'
}

declare module 'vue-router' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export interface TypesConfig {
    beforeRouteUpdate: NavigationGuard<RouteNamedMap>
    beforeRouteLeave: NavigationGuard<RouteNamedMap>

    $route: RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[keyof RouteNamedMap]
    $router: _RouterTyped<RouteNamedMap>

    RouterLink: RouterLinkTyped<RouteNamedMap>
  }
}
