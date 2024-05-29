<script setup>
import { computed, ref } from 'vue'
import { useTasksStore } from "@/stores/Tasks/tasks";
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import dataFormatter from '@/helpers/dataFormatter';
import { useRouter } from 'vue-router';
import FormControl from '@/components/FormControl.vue';

const $router = useRouter();

const props = defineProps({
  checkable: Boolean,
  sortTitle: String,
  sortDirection: String
})

const emit = defineEmits(['sort']);
/* Fetch data */
const tasksStore = useTasksStore()
tasksStore.fetch()

/* Delete item */
const deleteItem = () => {
  tasksStore.deleteItem(currentId.value)
}

const items = computed(() => tasksStore.data)

const headers = [

{ text: 'Subject', value: 'subject'},
{ text: 'Assigned To', value: 'assignedToUserId'},
{ text: 'Appointment ', value: 'appointmentId'},
{ text: 'Due Date & Time', value: 'dueDateAndTime'},
{ text: 'Job', value: 'jobId'},
{ text: 'Description', value: 'description'},
{ text: 'Priority', value: 'priority'},
{ text: 'Completed', value: 'completed'},
{ text: 'Created By', value: 'createdBy'},]
const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const currentId = ref(0);

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(
  () => items.value && items.value.length && items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === client.id)
  }
}

const showModal = (client) => {
  currentId.value = client.id
  isModalDangerActive.value = true
}

const sort = (title) => {
  let sortTitle = title;
  let sortDirection = '';
  if (props.sortTitle !== title) {
    sortDirection = 'asc';
  } else {
    if (props.sortDirection === 'asc') {
      sortDirection = 'desc';
    } else {
      sortDirection = '';
      sortTitle = '';
    }
  }
  emit('sort', {sortTitle, sortDirection});
}

</script>

<template>
  <CardBoxModal
    v-model="isModalActive"
    title="Tasks modal"
  >
    <ul
      v-for="item in headers"
      :key="item"
    >
      <li>{{ item.text }}</li>
    </ul>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
    :deleteItem="deleteItem"
  >
    <p>Are you sure you want to delete this item?</p>
  </CardBoxModal>

  <div
    v-if="checkedRows.length"
    class="p-3 bg-gray-100/50 dark:bg-gray-800"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-gray-700"
    >
      {{ checkedRow[headers[0].value] }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
      <th v-if="checkable" />

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'subject' && props.sortDirection]"
        @click="sort('subject')"
      >Subject</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'assignedToUserId' && props.sortDirection]"
        @click="sort('assignedToUserId')"
      >Assigned To</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'appointmentId' && props.sortDirection]"
        @click="sort('appointmentId')"
      >Appointment </th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'dueDateAndTime' && props.sortDirection]"
        @click="sort('dueDateAndTime')"
      >Due Date & Time</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'jobId' && props.sortDirection]"
        @click="sort('jobId')"
      >Job</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'description' && props.sortDirection]"
        @click="sort('description')"
      >Description</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'priority' && props.sortDirection]"
        @click="sort('priority')"
      >Priority</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'completed' && props.sortDirection]"
        @click="sort('completed')"
      >Completed</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'createdBy' && props.sortDirection]"
        @click="sort('createdBy')"
      >Created By</th>

        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="client in itemsPaginated"
        :key="client.id"
        @click="$router.push(`/tasks/${client.id}/edit`)"
      >
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />

              <td data-label="subject">
                {{ client.subject }}
              </td>

              <td data-label="assignedToUserId">
                {{ dataFormatter.usersOneListFormatter(client.assignedToUserId) }}
              </td>

              <td data-label="appointmentId">
                {{ dataFormatter.appointmentsOneListFormatter(client.appointmentId) }}
              </td>

              <td data-label="dueDateAndTime">
                {{ dataFormatter.dateTimeFormatter(client.dueDateAndTime) }}
              </td>    

              <td data-label="jobId">
                {{ dataFormatter.jobsOneListFormatter(client.jobId) }}
              </td>

              <td data-label="description">
                {{ client.description }}
              </td>

              <td data-label="priority">
                {{ client.priority }}
              </td>

              <td data-label="completed">
                {{ dataFormatter.booleanFormatter(client.completed) }}
              </td>                                                      

              <td data-label="createdBy">
                {{ dataFormatter.usersOneListFormatter(client.createdBy) }}
              </td>

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              :to="`/tasks/${client.id}/edit`"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click.stop="() => showModal(client)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"
  >
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
      <FormControl class="w-[70px]" type="select" :options="[10, 20, 50, 100]" v-model="perPage"/>
    </BaseLevel>
  </div>
</template>
