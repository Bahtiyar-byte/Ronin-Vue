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

        const optionsAssignedUserId = computed(() => appointmentsStore.searchResultAssignedUserId);

        const optionsContactId = computed(() => appointmentsStore.searchResultContactId);

        const optionsJobId = computed(() => appointmentsStore.searchResultJobId);

const appointmentsItem = computed(() => appointmentsStore.data);

const form = reactive({

    subject: '',

      assignedUserId: '',

      contactId: '',

      startTime: '',

      endTime: '',

    description: [''],

    location: '',

      jobId: '',

      reminder: '',

})

const submit = async () => {
  try {

            form.assignedUserId = form.assignedUserId?.id;

            form.contactId = form.contactId?.id;

            form.jobId = form.jobId?.id;

    await appointmentsStore.edit({id: route.params.id, data: {...form} })
    router.push('/appointments');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchAssignedUserId();

  await searchContactId();

  await searchJobId();

    await appointmentsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    appointmentsStore.showNotification(e, 'error');
  }
})

    async function searchAssignedUserId(val) {
      await appointmentsStore.searchAssignedUserId(val);
    }

    async function searchContactId(val) {
      await appointmentsStore.searchContactId(val);
    }

    async function searchJobId(val) {
      await appointmentsStore.searchJobId(val);
    }

const formatData = () => {

    form.subject = appointmentsItem.value.subject

    form.assignedUserId = dataFormatter.usersOneListFormatterEdit(appointmentsItem.value.assignedUserId)

    form.contactId = dataFormatter.contactsOneListFormatterEdit(appointmentsItem.value.contactId)

    form.startTime = dataFormatter.dateTimeFormatter(appointmentsItem.value.startTime)

    form.endTime = dataFormatter.dateTimeFormatter(appointmentsItem.value.endTime)

    form.description = appointmentsItem.value.description

    form.location = appointmentsItem.value.location

    form.jobId = dataFormatter.jobsOneListFormatterEdit(appointmentsItem.value.jobId)

    form.reminder = dataFormatter.dateTimeFormatter(appointmentsItem.value.reminder)

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
      label="Subject"
    >
      <FormControl
        v-model="form.subject"
        placeholder="Your Subject"
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
      label="Start Time"
    >
      <FormControl
        type="datetime-local"
        v-model="form.startTime"
        placeholder="Your Start Time"
      />
    </FormField>

    <FormField
      label="End Time"
    >
      <FormControl
        type="datetime-local"
        v-model="form.endTime"
        placeholder="Your End Time"
      />
    </FormField>

    <label class="block font-bold mb-2 text-pavitra-700 text-sm">Description</label>
    <Editor
      api-key="s0bs8snu2u6qo8skn5r3kurkerhbaagpsgm9cdkbxnbo8nj4"
      cloudChannel="6"
      v-model="form.description"
      />

    <FormField
      label="Location"
    >
      <FormControl
        v-model="form.location"
        placeholder="Your Location"
        />
    </FormField>

  <FormField
      label="Job"
    >
      <v-select
        v-model="form.jobId"
        :options="optionsJobId"
        @input="searchJobId($event.target.value)"
      />
  </FormField>

    <FormField
      label="Reminder"
    >
      <FormControl
        type="datetime-local"
        v-model="form.reminder"
        placeholder="Your Reminder"
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
