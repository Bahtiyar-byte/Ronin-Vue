<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const contactsStore = useContactsStore()
const router = useRouter();

const notification = computed(() => contactsStore.notify)
const titleStack = ref(['Admin', 'Contacts'])

        const optionsJob = computed(() => contactsStore.searchResultJob);

        const optionsEstimate = computed(() => contactsStore.searchResultEstimate);

        const optionsAppointment = computed(() => contactsStore.searchResultAppointment);

const form = reactive({

      name: '',

      email: '',

      phone: '',

      adress: '',

      firstName: '',

      lastName: '',

      stage: false,

      job: [],

      estimate: [],

      appointment: [],

})

onBeforeMount(async () => {

  await searchJob();

  await searchEstimate();

  await searchAppointment();

})

const submit = async () => {
  try {

            form.stage = form.stage.label;

            form.job = form.job.map(item => item.id);

            form.estimate = form.estimate.map(item => item.id);

            form.appointment = form.appointment.map(item => item.id);

    await contactsStore.newItem({ ...form })
    router.push('/contacts');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

        form.email = '';

        form.phone = '';

        form.adress = '';

        form.firstName = '';

        form.lastName = '';

        form.stage = false;

        form.job = [];

        form.estimate = [];

        form.appointment = [];

}

const cancel = () => {
  router.push('/users')
}

    async function searchJob(val) {
      await contactsStore.searchJob(val);
    }

    async function searchEstimate(val) {
      await contactsStore.searchEstimate(val);
    }

    async function searchAppointment(val) {
      await contactsStore.searchAppointment(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Contacts</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Contacts"
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
        :options="[{id: 0, label: 'Lead'},
                    {id: 1, label: 'Prospect'},
                    {id: 2, label: 'Customer'},
                    ]"
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
