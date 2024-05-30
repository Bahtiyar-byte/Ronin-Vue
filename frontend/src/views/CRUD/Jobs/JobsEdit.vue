<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobsStore } from "@/stores/Jobs/jobs";
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const jobsStore = useJobsStore()

const titleStack = ref(['Admin', 'Jobs'])
const notification = computed(() => jobsStore.notify)

      const optionsType = [{id: 0, label: 'New'},{id: 1, label: 'Repair'},{id: 2, label: 'Service'},{id: 3, label: 'Inspection'},{id: 4, label: 'Insurance'},{id: 5, label: 'Retail'},{id: 6, label: 'Warranty'},]

      const optionsCategory = [{id: 0, label: 'Commercial '},{id: 1, label: 'Residential'},{id: 2, label: 'Property Management'},]

      const optionsStatus = [{id: 0, label: 'Quoted'},{id: 1, label: 'Approved'},{id: 2, label: 'Active'},{id: 3, label: 'Completed'},{id: 4, label: 'Invoiced'},{id: 5, label: 'Closed'},]

        const optionsContactId = computed(() => jobsStore.searchResultContactId);

        const optionsOrderId = computed(() => jobsStore.searchResultOrderId);

        const optionsAssignedUserId = computed(() => jobsStore.searchResultAssignedUserId);

const jobsItem = computed(() => jobsStore.data);

const form = reactive({

    Name: '',

      type: '',

      category: '',

      status: '',

      startDate: '',

      endDate: '',

    description: [''],

      contactId: '',

      orderId: '',

      assignedUserId: '',

})

const submit = async () => {
  try {

            form.type = form.type.label;

            form.category = form.category.label;

            form.status = form.status.label;

            form.contactId = form.contactId?.id;

            form.orderId = form.orderId?.id;

            form.assignedUserId = form.assignedUserId?.id;

    await jobsStore.edit({id: route.params.id, data: {...form} })
    router.push('/jobs');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchContactId();

  await searchOrderId();

  await searchAssignedUserId();

    await jobsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    jobsStore.showNotification(e, 'error');
  }
})

    async function searchContactId(val) {
      await jobsStore.searchContactId(val);
    }

    async function searchOrderId(val) {
      await jobsStore.searchOrderId(val);
    }

    async function searchAssignedUserId(val) {
      await jobsStore.searchAssignedUserId(val);
    }

const formatData = () => {

    form.Name = jobsItem.value.Name

    form.type = optionsType.find(el => el.label === jobsItem.value.type)

    form.category = optionsCategory.find(el => el.label === jobsItem.value.category)

    form.status = optionsStatus.find(el => el.label === jobsItem.value.status)

    form.startDate = dataFormatter.dateTimeFormatter(jobsItem.value.startDate)

    form.endDate = dataFormatter.dateTimeFormatter(jobsItem.value.endDate)

    form.description = jobsItem.value.description

    form.contactId = dataFormatter.contactsOneListFormatterEdit(jobsItem.value.contactId)

    form.orderId = dataFormatter.ordersOneListFormatterEdit(jobsItem.value.orderId)

    form.assignedUserId = dataFormatter.usersOneListFormatterEdit(jobsItem.value.assignedUserId)

}

watch(() => jobsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Jobs notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    jobsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/jobs')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Jobs</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Jobs"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Name"
    >
      <FormControl
        v-model="form.Name"
        placeholder="Your Name"
        />
    </FormField>

    <FormField label="Type">
      <FormControl
        v-model="form.type"
        :options="optionsType"
      />
    </FormField>

    <FormField label="Category">
      <FormControl
        v-model="form.category"
        :options="optionsCategory"
      />
    </FormField>

    <FormField label="Status">
      <FormControl
        v-model="form.status"
        :options="optionsStatus"
      />
    </FormField>

    <FormField
      label="Start Date"
    >
      <FormControl
        type="datetime-local"
        v-model="form.startDate"
        placeholder="Your Start Date"
      />
    </FormField>

    <FormField
      label="End Date"
    >
      <FormControl
        type="datetime-local"
        v-model="form.endDate"
        placeholder="Your End Date"
      />
    </FormField>

    <FormField
      label="Description"
    >
      <FormControl
        v-model="form.description"
        type="textarea"
        placeholder="Your Description"
        />
    </FormField>

  <FormField
      label="Contact "
    >
      <v-select
        v-model="form.contactId"
        :options="optionsContactId"
        @input="searchContactId($event.target.value)"
      />
  </FormField>

  <FormField
      label="Order "
    >
      <v-select
        v-model="form.orderId"
        :options="optionsOrderId"
        @input="searchOrderId($event.target.value)"
      />
  </FormField>

  <FormField
      label="Assigned User "
    >
      <v-select
        v-model="form.assignedUserId"
        :options="optionsAssignedUserId"
        @input="searchAssignedUserId($event.target.value)"
      />
  </FormField>

    <BaseDivider />

    <BaseButtons>
      <BaseButton
        type="submit"
        color="info"
        label="Submit"
      />
      <BaseButton
        type="button"
        color="info"
        outline
        label="Reset"
        @click="reset"
      />
      <BaseButton
        type="cancel"
        color="danger"
        outline
        label="Cancel"
        @click="cancel"
      />
    </BaseButtons>
  </CardBox>
</SectionMain>

</template>
