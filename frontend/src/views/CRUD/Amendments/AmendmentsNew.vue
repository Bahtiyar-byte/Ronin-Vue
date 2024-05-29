<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAmendmentsStore } from "@/stores/Amendments/amendments";
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

const amendmentsStore = useAmendmentsStore()
const router = useRouter();

const notification = computed(() => amendmentsStore.notify)
const titleStack = ref(['Admin', 'Amendments'])

        const optionsJobId = computed(() => amendmentsStore.searchResultJobId);

        const optionsCreatedBy = computed(() => amendmentsStore.searchResultCreatedBy);

const form = reactive({

      jobId: '',

      type: false,

      amount: '',

    description: '',

      createdBy: '',

})

onBeforeMount(async () => {

  await searchJobId();

  await searchCreatedBy();

})

const submit = async () => {
  try {

            form.jobId = form.jobId.id;

            form.type = form.type.label;

            form.createdBy = form.createdBy.id;

    await amendmentsStore.newItem({ ...form })
    router.push('/amendments');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.jobId = '';

        form.type = false;

        form.amount = '';

      form.description = '';

        form.createdBy = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchJobId(val) {
      await amendmentsStore.searchJobId(val);
    }

    async function searchCreatedBy(val) {
      await amendmentsStore.searchCreatedBy(val);
    }

watch(() => amendmentsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Amendments notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    amendmentsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Amendments</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Amendments"
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

    <FormField label="Type">
      <FormControl
        v-model="form.type"
        :options="[{id: 0, label: 'Change Order'},
                    {id: 1, label: 'Discount'},
                    {id: 2, label: 'Insurance Claim'},
                    {id: 3, label: 'Supplement'},
                    {id: 4, label: 'Upgrade'},
                    ]"
      />
    </FormField>

    <FormField
      label="Amount"
    >
      <FormControl
        type="number"
        v-model="form.amount"
        placeholder="Your Amount"
      />
    </FormField>

    <FormField
      label="Description"
    >
      <FormControl
        v-model="form.description"
        type="textarea"
        placeholder="Your Description"
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
