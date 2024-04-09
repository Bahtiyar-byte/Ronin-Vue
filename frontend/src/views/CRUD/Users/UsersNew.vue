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

        const optionsRoleId = computed(() => usersStore.searchResultRoleId);

        const optionsCreatedBy = computed(() => usersStore.searchResultCreatedBy);

const form = reactive({

      firstName: '',

      lastName: '',

      phoneNumber: '',

      email: '',

      disabled: false,

      avatar: [],

      roleId: [],

      name: '',

      createdBy: '',

})

onBeforeMount(async () => {

  await searchRoleId();

  await searchCreatedBy();

})

const submit = async () => {
  try {

            form.roleId = form.roleId.map(item => item.id);

            form.createdBy = form.createdBy.id;

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

        form.roleId = [];

        form.name = '';

        form.createdBy = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchRoleId(val) {
      await usersStore.searchRoleId(val);
    }

    async function searchCreatedBy(val) {
      await usersStore.searchCreatedBy(val);
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
        label="Role"
      >
        <v-select
          v-model="form.roleId"
          :options="optionsRoleId"
          multiple
          @input="searchRoleId($event.target.value)"
        />
    </FormField>

    <FormField
      label="Name"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your Name"
      />
    </FormField>

  <FormField
      label="Created "
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
