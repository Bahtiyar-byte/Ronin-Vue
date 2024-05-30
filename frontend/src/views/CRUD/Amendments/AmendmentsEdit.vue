<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAmendmentsStore } from "@/stores/Amendments/amendments";
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
const amendmentsStore = useAmendmentsStore()

const titleStack = ref(['Admin', 'Amendments'])
const notification = computed(() => amendmentsStore.notify)

        const optionsJobId = computed(() => amendmentsStore.searchResultJobId);

      const optionsType = [{id: 0, label: 'Change Order'},{id: 1, label: 'Discount'},{id: 2, label: 'Insurance Claim'},{id: 3, label: 'Supplement'},{id: 4, label: 'Upgrade'},]

const amendmentsItem = computed(() => amendmentsStore.data);

const form = reactive({

      jobId: '',

      type: '',

    amount: '',

    description: [''],

})

const submit = async () => {
  try {

            form.jobId = form.jobId?.id;

            form.type = form.type.label;

    await amendmentsStore.edit({id: route.params.id, data: {...form} })
    router.push('/amendments');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

    await amendmentsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    amendmentsStore.showNotification(e, 'error');
  }
})

    async function searchJobId(val) {
      await amendmentsStore.searchJobId(val);
    }

const formatData = () => {

    form.jobId = dataFormatter.jobsOneListFormatterEdit(amendmentsItem.value.jobId)

    form.type = optionsType.find(el => el.label === amendmentsItem.value.type)

    form.amount = amendmentsItem.value.amount

    form.description = amendmentsItem.value.description

}

watch(() => amendmentsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Amendments notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    amendmentsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/amendments')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Amendments</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Amendments"
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

    <FormField label="Type">
      <FormControl
        v-model="form.type"
        :options="optionsType"
      />
    </FormField>

    <FormField
      label="Amount"
    >
      <FormControl
        type="number"
        v-model="form.amount"
        placeholder="Your Amount"
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
