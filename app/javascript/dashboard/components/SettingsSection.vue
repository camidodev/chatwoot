<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    showBorder: {
      type: Boolean,
      default: true,
    },
    note: {
      type: String,
      default: '',
    },
  },
};
</script>

<template>
  <div
    class="ml-0 mr-0 py-10 w-full"
    :class="{
      'border-b border-solid border-[rgba(var(--slate-12),0.06)] dark:border-n-weak': showBorder,
    }"
  >
    <div class="grid grid-cols-1 lg:grid-cols-8 gap-8 items-start">
      <div class="col-span-2">
        <p v-if="title" class="text-[1.1rem] text-n-slate-12 mb-0 font-semibold tracking-[-0.015em]">
          {{ title }}
        </p>
        <p class="text-sm mb-2 text-n-slate-10 leading-6 tracking-normal mt-2 max-w-sm">
          <slot v-if="subTitle" name="subTitle">
            {{ subTitle }}
          </slot>
        </p>
        <p v-if="note">
          <span class="font-semibold">{{ $t('INBOX_MGMT.NOTE') }}</span>
          {{ note }}
        </p>
      </div>
      <div
        class="col-span-6 xl:col-span-5 bg-white rounded-[24px] border border-[rgba(var(--slate-12),0.06)] px-6 py-6 shadow-[0_8px_24px_rgba(15,23,42,0.035)]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
