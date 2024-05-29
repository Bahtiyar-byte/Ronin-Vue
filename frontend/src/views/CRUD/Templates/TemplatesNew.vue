<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useTemplatesStore } from "@/stores/Templates/templates";
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

const templatesStore = useTemplatesStore()
const router = useRouter();

const notification = computed(() => templatesStore.notify)
const titleStack = ref(['Admin', 'Templates'])

        const optionsTradeId = computed(() => templatesStore.searchResultTradeId);

        const optionsCreatedBy = computed(() => templatesStore.searchResultCreatedBy);

        const optionsUpdatedBy = computed(() => templatesStore.searchResultUpdatedBy);

const form = reactive({

      name: '',

    description: '',

      tradeId: '',

      createdBy: '',

      updatedBy: '',

})

onBeforeMount(async () => {

  await searchTradeId();

  await searchCreatedBy();

  await searchUpdatedBy();

})

const submit = async () => {
  try {

            form.tradeId = form.tradeId.id;

            form.createdBy = form.createdBy.id;

            form.updatedBy = form.updatedBy.id;

    await templatesStore.newItem({ ...form })
    router.push('/templates');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

      form.description = '';

        form.tradeId = '';

        form.createdBy = '';

        form.updatedBy = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchTradeId(val) {
      await templatesStore.searchTradeId(val);
    }

    async function searchCreatedBy(val) {
      await templatesStore.searchCreatedBy(val);
    }

    async function searchUpdatedBy(val) {
      await templatesStore.searchUpdatedBy(val);
    }

watch(() => templatesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Templates notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    templatesStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Templates</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Templates"
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
      label="Description"
    >
      <FormControl
        v-model="form.description"
        type="textarea"
        placeholder="Your Description"
        />
    </FormField>

  <FormField
      label="Trade"
    >
        <v-select
          v-model="form.tradeId"
          :options="optionsTradeId"
          @input="searchTradeId($event.target.value)"
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
