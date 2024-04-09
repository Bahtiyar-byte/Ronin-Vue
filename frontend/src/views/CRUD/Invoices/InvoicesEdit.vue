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

        const optionsJobId = computed(() => invoicesStore.searchResultJobId);

        const optionsCreatedBy = computed(() => invoicesStore.searchResultCreatedBy);

        const optionsEstimateId = computed(() => invoicesStore.searchResultEstimateId);

        const optionsDocument = computed(() => invoicesStore.searchResultDocument);

const invoicesItem = computed(() => invoicesStore.data);

const form = reactive({

      jobId: [],

      createdBy: '',

      estimateId: [],

      document: '',

      number: '',

})

const submit = async () => {
  try {

            form.jobId = form.jobId.map(item => item.id);

            form.createdBy = form.createdBy?.id;

            form.estimateId = form.estimateId.map(item => item.id);

            form.document = form.document?.id;

    await invoicesStore.edit({id: route.params.id, data: {...form} })
    router.push('/invoices');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

  await searchCreatedBy();

  await searchEstimateId();

  await searchDocument();

    await invoicesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    invoicesStore.showNotification(e, 'error');
  }
})

    async function searchJobId(val) {
      await invoicesStore.searchJobId(val);
    }

    async function searchCreatedBy(val) {
      await invoicesStore.searchCreatedBy(val);
    }

    async function searchEstimateId(val) {
      await invoicesStore.searchEstimateId(val);
    }

    async function searchDocument(val) {
      await invoicesStore.searchDocument(val);
    }

const formatData = () => {

    form.jobId = dataFormatter.jobsManyListFormatterEdit(invoicesItem.value.jobId)

    form.createdBy = dataFormatter.usersOneListFormatterEdit(invoicesItem.value.createdBy)

    form.estimateId = dataFormatter.estimatesManyListFormatterEdit(invoicesItem.value.estimateId)

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
          v-model="form.jobId"
          :options="optionsJobId"
          multiple
          @input="searchJobId($event.target.value)"
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
