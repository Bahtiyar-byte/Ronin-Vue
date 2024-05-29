<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const contractsStore = useContractsStore()

const titleStack = ref(['Admin', 'Contracts'])
const notification = computed(() => contractsStore.notify)

        const optionsContactId = computed(() => contractsStore.searchResultContactId);

        const optionsJobId = computed(() => contractsStore.searchResultJobId);

        const optionsCreatedBy = computed(() => contractsStore.searchResultCreatedBy);

const contractsItem = computed(() => contractsStore.data);

const form = reactive({

    name: '',

    amount: '',

    body: [''],

      contactId: '',

      signedDate: '',
      dateSignedDate: '',

      jobId: '',

      createdBy: '',

})

const submit = async () => {
  try {

            form.contactId = form.contactId?.id;

            form.jobId = form.jobId?.id;

            form.createdBy = form.createdBy?.id;

    await contractsStore.edit({id: route.params.id, data: {...form} })
    router.push('/contracts');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchContactId();

  await searchJobId();

  await searchCreatedBy();

    await contractsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    contractsStore.showNotification(e, 'error');
  }
})

    async function searchContactId(val) {
      await contractsStore.searchContactId(val);
    }

    async function searchJobId(val) {
      await contractsStore.searchJobId(val);
    }

    async function searchCreatedBy(val) {
      await contractsStore.searchCreatedBy(val);
    }

const formatData = () => {

    form.name = contractsItem.value.name

    form.amount = contractsItem.value.amount

    form.body = contractsItem.value.body

    form.contactId = dataFormatter.contactsOneListFormatterEdit(contractsItem.value.contactId)

    form.signedDate = dataFormatter.dateFormatter(contractsItem.value.signedDate)

    form.jobId = dataFormatter.jobsOneListFormatterEdit(contractsItem.value.jobId)

    form.createdBy = dataFormatter.usersOneListFormatterEdit(contractsItem.value.createdBy)

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

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/contracts')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Contracts</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Contracts"
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
