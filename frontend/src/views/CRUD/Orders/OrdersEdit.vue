<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrdersStore } from "@/stores/Orders/orders";
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
const ordersStore = useOrdersStore()

const titleStack = ref(['Admin', 'Orders'])
const notification = computed(() => ordersStore.notify)

        const optionsJobId = computed(() => ordersStore.searchResultJobId);

        const optionsEstimateId = computed(() => ordersStore.searchResultEstimateId);

const ordersItem = computed(() => ordersStore.data);

const form = reactive({

      jobId: '',

      estimateId: '',

    orderNumber: '',

    totalAmount: '',

})

const submit = async () => {
  try {

            form.jobId = form.jobId?.id;

            form.estimateId = form.estimateId?.id;

    await ordersStore.edit({id: route.params.id, data: {...form} })
    router.push('/orders');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

  await searchEstimateId();

    await ordersStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    ordersStore.showNotification(e, 'error');
  }
})

    async function searchJobId(val) {
      await ordersStore.searchJobId(val);
    }

    async function searchEstimateId(val) {
      await ordersStore.searchEstimateId(val);
    }

const formatData = () => {

    form.jobId = dataFormatter.jobsOneListFormatterEdit(ordersItem.value.jobId)

    form.estimateId = dataFormatter.estimatesOneListFormatterEdit(ordersItem.value.estimateId)

    form.orderNumber = ordersItem.value.orderNumber

    form.totalAmount = ordersItem.value.totalAmount

}

watch(() => ordersStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Orders notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    ordersStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/orders')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Orders</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Orders"
      form
      @submit.prevent="submit"
    >

  <FormField
      label="Job "
    >
      <v-select
        v-model="form.jobId"
        :options="optionsJobId"
        @input="searchJobId($event.target.value)"
      />
  </FormField>

  <FormField
      label="Estimate"
    >
      <v-select
        v-model="form.estimateId"
        :options="optionsEstimateId"
        @input="searchEstimateId($event.target.value)"
      />
  </FormField>

    <FormField
      label="Order Number"
    >
      <FormControl
        v-model="form.orderNumber"
        placeholder="Your Order Number"
        />
    </FormField>

    <FormField
      label="Total Amount"
    >
      <FormControl
        type="number"
        v-model="form.totalAmount"
        placeholder="Your Total Amount"
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
