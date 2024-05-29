<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTradesStore } from "@/stores/Trades/trades";
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
const tradesStore = useTradesStore()

const titleStack = ref(['Admin', 'Trades'])
const notification = computed(() => tradesStore.notify)

      const optionsName = [{id: 0, label: 'Ventilation'},{id: 1, label: 'Vent Install'},{id: 2, label: 'TPO'},{id: 3, label: 'Tile'},{id: 4, label: 'Soffit/Fascia'},{id: 5, label: 'Slate'},{id: 6, label: 'Skylight'},{id: 7, label: 'Silicone'},{id: 8, label: 'Siding'},{id: 9, label: 'Shingles'},{id: 10, label: 'Service Repairs'},{id: 11, label: 'Service Callback'},{id: 12, label: 'Painting'},{id: 13, label: 'Metal'},{id: 14, label: 'Gutters'},{id: 15, label: 'Gutter Guards'},{id: 16, label: 'Gutter Cleaning'},{id: 17, label: 'Flat Roof'},{id: 18, label: 'Aluminum/Flashing'},{id: 19, label: 'Fascia'},{id: 20, label: 'EPDM'},{id: 21, label: 'Downspouts'},{id: 22, label: 'Chimney Cap'},{id: 23, label: 'Box Gutters'},{id: 24, label: 'Pressure Washing'},]

const tradesItem = computed(() => tradesStore.data);

const form = reactive({

      Name: '',

})

const submit = async () => {
  try {

            form.Name = form.Name.label;

    await tradesStore.edit({id: route.params.id, data: {...form} })
    router.push('/trades');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

    await tradesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    tradesStore.showNotification(e, 'error');
  }
})

const formatData = () => {

    form.Name = optionsName.find(el => el.label === tradesItem.value.Name)

}

watch(() => tradesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Trades notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    tradesStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/trades')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Trades</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Trades"
      form
      @submit.prevent="submit"
    >

    <FormField label="Name">
      <FormControl
        v-model="form.Name"
        :options="optionsName"
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
