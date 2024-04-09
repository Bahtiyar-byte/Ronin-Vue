<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAppointmentsStore } from "@/stores/Appointments/appointments";
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

const appointmentsStore = useAppointmentsStore()
const router = useRouter();

const notification = computed(() => appointmentsStore.notify)
const titleStack = ref(['Admin', 'Appointments'])

        const optionsContact = computed(() => appointmentsStore.searchResultContact);

        const optionsJob = computed(() => appointmentsStore.searchResultJob);

        const optionsEstimate = computed(() => appointmentsStore.searchResultEstimate);

const form = reactive({

      date: '',

      scheduled: false,

      contact: [],

      job: [],

      estimate: [],

      name: '',

})

onBeforeMount(async () => {

  await searchContact();

  await searchJob();

  await searchEstimate();

})

const submit = async () => {
  try {

            form.contact = form.contact.map(item => item.id);

            form.job = form.job.map(item => item.id);

            form.estimate = form.estimate.map(item => item.id);

    await appointmentsStore.newItem({ ...form })
    router.push('/appointments');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.date = '';

        form.scheduled = false;

        form.contact = [];

        form.job = [];

        form.estimate = [];

        form.name = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchContact(val) {
      await appointmentsStore.searchContact(val);
    }

    async function searchJob(val) {
      await appointmentsStore.searchJob(val);
    }

    async function searchEstimate(val) {
      await appointmentsStore.searchEstimate(val);
    }

watch(() => appointmentsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Appointments notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    appointmentsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Appointments</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Appointments"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Date"
    >
      <FormControl
        type="datetime-local"
        v-model="form.date"
        placeholder="Your Date"
      />
    </FormField>

    <FormField label="Scheduled">
      <FormCheckRadioPicker
        v-model="form.scheduled"
        name="sample-switch"
        type="switch"
        :options="{ scheduled: form.scheduled ? 'Enabled' : 'Disabled' }"
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

    <FormField
        label="Job"
      >
        <v-select
          v-model="form.job"
          :options="optionsJob"
          multiple
          @input="searchJob($event.target.value)"
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
      label="Name"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your Name"
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
