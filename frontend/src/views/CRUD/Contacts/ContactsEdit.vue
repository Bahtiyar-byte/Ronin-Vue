<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContactsStore } from "@/stores/Contacts/contacts";
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
const contactsStore = useContactsStore()

const titleStack = ref(['Admin', 'Contacts'])
const notification = computed(() => contactsStore.notify)

      const optionsStage = [{id: 0, label: 'Lead'},{id: 1, label: 'Prospect'},{id: 2, label: 'Customer'},]

        const optionsJob = computed(() => contactsStore.searchResultJob);

        const optionsEstimate = computed(() => contactsStore.searchResultEstimate);

        const optionsAppointment = computed(() => contactsStore.searchResultAppointment);

const contactsItem = computed(() => contactsStore.data);

const form = reactive({

    name: '',

    email: '',

    phone: '',

    adress: '',

    firstName: '',

    lastName: '',

      stage: '',

      job: [],

      estimate: [],

      appointment: [],

})

const submit = async () => {
  try {

            form.stage = form.stage.label;

            form.job = form.job.map(item => item.id);

            form.estimate = form.estimate.map(item => item.id);

            form.appointment = form.appointment.map(item => item.id);

    await contactsStore.edit({id: route.params.id, data: {...form} })
    router.push('/contacts');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJob();

  await searchEstimate();

  await searchAppointment();

    await contactsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    contactsStore.showNotification(e, 'error');
  }
})

    async function searchJob(val) {
      await contactsStore.searchJob(val);
    }

    async function searchEstimate(val) {
      await contactsStore.searchEstimate(val);
    }

    async function searchAppointment(val) {
      await contactsStore.searchAppointment(val);
    }

const formatData = () => {

    form.name = contactsItem.value.name

    form.email = contactsItem.value.email

    form.phone = contactsItem.value.phone

    form.adress = contactsItem.value.adress

    form.firstName = contactsItem.value.firstName

    form.lastName = contactsItem.value.lastName

    form.stage = optionsStage.find(el => el.label === contactsItem.value.stage)

    form.job = dataFormatter.jobsManyListFormatterEdit(contactsItem.value.job)

    form.estimate = dataFormatter.estimatesManyListFormatterEdit(contactsItem.value.estimate)

    form.appointment = dataFormatter.appointmentsManyListFormatterEdit(contactsItem.value.appointment)

}

watch(() => contactsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Contacts notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    contactsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/contacts')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Contacts</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Contacts"
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
      label="Email"
    >
      <FormControl
        v-model="form.email"
        placeholder="Your Email"
        />
    </FormField>

    <FormField
      label="Phone"
    >
      <FormControl
        v-model="form.phone"
        placeholder="Your Phone"
        />
    </FormField>

    <FormField
      label="Adress"
    >
      <FormControl
        v-model="form.adress"
        placeholder="Your Adress"
        />
    </FormField>

    <FormField
      label="First Name"
    >
      <FormControl
        v-model="form.firstName"
        placeholder="Your First Name"
        />
    </FormField>

    <FormField
      label="Last Name"
    >
      <FormControl
        v-model="form.lastName"
        placeholder="Your Last Name"
        />
    </FormField>

    <FormField label="Stage">
      <FormControl
        v-model="form.stage"
        :options="optionsStage"
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
        label="Appointment"
      >
        <v-select
          v-model="form.appointment"
          :options="optionsAppointment"
          multiple
          @input="searchAppointment($event.target.value)"
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
