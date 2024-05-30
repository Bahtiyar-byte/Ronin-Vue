<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const templatesStore = useTemplatesStore()

const titleStack = ref(['Admin', 'Templates'])
const notification = computed(() => templatesStore.notify)

        const optionsTradeId = computed(() => templatesStore.searchResultTradeId);

const templatesItem = computed(() => templatesStore.data);

const form = reactive({

    name: '',

    description: [''],

      tradeId: '',

})

const submit = async () => {
  try {

            form.tradeId = form.tradeId?.id;

    await templatesStore.edit({id: route.params.id, data: {...form} })
    router.push('/templates');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchTradeId();

    await templatesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    templatesStore.showNotification(e, 'error');
  }
})

    async function searchTradeId(val) {
      await templatesStore.searchTradeId(val);
    }

const formatData = () => {

    form.name = templatesItem.value.name

    form.description = templatesItem.value.description

    form.tradeId = dataFormatter.tradesOneListFormatterEdit(templatesItem.value.tradeId)

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

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/templates')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Templates</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Templates"
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
