<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const teamsStore = useTeamsStore()

const titleStack = ref(['Admin', 'Teams'])
const notification = computed(() => teamsStore.notify)

        const optionsUser = computed(() => teamsStore.searchResultUser);

        const optionsTeam = computed(() => teamsStore.searchResultTeam);

const teamsItem = computed(() => teamsStore.data);

const form = reactive({

    name: '',

      user: [],

      team: [],

})

const submit = async () => {
  try {

            form.user = form.user.map(item => item.id);

            form.team = form.team.map(item => item.id);

    await teamsStore.edit({id: route.params.id, data: {...form} })
    router.push('/teams');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchUser();

  await searchTeam();

    await teamsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    teamsStore.showNotification(e, 'error');
  }
})

    async function searchUser(val) {
      await teamsStore.searchUser(val);
    }

    async function searchTeam(val) {
      await teamsStore.searchTeam(val);
    }

const formatData = () => {

    form.name = teamsItem.value.name

    form.user = dataFormatter.usersManyListFormatterEdit(teamsItem.value.user)

    form.team = dataFormatter.teamsManyListFormatterEdit(teamsItem.value.team)

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

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/teams')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Teams</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Teams"
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
