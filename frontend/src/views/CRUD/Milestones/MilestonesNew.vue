<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const milestonesStore = useMilestonesStore()
const router = useRouter();

const notification = computed(() => milestonesStore.notify)
const titleStack = ref(['Admin', 'Milestones'])

const form = reactive({

      Name: '',

})

onBeforeMount(async () => {

})

const submit = async () => {
  try {

    await milestonesStore.newItem({ ...form })
    router.push('/milestones');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.Name = '';

}

const cancel = () => {
  router.push('/users')
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Milestones</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Milestones"
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
