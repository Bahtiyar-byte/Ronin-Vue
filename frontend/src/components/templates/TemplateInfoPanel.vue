<script setup lang="ts">
import type Template from '@/types/templates/Template'
// import { useFilters } from '@/composables/useFilters'
import { useTemplates } from '@/composables/useTemplates'

const { update } = useTemplates()

const templateData = defineModel<Template>('templateData', { required: true })

const templateEditVisible = defineModel<boolean>('templateEditVisible', {
  default: true,
})


const saveItem = async (type: string, newValue: string) => {
  const updatedData = {
    ...prepareEntityToUpdate(templateData.value),
    [type]: newValue,
  } as Template

  const { data, isFetching } = await update(updatedData)

  watch(data, newVal => {
    if (newVal === null) {
      return
    }

    templateData.value = newVal
  })

  return isFetching
}

</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard :title="templateData.name">
        <VCardText>
          <!-- 👉 Details -->
          <h5 class="text-[1.05rem] leading-[1.5] font-medium">
            Details
          </h5>

          <VDivider class="my-4 !opacity-60" />

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Name:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ templateData.name }}
                </div>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <span class="font-medium">
                  Description:
                </span>
                <div class="d-inline-block text-body-1">
                  {{ templateData.description }}
                </div>
              </VListItemTitle>
            </VListItem>

          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText
          v-if="templateEditVisible"
          class="d-flex justify-center gap-x-4"
        >
          <VBtn
            :to="{ name: 'templates-update-id', params: { id: templateData.id } }"
            variant="elevated"
            class="w-full"
          >
            Edit
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>
