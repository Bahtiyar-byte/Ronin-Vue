<script lang="ts" setup>
import { toRaw } from 'vue'

defineOptions({
  name: 'AppTextField',
  inheritAttrs: false,
})

const emailData = {
  email: '',
  type: '',
  is_primary: true,
}

const singleEmail = ref([emailData])

const attrs = useAttrs()

const elementId = computed(() => {
  // const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label

  const value = attrs.modelValue
  const label = attrs.label
  const rawArray = toRaw(value)
  if (rawArray?.length === 0 && label === 'Emails') {
    attrs['onUpdate:modelValue'](singleEmail.value)
  } else {
    const rawArray = toRaw(value)
    for (const key in rawArray) {
      singleEmail.value[key] = rawArray[key]
    }
  }

  return _elementIdToken ? `app-contact-emails-field-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}` : undefined
})

const emailTypeitems = [
  { title: 'Personal', value: 'personal' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
]

const label = computed(() => useAttrs().label as string | undefined)
const optionCounter = ref(1)

const addOneMoreEmail = () => {
  singleEmail.value.push({ email: '', type: '', is_primary: false })
  optionCounter.value++
  attrs['onUpdate:modelValue'](singleEmail.value)
}

const onUpdateValue = (index: number, newValue: string, fieldType: string) => {
  attrs['onUpdate:modelValue'](singleEmail.value)
}

const removeFromTable = (indexToRemove: number) => {
  singleEmail.value.splice(indexToRemove, 1)
  attrs['onUpdate:modelValue'](singleEmail.value)
}

const changeRadioValue = (index: number, isPrimary: boolean) => {
  singleEmail.value.forEach((email, i) => {
    email.is_primary = false
  })
  singleEmail.value[index].is_primary = isPrimary
  attrs['onUpdate:modelValue'](singleEmail.value)
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
        v-for="(email, index) in singleEmail"
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
                label: 'Email',
                variant: 'outlined',
                id: elementId,
              }"
              v-model="singleEmail[index].email"
              label="Email"
              @update:model-value="onUpdateValue(i, $event, 'email')"
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
              v-model="singleEmail[index].type"
              :items="[{ title: 'Personal', value: 'personal' }, { title: 'Work', value: 'work' }, { title: 'Other', value: 'other' }]"
              item-value="value"
              item-title="title"
              placeholder="Select Type"
              label="Type"
              @update:model-value="onUpdateValue(i, $event, 'type')"
            />
          </VCol>

          <!--          <VCol -->
          <!--            cols="12" -->
          <!--            md="4" -->
          <!--            class="d-flex align-self-end" -->
          <!--          > -->
          <!--            <VBtn -->
          <!--              icon="tabler-x" -->
          <!--              variant="text" -->
          <!--              color="secondary" -->
          <!--              :disabled="singleEmail.length <= 1" -->
          <!--              @click="removeFromTable(index)" -->
          <!--            /> -->
          <!--          </VCol> -->

          <VCol
            cols="4"
            md="4"
            class="d-flex flex-row align-self-end"
          >
            <VRow>
              <VCol md="8">
                <VRadioGroup v-model="singleEmail[index].is_primary">
                  <VRadio
                    v-if="singleEmail[index].is_primary"
                    label="Primary"
                    :value="true"
                    @click="changeRadioValue(index, false)"
                  />
                </VRadioGroup>
                <VRadioGroup v-model="singleEmail[index].is_primary">
                  <VRadio
                    v-if="!singleEmail[index].is_primary"
                    label="Primary"
                    :value="true"
                    @click="changeRadioValue(index, false)"
                  />
                </VRadioGroup>
              </VCol>

              <VCol md="4">
                <VBtn
                  icon="tabler-x"
                  variant="text"
                  color="secondary"
                  :disabled="singleEmail.length <= 1"
                  @click="removeFromTable(index)"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </template>

      <VBtn
        class="mt-6"
        variant="text"
        prepend-icon="tabler-plus"
        @click="addOneMoreEmail"
      >
        Add another email
      </VBtn>
    </div>
  </div>
</template>
