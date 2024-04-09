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

        const optionsUserId = computed(() => appointmentsStore.searchResultUserId);

        const optionsContactId = computed(() => appointmentsStore.searchResultContactId);

        const optionsJobId = computed(() => appointmentsStore.searchResultJobId);

        const optionsEstimateId = computed(() => appointmentsStore.searchResultEstimateId);

        const optionsCreatedBy = computed(() => appointmentsStore.searchResultCreatedBy);

const form = reactive({

      date: '',

      scheduled: false,

      userId: [],

      contactId: [],

      jobId: [],

      estimateId: [],

      createdBy: '',

      name: '',

})

onBeforeMount(async () => {

  await searchUserId();

  await searchContactId();

  await searchJobId();

  await searchEstimateId();

  await searchCreatedBy();

})

const submit = async () => {
  try {

            form.userId = form.userId.map(item => item.id);

            form.contactId = form.contactId.map(item => item.id);

            form.jobId = form.jobId.map(item => item.id);

            form.estimateId = form.estimateId.map(item => item.id);

            form.createdBy = form.createdBy.id;

    await appointmentsStore.newItem({ ...form })
    router.push('/appointments');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.date = '';

        form.scheduled = false;

        form.userId = [];

        form.contactId = [];

        form.jobId = [];

        form.estimateId = [];

        form.createdBy = '';

        form.name = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchUserId(val) {
      await appointmentsStore.searchUserId(val);
    }

    async function searchContactId(val) {
      await appointmentsStore.searchContactId(val);
    }

    async function searchJobId(val) {
      await appointmentsStore.searchJobId(val);
    }

    async function searchEstimateId(val) {
      await appointmentsStore.searchEstimateId(val);
    }

    async function searchCreatedBy(val) {
      await appointmentsStore.searchCreatedBy(val);
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
        label="User "
      >
        <v-select
          v-model="form.userId"
          :options="optionsUserId"
          multiple
          @input="searchUserId($event.target.value)"
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
      label="Created"
    >
        <v-select
          v-model="form.createdBy"
          :options="optionsCreatedBy"
          @input="searchCreatedBy($event.target.value)"
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
