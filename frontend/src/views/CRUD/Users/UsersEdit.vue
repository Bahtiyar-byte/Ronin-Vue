<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { notify } from "@kyvg/vue3-notification";
import Editor from '@tinymce/tinymce-vue';
import dataFormatter from '@/helpers/dataFormatter';

const router = useRouter();
const route = useRoute();
const usersStore = useUsersStore()

const titleStack = ref(['Admin', 'Users'])
const notification = computed(() => usersStore.notify)

        const optionsRoleId = computed(() => usersStore.searchResultRoleId);

const usersItem = computed(() => usersStore.data);

const form = reactive({

    firstName: '',

    lastName: '',

    phoneNumber: '',

    email: '',

      disabled: false,

      avatar: [],

    userName: '',

      roleId: '',

})

const submit = async () => {
  try {

            form.roleId = form.roleId?.id;

    await usersStore.edit({id: route.params.id, data: {...form} })
    router.push('/users');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchRoleId();

    await usersStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    usersStore.showNotification(e, 'error');
  }
})

    async function searchRoleId(val) {
      await usersStore.searchRoleId(val);
    }

const formatData = () => {

    form.firstName = usersItem.value.firstName

    form.lastName = usersItem.value.lastName

    form.phoneNumber = usersItem.value.phoneNumber

    form.email = usersItem.value.email

    form.avatar = usersItem.value.avatar

    form.userName = usersItem.value.userName

    form.roleId = dataFormatter.rolesOneListFormatterEdit(usersItem.value.roleId)

form.password = usersItem.value.password

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

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/users')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Users</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Users"
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
      label="User Name"
    >
      <FormControl
        v-model="form.userName"
        placeholder="Your User Name"
        />
    </FormField>

  <FormField
      label="Role "
    >
      <v-select
        v-model="form.roleId"
        :options="optionsRoleId"
        @input="searchRoleId($event.target.value)"
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