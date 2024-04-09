<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const jobsStore = useJobsStore()
const router = useRouter();

const notification = computed(() => jobsStore.notify)
const titleStack = ref(['Admin', 'Jobs'])

        const optionsContact = computed(() => jobsStore.searchResultContact);

        const optionsAssignedUser = computed(() => jobsStore.searchResultAssignedUser);

        const optionsAssignedTeam = computed(() => jobsStore.searchResultAssignedTeam);

        const optionsEstimate = computed(() => jobsStore.searchResultEstimate);

        const optionsAppointment = computed(() => jobsStore.searchResultAppointment);

        const optionsImage = computed(() => jobsStore.searchResultImage);

        const optionsDocument = computed(() => jobsStore.searchResultDocument);

        const optionsInvoice = computed(() => jobsStore.searchResultInvoice);

const form = reactive({

      name: '',

      contact: [],

      category: false,

      type: false,

      status: false,

      assignedUser: [],

      assignedTeam: [],

      estimate: [],

      appointment: [],

      image: [],

      document: [],

      invoice: [],

})

onBeforeMount(async () => {

  await searchContact();

  await searchAssignedUser();

  await searchAssignedTeam();

  await searchEstimate();

  await searchAppointment();

  await searchImage();

  await searchDocument();

  await searchInvoice();

})

const submit = async () => {
  try {

            form.contact = form.contact.map(item => item.id);

            form.category = form.category.label;

            form.type = form.type.label;

            form.status = form.status.label;

            form.assignedUser = form.assignedUser.map(item => item.id);

            form.assignedTeam = form.assignedTeam.map(item => item.id);

            form.estimate = form.estimate.map(item => item.id);

            form.appointment = form.appointment.map(item => item.id);

            form.image = form.image.map(item => item.id);

            form.document = form.document.map(item => item.id);

            form.invoice = form.invoice.map(item => item.id);

    await jobsStore.newItem({ ...form })
    router.push('/jobs');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

        form.contact = [];

        form.category = false;

        form.type = false;

        form.status = false;

        form.assignedUser = [];

        form.assignedTeam = [];

        form.estimate = [];

        form.appointment = [];

        form.image = [];

        form.document = [];

        form.invoice = [];

}

const cancel = () => {
  router.push('/users')
}

    async function searchContact(val) {
      await jobsStore.searchContact(val);
    }

    async function searchAssignedUser(val) {
      await jobsStore.searchAssignedUser(val);
    }

    async function searchAssignedTeam(val) {
      await jobsStore.searchAssignedTeam(val);
    }

    async function searchEstimate(val) {
      await jobsStore.searchEstimate(val);
    }

    async function searchAppointment(val) {
      await jobsStore.searchAppointment(val);
    }

    async function searchImage(val) {
      await jobsStore.searchImage(val);
    }

    async function searchDocument(val) {
      await jobsStore.searchDocument(val);
    }

    async function searchInvoice(val) {
      await jobsStore.searchInvoice(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Jobs</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Jobs"
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
          v-model="form.contact"
          :options="optionsContact"
          multiple
          @input="searchContact($event.target.value)"
        />
    </FormField>

    <FormField label="Category">
      <FormControl
        v-model="form.category"
        :options="[{id: 0, label: 'Commercial'},
                    {id: 1, label: 'Property Management'},
                    {id: 2, label: 'Residential'},
                    ]"
      />
    </FormField>

    <FormField label="Type">
      <FormControl
        v-model="form.type"
        :options="[{id: 0, label: 'New'},
                    {id: 1, label: 'Repair'},
                    {id: 2, label: 'Service'},
                    {id: 3, label: 'Inspection'},
                    {id: 4, label: 'Insurance'},
                    {id: 5, label: 'Retail'},
                    {id: 6, label: 'Warranty'},
                    ]"
      />
    </FormField>

    <FormField label="Status">
      <FormControl
        v-model="form.status"
        :options="[{id: 0, label: 'Quoted'},
                    {id: 1, label: 'Approved'},
                    {id: 2, label: 'Active'},
                    {id: 3, label: 'Completed'},
                    {id: 4, label: 'Invoiced'},
                    ]"
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
          v-model="form.estimate"
          :options="optionsEstimate"
          multiple
          @input="searchEstimate($event.target.value)"
        />
    </FormField>

    <FormField
        label="Appointment"
      >
        <v-select
          v-model="form.appointment"
          :options="optionsAppointment"
          multiple
          @input="searchAppointment($event.target.value)"
        />
    </FormField>

    <FormField
        label="Image"
      >
        <v-select
          v-model="form.image"
          :options="optionsImage"
          multiple
          @input="searchImage($event.target.value)"
        />
    </FormField>

    <FormField
        label="Document"
      >
        <v-select
          v-model="form.document"
          :options="optionsDocument"
          multiple
          @input="searchDocument($event.target.value)"
        />
    </FormField>

    <FormField
        label="Invoice"
      >
        <v-select
          v-model="form.invoice"
          :options="optionsInvoice"
          multiple
          @input="searchInvoice($event.target.value)"
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
        type="reset"
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
