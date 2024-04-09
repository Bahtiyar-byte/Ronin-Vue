<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamsStore } from "@/stores/Teams/teams";
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

const teamsStore = useTeamsStore()
const router = useRouter();

const notification = computed(() => teamsStore.notify)
const titleStack = ref(['Admin', 'Teams'])

        const optionsUser = computed(() => teamsStore.searchResultUser);

        const optionsTeam = computed(() => teamsStore.searchResultTeam);

const form = reactive({

      name: '',

      user: [],

      team: [],

})

onBeforeMount(async () => {

  await searchUser();

  await searchTeam();

})

const submit = async () => {
  try {

            form.user = form.user.map(item => item.id);

            form.team = form.team.map(item => item.id);

    await teamsStore.newItem({ ...form })
    router.push('/teams');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

        form.user = [];

        form.team = [];

}

const cancel = () => {
  router.push('/users')
}

    async function searchUser(val) {
      await teamsStore.searchUser(val);
    }

    async function searchTeam(val) {
      await teamsStore.searchTeam(val);
    }

watch(() => teamsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Teams notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    teamsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Teams</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Teams"
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
        label="User"
      >
        <v-select
          v-model="form.user"
          :options="optionsUser"
          multiple
          @input="searchUser($event.target.value)"
        />
    </FormField>

    <FormField
        label="Team"
      >
        <v-select
          v-model="form.team"
          :options="optionsTeam"
          multiple
          @input="searchTeam($event.target.value)"
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
