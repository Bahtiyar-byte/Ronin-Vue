<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRolesStore } from "@/stores/Roles/roles";
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
const rolesStore = useRolesStore()

const titleStack = ref(['Admin', 'Roles'])
const notification = computed(() => rolesStore.notify)

        const optionsPermissions = computed(() => rolesStore.searchResultPermissions);

const rolesItem = computed(() => rolesStore.data);

const form = reactive({

    name: '',

      permissions: [],

})

const submit = async () => {
  try {

            form.permissions = form.permissions.map(item => item.id);

    await rolesStore.edit({id: route.params.id, data: {...form} })
    router.push('/roles');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchPermissions();

    await rolesStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    rolesStore.showNotification(e, 'error');
  }
})

    async function searchPermissions(val) {
      await rolesStore.searchPermissions(val);
    }

const formatData = () => {

    form.name = rolesItem.value.name

    form.permissions = dataFormatter.permissionsManyListFormatterEdit(rolesItem.value.permissions)

}

watch(() => rolesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Roles notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    rolesStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/roles')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Roles</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Roles"
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
        label="Permissions"
      >
        <v-select
          v-model="form.permissions"
          :options="optionsPermissions"
          multiple
          @input="searchPermissions($event.target.value)"
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
