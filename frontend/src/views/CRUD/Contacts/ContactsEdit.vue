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

        const optionsJobId = computed(() => contactsStore.searchResultJobId);

        const optionsEstimateId = computed(() => contactsStore.searchResultEstimateId);

        const optionsCreatedBy = computed(() => contactsStore.searchResultCreatedBy);

        const optionsAppointmentId = computed(() => contactsStore.searchResultAppointmentId);

const contactsItem = computed(() => contactsStore.data);

const form = reactive({

    name: '',

    email: '',

    phone: '',

    adress: '',

    firstName: '',

    lastName: '',

      stage: '',

      jobId: [],

      estimateId: [],

      createdBy: '',

      appointmentId: [],

})

const submit = async () => {
  try {

            form.stage = form.stage.label;

            form.jobId = form.jobId.map(item => item.id);

            form.estimateId = form.estimateId.map(item => item.id);

            form.createdBy = form.createdBy?.id;

            form.appointmentId = form.appointmentId.map(item => item.id);

    await contactsStore.edit({id: route.params.id, data: {...form} })
    router.push('/contacts');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

  await searchEstimateId();

  await searchCreatedBy();

  await searchAppointmentId();

    await contactsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    contactsStore.showNotification(e, 'error');
  }
})

    async function searchJobId(val) {
      await contactsStore.searchJobId(val);
    }

    async function searchEstimateId(val) {
      await contactsStore.searchEstimateId(val);
    }

    async function searchCreatedBy(val) {
      await contactsStore.searchCreatedBy(val);
    }

    async function searchAppointmentId(val) {
      await contactsStore.searchAppointmentId(val);
    }

const formatData = () => {

    form.name = contactsItem.value.name

    form.email = contactsItem.value.email

    form.phone = contactsItem.value.phone

    form.adress = contactsItem.value.adress

    form.firstName = contactsItem.value.firstName

    form.lastName = contactsItem.value.lastName

    form.stage = optionsStage.find(el => el.label === contactsItem.value.stage)

    form.jobId = dataFormatter.jobsManyListFormatterEdit(contactsItem.value.jobId)

    form.estimateId = dataFormatter.estimatesManyListFormatterEdit(contactsItem.value.estimateId)

    form.createdBy = dataFormatter.usersOneListFormatterEdit(contactsItem.value.createdBy)

    form.appointmentId = dataFormatter.appointmentsManyListFormatterEdit(contactsItem.value.appointmentId)

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
          v-model="form.jobId"
          :options="optionsJobId"
          multiple
          @input="searchJobId($event.target.value)"
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
      label="Created By"
    >
      <v-select
        v-model="form.createdBy"
        :options="optionsCreatedBy"
        @input="searchCreatedBy($event.target.value)"
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
