<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const estimatesStore = useEstimatesStore()
const router = useRouter();

const notification = computed(() => estimatesStore.notify)
const titleStack = ref(['Admin', 'Estimates'])

        const optionsJob = computed(() => estimatesStore.searchResultJob);

        const optionsTemplate = computed(() => estimatesStore.searchResultTemplate);

const form = reactive({

      job: '',

      template: [],

      status: false,

      name: '',

})

onBeforeMount(async () => {

  await searchJob();

  await searchTemplate();

})

const submit = async () => {
  try {

            form.job = form.job.id;

            form.template = form.template.map(item => item.id);

            form.status = form.status.label;

    await estimatesStore.newItem({ ...form })
    router.push('/estimates');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.job = '';

        form.template = [];

        form.status = false;

        form.name = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJob(val) {
      await estimatesStore.searchJob(val);
    }

    async function searchTemplate(val) {
      await estimatesStore.searchTemplate(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Estimates</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Estimates"
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
        :options="[{id: 0, label: 'Draft'},
                    {id: 1, label: 'Sent'},
                    {id: 2, label: 'Approved'},
                    {id: 3, label: 'Rejected'},
                    ]"
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
