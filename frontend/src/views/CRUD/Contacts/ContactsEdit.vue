<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContactsStore } from "@/stores/Contacts/contacts";
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
const contactsStore = useContactsStore()

const titleStack = ref(['Admin', 'Contacts'])
const notification = computed(() => contactsStore.notify)

      const optionsStatus = [{id: 0, label: 'Lead'},{id: 1, label: 'Prospect'},{id: 2, label: 'Customer'},]

      const optionsSource = [{id: 0, label: 'Google Ads'},{id: 1, label: 'Facebook'},{id: 2, label: 'Website'},{id: 3, label: 'Other'},]

        const optionsAssignedUserId = computed(() => contactsStore.searchResultAssignedUserId);

        const optionsCreatedBy = computed(() => contactsStore.searchResultCreatedBy);

        const optionsUpdatedBy = computed(() => contactsStore.searchResultUpdatedBy);

const contactsItem = computed(() => contactsStore.data);

const form = reactive({

    firstName: '',

    lastName: '',

    email: '',

    phone: '',

    company: '',

      status: '',

      source: '',

    crossReference: '',

      assignedUserId: '',

      createdBy: '',

      updatedBy: '',

})

const submit = async () => {
  try {

            form.status = form.status.label;

            form.source = form.source.label;

            form.assignedUserId = form.assignedUserId?.id;

            form.createdBy = form.createdBy?.id;

            form.updatedBy = form.updatedBy?.id;

    await contactsStore.edit({id: route.params.id, data: {...form} })
    router.push('/contacts');
  } catch (e) {
    console.log(e);
  }
}

onBeforeMount(async () => {
  try {

  await searchAssignedUserId();

  await searchCreatedBy();

  await searchUpdatedBy();

    await contactsStore.fetch(route.params.id)
    formatData();
  } catch (e) {
    console.log(e)
    contactsStore.showNotification(e, 'error');
  }
})

    async function searchAssignedUserId(val) {
      await contactsStore.searchAssignedUserId(val);
    }

    async function searchCreatedBy(val) {
      await contactsStore.searchCreatedBy(val);
    }

    async function searchUpdatedBy(val) {
      await contactsStore.searchUpdatedBy(val);
    }

const formatData = () => {

    form.firstName = contactsItem.value.firstName

    form.lastName = contactsItem.value.lastName

    form.email = contactsItem.value.email

    form.phone = contactsItem.value.phone

    form.company = contactsItem.value.company

    form.status = optionsStatus.find(el => el.label === contactsItem.value.status)

    form.source = optionsSource.find(el => el.label === contactsItem.value.source)

    form.crossReference = contactsItem.value.crossReference

    form.assignedUserId = dataFormatter.usersOneListFormatterEdit(contactsItem.value.assignedUserId)

    form.createdBy = dataFormatter.usersOneListFormatterEdit(contactsItem.value.createdBy)

    form.updatedBy = dataFormatter.usersOneListFormatterEdit(contactsItem.value.updatedBy)

}

watch(() => contactsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Contacts notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    contactsStore.hideNotification()
  }
});

const reset = () => {
  formatData();
}

const cancel = () => {
  router.push('/contacts')
}

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>Edit Contacts</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="Edit Contacts"
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
      label="Email"
    >
      <FormControl
        v-model="form.email"
        placeholder="Your Email"
        />
    </FormField>

    <FormField
      label="Phone"
    >
      <FormControl
        v-model="form.phone"
        placeholder="Your Phone"
        />
    </FormField>

    <FormField
      label="Company"
    >
      <FormControl
        v-model="form.company"
        placeholder="Your Company"
        />
    </FormField>

    <FormField label="Status">
      <FormControl
        v-model="form.status"
        :options="optionsStatus"
      />
    </FormField>

    <FormField label="Source">
      <FormControl
        v-model="form.source"
        :options="optionsSource"
      />
    </FormField>

    <FormField
      label="Cross Reference"
    >
      <FormControl
        v-model="form.crossReference"
        placeholder="Your Cross Reference"
        />
    </FormField>

  <FormField
      label="Assigned To"
    >
      <v-select
        v-model="form.assignedUserId"
        :options="optionsAssignedUserId"
        @input="searchAssignedUserId($event.target.value)"
      />
  </FormField>

  <FormField
      label="Created By"
    >
      <v-select
        v-model="form.createdBy"
        :options="optionsCreatedBy"
        @input="searchCreatedBy($event.target.value)"
      />
  </FormField>

  <FormField
      label="Updated By"
    >
      <v-select
        v-model="form.updatedBy"
        :options="optionsUpdatedBy"
        @input="searchUpdatedBy($event.target.value)"
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
