<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTasksStore } from "@/stores/Tasks/tasks";
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
const tasksStore = useTasksStore()

const titleStack = ref(['Admin', 'Tasks'])
const notification = computed(() => tasksStore.notify)

        const optionsAssignedToUserId = computed(() => tasksStore.searchResultAssignedToUserId);

        const optionsAppointmentId = computed(() => tasksStore.searchResultAppointmentId);

        const optionsJobId = computed(() => tasksStore.searchResultJobId);

      const optionsPriority = [{id: 0, label: 'High'},{id: 1, label: 'Medium'},{id: 2, label: 'Low'},]

const tasksItem = computed(() => tasksStore.data);

const form = reactive({

    subject: '',

      assignedToUserId: '',

      appointmentId: '',

      dueDateAndTime: '',

      jobId: '',

    description: [''],

      priority: '',

      completed: false,

})

const submit = async () => {
  try {

            form.assignedToUserId = form.assignedToUserId?.id;

            form.appointmentId = form.appointmentId?.id;

            form.jobId = form.jobId?.id;

            form.priority = form.priority.label;

    await tasksStore.edit({id: route.params.id, data: {...form} })
    router.push('/tasks');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchAssignedToUserId();

  await searchAppointmentId();

  await searchJobId();

    await tasksStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    tasksStore.showNotification(e, 'error');
  }
})

    async function searchAssignedToUserId(val) {
      await tasksStore.searchAssignedToUserId(val);
    }

    async function searchAppointmentId(val) {
      await tasksStore.searchAppointmentId(val);
    }

    async function searchJobId(val) {
      await tasksStore.searchJobId(val);
    }

const formatData = () => {

    form.subject = tasksItem.value.subject

    form.assignedToUserId = dataFormatter.usersOneListFormatterEdit(tasksItem.value.assignedToUserId)

    form.appointmentId = dataFormatter.appointmentsOneListFormatterEdit(tasksItem.value.appointmentId)

    form.dueDateAndTime = dataFormatter.dateTimeFormatter(tasksItem.value.dueDateAndTime)

    form.jobId = dataFormatter.jobsOneListFormatterEdit(tasksItem.value.jobId)

    form.description = tasksItem.value.description

    form.priority = optionsPriority.find(el => el.label === tasksItem.value.priority)

}

watch(() => tasksStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Tasks notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    tasksStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/tasks')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Tasks</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Tasks"
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
      label="Assigned To"
    >
      <v-select
        v-model="form.assignedToUserId"
        :options="optionsAssignedToUserId"
        @input="searchAssignedToUserId($event.target.value)"
      />
  </FormField>

  <FormField
      label="Appointment "
    >
      <v-select
        v-model="form.appointmentId"
        :options="optionsAppointmentId"
        @input="searchAppointmentId($event.target.value)"
      />
  </FormField>

    <FormField
      label="Due Date & Time"
    >
      <FormControl
        type="datetime-local"
        v-model="form.dueDateAndTime"
        placeholder="Your Due Date & Time"
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
      label="Description"
    >
      <FormControl
        v-model="form.description"
        type="textarea"
        placeholder="Your Description"
        />
    </FormField>

    <FormField label="Priority">
      <FormControl
        v-model="form.priority"
        :options="optionsPriority"
      />
    </FormField>

    <FormField label="Completed">
      <FormCheckRadioPicker
        v-model="form.completed"
        name="sample-switch"
        type="switch"
        :options="{ completed: form.completed ? 'Enabled' : 'Disabled' }"
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
