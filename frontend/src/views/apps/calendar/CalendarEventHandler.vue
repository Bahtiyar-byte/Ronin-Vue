<script setup lang="ts">
import type { Options } from 'flatpickr/dist/types/options'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { VForm } from 'vuetify/components/VForm'
import { useCurrentUserStore } from '@/@core/stores/auth/currentUser'

import type { Event, NewEvent } from './types'
import CalendarAutocompleteField from '@/views/apps/calendar/edit/CalendarAutocompleteField.vue'

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:isDrawerOpen', val: boolean): void
  (e: 'addEvent', val: NewEvent): void
  (e: 'updateEvent', val: Event): void
  (e: 'removeEvent', eventId: string): void
}>()

interface Props {
  contact: string
  user: string
  isDrawerOpen: boolean
  event: (Event | NewEvent)
}

const refForm = ref<VForm>()

const { user: currentUser } = useCurrentUserStore()

// 👉 Event
const event = ref<Event>(JSON.parse(JSON.stringify(props.event)))

// 👉 from contact
onMounted(async () => {
  if (props.contact) {
    const { data } = await useContacts().getById(props.contact)

    watch(data, newVal => {
      if (newVal !== null) {
        event.value.extendedProps.relatedContact = data.value?.id
      }
    })
  }

  if (!props.user.length && currentUser !== null) {
    event.value.extendedProps.assignedTo = currentUser.id
  }
})

const resetEvent = () => {
  event.value = JSON.parse(JSON.stringify(props.event))
  nextTick(() => {
    refForm.value?.resetValidation()
  })
}

watch(() => props.isDrawerOpen, resetEvent)

const removeEvent = () => {
  emit('removeEvent', String((event.value as Event).id))

  // Close drawer
  emit('update:isDrawerOpen', false)
}

const handleSubmit = () => {
  refForm.value?.validate()
    .then(({ valid }) => {
      if (valid) {
        // If id exist on id => Update event
        if ('id' in event.value) {
          emit('updateEvent', event.value)
        }

        // Else => add new event
        else {
          emit('addEvent', event.value)
        }

        // Close drawer
        emit('update:isDrawerOpen', false)
      }
    })
}

// 👉 Form

const onCancel = () => {
  emit('update:isDrawerOpen', false)

  nextTick(() => {
    refForm.value?.reset()
    resetEvent()
    refForm.value?.resetValidation()
  })
}

const startDateTimePickerConfig = computed(() => {
  const config: Options = { enableTime: true, dateFormat: 'Y-m-d H:i' }

  if (event.value.end) {
    config.maxDate = event.value.end
  }

  return config
})

const endDateTimePickerConfig = computed(() => {
  const config: Options = { enableTime: true, dateFormat: 'Y-m-d H:i' }

  if (event.value.start) {
    config.minDate = event.value.start
  }

  return config
})

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}

const eventStart = ref<string | Date>('')
const eventEnd = ref<string | Date>('')

watch(event, newVal => {
  eventStart.value = newVal.start
})

watch(event, newVal => {
  eventEnd.value = newVal.end
})

const { autocomplete: autocompleteContacts } = useContacts()
const { autocomplete: autocompleteUsers } = useUsers()

const fetchAutocomplete = async (query: string, autocompleteFn: (query: string) => Promise<any>) => {
  const { data } = await autocompleteFn(query)
  if (data.value === null) {
    return
  }

  return data.value.map((item: any) => ({ value: item.id, title: item.label }))
}
</script>

<template>
  <VNavigationDrawer
    temporary
    location="end"
    :model-value="props.isDrawerOpen"
    width="370"
    :border="0"
    class="scrollable-content"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- 👉 Header -->
    <AppDrawerHeaderSection
      :title="event.id ? 'Update Event' : 'Add Event'"
      @cancel="$emit('update:isDrawerOpen', false)"
    >
      <template #beforeClose>
        <IconBtn
          v-show="event.id"
          @click="removeEvent"
        >
          <VIcon
            size="18"
            icon="tabler-trash"
          />
        </IconBtn>
      </template>
    </AppDrawerHeaderSection>

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- SECTION Form -->
          <VForm
            ref="refForm"
            @submit.prevent="handleSubmit"
          >
            <VRow>
              <!-- 👉 Title -->
              <VCol cols="12">
                <AppTextField
                  v-model="event.title"
                  label="Title"
                  placeholder="Meeting with Jane"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- 👉 Start date -->
              <VCol cols="12">
                <AppDateTimePicker
                  :key="JSON.stringify(startDateTimePickerConfig)"
                  v-model="eventStart"
                  :rules="[requiredValidator]"
                  label="Start date"
                  placeholder="Select Date"
                  :config="startDateTimePickerConfig"
                  @update:date="(d: Date) => { event.start = d }"
                />
              </VCol>

              <!-- 👉 End date -->
              <VCol cols="12">
                <AppDateTimePicker
                  :key="JSON.stringify(endDateTimePickerConfig)"
                  v-model="eventEnd"
                  :rules="[requiredValidator]"
                  label="End date"
                  placeholder="Select End Date"
                  :config="endDateTimePickerConfig"
                  @update:date="(d: Date) => { event.end = d }"
                />
              </VCol>

              <!-- 👉 Description -->
              <VCol cols="12">
                <AppTextarea
                  v-model="event.extendedProps.description"
                  label="Description"
                  placeholder="Meeting description"
                />
              </VCol>
              <!-- 👉 Contacts -->
              <VCol
                cols="12"
                class="w-full"
              >
                <CalendarAutocompleteField
                  v-model:value="event.extendedProps.relatedContact"
                  label="Related contact"
                  title="Update related contact"
                  :fetch-items="(query) => fetchAutocomplete(query, autocompleteContacts)"
                />
              </VCol>

              <!-- 👉 Assigned user -->
              <VCol cols="12">
                <CalendarAutocompleteField
                  v-model:value="event.extendedProps.assignedTo"
                  label="Assigned to"
                  title="Update related user"
                  :fetch-items="(query) => fetchAutocomplete(query, autocompleteUsers)"
                />
              </VCol>
              <!-- 👉 Form buttons -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  variant="outlined"
                  color="secondary"
                  @click="onCancel"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
          <!-- !SECTION -->
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
