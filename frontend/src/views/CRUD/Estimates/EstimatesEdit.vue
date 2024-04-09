<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEstimatesStore } from "@/stores/Estimates/estimates";
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
const estimatesStore = useEstimatesStore()

const titleStack = ref(['Admin', 'Estimates'])
const notification = computed(() => estimatesStore.notify)

        const optionsJob = computed(() => estimatesStore.searchResultJob);

        const optionsTemplate = computed(() => estimatesStore.searchResultTemplate);

      const optionsStatus = [{id: 0, label: 'Draft'},{id: 1, label: 'Sent'},{id: 2, label: 'Approved'},{id: 3, label: 'Rejected'},]

const estimatesItem = computed(() => estimatesStore.data);

const form = reactive({

      job: '',

      template: [],

      status: '',

    name: '',

})

const submit = async () => {
  try {

            form.job = form.job?.id;

            form.template = form.template.map(item => item.id);

            form.status = form.status.label;

    await estimatesStore.edit({id: route.params.id, data: {...form} })
    router.push('/estimates');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJob();

  await searchTemplate();

    await estimatesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    estimatesStore.showNotification(e, 'error');
  }
})

    async function searchJob(val) {
      await estimatesStore.searchJob(val);
    }

    async function searchTemplate(val) {
      await estimatesStore.searchTemplate(val);
    }

const formatData = () => {

    form.job = dataFormatter.jobsOneListFormatterEdit(estimatesItem.value.job)

    form.template = dataFormatter.templatesManyListFormatterEdit(estimatesItem.value.template)

    form.status = optionsStatus.find(el => el.label === estimatesItem.value.status)

    form.name = estimatesItem.value.name

}

watch(() => estimatesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Estimates notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    estimatesStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/estimates')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Estimates</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Estimates"
      form
      @submit.prevent="submit"
    >

  <FormField
      label="Job"
    >
      <v-select
        v-model="form.job"
        :options="optionsJob"
        @input="searchJob($event.target.value)"
      />
  </FormField>

    <FormField
        label="Template"
      >
        <v-select
          v-model="form.template"
          :options="optionsTemplate"
          multiple
          @input="searchTemplate($event.target.value)"
        />
    </FormField>

    <FormField label="Status">
      <FormControl
        v-model="form.status"
        :options="optionsStatus"
      />
    </FormField>

    <FormField
      label="Name"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your Name"
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
