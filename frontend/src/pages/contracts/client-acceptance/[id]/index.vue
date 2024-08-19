<script setup lang="ts">
import { type RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import type Contract from '@/types/contracts/Contract'

definePage({
  meta: {
    layout: 'blank',
    public: true,
  },
})

const route = useRoute() as RouteLocationNormalizedLoaded & { params: { id: string } }

const { getContractAcceptanceData, acceptContract } = usePublicApi()

const contractData = ref<Contract>()

const { data } = await getContractAcceptanceData(route.params.id)

watch(data, newVal => {
  contractData.value = newVal?.contract as Contract
}, { immediate: true })

const loading = ref<boolean>(false)

const acceptContractHandler = async () => {
  const { data: acceptanceData, isFetching: isAcceptanceFetching } = await acceptContract(route.params.id)

  watch(isAcceptanceFetching, newVal => {
    loading.value = newVal
  }, { immediate: true })

  watch(acceptanceData, newVal => {
    console.log(newVal)
  })
}
</script>

<template>
  <div class="misc-wrapper">
    <h1 class="text-3xl font-medium mb-5">
      Hello, dear {{ contractData?.related_contact.name }}
    </h1>
    <p class="text-xl text-center">
      Please, accept contract #{{ contractData?.id }}.
      <br>
      Add your sign and click "Accept" button.
    </p>

    <VForm
      class="flex flex-col mt-8 gap-y-5 items-center"
      @submit.prevent="acceptContractHandler"
    >
      <div class="flex items-center gap-x-3">
        Sign:

        <AppSignatureField class="w-36" />
      </div>

      <VBtn
        size="x-large"
        type="submit"
        :loading="loading"
      >
        Accept
      </VBtn>
    </VForm>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
