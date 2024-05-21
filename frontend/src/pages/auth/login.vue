<script setup lang="ts">
import { watch } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { useRouter } from 'vue-router'
import type LocalLoginRequest from '@/types/auth/LocalLoginRequest'
import { useAuth } from '@/composables/useAuth'
import {getResponseText} from "@/utils/api";

const router = useRouter()

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

const loading = ref(false)
const { login } = useAuth()
const errorText = ref('')

const onSubmit = handleSubmit(async (formValues: LocalLoginRequest) => {
  const { data, isFetching, response } = await login(formValues)

  watch(data, (newVal: any) => {
    useCookie('accessToken').value = newVal.toString()
    router.push({ name: 'root' })
  })

  watch(isFetching, newVal => {
    loading.value = newVal
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

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="w-full h-svh flex justify-center align-center">
    <VCard
      class="w-[100%] max-w-[400px] mx-5"
      title="Login page"
    >
      <VForm
        :disabled="loading"
        @submit.prevent="onSubmit"
      >
        <VCardText class="!pt-0">
          <VAlert
            v-show="errorText.length"
            type="error"
            title="Error occurred"
            :text="errorText"
            class="mb-4"
          />

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
            <RouterLink :to="{ name: 'root' }">
              Forgot Password?
            </RouterLink>
          </div>
        </VCardText>
        <VCardActions class="mx-2">
          <VBtn
            class="w-full"
            variant="elevated"
            type="submit"
            :loading="loading"
          >
            Login
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </div>
</template>
