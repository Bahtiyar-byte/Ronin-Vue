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

        const optionsJobId = computed(() => estimatesStore.searchResultJobId);

        const optionsContactId = computed(() => estimatesStore.searchResultContactId);

        const optionsTemplateId = computed(() => estimatesStore.searchResultTemplateId);

const form = reactive({

    description: '',

    additionalNotes: '',

      price: '',

      jobId: '',

      contactId: '',

      templateId: '',

})

onBeforeMount(async () => {

  await searchJobId();

  await searchContactId();

  await searchTemplateId();

})

const submit = async () => {
  try {

            form.jobId = form.jobId.id;

            form.contactId = form.contactId.id;

            form.templateId = form.templateId.id;

    await estimatesStore.newItem({ ...form })
    router.push('/estimates');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

      form.description = '';

      form.additionalNotes = '';

        form.price = '';

        form.jobId = '';

        form.contactId = '';

        form.templateId = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJobId(val) {
      await estimatesStore.searchJobId(val);
    }

    async function searchContactId(val) {
      await estimatesStore.searchContactId(val);
    }

    async function searchTemplateId(val) {
      await estimatesStore.searchTemplateId(val);
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
      label="Description"
    >
      <FormControl
        v-model="form.description"
        type="textarea"
        placeholder="Your Description"
        />
    </FormField>

    <label class="block font-bold mb-2 text-pavitra-700 text-sm">Additional Notes</label>
    <Editor
      api-key="s0bs8snu2u6qo8skn5r3kurkerhbaagpsgm9cdkbxnbo8nj4"
      cloudChannel="6"
      v-model="form.additionalNotes"
      />

    <FormField
      label="Price"
    >
      <FormControl
        type="number"
        v-model="form.price"
        placeholder="Your Price"
      />
    </FormField>

  <FormField
      label="Job Id"
    >
        <v-select
          v-model="form.jobId"
          :options="optionsJobId"
          @input="searchJobId($event.target.value)"
        />
  </FormField>

  <FormField
      label="Contact Id"
    >
        <v-select
          v-model="form.contactId"
          :options="optionsContactId"
          @input="searchContactId($event.target.value)"
        />
  </FormField>

  <FormField
      label="Template "
    >
        <v-select
          v-model="form.templateId"
          :options="optionsTemplateId"
          @input="searchTemplateId($event.target.value)"
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
