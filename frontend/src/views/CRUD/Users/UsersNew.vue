<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from "@/stores/Users/users";
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

const usersStore = useUsersStore()
const router = useRouter();

const notification = computed(() => usersStore.notify)
const titleStack = ref(['Admin', 'Users'])

        const optionsApp_role = computed(() => usersStore.searchResultApp_role);

        const optionsCustom_permissions = computed(() => usersStore.searchResultCustom_permissions);

const form = reactive({

      firstName: '',

      lastName: '',

      phoneNumber: '',

      email: '',

      disabled: false,

      avatar: [],

      app_role: '',

      custom_permissions: [],

})

onBeforeMount(async () => {

  await searchApp_role();

  await searchCustom_permissions();

})

const submit = async () => {
  try {

            form.app_role = form.app_role.id;

            form.custom_permissions = form.custom_permissions.map(item => item.id);

    await usersStore.newItem({ ...form })
    router.push('/users');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.firstName = '';

        form.lastName = '';

        form.phoneNumber = '';

        form.email = '';

        form.disabled = false;

        form.avatar = [];

        form.app_role = '';

        form.custom_permissions = [];

}

const cancel = () => {
  router.push('/users')
}

    async function searchApp_role(val) {
      await usersStore.searchApp_role(val);
    }

    async function searchCustom_permissions(val) {
      await usersStore.searchCustom_permissions(val);
    }

watch(() => usersStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Users notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    usersStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Users</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Users"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="First Name"
    >
      <FormControl
        v-model="form.firstName"
        placeholder="Your First Name"
      />
    </FormField>

    <FormField
      label="Last Name"
    >
      <FormControl
        v-model="form.lastName"
        placeholder="Your Last Name"
      />
    </FormField>

    <FormField
      label="Phone Number"
    >
      <FormControl
        v-model="form.phoneNumber"
        placeholder="Your Phone Number"
      />
    </FormField>

    <FormField
      label="E-Mail"
    >
      <FormControl
        v-model="form.email"
        placeholder="Your E-Mail"
      />
    </FormField>

    <FormField label="Disabled">
      <FormCheckRadioPicker
        v-model="form.disabled"
        name="sample-switch"
        type="switch"
        :options="{ disabled: form.disabled ? 'Enabled' : 'Disabled' }"
      />
    </FormField>

    <FormField
      label="Avatar"
    >
      <FormFilePicker v-model="form.avatar" url="users/avatar"/>
    </FormField>

  <FormField
      label="App Role"
    >
        <v-select
          v-model="form.app_role"
          :options="optionsApp_role"
          @input="searchApp_role($event.target.value)"
        />
  </FormField>

    <FormField
        label="Custom Permissions"
      >
        <v-select
          v-model="form.custom_permissions"
          :options="optionsCustom_permissions"
          multiple
          @input="searchCustom_permissions($event.target.value)"
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
