<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmailsStore } from "@/stores/Emails/emails";
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
const emailsStore = useEmailsStore()

const titleStack = ref(['Admin', 'Emails'])
const notification = computed(() => emailsStore.notify)

        const optionsJobId = computed(() => emailsStore.searchResultJobId);

        const optionsUserId = computed(() => emailsStore.searchResultUserId);

        const optionsContactId = computed(() => emailsStore.searchResultContactId);

const emailsItem = computed(() => emailsStore.data);

const form = reactive({

      jobId: '',

    toAddress: '',

    fromAddress: '',

      isInbound: false,

      userId: '',

      contactId: '',

    subject: [''],

    body: [''],

})

const submit = async () => {
  try {

            form.jobId = form.jobId?.id;

            form.userId = form.userId?.id;

            form.contactId = form.contactId?.id;

    await emailsStore.edit({id: route.params.id, data: {...form} })
    router.push('/emails');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

  await searchUserId();

  await searchContactId();

    await emailsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    emailsStore.showNotification(e, 'error');
  }
})

    async function searchJobId(val) {
      await emailsStore.searchJobId(val);
    }

    async function searchUserId(val) {
      await emailsStore.searchUserId(val);
    }

    async function searchContactId(val) {
      await emailsStore.searchContactId(val);
    }

const formatData = () => {

    form.jobId = dataFormatter.jobsOneListFormatterEdit(emailsItem.value.jobId)

    form.toAddress = emailsItem.value.toAddress

    form.fromAddress = emailsItem.value.fromAddress

    form.userId = dataFormatter.usersOneListFormatterEdit(emailsItem.value.userId)

    form.contactId = dataFormatter.contactsOneListFormatterEdit(emailsItem.value.contactId)

    form.subject = emailsItem.value.subject

    form.body = emailsItem.value.body

}

watch(() => emailsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Emails notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    emailsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/emails')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Emails</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Emails"
      form
      @submit.prevent="submit"
    >

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
      label="To Address"
    >
      <FormControl
        v-model="form.toAddress"
        placeholder="Your To Address"
        />
    </FormField>

    <FormField
      label="From Address"
    >
      <FormControl
        v-model="form.fromAddress"
        placeholder="Your From Address"
        />
    </FormField>

    <FormField label="Is Inbound">
      <FormCheckRadioPicker
        v-model="form.isInbound"
        name="sample-switch"
        type="switch"
        :options="{ isInbound: form.isInbound ? 'Enabled' : 'Disabled' }"
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
      label="Contact "
    >
      <v-select
        v-model="form.contactId"
        :options="optionsContactId"
        @input="searchContactId($event.target.value)"
      />
  </FormField>

    <FormField
      label="Subject"
    >
      <FormControl
        v-model="form.subject"
        type="textarea"
        placeholder="Your Subject"
        />
    </FormField>

    <label class="block font-bold mb-2 text-pavitra-700 text-sm">Body</label>
    <Editor
      api-key="s0bs8snu2u6qo8skn5r3kurkerhbaagpsgm9cdkbxnbo8nj4"
      cloudChannel="6"
      v-model="form.body"
      />

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
