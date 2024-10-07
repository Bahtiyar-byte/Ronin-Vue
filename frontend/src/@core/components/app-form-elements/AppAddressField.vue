<script lang="ts" setup>
import { toRaw } from 'vue'

defineOptions({
  name: 'AppTextField',
  inheritAttrs: false,
})

const addressData = {
  street: '',
  suite_apt_unit: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  is_mailing_address: true,
  is_location: true,
  is_billing_Address: true
}

const singleAddress = ref([addressData])

const attrs = useAttrs()

const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label
  const value = attrs.modelValue
  const label = attrs.label
  const rawArray = toRaw(value)
  if (rawArray?.length === 0 && label === 'Address') {
    attrs['onUpdate:modelValue'](singleAddress.value)
  } else {
    const rawArray = toRaw(value)
    for (const key in rawArray) {
      singleAddress.value[key] = rawArray[key]
    }
  }

  return _elementIdToken ? `app-contact-address-field-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}` : undefined
})

const emailTypeitems = [
  { title: 'Personal', value: 'personal' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
]

const label = computed(() => useAttrs().label as string | undefined)
const optionCounter = ref(1)

const addOneMoreEmail = () => {
  singleAddress.value.push({
    street: '',
    suite_apt_unit: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  })
  optionCounter.value++
  attrs['onUpdate:modelValue'](singleAddress.value)
}

const onUpdateValue = (index: number, newValue: string, fieldType: string) => {
  attrs['onUpdate:modelValue'](singleAddress.value)
}

const states = [
  'AL', 'AK', 'AZ', 'AR', 'AS', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const isBillingAddress = ref(true)
const handleIsBillingAddressChange = (billingAddressStatus: boolean) => {
  const addressDataForBillingAddress = {
    street: '',
    suite_apt_unit: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    is_mailing_address: false,
    is_location: true,
    is_billing_Address: true
  }

  if (billingAddressStatus){
    // singleAddress.value[1] = addressDataForBillingAddress
    singleAddress.value.splice(1, 1);
  }else{
    singleAddress.value[1] = addressDataForBillingAddress
  }


}
</script>

<template>
  <div
    class="app-text-field flex-grow-1"
    :class="$attrs.class"
  >
    <VLabel
      v-if="label"
      :for="elementId"
      class="mb-1 text-body-2 text-wrap"
      style="line-height: 15px;"
      :text="label"
    />
    <div style="">
      <!-- 👉 Variants -->

      <template
        v-for="(email, index) in singleAddress"
        :key="index"
      >
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <AppTextField
              v-bind="{
                ...$attrs,
                class: null,
                label: 'Phone',
                variant: 'outlined',
                id: elementId,
              }"
              label="Street"
              placeholder="Street"
              v-model="singleAddress[index].street"
              @update:model-value="onUpdateValue(i, $event, 'street')"
            >
              <template
                v-for="(_, name) in $slots"
                #[name]="slotProps"
              >
                <slot
                  :name="name"
                  v-bind="slotProps || {}"
                />
              </template>
            </AppTextField>
          </VCol>



          <VCol
            cols="4"
            md="4"
            class="d-flex flex-row align-self-end"
          >
            <AppTextField
              label="Suit/Apartment/Unit"
              placeholder="Suit/Apartment/Unit"
              v-model="singleAddress[index].suite_apt_unit"
              @update:model-value="onUpdateValue(i, $event, 'suite_apt_unit')"
            />
          </VCol>

          <VCol
            cols="4"
            md="4"
            class="d-flex flex-row align-self-end"
          >
            <AppTextField
              label="City"
              placeholder="City"
              v-model="singleAddress[index].city"
              @update:model-value="onUpdateValue(i, $event, 'city')"
            />
          </VCol>

          <VCol
            cols="4"
            md="4"
            class="d-flex flex-row align-self-end"
          >
            <AppSelect
              :items="states"
              v-model="singleAddress[index].state"
              @update:model-value="onUpdateValue(i, $event, 'state')"
              placeholder="State"
              label="State"
            />
          </VCol>

          <VCol
            cols="4"
            md="4"
            class="d-flex flex-row align-self-end"
          >
            <AppTextField
              label="Zip Code"
              placeholder="Zip Code"
              v-model="singleAddress[index].zip"
              @update:model-value="onUpdateValue(i, $event, 'zip')"
            />
          </VCol>

          <VCol
            cols="4"
            md="4"
            class="d-flex flex-row align-self-end"
          >
            <AppSelect
              :items="['USA']"
              @update:modelValue="onUpdateValue(i, $event, 'type')"
              placeholder="Country"
              label="Country"
              v-model="singleAddress[index].country"
              @update:model-value="onUpdateValue(i, $event, 'country')"
            />
          </VCol>

          <VCol
            cols="4"
            md="4"
            class="d-flex flex-row align-self-end"
            v-if="singleAddress[index].is_billing_Address === false"
          >
            <VCheckbox
              v-model="isBillingAddress"
              @change="handleIsBillingAddressChange(isBillingAddress)"
              label="Same as Mailing Address"
            />
          </VCol>
        </VRow>


      </template>

    </div>
  </div>
</template>
