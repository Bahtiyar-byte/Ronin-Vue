<script setup>
import { ref, computed, watch } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import TableSampleEmails from '@/components/Emails/TableSampleEmails.vue'
import CardBox from '@/components/CardBox.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import { notify } from "@kyvg/vue3-notification";
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import CardBoxModal from "@/components/CardBoxModal.vue";
import DropZone from "@/components/DropZone.vue";

import { useEmailsStore } from "@/stores/Emails/emails";
import axios from "axios";
const emailsStore = useEmailsStore()

const notification = computed(() => emailsStore.notify)

const titleStack = ref(['Admin', 'Emails'])

const filters = ref([]);
const filtersList = [{label: 'To Address', title: 'toAddress'},{label: 'From Address', title: 'fromAddress'},{label: 'Subject', title: 'subject'},{label: 'Body', title: 'body'},

          {label: 'Job ', title: 'jobId'},{label: 'User ', title: 'userId'},{label: 'Contact ', title: 'contactId'},];
const showFilters = ref(false);

const query = ref('');
const sortTitle = ref('');
const sortDirection = ref('');
const modalFilePicker = ref(false);
const csvFile = ref(null);

const generateQuery = () => {
  query.value = '?';
  filters.value.forEach((f) => {
    if (f.filter && f.filter.title) {
      let {filter, value, from, to} = f;
      filter.number
        ? (query.value += `${filter.title}Range[]=${from}&${filter.title}Range=${to}&`)
        : (query.value += `${filter.title}=${value}&`);
    }
  });

  if (sortTitle.value) {
    query.value += `field=${sortTitle.value}&sort=${sortDirection.value}&`;
  }
}

const addFilter = () => {
    filters.value.push({});
    if (!showFilters.value) {
      showFilters.value = true;
    }
}

const getEmailsCSV = async () => {
  const response = await axios({url: '/emails?filetype=csv', method: 'GET',responseType: 'blob'});
  const type = response.headers['content-type']
  const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = 'emailsCSV.csv'
  link.click()
}

const setCsvFile = (newFile) => {
  csvFile.value = newFile;
}

const openFilePicker = () => {
  modalFilePicker.value = true;
}

const parseCsv = async () => {
  try {
    const data = new FormData();
    data.append('file', csvFile.value);
    data.append('filename', csvFile.value.name);

    const result = await axios.post('emails/bulk-import', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return result.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return error.response.data;
  }
}

const onConfirmCsv = async () => {
  if (csvFile.value) {
    await parseCsv();
    setCsvFile(null);
    modalFilePicker.value = false;
    emailsStore.fetch(null, query.value);
    window.location.reload();
  }
}

const onCancelCsv = () => {
  setCsvFile(null);
  modalFilePicker.value = false;
  window.location.reload();
}

const deleteFilter = (index) => {
  filters.value.splice(index, 1);
  generateQuery();
  emailsStore.fetch(null, query.value);
}

const cancelFilter = () => {
  filters.value = [];
  showFilters.value = false;
  generateQuery();
  emailsStore.fetch(null, query.value);
}

const updateFilter = (index, filter) => {
  filters.value[index] = {
    filter,
    value: null,
    from: null,
    to: null
  };
}

const updateValue = (index, name, event) => {
  filters.value[index][name]= event.target.value;
}

const applyFilters = () => {
  generateQuery();
  emailsStore.fetch(null, query.value);
}

const sortTable = (data) => {
  sortTitle.value = data.sortTitle;
  sortDirection.value = data.sortDirection;
  generateQuery();
  emailsStore.fetch(null, query.value);
}

watch(() => notification.value.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Emails notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    emailsStore.hideNotification()
  }
});

const externalLink = computed(() => {
  return process.env.NODE_ENV === 'production'
    ? window.location.origin + '/api-docs/#/Emails'
    : 'http://localhost:8080/api-docs/#/Emails';
});

</script>

<template>
<CardBoxModal
    v-model="modalFilePicker"
    large-title="Upload CSV"
    has-cancel
    :delete-item="onConfirmCsv"
    @cancel="onCancelCsv"
  >
    <DropZone
      :file="csvFile"
      :formats="'.csv'"
      :setFile="setCsvFile"
    />
  </CardBoxModal>

  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Emails</SectionHeroBar>
  <SectionMain>
    <BaseButtons>
      <BaseButton
        color="default"
        label="New"
        to="/emails/new"
      />
      <BaseButton
        color="default"
        label="Add Filter"
        @click="addFilter()"
      />
      <BaseButton
        color="default"
        label="Download CSV"
        @click="getEmailsCSV()"
        />
       <BaseButton
          color="default"
          label="Upload CSV"
          @click="openFilePicker()"
        />
    </BaseButtons>
  </SectionMain>

    <SectionMain v-show="showFilters" class="mx-12 bg-white">
      <div class="flex" v-for="(filter, index) in filters" :key="filter + index">
        <FormField label="Filter" class="mr-3 basis-96 min-w-96 max-w-96">
          <v-select :v-model="filter.filter" :options="filtersList" @option:selected="updateFilter(index, $event)"/>
        </FormField>

        <template v-if="filter.filter && filter.filter.number">
          <FormField label="From" class="mr-3 basis-48 min-w-48 max-w-48">
            <FormControl v-model="filter.from" @input="updateValue(index, 'from', $event)"/>
          </FormField>
          <FormField label="To" class="mr-3 basis-48 min-w-48 max-w-48">
            <FormControl v-model="filter.to" @input="updateValue(index, 'to', $event)"/>
          </FormField>
        </template>
        <FormField v-else label="Contains" class="mr-3 basis-96 min-w-96 max-w-96">
          <FormControl v-model="filter.value" @input="updateValue(index, 'value', $event)"/>
        </FormField>

        <FormField label="Action">
          <BaseButtons>
            <BaseButton color="danger" class="h-12" label="Delete" @click="deleteFilter(index)"/>
          </BaseButtons>
        </FormField>
      </div>
      <BaseButtons>
        <BaseButton color="info" class="h-12" label="Apply" @click="applyFilters()"/>
        <BaseButton color="info" outline class="h-12" label="Cancel" @click="cancelFilter()"/>
      </BaseButtons>
    </SectionMain>

  <SectionMain>
  <a class="text-blue-500 hover:text-blue-600 active:text-blue-700 mb-3 block" :href="externalLink">API documentation for emails</a>

    <CardBox
      class="mb-6"
      title="Emails table"
      has-table
    >
      <TableSampleEmails checkable :sortTitle="sortTitle" :sortDirection="sortDirection" @sort="sortTable($event)" />
    </CardBox>

  </SectionMain>

</template>
