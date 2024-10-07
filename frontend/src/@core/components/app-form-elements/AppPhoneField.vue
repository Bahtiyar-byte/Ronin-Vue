<script lang="ts" setup>
import { toRaw } from 'vue'

defineOptions({
  name: 'AppTextField',
  inheritAttrs: false,
})

const phoneData = {
  phone_number: '',
  type: '',
  is_primary: false
}

const singlePhone = ref([phoneData])

const attrs = useAttrs()

const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label
  const value = attrs.modelValue
  const label = attrs.label
  const rawArray = toRaw(value)
  if (rawArray?.length === 0 && label === 'Phones') {
    attrs['onUpdate:modelValue'](singlePhone.value)
  } else {
    const rawArray = toRaw(value)
    for (const key in rawArray) {
      singlePhone.value[key] = rawArray[key]
    }
  }

  return _elementIdToken ? `app-contact-phones-field-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}` : undefined
})

const emailTypeitems = [
  { title: 'Personal', value: 'personal' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
]

const label = computed(() => useAttrs().label as string | undefined)
const optionCounter = ref(1)

const addOneMoreEmail = () => {
  singlePhone.value.push({ phone_number: '', type: '', is_primary: false })
  optionCounter.value++
  attrs['onUpdate:modelValue'](singlePhone.value)
}

const onUpdateValue = (index: number, newValue: string, fieldType: string) => {
  attrs['onUpdate:modelValue'](singlePhone.value)
}

const removeFromTable = (indexToRemove: number) => {
  singlePhone.value.splice(indexToRemove, 1)
  attrs['onUpdate:modelValue'](singlePhone.value)
}

const changeRadioValue = (index: number, isPrimary: boolean) => {
  singlePhone.value[index].is_primary = isPrimary
  attrs['onUpdate:modelValue'](singlePhone.value)
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
        v-for="(email, index) in singlePhone"
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
              v-model="singlePhone[index].phone_number"
              label="Phone"
              @update:model-value="onUpdateValue(i, $event, 'phone_number')"
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
            cols="12"
            md="4"
          >
            <AppSelect
              v-model="singlePhone[index].type"
              :items="[{ title: 'Mobile', value: 'mobile' }, { title: 'Home', value: 'home' }, { title: 'Work', value: 'work' }]"
              item-value="value"
              item-title="title"
              placeholder="Select Type"
              label="Type"
              @update:model-value="onUpdateValue(i, $event, 'type')"
            />
          </VCol>

          <VCol
            cols="4"
            md="4"
            class="d-flex flex-row align-self-end"
          >
            <VRow>

              <VCol md="8">
                <VRadioGroup v-model="singlePhone[index].is_primary">
                  <VRadio
                    v-if="singlePhone[index].is_primary"
                    label="Primary"
                    @click="changeRadioValue(index, false)"
                    :value="true"
                  />
                </VRadioGroup>
                <VRadioGroup v-model="singlePhone[index].is_primary">
                  <VRadio
                    v-if="!singlePhone[index].is_primary"
                    label="Primary"
                    @click="changeRadioValue(index, false)"
                    :value="true"
                  />
                </VRadioGroup>
              </VCol>

              <VCol md="4">
                <VBtn
                  icon="tabler-x"
                  variant="text"
                  color="secondary"
                  :disabled="singlePhone.length <= 1"
                  @click="removeFromTable(index)"
                />
              </VCol>

            </VRow>

          </VCol>
        </VRow>
      </template>

      <VBtn
        class="mt-6"
        prepend-icon="tabler-plus"
        @click="addOneMoreEmail"
      >
        Add another phone number
      </VBtn>
    </div>
  </div>
</template>
