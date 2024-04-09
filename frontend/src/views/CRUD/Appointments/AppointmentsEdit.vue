<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const appointmentsStore = useAppointmentsStore()

const titleStack = ref(['Admin', 'Appointments'])
const notification = computed(() => appointmentsStore.notify)

        const optionsContact = computed(() => appointmentsStore.searchResultContact);

        const optionsJob = computed(() => appointmentsStore.searchResultJob);

        const optionsEstimate = computed(() => appointmentsStore.searchResultEstimate);

const appointmentsItem = computed(() => appointmentsStore.data);

const form = reactive({

      date: '',

      scheduled: false,

      contact: [],

      job: [],

      estimate: [],

    name: '',

})

const submit = async () => {
  try {

            form.contact = form.contact.map(item => item.id);

            form.job = form.job.map(item => item.id);

            form.estimate = form.estimate.map(item => item.id);

    await appointmentsStore.edit({id: route.params.id, data: {...form} })
    router.push('/appointments');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchContact();

  await searchJob();

  await searchEstimate();

    await appointmentsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    appointmentsStore.showNotification(e, 'error');
  }
})

    async function searchContact(val) {
      await appointmentsStore.searchContact(val);
    }

    async function searchJob(val) {
      await appointmentsStore.searchJob(val);
    }

    async function searchEstimate(val) {
      await appointmentsStore.searchEstimate(val);
    }

const formatData = () => {

    form.date = dataFormatter.dateTimeFormatter(appointmentsItem.value.date)

    form.contact = dataFormatter.contactsManyListFormatterEdit(appointmentsItem.value.contact)

    form.job = dataFormatter.jobsManyListFormatterEdit(appointmentsItem.value.job)

    form.estimate = dataFormatter.estimatesManyListFormatterEdit(appointmentsItem.value.estimate)

    form.name = appointmentsItem.value.name

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

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/appointments')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Appointments</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Appointments"
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
