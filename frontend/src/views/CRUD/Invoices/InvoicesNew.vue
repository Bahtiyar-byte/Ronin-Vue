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

        const optionsJobId = computed(() => invoicesStore.searchResultJobId);

const form = reactive({

      invoiceNumber: '',

      invoiceDate: '',
      dateInvoiceDate: '',

      terms: false,

      approvedJobValue: '',

      invoicedAmount: '',

      balanceAmount: '',

      jobId: '',

})

onBeforeMount(async () => {

  await searchJobId();

})

const submit = async () => {
  try {

            form.terms = form.terms.label;

            form.jobId = form.jobId.id;

    await invoicesStore.newItem({ ...form })
    router.push('/invoices');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.invoiceNumber = '';

        form.invoiceDate = '';
        dateInvoiceDate = '';

        form.terms = false;

        form.approvedJobValue = '';

        form.invoicedAmount = '';

        form.balanceAmount = '';

        form.jobId = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJobId(val) {
      await invoicesStore.searchJobId(val);
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
        :options="[{id: 0, label: 'By Due Date'},
                    {id: 1, label: 'Upon Receipt'},
                    {id: 2, label: 'Net 7 Days'},
                    {id: 3, label: 'Net 10 Days'},
                    {id: 4, label: 'Net 15 Days'},
                    {id: 5, label: 'Net 30 Days'},
                    {id: 6, label: 'Net 45 Days'},
                    {id: 7, label: 'Net 60 Days'},
                    ]"
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
