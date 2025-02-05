<template>
  <NuxtLayout name="header">
    <div class="w-full h-full overflow-x-hidden relative">
      <div class="gridClass">
        <div
          class="mt-16 mb-6 text-[28px] font-medium"
          v-text="$t('Account')"
        />
        <div class="hidden laptop:block">
          <BaseTab
            v-model="selectedTab"
            :data="tabData"
            class="mb-12 justify-center"
            noIcon
          />
        </div>
        <BaseBreadcrumb
          :dataArray="breadcrumbData"
          class="laptop:hidden mt-8"
        />

        <div class="flex flex-col gap-4 my-4 laptop:hidden mt-4">
          <BaseInputDropdown
            v-model="selectedTab"
            name="account"
            :options="tabData"
            @click="isAccountBottomSheetShow = true"
            isDisableMenu
          />
        </div>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
      <BaseBottomSheet
        class="laptop:hidden"
        :title="$t('Account')"
        :isShow="isAccountBottomSheetShow"
        @close="isAccountBottomSheetShow = false"
      >
        <template #body>
          <div class="flex flex-col gap-4 mt-6 w-full">
            <BaseBottomSheetRow
              v-for="tab in tabData"
              :key="tab.id"
              @click="selectTab(tab.value)"
              :text="tab.text"
              :icon="tab.icon"
              :route="tab.route"
            />
          </div>
        </template>
      </BaseBottomSheet>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  name: "account",
  layout: "header",
  middleware: ["auth"],
})

useHead({
  title: `Profile: Your LuxMax World`,
})

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const isAccountBottomSheetShow = ref(false)

const tabData = [
  {
    id: 0,
    value: 0,
    text: t("Account Info"),
    icon: "IconUser",
    routeName: "info",
  },
  {
    id: 1,
    value: 1,
    text: t("Bank Account"),
    icon: "IconCardHolder",
    routeName: "bank",
  },
  {
    id: 2,
    value: 2,
    text: t("My Items"),
    icon: "IconBookBookmark",
    routeName: "items",
  },
  {
    id: 3,
    value: 3,
    text: t("Order History"),
    icon: "IconShoppingBag",
    routeName: "purchase",
  },
  {
    id: 4,
    value: 4,
    text: t("Favorites"),
    icon: "favorite",
    routeName: "favorites",
  },
  {
    id: 5,
    value: 5,
    text: t("Instant Sales History"),
    icon: "IconCurrencyCircle",
    routeName: "sale",
  },
]

const selectedTab = ref(
  tabData.find((el) => el.routeName === route.name)?.value
)

const selectTab = (value) => {
  selectedTab.value = value
  isAccountBottomSheetShow.value = false
}

watch(
  () => route.name,
  (newVal) => {
    selectedTab.value = tabData.find((el) => el.routeName === newVal)?.value
  }
)

watch(
  () => selectedTab.value,
  (newVal) => {
    router.push({ name: tabData.find((el) => el.id === newVal)?.routeName })
  }
)

const breadcrumbData = computed(() => [
  {
    id: 0,
    text: t("Home"),
    action: () => {
      router.push({ name: "home" })
    },
  },
  {
    id: 1,
    text: t("Account"),
    action: () => {
      router.push({ name: "info" })
    },
  },
  {
    id: 2,
    text: tabData.find((el) => el.value === selectedTab.value)?.text,
    action: () => {},
  },
])
</script>
