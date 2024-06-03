<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMilestonesStore } from "@/stores/Milestones/milestones";
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
const milestonesStore = useMilestonesStore()

const titleStack = ref(['Admin', 'Milestones'])
const notification = computed(() => milestonesStore.notify)

const milestonesItem = computed(() => milestonesStore.data);

const form = reactive({

    Name: '',

})

const submit = async () => {
  try {

    await milestonesStore.edit({id: route.params.id, data: {...form} })
    router.push('/milestones');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

    await milestonesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    milestonesStore.showNotification(e, 'error');
  }
})

const formatData = () => {

    form.Name = milestonesItem.value.Name

}

watch(() => milestonesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Milestones notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    milestonesStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/milestones')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Milestones</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Milestones"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="Name"
    >
      <FormControl
        v-model="form.Name"
        placeholder="Your Name"
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
