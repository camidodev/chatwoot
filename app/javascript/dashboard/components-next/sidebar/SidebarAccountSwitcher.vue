<script setup>
import { computed } from 'vue';
import { useAccount } from 'dashboard/composables/useAccount';
import { useMapGetter } from 'dashboard/composables/store';
import { useI18n } from 'vue-i18n';
import ButtonNext from 'next/button/Button.vue';
import Icon from 'next/icon/Icon.vue';

import {
  DropdownContainer,
  DropdownBody,
  DropdownSection,
  DropdownItem,
} from 'next/dropdown-menu/base';

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['showCreateAccountModal']);

const { t } = useI18n();
const { accountId, currentAccount } = useAccount();
const currentUser = useMapGetter('getCurrentUser');
const globalConfig = useMapGetter('globalConfig/get');

const userAccounts = useMapGetter('getUserAccounts');

const showAccountSwitcher = computed(
  () => userAccounts.value.length > 1 && currentAccount.value.name
);

const sortedCurrentUserAccounts = computed(() => {
  return [...(currentUser.value.accounts || [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
});

const workspaceInitials = computed(() => {
  const name = currentAccount.value?.name || 'W';
  const words = name
    .split(' ')
    .map(word => word.trim())
    .filter(Boolean)
    .slice(0, 2);

  return words.map(word => word[0]?.toUpperCase()).join('') || 'W';
});

const onChangeAccount = newId => {
  const accountUrl = `/app/accounts/${newId}/dashboard`;
  window.location.href = accountUrl;
};

const emitNewAccount = () => {
  emit('showCreateAccountModal');
};
</script>

<template>
  <DropdownContainer>
    <template #trigger="{ toggle, isOpen }">
      <!-- Collapsed view: Logo trigger -->
      <button
        v-if="isCollapsed"
        class="grid flex-shrink-0 place-content-center size-10 rounded-[10px] cursor-pointer transition-all duration-150 ease-out bg-n-black text-white hover:opacity-95"
        :class="{ 'ring-2 ring-n-slate-4': isOpen }"
        :title="currentAccount.name"
        @click="toggle"
      >
        <span class="text-sm font-semibold leading-none">
          {{ workspaceInitials }}
        </span>
      </button>
      <!-- Expanded view: Account name trigger -->
      <button
        v-else
        id="sidebar-account-switcher"
        :data-account-id="accountId"
        aria-haspopup="listbox"
        aria-controls="account-options"
        class="flex items-center gap-3 justify-between w-full rounded-[14px] px-2.5 py-2 transition-all duration-150 ease-out bg-white border border-[rgba(var(--slate-12),0.06)]"
        :class="[
          isOpen && 'bg-white border-[rgba(var(--slate-12),0.1)]',
          showAccountSwitcher
            ? 'hover:border-[rgba(var(--slate-12),0.1)] cursor-pointer'
            : 'cursor-default',
        ]"
        @click="() => showAccountSwitcher && toggle()"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="grid flex-shrink-0 place-content-center size-9 rounded-[10px] bg-n-black text-white"
          >
            <span class="text-xs font-semibold leading-none">
              {{ workspaceInitials }}
            </span>
          </div>
          <div class="min-w-0 text-left rtl:text-right">
            <div class="text-[9px] font-semibold uppercase tracking-[0.12em] text-n-slate-9">
              Workspace
            </div>
            <span
              class="block text-[14px] font-semibold leading-5 text-n-slate-12 truncate tracking-[-0.01em]"
              aria-live="polite"
            >
              {{ currentAccount.name }}
            </span>
          </div>
        </div>

        <span
          v-if="showAccountSwitcher"
          aria-hidden="true"
          class="i-lucide-chevron-down size-4 text-n-slate-10 flex-shrink-0"
        />
      </button>
    </template>
    <DropdownBody
      v-if="showAccountSwitcher || isCollapsed"
      class="min-w-80 z-50"
    >
      <DropdownSection :title="t('SIDEBAR_ITEMS.SWITCH_ACCOUNT')">
        <DropdownItem
          v-for="account in sortedCurrentUserAccounts"
          :id="`account-${account.id}`"
          :key="account.id"
          class="cursor-pointer"
          @click="onChangeAccount(account.id)"
        >
          <template #label>
            <div
              :for="account.name"
              class="text-left rtl:text-right flex gap-2 items-center"
            >
              <div
                class="grid place-content-center size-7 rounded-xl bg-n-slate-2 text-n-slate-12 text-xs font-semibold flex-shrink-0"
              >
                {{ account.name.slice(0, 1).toUpperCase() }}
              </div>
              <span
                class="text-n-slate-12 max-w-36 truncate min-w-0"
                :title="account.name"
              >
                {{ account.name }}
              </span>
              <div class="flex-shrink-0 w-px h-3 bg-n-strong" />
              <span
                class="text-n-slate-11 max-w-24 truncate capitalize"
                :title="account.name"
              >
                {{
                  account.custom_role_id
                    ? account.custom_role.name
                    : account.role
                }}
              </span>
            </div>
            <Icon
              v-show="account.id === accountId"
              icon="i-lucide-check"
              class="text-n-teal-11 size-5"
            />
          </template>
        </DropdownItem>
      </DropdownSection>
      <DropdownItem v-if="globalConfig.createNewAccountFromDashboard">
        <ButtonNext
          color="slate"
          variant="faded"
          class="w-full"
          size="sm"
          @click="emitNewAccount"
        >
          {{ t('CREATE_ACCOUNT.NEW_ACCOUNT') }}
        </ButtonNext>
      </DropdownItem>
    </DropdownBody>
  </DropdownContainer>
</template>
