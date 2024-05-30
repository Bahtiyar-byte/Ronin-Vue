<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useContractsStore } from "@/stores/Contracts/contracts";
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

const contractsStore = useContractsStore()
const router = useRouter();

const notification = computed(() => contractsStore.notify)
const titleStack = ref(['Admin', 'Contracts'])

        const optionsContactId = computed(() => contractsStore.searchResultContactId);

        const optionsJobId = computed(() => contractsStore.searchResultJobId);

const form = reactive({

      name: '',

      amount: '',

    body: '',

      contactId: '',

      signedDate: '',
      dateSignedDate: '',

      jobId: '',

})

onBeforeMount(async () => {

  await searchContactId();

  await searchJobId();

})

const submit = async () => {
  try {

            form.contactId = form.contactId.id;

            form.jobId = form.jobId.id;

    await contractsStore.newItem({ ...form })
    router.push('/contracts');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

        form.amount = '';

      form.body = '';

        form.contactId = '';

        form.signedDate = '';
        dateSignedDate = '';

        form.jobId = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchContactId(val) {
      await contractsStore.searchContactId(val);
    }

    async function searchJobId(val) {
      await contractsStore.searchJobId(val);
    }

watch(() => contractsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Contracts notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    contractsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Contracts</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Contracts"
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
      label="Amount"
    >
      <FormControl
        type="number"
        v-model="form.amount"
        placeholder="Your Amount"
      />
    </FormField>

    <FormField
      label="Body"
    >
      <FormControl
        v-model="form.body"
        type="textarea"
        placeholder="Your Body"
        />
    </FormField>

  <FormField
      label="Contact "
    >
        <v-select
          v-model="form.contactId"
          :options="optionsContactId"
          @input="searchContactId($event.target.value)"
        />
  </FormField>

    <FormField
      label="Signed Date"
    >
      <FormControl
        type="date"
        v-model="form.signedDate"
        placeholder="Your Signed Date"
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
