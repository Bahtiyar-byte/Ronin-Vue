<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const emailsStore = useEmailsStore()
const router = useRouter();

const notification = computed(() => emailsStore.notify)
const titleStack = ref(['Admin', 'Emails'])

        const optionsJobId = computed(() => emailsStore.searchResultJobId);

        const optionsUserId = computed(() => emailsStore.searchResultUserId);

        const optionsContactId = computed(() => emailsStore.searchResultContactId);

const form = reactive({

      jobId: '',

      toAddress: '',

      fromAddress: '',

      isInbound: false,

      userId: '',

      contactId: '',

    subject: '',

    body: '',

})

onBeforeMount(async () => {

  await searchJobId();

  await searchUserId();

  await searchContactId();

})

const submit = async () => {
  try {

            form.jobId = form.jobId.id;

            form.userId = form.userId.id;

            form.contactId = form.contactId.id;

    await emailsStore.newItem({ ...form })
    router.push('/emails');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.jobId = '';

        form.toAddress = '';

        form.fromAddress = '';

        form.isInbound = false;

        form.userId = '';

        form.contactId = '';

      form.subject = '';

      form.body = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJobId(val) {
      await emailsStore.searchJobId(val);
    }

    async function searchUserId(val) {
      await emailsStore.searchUserId(val);
    }

    async function searchContactId(val) {
      await emailsStore.searchContactId(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Emails</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Emails"
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
