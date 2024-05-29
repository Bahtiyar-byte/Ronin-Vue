<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useJobsStore } from "@/stores/Jobs/jobs";
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

const jobsStore = useJobsStore()
const router = useRouter();

const notification = computed(() => jobsStore.notify)
const titleStack = ref(['Admin', 'Jobs'])

        const optionsContactId = computed(() => jobsStore.searchResultContactId);

        const optionsOrderId = computed(() => jobsStore.searchResultOrderId);

        const optionsAssignedUserId = computed(() => jobsStore.searchResultAssignedUserId);

        const optionsCreatedBy = computed(() => jobsStore.searchResultCreatedBy);

        const optionsUpdatedBy = computed(() => jobsStore.searchResultUpdatedBy);

const form = reactive({

      Name: '',

      type: false,

      category: false,

      status: false,

      startDate: '',

      endDate: '',

    description: '',

      contactId: '',

      orderId: '',

      assignedUserId: '',

      createdBy: '',

      updatedBy: '',

})

onBeforeMount(async () => {

  await searchContactId();

  await searchOrderId();

  await searchAssignedUserId();

  await searchCreatedBy();

  await searchUpdatedBy();

})

const submit = async () => {
  try {

            form.type = form.type.label;

            form.category = form.category.label;

            form.status = form.status.label;

            form.contactId = form.contactId.id;

            form.orderId = form.orderId.id;

            form.assignedUserId = form.assignedUserId.id;

            form.createdBy = form.createdBy.id;

            form.updatedBy = form.updatedBy.id;

    await jobsStore.newItem({ ...form })
    router.push('/jobs');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.Name = '';

        form.type = false;

        form.category = false;

        form.status = false;

        form.startDate = '';

        form.endDate = '';

      form.description = '';

        form.contactId = '';

        form.orderId = '';

        form.assignedUserId = '';

        form.createdBy = '';

        form.updatedBy = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchContactId(val) {
      await jobsStore.searchContactId(val);
    }

    async function searchOrderId(val) {
      await jobsStore.searchOrderId(val);
    }

    async function searchAssignedUserId(val) {
      await jobsStore.searchAssignedUserId(val);
    }

    async function searchCreatedBy(val) {
      await jobsStore.searchCreatedBy(val);
    }

    async function searchUpdatedBy(val) {
      await jobsStore.searchUpdatedBy(val);
    }

watch(() => jobsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Jobs notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    jobsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Jobs</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Jobs"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Name"
    >
      <FormControl
        v-model="form.Name"
        placeholder="Your Name"
      />
    </FormField>

    <FormField label="Type">
      <FormControl
        v-model="form.type"
        :options="[{id: 0, label: 'New'},
                    {id: 1, label: 'Repair'},
                    {id: 2, label: 'Service'},
                    {id: 3, label: 'Inspection'},
                    {id: 4, label: 'Insurance'},
                    {id: 5, label: 'Retail'},
                    {id: 6, label: 'Warranty'},
                    ]"
      />
    </FormField>

    <FormField label="Category">
      <FormControl
        v-model="form.category"
        :options="[{id: 0, label: 'Commercial '},
                    {id: 1, label: 'Residential'},
                    {id: 2, label: 'Property Management'},
                    ]"
      />
    </FormField>

    <FormField label="Status">
      <FormControl
        v-model="form.status"
        :options="[{id: 0, label: 'Quoted'},
                    {id: 1, label: 'Approved'},
                    {id: 2, label: 'Active'},
                    {id: 3, label: 'Completed'},
                    {id: 4, label: 'Invoiced'},
                    {id: 5, label: 'Closed'},
                    ]"
      />
    </FormField>

    <FormField
      label="Start Date"
    >
      <FormControl
        type="datetime-local"
        v-model="form.startDate"
        placeholder="Your Start Date"
      />
    </FormField>

    <FormField
      label="End Date"
    >
      <FormControl
        type="datetime-local"
        v-model="form.endDate"
        placeholder="Your End Date"
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
      label="Order "
    >
        <v-select
          v-model="form.orderId"
          :options="optionsOrderId"
          @input="searchOrderId($event.target.value)"
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
      label="Created By"
    >
        <v-select
          v-model="form.createdBy"
          :options="optionsCreatedBy"
          @input="searchCreatedBy($event.target.value)"
        />
  </FormField>

  <FormField
      label="Updated By"
    >
        <v-select
          v-model="form.updatedBy"
          :options="optionsUpdatedBy"
          @input="searchUpdatedBy($event.target.value)"
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
