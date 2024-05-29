<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const tasksStore = useTasksStore()
const router = useRouter();

const notification = computed(() => tasksStore.notify)
const titleStack = ref(['Admin', 'Tasks'])

        const optionsAssignedToUserId = computed(() => tasksStore.searchResultAssignedToUserId);

        const optionsAppointmentId = computed(() => tasksStore.searchResultAppointmentId);

        const optionsJobId = computed(() => tasksStore.searchResultJobId);

        const optionsCreatedBy = computed(() => tasksStore.searchResultCreatedBy);

const form = reactive({

      subject: '',

      assignedToUserId: '',

      appointmentId: '',

      dueDateAndTime: '',

      jobId: '',

    description: '',

      priority: false,

      completed: false,

      createdBy: '',

})

onBeforeMount(async () => {

  await searchAssignedToUserId();

  await searchAppointmentId();

  await searchJobId();

  await searchCreatedBy();

})

const submit = async () => {
  try {

            form.assignedToUserId = form.assignedToUserId.id;

            form.appointmentId = form.appointmentId.id;

            form.jobId = form.jobId.id;

            form.priority = form.priority.label;

            form.createdBy = form.createdBy.id;

    await tasksStore.newItem({ ...form })
    router.push('/tasks');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.subject = '';

        form.assignedToUserId = '';

        form.appointmentId = '';

        form.dueDateAndTime = '';

        form.jobId = '';

      form.description = '';

        form.priority = false;

        form.completed = false;

        form.createdBy = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchAssignedToUserId(val) {
      await tasksStore.searchAssignedToUserId(val);
    }

    async function searchAppointmentId(val) {
      await tasksStore.searchAppointmentId(val);
    }

    async function searchJobId(val) {
      await tasksStore.searchJobId(val);
    }

    async function searchCreatedBy(val) {
      await tasksStore.searchCreatedBy(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Tasks</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Tasks"
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
        :options="[{id: 0, label: 'High'},
                    {id: 1, label: 'Medium'},
                    {id: 2, label: 'Low'},
                    ]"
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

  <FormField
      label="Created By"
    >
        <v-select
          v-model="form.createdBy"
          :options="optionsCreatedBy"
          @input="searchCreatedBy($event.target.value)"
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
