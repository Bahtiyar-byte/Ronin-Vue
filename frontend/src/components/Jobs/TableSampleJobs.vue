<script setup>
import { computed, ref } from 'vue'
import { useJobsStore } from "@/stores/Jobs/jobs";
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
const jobsStore = useJobsStore()
jobsStore.fetch()

/* Delete item */
const deleteItem = () => {
  jobsStore.deleteItem(currentId.value)
}

const items = computed(() => jobsStore.data)

const headers = [

{ text: 'Name', value: 'name'},
{ text: 'Contact', value: 'contactId'},
{ text: 'Category', value: 'category'},
{ text: 'Type', value: 'type'},
{ text: 'Status', value: 'status'},
{ text: 'Created', value: 'createdBy'},
{ text: 'Assigned User', value: 'assignedUser'},
{ text: 'Assigned Team', value: 'assignedTeam'},
{ text: 'Estimate', value: 'estimateId'},
{ text: 'Appointment', value: 'appointmentId'},
{ text: 'Image', value: 'imageId'},
{ text: 'Document', value: 'documentId'},
{ text: 'Invoice', value: 'invoiceId'},]
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
    title="Jobs modal"
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
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'name' && props.sortDirection]"
        @click="sort('name')"
      >Name</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'contactId' && props.sortDirection]"
        @click="sort('contactId')"
      >Contact</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'category' && props.sortDirection]"
        @click="sort('category')"
      >Category</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'type' && props.sortDirection]"
        @click="sort('type')"
      >Type</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'status' && props.sortDirection]"
        @click="sort('status')"
      >Status</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'createdBy' && props.sortDirection]"
        @click="sort('createdBy')"
      >Created</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'assignedUser' && props.sortDirection]"
        @click="sort('assignedUser')"
      >Assigned User</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'assignedTeam' && props.sortDirection]"
        @click="sort('assignedTeam')"
      >Assigned Team</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'estimateId' && props.sortDirection]"
        @click="sort('estimateId')"
      >Estimate</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'appointmentId' && props.sortDirection]"
        @click="sort('appointmentId')"
      >Appointment</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'imageId' && props.sortDirection]"
        @click="sort('imageId')"
      >Image</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'documentId' && props.sortDirection]"
        @click="sort('documentId')"
      >Document</th>

      <th
        :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === 'invoiceId' && props.sortDirection]"
        @click="sort('invoiceId')"
      >Invoice</th>

        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="client in itemsPaginated"
        :key="client.id"
        @click="$router.push(`/jobs/${client.id}/edit`)"
      >
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />

              <td data-label="name">
                {{ client.name }}
              </td>

              <td data-label="contactId">
                  <span
                    v-for="(i, idx) in dataFormatter.contactsManyListFormatter(client.contactId)"
                    :key="idx + client.contactId"
                    class="block"
                  >
                      {{ i }}
                  </span>
              </td>  

              <td data-label="category">
                {{ client.category }}
              </td>

              <td data-label="type">
                {{ client.type }}
              </td>

              <td data-label="status">
                {{ client.status }}
              </td>

              <td data-label="createdBy">
                {{ dataFormatter.usersOneListFormatter(client.createdBy) }}
              </td>

              <td data-label="assignedUser">
                  <span
                    v-for="(i, idx) in dataFormatter.usersManyListFormatter(client.assignedUser)"
                    :key="idx + client.assignedUser"
                    class="block"
                  >
                      {{ i }}
                  </span>
              </td>  

              <td data-label="assignedTeam">
                  <span
                    v-for="(i, idx) in dataFormatter.teamsManyListFormatter(client.assignedTeam)"
                    :key="idx + client.assignedTeam"
                    class="block"
                  >
                      {{ i }}
                  </span>
              </td>  

              <td data-label="estimateId">
                  <span
                    v-for="(i, idx) in dataFormatter.estimatesManyListFormatter(client.estimateId)"
                    :key="idx + client.estimateId"
                    class="block"
                  >
                      {{ i }}
                  </span>
              </td>  

              <td data-label="appointmentId">
                  <span
                    v-for="(i, idx) in dataFormatter.appointmentsManyListFormatter(client.appointmentId)"
                    :key="idx + client.appointmentId"
                    class="block"
                  >
                      {{ i }}
                  </span>
              </td>  

              <td data-label="imageId">
                  <span
                    v-for="(i, idx) in dataFormatter.imagesManyListFormatter(client.imageId)"
                    :key="idx + client.imageId"
                    class="block"
                  >
                      {{ i }}
                  </span>
              </td>  

              <td data-label="documentId">
                  <span
                    v-for="(i, idx) in dataFormatter.documentsManyListFormatter(client.documentId)"
                    :key="idx + client.documentId"
                    class="block"
                  >
                      {{ i }}
                  </span>
              </td>  

              <td data-label="invoiceId">
                  <span
                    v-for="(i, idx) in dataFormatter.invoicesManyListFormatter(client.invoiceId)"
                    :key="idx + client.invoiceId"
                    class="block"
                  >
                      {{ i }}
                  </span>
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
              :to="`/jobs/${client.id}/edit`"
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
