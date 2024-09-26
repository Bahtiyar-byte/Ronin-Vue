<script lang="ts" setup>
import { watch } from 'vue'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { useAuth } from '@/composables/useAuth'

import type User from '@/types/users/User'
import type PasswordUpdateRequest from '@/types/auth/PasswordUpdateRequest'
import AppTextField from '@core/components/app-form-elements/AppTextField.vue'

import { getResponseText } from '@/utils/api'

const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const { updatePassword } = useAuth()

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      currentPassword: yup.string()
        .required('No current password provided.')
        .min(5, 'Current password is too short - should be 5 chars minimum.'),
      newPassword: yup.string()
        .required('No new password provided.')
        .min(8, 'New password is too short - should be 8 chars minimum.')
        .matches(/[a-z]/, 'New password must contain at least one lowercase letter.')
        .matches(/[A-Z]/, 'New password must contain at least one uppercase letter.')
        .matches(/\d/, 'The new password must contain at least one digit character.')
        .matches(/[@$!%*#?&.]/, 'New password must contain at least one special character (@ $ ! % * # ? & .).'),
      newPasswordConfirm: yup.string()
        .required('No password confirmation provided.')
        .oneOf([yup.ref('newPassword'), ''], 'Passwords must match'),
    }),
  ),
})

const [currentPassword, currentPasswordAttrs] = defineField('currentPassword', {
  validateOnBlur: true,
})

const [newPassword, newPasswordAttrs] = defineField('newPassword', {
  validateOnBlur: true,
})

const [newPasswordConfirm, newPasswordConfirmAttrs] = defineField('newPasswordConfirm', {
  validateOnBlur: true,
})

const formProcessing = ref(false)
const errorText = ref('')

const onSubmit = handleSubmit(async (values: PasswordUpdateRequest) => {
  formProcessing.value = true

  const { data, isFetching, response } = await updatePassword(values)

  watch(data, (newVal: User | null) => {
    // ToDo: We can update user in currentUser store right here
    console.log(newVal)
  })

  watch(isFetching, (newVal: boolean | null) => {
    formProcessing.value = newVal as boolean
  })

  watch(response, async (newVal: Response | null) => {
    if (newVal === null) {
      errorText.value = 'Unknown error occurred on login attempt'

      return
    } else if (newVal.ok || newVal.body === null) {
      return
    }

    errorText.value = await getResponseText(newVal)
  })
})
</script>

<template>
  <VCard
    title="Change password"
    subtitle=""
  >
    <VForm
      :disabled="formProcessing"
      @submit.prevent="onSubmit"
    >
      <VCardText>
        <VAlert
          variant="tonal"
          color="warning"
          title="Ensure that these requirements are met"
          class="mb-6 -mt-2"
        >
          <template #text>
            <ul class="list-disc pl-5">
              <li>Minimum 8 characters long</li>
              <li>Minimum one uppercase character</li>
              <li>Minimum one digit character</li>
              <li>Minimum one symbol character (@ $ ! % * # ? & .)</li>
            </ul>
          </template>
        </VAlert>
        <VAlert
          v-show="errorText.length"
          type="error"
          title="Error occurred"
          :text="errorText"
          class="mb-6"
        />

        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="currentPassword"
              v-bind="currentPasswordAttrs"
              label="Current Password"
              placeholder="············"
              :type="isCurrentPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isCurrentPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
              :error-messages="errors.currentPassword"
              @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="newPassword"
              v-bind="newPasswordAttrs"
              label="New Password"
              placeholder="············"
              :type="isNewPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
              :error-messages="errors.newPassword"
              @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-model="newPasswordConfirm"
              v-bind="newPasswordConfirmAttrs"
              label="Confirm Password"
              placeholder="············"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
              :error-messages="errors.newPasswordConfirm"
              @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions class="justify-end">
        <VBtn
          :loading="formProcessing"
          variant="flat"
          type="submit"
        >
          Change Password
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
