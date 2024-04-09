<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const invoicesStore = useInvoicesStore()

const titleStack = ref(['Admin', 'Invoices'])
const notification = computed(() => invoicesStore.notify)

        const optionsJob = computed(() => invoicesStore.searchResultJob);

        const optionsEstimate = computed(() => invoicesStore.searchResultEstimate);

        const optionsDocument = computed(() => invoicesStore.searchResultDocument);

const invoicesItem = computed(() => invoicesStore.data);

const form = reactive({

      job: [],

      estimate: [],

      document: '',

      number: '',

})

const submit = async () => {
  try {

            form.job = form.job.map(item => item.id);

            form.estimate = form.estimate.map(item => item.id);

            form.document = form.document?.id;

    await invoicesStore.edit({id: route.params.id, data: {...form} })
    router.push('/invoices');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJob();

  await searchEstimate();

  await searchDocument();

    await invoicesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    invoicesStore.showNotification(e, 'error');
  }
})

    async function searchJob(val) {
      await invoicesStore.searchJob(val);
    }

    async function searchEstimate(val) {
      await invoicesStore.searchEstimate(val);
    }

    async function searchDocument(val) {
      await invoicesStore.searchDocument(val);
    }

const formatData = () => {

    form.job = dataFormatter.jobsManyListFormatterEdit(invoicesItem.value.job)

    form.estimate = dataFormatter.estimatesManyListFormatterEdit(invoicesItem.value.estimate)

    form.document = dataFormatter.documentsOneListFormatterEdit(invoicesItem.value.document)

    form.number = invoicesItem.value.number

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

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/invoices')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Invoices</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Invoices"
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
