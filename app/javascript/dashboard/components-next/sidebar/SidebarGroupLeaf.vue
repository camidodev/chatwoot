<script setup>
import { isVNode, computed } from 'vue';
import Icon from 'next/icon/Icon.vue';
import Policy from 'dashboard/components/policy.vue';
import { useSidebarContext } from './provider';

const props = defineProps({
  label: { type: String, required: true },
  to: { type: [String, Object], required: true },
  icon: { type: [String, Object], default: null },
  active: { type: Boolean, default: false },
  component: { type: Function, default: null },
});

const { resolvePermissions, resolveFeatureFlag } = useSidebarContext();

const shouldRenderComponent = computed(() => {
  return typeof props.component === 'function' || isVNode(props.component);
});
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <Policy
    :permissions="resolvePermissions(to)"
    :feature-flag="resolveFeatureFlag(to)"
    as="li"
    class="py-0.5 ltr:pl-2.5 rtl:pr-2.5 rtl:mr-3 ltr:ml-5 relative text-n-slate-11 child-item before:bg-[rgba(var(--sage-accent),0.7)] after:bg-transparent after:border-[rgba(var(--sage-accent),0.7)] before:left-0 rtl:before:right-0 min-w-0"
  >
    <component
      :is="to ? 'router-link' : 'div'"
      :to="to"
      :title="label"
      class="flex h-8 items-center gap-2 px-3 py-1.5 rounded-[10px] hover:bg-[rgba(var(--sage-accent),0.14)] group min-w-0 transition-all duration-150 ease-out"
      :class="{
        'text-n-slate-12 bg-[rgba(var(--sage-accent),0.24)] active': active,
      }"
    >
      <component
        :is="component"
        v-if="shouldRenderComponent"
        :label
        :icon
        :active
      />
      <template v-else>
        <span v-if="icon" class="size-4 grid place-content-center rounded-full text-n-slate-10">
          <Icon :icon="icon" class="size-4 inline-block" />
        </span>
        <div class="flex-1 truncate min-w-0 text-[12px] font-medium tracking-[-0.005em]">
          {{ label }}
        </div>
      </template>
    </component>
  </Policy>
</template>
