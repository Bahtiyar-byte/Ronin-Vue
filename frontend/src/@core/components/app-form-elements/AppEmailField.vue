<script lang="ts" setup>
defineOptions({
  name: 'AppTextField',
  inheritAttrs: false,
})

const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label
  // console.log('$attrs ', attrs)
  console.log('attrs ', attrs)
  return _elementIdToken ? `app-contact-emails-field-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}` : undefined
})

const emailTypeitems = [
  { title: 'Personal', value: 'personal' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
]
const label = computed(() => useAttrs().label as string | undefined)

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
    <div style="display:flex; flex-direction: row">
      <VTextField
        :onUpdate:modelValue="($event) => setup.value = $event"
        v-bind="{
        ...$attrs,
        class: null,
        label: undefined,
        variant: 'outlined',
        id: elementId,
      }"
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
      </VTextField>
      <VSelect
        :items="emailTypeitems"
        item-title="title"
        item-value="value"
        v-bind="{
        class: null,
        label: undefined,
        variant: 'outlined',
        id: elementId,
        menuProps: { contentClass: ['app-inner-list', 'app-select__content', 'v-select__content', $attrs.multiple !== undefined ? 'v-list-select-multiple' : ''] },
      }"
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
      </VSelect>
    </div>
  </div>
</template>
