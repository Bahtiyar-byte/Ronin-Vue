<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
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
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const contactsStore = useContactsStore()
const router = useRouter();

const notification = computed(() => contactsStore.notify)
const titleStack = ref(['Admin', 'Contacts'])

        const optionsAssignedUserId = computed(() => contactsStore.searchResultAssignedUserId);

        const optionsCreatedBy = computed(() => contactsStore.searchResultCreatedBy);

        const optionsUpdatedBy = computed(() => contactsStore.searchResultUpdatedBy);

const form = reactive({

      firstName: '',

      lastName: '',

      email: '',

      phone: '',

      company: '',

      status: false,

      source: false,

      crossReference: '',

      assignedUserId: '',

      createdBy: '',

      updatedBy: '',

})

onBeforeMount(async () => {

  await searchAssignedUserId();

  await searchCreatedBy();

  await searchUpdatedBy();

})

const submit = async () => {
  try {

            form.status = form.status.label;

            form.source = form.source.label;

            form.assignedUserId = form.assignedUserId.id;

            form.createdBy = form.createdBy.id;

            form.updatedBy = form.updatedBy.id;

    await contactsStore.newItem({ ...form })
    router.push('/contacts');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.firstName = '';

        form.lastName = '';

        form.email = '';

        form.phone = '';

        form.company = '';

        form.status = false;

        form.source = false;

        form.crossReference = '';

        form.assignedUserId = '';

        form.createdBy = '';

        form.updatedBy = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchAssignedUserId(val) {
      await contactsStore.searchAssignedUserId(val);
    }

    async function searchCreatedBy(val) {
      await contactsStore.searchCreatedBy(val);
    }

    async function searchUpdatedBy(val) {
      await contactsStore.searchUpdatedBy(val);
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

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Contacts</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Contacts"
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
        :options="[{id: 0, label: 'Lead'},
                    {id: 1, label: 'Prospect'},
                    {id: 2, label: 'Customer'},
                    ]"
      />
    </FormField>

    <FormField label="Source">
      <FormControl
        v-model="form.source"
        :options="[{id: 0, label: 'Google Ads'},
                    {id: 1, label: 'Facebook'},
                    {id: 2, label: 'Website'},
                    {id: 3, label: 'Other'},
                    ]"
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
