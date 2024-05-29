<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const ordersStore = useOrdersStore()
const router = useRouter();

const notification = computed(() => ordersStore.notify)
const titleStack = ref(['Admin', 'Orders'])

        const optionsJobId = computed(() => ordersStore.searchResultJobId);

        const optionsEstimateId = computed(() => ordersStore.searchResultEstimateId);

        const optionsCreatedBy = computed(() => ordersStore.searchResultCreatedBy);

const form = reactive({

      jobId: '',

      estimateId: '',

      orderNumber: '',

      totalAmount: '',

      createdBy: '',

})

onBeforeMount(async () => {

  await searchJobId();

  await searchEstimateId();

  await searchCreatedBy();

})

const submit = async () => {
  try {

            form.jobId = form.jobId.id;

            form.estimateId = form.estimateId.id;

            form.createdBy = form.createdBy.id;

    await ordersStore.newItem({ ...form })
    router.push('/orders');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.jobId = '';

        form.estimateId = '';

        form.orderNumber = '';

        form.totalAmount = '';

        form.createdBy = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJobId(val) {
      await ordersStore.searchJobId(val);
    }

    async function searchEstimateId(val) {
      await ordersStore.searchEstimateId(val);
    }

    async function searchCreatedBy(val) {
      await ordersStore.searchCreatedBy(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Orders</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Orders"
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
