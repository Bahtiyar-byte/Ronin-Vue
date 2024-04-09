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

        const optionsCreatedBy = computed(() => imagesStore.searchResultCreatedBy);

const imagesItem = computed(() => imagesStore.data);

const form = reactive({

      jobId: [],

      createdBy: '',

    name: '',

    url: '',

})

const submit = async () => {
  try {

            form.jobId = form.jobId.map(item => item.id);

            form.createdBy = form.createdBy?.id;

    await imagesStore.edit({id: route.params.id, data: {...form} })
    router.push('/images');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

  await searchCreatedBy();

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

    async function searchCreatedBy(val) {
      await imagesStore.searchCreatedBy(val);
    }

const formatData = () => {

    form.jobId = dataFormatter.jobsManyListFormatterEdit(imagesItem.value.jobId)

    form.createdBy = dataFormatter.usersOneListFormatterEdit(imagesItem.value.createdBy)

    form.name = imagesItem.value.name

    form.url = imagesItem.value.url

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
        label="Job"
      >
        <v-select
          v-model="form.jobId"
          :options="optionsJobId"
          multiple
          @input="searchJobId($event.target.value)"
        />
    </FormField>

  <FormField
      label="Created"
    >
      <v-select
        v-model="form.createdBy"
        :options="optionsCreatedBy"
        @input="searchCreatedBy($event.target.value)"
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

    <FormField
      label="Url"
    >
      <FormControl
        v-model="form.url"
        placeholder="Your Url"
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
