<script setup lang="ts">
definePage({
  meta: {
    layout: 'blank',
  },
})

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="w-full h-svh flex justify-center align-center">
    <VCard
      class="w-[100%] max-w-[400px] mx-5"
      title="Login page"
    >
      <VForm>
        <VCardText class="!pt-0">
          <VCol
            cols="12"
            class="!px-0 !pt-0"
          >
            <AppTextField
              v-model="form.email"
              autofocus
              label="Email"
              type="email"
              placeholder="johndoe@email.com"
            />
          </VCol>
          <VCol
            cols="12"
            class="!px-0"
          >
            <AppTextField
              v-model="form.password"
              autofocus
              label="Password"
              placeholder="············"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </VCol>
          <div class="d-flex align-center flex-wrap justify-space-between mt-2 -ml-2">
            <VCheckbox
              v-model="form.remember"
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
