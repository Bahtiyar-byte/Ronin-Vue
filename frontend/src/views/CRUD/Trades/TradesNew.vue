<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const tradesStore = useTradesStore()
const router = useRouter();

const notification = computed(() => tradesStore.notify)
const titleStack = ref(['Admin', 'Trades'])

const form = reactive({

      Name: false,

})

onBeforeMount(async () => {

})

const submit = async () => {
  try {

            form.Name = form.Name.label;

    await tradesStore.newItem({ ...form })
    router.push('/trades');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.Name = false;

}

const cancel = () => {
  router.push('/users')
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Trades</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Trades"
      form
      @submit.prevent="submit"
    >

    <FormField label="Name">
      <FormControl
        v-model="form.Name"
        :options="[{id: 0, label: 'Ventilation'},
                    {id: 1, label: 'Vent Install'},
                    {id: 2, label: 'TPO'},
                    {id: 3, label: 'Tile'},
                    {id: 4, label: 'Soffit/Fascia'},
                    {id: 5, label: 'Slate'},
                    {id: 6, label: 'Skylight'},
                    {id: 7, label: 'Silicone'},
                    {id: 8, label: 'Siding'},
                    {id: 9, label: 'Shingles'},
                    {id: 10, label: 'Service Repairs'},
                    {id: 11, label: 'Service Callback'},
                    {id: 12, label: 'Painting'},
                    {id: 13, label: 'Metal'},
                    {id: 14, label: 'Gutters'},
                    {id: 15, label: 'Gutter Guards'},
                    {id: 16, label: 'Gutter Cleaning'},
                    {id: 17, label: 'Flat Roof'},
                    {id: 18, label: 'Aluminum/Flashing'},
                    {id: 19, label: 'Fascia'},
                    {id: 20, label: 'EPDM'},
                    {id: 21, label: 'Downspouts'},
                    {id: 22, label: 'Chimney Cap'},
                    {id: 23, label: 'Box Gutters'},
                    {id: 24, label: 'Pressure Washing'},
                    ]"
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
