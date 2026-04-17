<script setup>
import Icon from 'next/icon/Icon.vue';

defineProps({
  label: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div
    class="flex items-center gap-2 px-3 py-2 rounded-[10px] h-8 text-n-slate-10 select-none pointer-events-none"
  >
    <span
      v-if="icon"
      class="grid place-content-center size-4 text-n-slate-9"
    >
      <Icon :icon="icon" class="size-3.5" />
    </span>
    <span class="text-[9px] font-semibold uppercase tracking-[0.12em] leading-5 flex-grow">
      {{ label }}
    </span>
  </div>
</template>
