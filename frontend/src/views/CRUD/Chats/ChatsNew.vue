<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useChatsStore } from "@/stores/Chats/chats";
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

const chatsStore = useChatsStore()
const router = useRouter();

const notification = computed(() => chatsStore.notify)
const titleStack = ref(['Admin', 'Chats'])

        const optionsJobId = computed(() => chatsStore.searchResultJobId);

        const optionsSenderId = computed(() => chatsStore.searchResultSenderId);

        const optionsReceiverId = computed(() => chatsStore.searchResultReceiverId);

const form = reactive({

      jobId: '',

      senderId: '',

      receiverId: '',

    message: '',

      sentTime: '',

})

onBeforeMount(async () => {

  await searchJobId();

  await searchSenderId();

  await searchReceiverId();

})

const submit = async () => {
  try {

            form.jobId = form.jobId.id;

            form.senderId = form.senderId.id;

            form.receiverId = form.receiverId.id;

    await chatsStore.newItem({ ...form })
    router.push('/chats');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.jobId = '';

        form.senderId = '';

        form.receiverId = '';

      form.message = '';

        form.sentTime = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJobId(val) {
      await chatsStore.searchJobId(val);
    }

    async function searchSenderId(val) {
      await chatsStore.searchSenderId(val);
    }

    async function searchReceiverId(val) {
      await chatsStore.searchReceiverId(val);
    }

watch(() => chatsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Chats notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    chatsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Chats</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Chats"
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
      label="Sender "
    >
        <v-select
          v-model="form.senderId"
          :options="optionsSenderId"
          @input="searchSenderId($event.target.value)"
        />
  </FormField>

  <FormField
      label="Receiver "
    >
        <v-select
          v-model="form.receiverId"
          :options="optionsReceiverId"
          @input="searchReceiverId($event.target.value)"
        />
  </FormField>

    <FormField
      label="Message"
    >
      <FormControl
        v-model="form.message"
        type="textarea"
        placeholder="Your Message"
        />
    </FormField>

    <FormField
      label="Sent Time"
    >
      <FormControl
        type="datetime-local"
        v-model="form.sentTime"
        placeholder="Your Sent Time"
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
