<script setup>
import Spinner from 'shared/components/Spinner.vue';

defineProps({
  header: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  loadingMessage: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div
    class="flex flex-col m-0 px-6 py-6 rounded-[24px] flex-grow text-n-slate-12 border border-[rgba(var(--slate-12),0.06)] bg-white min-h-[10rem] shadow-[0_10px_28px_rgba(15,23,42,0.035)]"
  >
    <div
      class="card-header grid w-full mb-6 grid-cols-[repeat(auto-fit,minmax(max-content,50%))] gap-y-3 items-start"
    >
      <slot name="header">
        <div class="flex items-center gap-2 flex-row">
          <h5 class="mb-0 text-n-slate-12 font-semibold text-[15px] tracking-[-0.01em]">
            {{ header }}
          </h5>
          <span
            class="flex flex-row items-center py-1 px-2 rounded-full bg-[rgba(var(--sage-accent),0.28)] text-xs"
          >
            <span
              class="bg-n-slate-12 h-1.5 w-1.5 rounded-full mr-1 rtl:mr-0 rtl:ml-0"
            />
            <span class="text-[11px] text-n-slate-12 font-medium">
              {{ $t('OVERVIEW_REPORTS.LIVE') }}
            </span>
          </span>
        </div>
        <div class="flex flex-row items-center justify-end gap-2">
          <slot name="control" />
        </div>
      </slot>
    </div>
    <div
      v-if="!isLoading"
      class="card-body max-w-full w-full ml-auto mr-auto justify-between flex"
    >
      <slot />
    </div>
    <div
      v-else-if="isLoading"
      class="items-center flex text-base justify-center gap-3 px-12 py-8 text-n-slate-10"
    >
      <Spinner />
      <span class="text-n-slate-10">
        {{ loadingMessage }}
      </span>
    </div>
  </div>
</template>
