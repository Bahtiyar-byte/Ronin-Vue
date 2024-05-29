<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const imagesStore = useImagesStore()
const router = useRouter();

const notification = computed(() => imagesStore.notify)
const titleStack = ref(['Admin', 'Images'])

        const optionsJobId = computed(() => imagesStore.searchResultJobId);

        const optionsUserId = computed(() => imagesStore.searchResultUserId);

        const optionsDocumentId = computed(() => imagesStore.searchResultDocumentId);

        const optionsCreatedBy = computed(() => imagesStore.searchResultCreatedBy);

const form = reactive({

      name: '',

      jobId: '',

      userId: '',

      documentId: '',

      createdBy: '',

})

onBeforeMount(async () => {

  await searchJobId();

  await searchUserId();

  await searchDocumentId();

  await searchCreatedBy();

})

const submit = async () => {
  try {

            form.jobId = form.jobId.id;

            form.userId = form.userId.id;

            form.documentId = form.documentId.id;

            form.createdBy = form.createdBy.id;

    await imagesStore.newItem({ ...form })
    router.push('/images');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

        form.jobId = '';

        form.userId = '';

        form.documentId = '';

        form.createdBy = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJobId(val) {
      await imagesStore.searchJobId(val);
    }

    async function searchUserId(val) {
      await imagesStore.searchUserId(val);
    }

    async function searchDocumentId(val) {
      await imagesStore.searchDocumentId(val);
    }

    async function searchCreatedBy(val) {
      await imagesStore.searchCreatedBy(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Images</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Images"
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
