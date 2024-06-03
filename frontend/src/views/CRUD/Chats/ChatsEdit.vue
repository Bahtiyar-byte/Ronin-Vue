<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const chatsStore = useChatsStore()

const titleStack = ref(['Admin', 'Chats'])
const notification = computed(() => chatsStore.notify)

        const optionsJobId = computed(() => chatsStore.searchResultJobId);

        const optionsSenderId = computed(() => chatsStore.searchResultSenderId);

        const optionsReceiverId = computed(() => chatsStore.searchResultReceiverId);

const chatsItem = computed(() => chatsStore.data);

const form = reactive({

      jobId: '',

      senderId: '',

      receiverId: '',

    message: [''],

      sentTime: '',

})

const submit = async () => {
  try {

            form.jobId = form.jobId?.id;

            form.senderId = form.senderId?.id;

            form.receiverId = form.receiverId?.id;

    await chatsStore.edit({id: route.params.id, data: {...form} })
    router.push('/chats');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchJobId();

  await searchSenderId();

  await searchReceiverId();

    await chatsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    chatsStore.showNotification(e, 'error');
  }
})

    async function searchJobId(val) {
      await chatsStore.searchJobId(val);
    }

    async function searchSenderId(val) {
      await chatsStore.searchSenderId(val);
    }

    async function searchReceiverId(val) {
      await chatsStore.searchReceiverId(val);
    }

const formatData = () => {

    form.jobId = dataFormatter.jobsOneListFormatterEdit(chatsItem.value.jobId)

    form.senderId = dataFormatter.usersOneListFormatterEdit(chatsItem.value.senderId)

    form.receiverId = dataFormatter.usersOneListFormatterEdit(chatsItem.value.receiverId)

    form.message = chatsItem.value.message

    form.sentTime = dataFormatter.dateTimeFormatter(chatsItem.value.sentTime)

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

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/chats')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Chats</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Chats"
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
