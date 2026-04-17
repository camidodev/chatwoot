<script>
import { useAdmin } from 'dashboard/composables/useAdmin';
import BackButton from '../../../components/widgets/BackButton.vue';

export default {
  components: {
    BackButton,
  },
  props: {
    headerTitle: {
      default: '',
      type: String,
    },
    icon: {
      default: '',
      type: String,
    },
    showBackButton: { type: Boolean, default: false },
    backUrl: {
      type: [String, Object],
      default: '',
    },
    backButtonLabel: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { isAdmin } = useAdmin();
    return {
      isAdmin,
    };
  },
  computed: {
    iconClass() {
      return `icon ${this.icon} header--icon`;
    },
  },
};
</script>

<template>
  <div
    class="flex justify-between items-center min-h-[5.5rem] px-10 pt-2 pb-6 bg-transparent"
  >
    <h1 class="flex items-center mb-0 text-n-slate-12">
      <BackButton
        v-if="showBackButton"
        :button-label="backButtonLabel"
        :back-url="backUrl"
        class="ltr:mr-4 rtl:ml-4"
      />

      <slot />
      <span class="text-[2rem] leading-[1.05] font-semibold tracking-[-0.03em] text-n-slate-12">
        {{ headerTitle }}
      </span>
    </h1>
  </div>
</template>
