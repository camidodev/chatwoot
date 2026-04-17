<script>
export default {
  props: {
    heading: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: '',
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col min-w-[15rem] max-h-[21.25rem] max-w-[23.75rem] rounded-xl border border-solid overflow-hidden"
    :class="{
      'bg-n-background dark:bg-n-solid-2 border-n-weak shadow-[0_1px_2px_rgba(16,24,40,0.02)]': active,
      'border-n-weak': !active,
    }"
  >
    <div
      class="flex justify-between items-center rounded-t-xl px-3 w-full h-10 border-b border-solid"
      :class="{
        'bg-n-surface-1 border-n-weak': active,
        'bg-n-slate-2 border-n-weak': !active,
      }"
    >
      <div class="flex items-center p-1 text-sm font-medium">{{ heading }}</div>
      <fluent-icon
        v-if="active"
        icon="checkmark-circle"
        type="solid"
        size="24"
        class="text-n-slate-12"
      />
    </div>
    <div
      class="text-n-slate-11 text-xs leading-[1.4] px-3 pt-3 pb-0 text-start"
    >
      {{ content }}
    </div>
    <div v-if="src" class="p-3">
      <img
        :src="src"
        class="border rounded-md"
        :class="active ? 'border-n-weak' : 'border-n-weak'"
      />
    </div>
    <slot v-else />
  </div>
</template>
