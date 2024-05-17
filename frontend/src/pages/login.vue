<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

definePage({
  meta: {
    layout: 'blank',
  },
})

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string()
        .required('Email is required field.')
        .email('This field should contain email'),
      password: yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
      remember: yup.boolean().oneOf([true, false]),
    }),
  ),
})

const [email, emailAttrs] = defineField('email', {
  validateOnBlur: true,
})

const [password, passwordAttrs] = defineField('password', {
  validateOnBlur: true,
})

const [remember] = defineField('remember')

const onSubmit = handleSubmit(async (values: {
  email: string
  password: string
  remember?: boolean | undefined
}) => {
  console.log(values)
})

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="w-full h-svh flex justify-center align-center">
    <VCard
      class="w-[100%] max-w-[400px] mx-5"
      title="Login page"
    >
      <VForm @submit.prevent="onSubmit">
        <VCardText class="!pt-0">
          <VCol
            cols="12"
            class="!px-0 !pt-0"
          >
            <AppTextField
              v-model="email"
              autofocus
              label="Email"
              type="email"
              placeholder="johndoe@email.com"
              :error-messages="errors.email"
              v-bind="emailAttrs"
            />
          </VCol>
          <VCol
            cols="12"
            class="!px-0"
          >
            <AppTextField
              v-model="password"
              autofocus
              label="Password"
              placeholder="············"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
              v-bind="passwordAttrs"
              :error-messages="errors.password"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </VCol>
          <div class="d-flex align-center flex-wrap justify-space-between mt-2 -ml-2">
            <VCheckbox
              v-model="remember"
              label="Remember me"
            />
            <a
              class="text-primary ms-2 mb-1"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </VCardText>
        <VCardActions class="mx-2">
          <VBtn
            class="w-full"
            variant="tonal"
            type="submit"
          >
            Login
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </div>
</template>
