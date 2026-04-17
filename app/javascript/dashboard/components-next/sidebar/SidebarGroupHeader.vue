<script setup>
import { computed } from 'vue';
import { useMapGetter } from 'dashboard/composables/store.js';
import Icon from 'next/icon/Icon.vue';

const props = defineProps({
  to: { type: [Object, String], default: '' },
  label: { type: String, default: '' },
  icon: { type: [String, Object], default: '' },
  expandable: { type: Boolean, default: false },
  isExpanded: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  hasActiveChild: { type: Boolean, default: false },
  getterKeys: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['toggle']);

const showBadge = useMapGetter(props.getterKeys.badge);
const dynamicCount = useMapGetter(props.getterKeys.count);
const count = computed(() =>
  dynamicCount.value > 99 ? '99+' : dynamicCount.value
);
</script>

<template>
  <component
    :is="to ? 'router-link' : 'div'"
    class="group/sidebar-header flex items-center gap-2.5 px-3 py-2 rounded-[10px] h-9 min-w-0 transition-all duration-150 ease-out"
    role="button"
    draggable="false"
    :to="to"
    :title="label"
    :class="{
      'text-n-slate-12 bg-[rgba(var(--sage-accent),0.38)] font-medium': isActive && !hasActiveChild,
      'text-n-slate-12 bg-[rgba(var(--sage-accent),0.22)]': hasActiveChild,
      'text-n-slate-11 hover:bg-[rgba(var(--sage-accent),0.12)]': !isActive && !hasActiveChild,
    }"
    @click.stop="emit('toggle')"
  >
    <div v-if="icon" class="relative flex items-center gap-2">
      <span
        class="grid place-content-center size-4 text-n-slate-10 transition-colors duration-150 ease-out"
        :class="{
          'text-n-slate-12': isActive || hasActiveChild,
        }"
      >
        <Icon v-if="icon" :icon="icon" class="size-4" />
      </span>
      <span
        v-if="showBadge"
        class="size-2 -top-px ltr:-right-px rtl:-left-px bg-n-black absolute rounded-full border border-n-solid-2"
      />
    </div>
    <div class="flex items-center gap-1.5 flex-grow min-w-0 flex-1">
      <span
        class="truncate"
        :class="{
          'text-[12.5px] font-medium tracking-[-0.005em]': true,
        }"
      >
        {{ label }}
      </span>
      <span
        v-if="dynamicCount && !expandable"
        class="rounded-full capitalize text-[10px] leading-5 font-medium text-center bg-[rgba(var(--sage-accent),0.5)] px-1.5 flex-shrink-0"
        :class="{
          'text-n-slate-12': isActive,
          'text-n-slate-11': !isActive,
        }"
      >
        {{ count }}
      </span>
    </div>
  </component>
</template>
