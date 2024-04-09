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

        const optionsContactId = computed(() => jobsStore.searchResultContactId);

      const optionsCategory = [{id: 0, label: 'Commercial'},{id: 1, label: 'Property Management'},{id: 2, label: 'Residential'},]

      const optionsType = [{id: 0, label: 'New'},{id: 1, label: 'Repair'},{id: 2, label: 'Service'},{id: 3, label: 'Inspection'},{id: 4, label: 'Insurance'},{id: 5, label: 'Retail'},{id: 6, label: 'Warranty'},]

      const optionsStatus = [{id: 0, label: 'Quoted'},{id: 1, label: 'Approved'},{id: 2, label: 'Active'},{id: 3, label: 'Completed'},{id: 4, label: 'Invoiced'},]

        const optionsCreatedBy = computed(() => jobsStore.searchResultCreatedBy);

        const optionsAssignedUser = computed(() => jobsStore.searchResultAssignedUser);

        const optionsAssignedTeam = computed(() => jobsStore.searchResultAssignedTeam);

        const optionsEstimateId = computed(() => jobsStore.searchResultEstimateId);

        const optionsAppointmentId = computed(() => jobsStore.searchResultAppointmentId);

        const optionsImageId = computed(() => jobsStore.searchResultImageId);

        const optionsDocumentId = computed(() => jobsStore.searchResultDocumentId);

        const optionsInvoiceId = computed(() => jobsStore.searchResultInvoiceId);

const jobsItem = computed(() => jobsStore.data);

const form = reactive({

    name: '',

      contactId: [],

      category: '',

      type: '',

      status: '',

      createdBy: '',

      assignedUser: [],

      assignedTeam: [],

      estimateId: [],

      appointmentId: [],

      imageId: [],

      documentId: [],

      invoiceId: [],

})

const submit = async () => {
  try {

            form.contactId = form.contactId.map(item => item.id);

            form.category = form.category.label;

            form.type = form.type.label;

            form.status = form.status.label;

            form.createdBy = form.createdBy?.id;

            form.assignedUser = form.assignedUser.map(item => item.id);

            form.assignedTeam = form.assignedTeam.map(item => item.id);

            form.estimateId = form.estimateId.map(item => item.id);

            form.appointmentId = form.appointmentId.map(item => item.id);

            form.imageId = form.imageId.map(item => item.id);

            form.documentId = form.documentId.map(item => item.id);

            form.invoiceId = form.invoiceId.map(item => item.id);

    await jobsStore.edit({id: route.params.id, data: {...form} })
    router.push('/jobs');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchContactId();

  await searchCreatedBy();

  await searchAssignedUser();

  await searchAssignedTeam();

  await searchEstimateId();

  await searchAppointmentId();

  await searchImageId();

  await searchDocumentId();

  await searchInvoiceId();

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

    async function searchCreatedBy(val) {
      await jobsStore.searchCreatedBy(val);
    }

    async function searchAssignedUser(val) {
      await jobsStore.searchAssignedUser(val);
    }

    async function searchAssignedTeam(val) {
      await jobsStore.searchAssignedTeam(val);
    }

    async function searchEstimateId(val) {
      await jobsStore.searchEstimateId(val);
    }

    async function searchAppointmentId(val) {
      await jobsStore.searchAppointmentId(val);
    }

    async function searchImageId(val) {
      await jobsStore.searchImageId(val);
    }

    async function searchDocumentId(val) {
      await jobsStore.searchDocumentId(val);
    }

    async function searchInvoiceId(val) {
      await jobsStore.searchInvoiceId(val);
    }

const formatData = () => {

    form.name = jobsItem.value.name

    form.contactId = dataFormatter.contactsManyListFormatterEdit(jobsItem.value.contactId)

    form.category = optionsCategory.find(el => el.label === jobsItem.value.category)

    form.type = optionsType.find(el => el.label === jobsItem.value.type)

    form.status = optionsStatus.find(el => el.label === jobsItem.value.status)

    form.createdBy = dataFormatter.usersOneListFormatterEdit(jobsItem.value.createdBy)

    form.assignedUser = dataFormatter.usersManyListFormatterEdit(jobsItem.value.assignedUser)

    form.assignedTeam = dataFormatter.teamsManyListFormatterEdit(jobsItem.value.assignedTeam)

    form.estimateId = dataFormatter.estimatesManyListFormatterEdit(jobsItem.value.estimateId)

    form.appointmentId = dataFormatter.appointmentsManyListFormatterEdit(jobsItem.value.appointmentId)

    form.imageId = dataFormatter.imagesManyListFormatterEdit(jobsItem.value.imageId)

    form.documentId = dataFormatter.documentsManyListFormatterEdit(jobsItem.value.documentId)

    form.invoiceId = dataFormatter.invoicesManyListFormatterEdit(jobsItem.value.invoiceId)

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
        v-model="form.name"
        placeholder="Your Name"
        />
    </FormField>

    <FormField
        label="Contact"
      >
        <v-select
          v-model="form.contactId"
          :options="optionsContactId"
          multiple
          @input="searchContactId($event.target.value)"
        />
    </FormField>

    <FormField label="Category">
      <FormControl
        v-model="form.category"
        :options="optionsCategory"
      />
    </FormField>

    <FormField label="Type">
      <FormControl
        v-model="form.type"
        :options="optionsType"
      />
    </FormField>

    <FormField label="Status">
      <FormControl
        v-model="form.status"
        :options="optionsStatus"
      />
    </FormField>

  <FormField
      label="Created"
    >
      <v-select
        v-model="form.createdBy"
        :options="optionsCreatedBy"
        @input="searchCreatedBy($event.target.value)"
      />
  </FormField>

    <FormField
        label="Assigned User"
      >
        <v-select
          v-model="form.assignedUser"
          :options="optionsAssignedUser"
          multiple
          @input="searchAssignedUser($event.target.value)"
        />
    </FormField>

    <FormField
        label="Assigned Team"
      >
        <v-select
          v-model="form.assignedTeam"
          :options="optionsAssignedTeam"
          multiple
          @input="searchAssignedTeam($event.target.value)"
        />
    </FormField>

    <FormField
        label="Estimate"
      >
        <v-select
          v-model="form.estimateId"
          :options="optionsEstimateId"
          multiple
          @input="searchEstimateId($event.target.value)"
        />
    </FormField>

    <FormField
        label="Appointment"
      >
        <v-select
          v-model="form.appointmentId"
          :options="optionsAppointmentId"
          multiple
          @input="searchAppointmentId($event.target.value)"
        />
    </FormField>

    <FormField
        label="Image"
      >
        <v-select
          v-model="form.imageId"
          :options="optionsImageId"
          multiple
          @input="searchImageId($event.target.value)"
        />
    </FormField>

    <FormField
        label="Document"
      >
        <v-select
          v-model="form.documentId"
          :options="optionsDocumentId"
          multiple
          @input="searchDocumentId($event.target.value)"
        />
    </FormField>

    <FormField
        label="Invoice"
      >
        <v-select
          v-model="form.invoiceId"
          :options="optionsInvoiceId"
          multiple
          @input="searchInvoiceId($event.target.value)"
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
