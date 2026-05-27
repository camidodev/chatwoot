<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useWindowSize } from '@vueuse/core';
import { useMapGetter } from 'dashboard/composables/store';
import Logo from 'next/icon/Logo.vue';
import SidebarAccountSwitcher from 'dashboard/components-next/sidebar/SidebarAccountSwitcher.vue';
import SidebarProfileMenu from 'dashboard/components-next/sidebar/SidebarProfileMenu.vue';
import {
  dashboardLayoutSidebarWidth,
  COLLAPSED_THRESHOLD,
} from 'dashboard/components-next/sidebar/provider';

defineEmits(['showCreateAccountModal', 'openKeyShortcutModal']);

const { t } = useI18n();
const { width: windowWidth } = useWindowSize();
const globalConfig = useMapGetter('globalConfig/get');

const isMobile = computed(() => windowWidth.value < 768);

const headerLeftColumnStyle = computed(() => ({
  width: `${dashboardLayoutSidebarWidth.value}px`,
}));

const isHeaderAccountCollapsed = computed(
  () => !isMobile.value && dashboardLayoutSidebarWidth.value < COLLAPSED_THRESHOLD
);

const logoMarkClass = computed(() =>
  globalConfig.value?.logoThumbnail
    ? 'size-full object-cover'
    : 'size-[1.125rem] brightness-0 invert opacity-[0.98]'
);

const DOCS_URL = '';

const iconLinkClass =
  'grid place-content-center rounded-lg size-9 text-n-slate-11 outline-none transition-colors hover:bg-n-alpha-2 dark:hover:bg-n-alpha-1';
</script>

<template>
  <header
    class="flex z-50 flex-shrink-0 items-center w-full h-14 min-h-14 border-n-weak  dark:bg-n-background"
  >
    <div
      class="flex flex-shrink-0 gap-2 items-center px-2 min-w-0 h-full"
      :style="headerLeftColumnStyle"
    >
      <template v-if="isHeaderAccountCollapsed">
        <SidebarAccountSwitcher
          is-collapsed
          @show-create-account-modal="$emit('showCreateAccountModal')"
        />
      </template>
      <template v-else>
        <div
          class="flex flex-shrink-0 justify-center items-center overflow-hidden size-8 rounded-full bg-n-teal-9"
          aria-hidden="true"
        >
          <Logo :class="logoMarkClass" />
        </div>
        <SidebarAccountSwitcher
          class="min-w-0 flex-1"
          variant="header"
          @show-create-account-modal="$emit('showCreateAccountModal')"
        />
      </template>
    </div>
    <div
      class="flex flex-1 flex-shrink-0 gap-0.5 justify-end items-center md:gap-1 pr-4 min-w-0 md:pr-6 pl-2 h-full"
    >
      <RouterLink
        :to="{ name: 'search' }"
        :class="iconLinkClass"
        :title="t('COMBOBOX.SEARCH_PLACEHOLDER')"
      >
        <span class="i-lucide-search size-5" />
      </RouterLink>
      <a
        href="mailto:support@custio.io"
        :class="iconLinkClass"
        :title="t('SIDEBAR_ITEMS.DOCS')"
      >
        <span class="i-lucide-circle-help size-5" aria-hidden="true" />
      </a>
      <div
        class="flex-shrink-0 mx-2 w-px h-5 bg-n-strong opacity-60"
        aria-hidden="true"
      />
      <SidebarProfileMenu
        header-layout
        @open-key-shortcut-modal="$emit('openKeyShortcutModal')"
      />
    </div>
  </header>
</template>
