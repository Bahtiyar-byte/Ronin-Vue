<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAddressesStore } from "@/stores/Addresses/addresses";
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

const addressesStore = useAddressesStore()
const router = useRouter();

const notification = computed(() => addressesStore.notify)
const titleStack = ref(['Admin', 'Addresses'])

        const optionsContactId = computed(() => addressesStore.searchResultContactId);

        const optionsJobId = computed(() => addressesStore.searchResultJobId);

const form = reactive({

      contactId: '',

      jobId: '',

      street: '',

      suite_apt_unit: '',

      city: '',

      state: false,

      zip: '',

      country: '',

      type: false,

})

onBeforeMount(async () => {

  await searchContactId();

  await searchJobId();

})

const submit = async () => {
  try {

            form.contactId = form.contactId.id;

            form.jobId = form.jobId.id;

            form.state = form.state.label;

    await addressesStore.newItem({ ...form })
    router.push('/addresses');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.contactId = '';

        form.jobId = '';

        form.street = '';

        form.suite_apt_unit = '';

        form.city = '';

        form.state = false;

        form.zip = '';

        form.country = '';

        form.type = false;

}

const cancel = () => {
  router.push('/users')
}

    async function searchContactId(val) {
      await addressesStore.searchContactId(val);
    }

    async function searchJobId(val) {
      await addressesStore.searchJobId(val);
    }

watch(() => addressesStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Addresses notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    addressesStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Addresses</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Addresses"
      form
      @submit.prevent="submit"
    >

  <FormField
      label="Contact "
    >
        <v-select
          v-model="form.contactId"
          :options="optionsContactId"
          @input="searchContactId($event.target.value)"
        />
  </FormField>

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
      label="Street"
    >
      <FormControl
        v-model="form.street"
        placeholder="Your Street"
      />
    </FormField>

    <FormField
      label="Suite/Apt/Unit"
    >
      <FormControl
        v-model="form.suite_apt_unit"
        placeholder="Your Suite/Apt/Unit"
      />
    </FormField>

    <FormField
      label="City"
    >
      <FormControl
        v-model="form.city"
        placeholder="Your City"
      />
    </FormField>

    <FormField label="State">
      <FormControl
        v-model="form.state"
        :options="[{id: 0, label: 'AL'},
                    {id: 1, label: 'AK'},
                    {id: 2, label: 'AZ'},
                    {id: 3, label: 'AR'},
                    {id: 4, label: 'CA'},
                    ]"
      />
    </FormField>

    <FormField
      label="Zip"
    >
      <FormControl
        v-model="form.zip"
        placeholder="Your Zip"
      />
    </FormField>

    <FormField
      label="Country"
    >
      <FormControl
        v-model="form.country"
        placeholder="Your Country"
      />
    </FormField>

    <FormField
      label="Type"
      wrap-body
    >
      <FormCheckRadioPicker
        v-model="form.type"
        name="type"
        type="radio"

        :options="{ 'Mailing': 'Mailing', 'Billing': 'Billing', 'Location': 'Location', }"

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
