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

        const optionsUserId = computed(() => appointmentsStore.searchResultUserId);

        const optionsContactId = computed(() => appointmentsStore.searchResultContactId);

        const optionsJobId = computed(() => appointmentsStore.searchResultJobId);

        const optionsEstimateId = computed(() => appointmentsStore.searchResultEstimateId);

        const optionsCreatedBy = computed(() => appointmentsStore.searchResultCreatedBy);

const appointmentsItem = computed(() => appointmentsStore.data);

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

const submit = async () => {
  try {

            form.userId = form.userId.map(item => item.id);

            form.contactId = form.contactId.map(item => item.id);

            form.jobId = form.jobId.map(item => item.id);

            form.estimateId = form.estimateId.map(item => item.id);

            form.createdBy = form.createdBy?.id;

    await appointmentsStore.edit({id: route.params.id, data: {...form} })
    router.push('/appointments');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchUserId();

  await searchContactId();

  await searchJobId();

  await searchEstimateId();

  await searchCreatedBy();

    await appointmentsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    appointmentsStore.showNotification(e, 'error');
  }
})

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

const formatData = () => {

    form.date = dataFormatter.dateTimeFormatter(appointmentsItem.value.date)

    form.userId = dataFormatter.usersManyListFormatterEdit(appointmentsItem.value.userId)

    form.contactId = dataFormatter.contactsManyListFormatterEdit(appointmentsItem.value.contactId)

    form.jobId = dataFormatter.jobsManyListFormatterEdit(appointmentsItem.value.jobId)

    form.estimateId = dataFormatter.estimatesManyListFormatterEdit(appointmentsItem.value.estimateId)

    form.createdBy = dataFormatter.usersOneListFormatterEdit(appointmentsItem.value.createdBy)

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
