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

        const optionsJobId = computed(() => estimatesStore.searchResultJobId);

        const optionsContactId = computed(() => estimatesStore.searchResultContactId);

        const optionsTemplateId = computed(() => estimatesStore.searchResultTemplateId);

        const optionsCreatedBy = computed(() => estimatesStore.searchResultCreatedBy);

        const optionsUpdatedBy = computed(() => estimatesStore.searchResultUpdatedBy);

const estimatesItem = computed(() => estimatesStore.data);

const form = reactive({

    description: [''],

    additionalNotes: [''],

    price: '',

      jobId: '',

      contactId: '',

      templateId: '',

      createdBy: '',

      updatedBy: '',

})

const submit = async () => {
  try {

            form.jobId = form.jobId?.id;

            form.contactId = form.contactId?.id;

            form.templateId = form.templateId?.id;

            form.createdBy = form.createdBy?.id;

            form.updatedBy = form.updatedBy?.id;

    await estimatesStore.edit({id: route.params.id, data: {...form} })
    router.push('/estimates');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

  await searchContactId();

  await searchTemplateId();

  await searchCreatedBy();

  await searchUpdatedBy();

    await estimatesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    estimatesStore.showNotification(e, 'error');
  }
})

    async function searchJobId(val) {
      await estimatesStore.searchJobId(val);
    }

    async function searchContactId(val) {
      await estimatesStore.searchContactId(val);
    }

    async function searchTemplateId(val) {
      await estimatesStore.searchTemplateId(val);
    }

    async function searchCreatedBy(val) {
      await estimatesStore.searchCreatedBy(val);
    }

    async function searchUpdatedBy(val) {
      await estimatesStore.searchUpdatedBy(val);
    }

const formatData = () => {

    form.description = estimatesItem.value.description

    form.additionalNotes = estimatesItem.value.additionalNotes

    form.price = estimatesItem.value.price

    form.jobId = dataFormatter.jobsOneListFormatterEdit(estimatesItem.value.jobId)

    form.contactId = dataFormatter.contactsOneListFormatterEdit(estimatesItem.value.contactId)

    form.templateId = dataFormatter.templatesOneListFormatterEdit(estimatesItem.value.templateId)

    form.createdBy = dataFormatter.usersOneListFormatterEdit(estimatesItem.value.createdBy)

    form.updatedBy = dataFormatter.usersOneListFormatterEdit(estimatesItem.value.updatedBy)

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

  <FormField
      label="Created By"
    >
      <v-select
        v-model="form.createdBy"
        :options="optionsCreatedBy"
        @input="searchCreatedBy($event.target.value)"
      />
  </FormField>

  <FormField
      label="Updated By"
    >
      <v-select
        v-model="form.updatedBy"
        :options="optionsUpdatedBy"
        @input="searchUpdatedBy($event.target.value)"
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
