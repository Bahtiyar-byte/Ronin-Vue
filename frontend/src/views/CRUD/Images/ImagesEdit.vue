<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useImagesStore } from "@/stores/Images/images";
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
const imagesStore = useImagesStore()

const titleStack = ref(['Admin', 'Images'])
const notification = computed(() => imagesStore.notify)

        const optionsJobId = computed(() => imagesStore.searchResultJobId);

        const optionsUserId = computed(() => imagesStore.searchResultUserId);

        const optionsDocumentId = computed(() => imagesStore.searchResultDocumentId);

const imagesItem = computed(() => imagesStore.data);

const form = reactive({

    name: '',

      jobId: '',

      userId: '',

      documentId: '',

})

const submit = async () => {
  try {

            form.jobId = form.jobId?.id;

            form.userId = form.userId?.id;

            form.documentId = form.documentId?.id;

    await imagesStore.edit({id: route.params.id, data: {...form} })
    router.push('/images');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

  await searchUserId();

  await searchDocumentId();

    await imagesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    imagesStore.showNotification(e, 'error');
  }
})

    async function searchJobId(val) {
      await imagesStore.searchJobId(val);
    }

    async function searchUserId(val) {
      await imagesStore.searchUserId(val);
    }

    async function searchDocumentId(val) {
      await imagesStore.searchDocumentId(val);
    }

const formatData = () => {

    form.name = imagesItem.value.name

    form.jobId = dataFormatter.jobsOneListFormatterEdit(imagesItem.value.jobId)

    form.userId = dataFormatter.usersOneListFormatterEdit(imagesItem.value.userId)

    form.documentId = dataFormatter.documentsOneListFormatterEdit(imagesItem.value.documentId)

}

watch(() => imagesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Images notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    imagesStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/images')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Images</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Images"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Name"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your Name"
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

  <FormField
      label="User "
    >
      <v-select
        v-model="form.userId"
        :options="optionsUserId"
        @input="searchUserId($event.target.value)"
      />
  </FormField>

  <FormField
      label="Document "
    >
      <v-select
        v-model="form.documentId"
        :options="optionsDocumentId"
        @input="searchDocumentId($event.target.value)"
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
