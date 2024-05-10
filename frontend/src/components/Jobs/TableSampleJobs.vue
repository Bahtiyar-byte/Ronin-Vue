<script setup lang="ts">
import { computed, ref } from 'vue'
import { useJobsStore } from "@/stores/Jobs/jobs";
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
// import UserAvatar from '@/components/UserAvatar.vue'
import dataFormatter from '@/helpers/dataFormatter';
import { useRouter } from 'vue-router';
import FormControl from '@/components/FormControl.vue';
import TableHeader from "@/types/table/TableHeader";
import IEntity from "@/types/common/IEntity";
import { headerExists } from "@/helpers/tables";

const $router = useRouter();

const props = withDefaults(defineProps<{
  checkable: boolean,
  sortTitle: string,
  sortDirection: string,
  showAction: boolean,
  propsHeaders?: TableHeader[],
}>(), {
  checkable: false,
  sortTitle: '',
  sortDirection: '',
  showAction: true,
});

const emit = defineEmits(['sort']);
/* Fetch data */
const jobsStore = useJobsStore()
jobsStore.fetch()

/* Delete item */
const deleteItem = () => {
  jobsStore.deleteItem(currentId.value)
}

const items = computed(() => jobsStore.data)

const headers: TableHeader[] = props.propsHeaders ?? [
{ text: 'Name', value: 'name'},
{ text: 'Contact', value: 'contact'},
{ text: 'Category', value: 'category'},
{ text: 'Type', value: 'type'},
{ text: 'Status', value: 'status'},
{ text: 'Assigned User', value: 'assignedUser'},
{ text: 'Assigned Team', value: 'assignedTeam'},
{ text: 'Estimate', value: 'estimate'},
{ text: 'Appointment', value: 'appointment'},
{ text: 'Image', value: 'image'},
{ text: 'Document', value: 'document'},
{ text: 'Invoice', value: 'invoice'},]

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const currentId = ref<string>('');

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref<IEntity[]>([]);

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

const remove = (arr: IEntity[], cb: (item: IEntity) => boolean): IEntity[] => {
  const newArr: IEntity[] = [];

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr;
}

const checked = (isChecked: boolean, client: IEntity) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, (row: IEntity) => row.id === client.id)
  }
}

const showModal = (client: IEntity) => {
  currentId.value = client.id
  isModalDangerActive.value = true
}

const sort = (title: string) => {
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
      :key="item.text"
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

        <th v-for="header in headers"
          :key="`table-sample-jobs-header-${header.value}`"
          :class="['sortable uppercase text-sm font-normal text-pavitra-600', props.sortTitle === header.value && props.sortDirection]"
          @click="sort(header.value)"
        >
          {{ header.text }}
        </th>

        <th v-if="showAction" />
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

        <td v-if="headerExists('name', headers)" data-label="name">
          {{ client.name }}
        </td>

        <td v-if="headerExists('contact', headers)" data-label="contact">
            <span
              v-for="(i, idx) in dataFormatter.contactsManyListFormatter(client.contact)"
              :key="idx + client.contact"
              class="block"
            >
                {{ i }}
            </span>
        </td>

        <td v-if="headerExists('category', headers)" data-label="category">
          {{ client.category }}
        </td>

        <td v-if="headerExists('type', headers)" data-label="type">
          {{ client.type }}
        </td>

        <td v-if="headerExists('status', headers)" data-label="status">
          {{ client.status }}
        </td>

        <td v-if="headerExists('assignedUser', headers)" data-label="assignedUser">
            <span
              v-for="(i, idx) in dataFormatter.usersManyListFormatter(client.assignedUser)"
              :key="idx + client.assignedUser"
              class="block"
            >
                {{ i }}
            </span>
        </td>

        <td v-if="headerExists('assignedTeam', headers)" data-label="assignedTeam">
            <span
              v-for="(i, idx) in dataFormatter.teamsManyListFormatter(client.assignedTeam)"
              :key="idx + client.assignedTeam"
              class="block"
            >
                {{ i }}
            </span>
        </td>

        <td v-if="headerExists('estimate', headers)" data-label="estimate">
            <span
              v-for="(i, idx) in dataFormatter.estimatesManyListFormatter(client.estimate)"
              :key="idx + client.estimate"
              class="block"
            >
                {{ i }}
            </span>
        </td>

        <td v-if="headerExists('appointment', headers)" data-label="appointment">
            <span
              v-for="(i, idx) in dataFormatter.appointmentsManyListFormatter(client.appointment)"
              :key="idx + client.appointment"
              class="block"
            >
                {{ i }}
            </span>
        </td>

        <td v-if="headerExists('image', headers)" data-label="image">
            <span
              v-for="(i, idx) in dataFormatter.imagesManyListFormatter(client.image)"
              :key="idx + client.image"
              class="block"
            >
                {{ i }}
            </span>
        </td>

        <td v-if="headerExists('document', headers)" data-label="document">
            <span
              v-for="(i, idx) in dataFormatter.documentsManyListFormatter(client.document)"
              :key="idx + client.document"
              class="block"
            >
                {{ i }}
            </span>
        </td>

        <td v-if="headerExists('invoice', headers)" data-label="invoice">
            <span
              v-for="(i, idx) in dataFormatter.invoicesManyListFormatter(client.invoice)"
              :key="idx + client.invoice"
              class="block"
            >
                {{ i }}
            </span>
        </td>

        <td class="before:hidden lg:w-1 whitespace-nowrap" v-if="showAction">
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
