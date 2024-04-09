<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useInvoicesStore } from "@/stores/Invoices/invoices";
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

const invoicesStore = useInvoicesStore()
const router = useRouter();

const notification = computed(() => invoicesStore.notify)
const titleStack = ref(['Admin', 'Invoices'])

        const optionsJob = computed(() => invoicesStore.searchResultJob);

        const optionsEstimate = computed(() => invoicesStore.searchResultEstimate);

        const optionsDocument = computed(() => invoicesStore.searchResultDocument);

const form = reactive({

      job: [],

      estimate: [],

      document: '',

      number: '',

})

onBeforeMount(async () => {

  await searchJob();

  await searchEstimate();

  await searchDocument();

})

const submit = async () => {
  try {

            form.job = form.job.map(item => item.id);

            form.estimate = form.estimate.map(item => item.id);

            form.document = form.document.id;

    await invoicesStore.newItem({ ...form })
    router.push('/invoices');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.job = [];

        form.estimate = [];

        form.document = '';

        form.number = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJob(val) {
      await invoicesStore.searchJob(val);
    }

    async function searchEstimate(val) {
      await invoicesStore.searchEstimate(val);
    }

    async function searchDocument(val) {
      await invoicesStore.searchDocument(val);
    }

watch(() => invoicesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Invoices notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    invoicesStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Invoices</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Invoices"
      form
      @submit.prevent="submit"
    >

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
      label="Document"
    >
        <v-select
          v-model="form.document"
          :options="optionsDocument"
          @input="searchDocument($event.target.value)"
        />
  </FormField>

    <FormField
      label="Number"
    >
      <FormControl
        type="number"
        v-model="form.number"
        placeholder="Your Number"
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
