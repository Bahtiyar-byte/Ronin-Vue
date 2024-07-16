import { debounce } from 'lodash'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFilters } from '@/composables/useFilters'
import type { CheckboxFilterItem } from '@/types/filters/interfaces'
import type { IDeletionDialogOptions } from '@/types/forms/tableManagment'
import type { SortItem } from '@core/types'

export function useTableManagement<T>(
  resourceType: string,
  getListFunction: (params: any) => Promise<any>,
  deleteFunction: (item: T) => Promise<any>,
  headersDefinition: { title: string; key: string; sortable?: boolean }[],
) {
  const items = ref<T[]>([])

  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
    totalItems: 0,
  })

  const sortBy = ref<SortItem[]>([])
  const headers = ref(headersDefinition)

  const filters = ref<CheckboxFilterItem[]>([
    { type: 'checkbox', key: 'status', label: 'Status', options: [], value: [] },
  ])

  const isLoading = ref<boolean>(false)
  const searchQuery = ref<string>('')

  const { getVariants } = useFilters()
  const route = useRoute()

  const fetchData = async () => {
    const requestParams = {
      limit: pagination.value.itemsPerPage,
      offset: (pagination.value.page - 1) * pagination.value.itemsPerPage,
      sortBy: '',
      sortDesc: '',
      ...route.query,
      ...Object.fromEntries(filters.value.map(filter => [filter.key, filter?.value ?? ''])),
      q: searchQuery?.value ?? '',
      name: searchQuery?.value ?? '',
    }

    const [_sortBy] = sortBy.value
    if (_sortBy !== undefined) {
      requestParams.sortBy = _sortBy.key
      requestParams.sortDesc = (_sortBy?.order ?? 'desc') as string
    }

    const { data, isFetching } = await getListFunction(requestParams)

    watch(isFetching, newVal => {
      if (typeof newVal === 'boolean') {
        isLoading.value = newVal
      }
    }, { immediate: true })

    watch(data, newVal => {
      if (newVal === null) {
        return
      }

      pagination.value = {
        ...pagination.value,
        totalItems: newVal.count,
      }

      items.value = newVal.rows
    })
  }

  const debouncedFetchData = debounce(fetchData, 400)

  watch([
    () => pagination.value.page,
    () => pagination.value.itemsPerPage,
    () => JSON.stringify(filters.value.map(filter => filter.value)),
    sortBy,
    searchQuery,
  ], debouncedFetchData, { immediate: true })

  const selectedItems = ref<[]>([])

  const deletionDialogOptions = ref<IDeletionDialogOptions>({
    visible: false,
    onAccept: async () => {},
  })

  const handleItemDeletion = async (item: T) => {
    deletionDialogOptions.value = {
      visible: true,
      onAccept: async () => {
        const { isFetching } = await deleteFunction(item)

        watch(isFetching, async () => {
          await fetchData()
        })
      },
    }
  }

  const initFilters = async () => {
    const promises = Object.values(filters.value).map(async val => {
      if (val.options !== undefined && val.options.length === 0) {
        const { data } = await getVariants(resourceType, val.key)

        if (data.value === null) {
          return
        }

        val.options = data.value
      }
    })

    await Promise.all(promises)

    if (route.query) {
      Object.entries(route.query).forEach(([key, val]) => {
        const filter = filters.value.find(f => f.key === key)
        if (filter && val?.length) {
          filter.value = val as string
        }
      })
    }
  }

  onBeforeMount(initFilters)

  return {
    items,
    pagination,
    sortBy,
    headers,
    filters,
    isLoading,
    searchQuery,
    selectedItems,
    deletionDialogOptions,
    handleItemDeletion,
  }
}
