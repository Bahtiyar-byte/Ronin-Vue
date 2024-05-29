<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useDocumentsStore } from "@/stores/Documents/documents";
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

const documentsStore = useDocumentsStore()
const router = useRouter();

const notification = computed(() => documentsStore.notify)
const titleStack = ref(['Admin', 'Documents'])

        const optionsJobId = computed(() => documentsStore.searchResultJobId);

        const optionsCreatedBy = computed(() => documentsStore.searchResultCreatedBy);

const form = reactive({

      jobId: '',

      name: '',

      active: false,

      fileType: [],

      createdBy: '',

})

onBeforeMount(async () => {

  await searchJobId();

  await searchCreatedBy();

})

const submit = async () => {
  try {

            form.jobId = form.jobId.id;

            form.createdBy = form.createdBy.id;

    await documentsStore.newItem({ ...form })
    router.push('/documents');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.jobId = '';

        form.name = '';

        form.active = false;

        form.fileType = [];

        form.createdBy = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJobId(val) {
      await documentsStore.searchJobId(val);
    }

    async function searchCreatedBy(val) {
      await documentsStore.searchCreatedBy(val);
    }

watch(() => documentsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Documents notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    documentsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Documents</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Documents"
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
      label="Name"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your Name"
      />
    </FormField>

    <FormField label="Active">
      <FormCheckRadioPicker
        v-model="form.active"
        name="sample-switch"
        type="switch"
        :options="{ active: form.active ? 'Enabled' : 'Disabled' }"
      />
    </FormField>

    <FormField
      label="File Type"
    >
      <FormFilePicker v-model="form.fileType" url="documents/fileType"/>
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
