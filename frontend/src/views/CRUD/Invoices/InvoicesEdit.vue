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

      const optionsTerms = [{id: 0, label: 'By Due Date'},{id: 1, label: 'Upon Receipt'},{id: 2, label: 'Net 7 Days'},{id: 3, label: 'Net 10 Days'},{id: 4, label: 'Net 15 Days'},{id: 5, label: 'Net 30 Days'},{id: 6, label: 'Net 45 Days'},{id: 7, label: 'Net 60 Days'},]

        const optionsJobId = computed(() => invoicesStore.searchResultJobId);

const invoicesItem = computed(() => invoicesStore.data);

const form = reactive({

    invoiceNumber: '',

      invoiceDate: '',
      dateInvoiceDate: '',

      terms: '',

    approvedJobValue: '',

    invoicedAmount: '',

    balanceAmount: '',

      jobId: '',

})

const submit = async () => {
  try {

            form.terms = form.terms.label;

            form.jobId = form.jobId?.id;

    await invoicesStore.edit({id: route.params.id, data: {...form} })
    router.push('/invoices');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

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

const formatData = () => {

    form.invoiceNumber = invoicesItem.value.invoiceNumber

    form.invoiceDate = dataFormatter.dateFormatter(invoicesItem.value.invoiceDate)

    form.terms = optionsTerms.find(el => el.label === invoicesItem.value.terms)

    form.approvedJobValue = invoicesItem.value.approvedJobValue

    form.invoicedAmount = invoicesItem.value.invoicedAmount

    form.balanceAmount = invoicesItem.value.balanceAmount

    form.jobId = dataFormatter.jobsOneListFormatterEdit(invoicesItem.value.jobId)

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
      label="Invoice Number"
    >
      <FormControl
        v-model="form.invoiceNumber"
        placeholder="Your Invoice Number"
        />
    </FormField>

    <FormField
      label="Invoice Date"
    >
      <FormControl
        type="date"
        v-model="form.invoiceDate"
        placeholder="Your Invoice Date"
      />
    </FormField>

    <FormField label="Terms">
      <FormControl
        v-model="form.terms"
        :options="optionsTerms"
      />
    </FormField>

    <FormField
      label="Approved Job Value"
    >
      <FormControl
        type="number"
        v-model="form.approvedJobValue"
        placeholder="Your Approved Job Value"
      />
    </FormField>

    <FormField
      label="Invoiced Amount"
    >
      <FormControl
        type="number"
        v-model="form.invoicedAmount"
        placeholder="Your Invoiced Amount"
      />
    </FormField>

    <FormField
      label="Balance Amount"
    >
      <FormControl
        type="number"
        v-model="form.balanceAmount"
        placeholder="Your Balance Amount"
      />
    </FormField>

  <FormField
      label="Job "
    >
      <v-select
        v-model="form.jobId"
        :options="optionsJobId"
        @input="searchJobId($event.target.value)"
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
