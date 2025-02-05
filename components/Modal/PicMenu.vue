<template>
  <div
    v-show="isShow"   
    class="hidden laptop:flex flex-row justify-center absolute top-[90px] z-10  end-0"
  >
    <div class="flex justify-center w-full base-container">
      <div class="bg-p1 flex gap-6 p-6 shadow-s-5">
          <div v-for="item in menu" :key="item.id" class="w-[400px] cursor-pointer relative" @click.stop="goToRoute(item.route)" >
              <NuxtImg alt="" format="webp" class="w-full" :src="item.img" />
              <div class="w-full flex flex-col gap-3 absolute bottom-0 items-center p-6 pt-10">
                  <div class="font-title text-3xl uppercase cursor-pointer" v-text="item.title" />
                  <div class=" underline underline-offset-4 text-xl" v-text="$t('More')" @click.stop="goToRoute(item.moreRoute)" />
              </div>
          </div>
      </div>
    </div>
  </div>
  <BaseBottomSheet
      isMobileOnly
      :isShow="isShow"
      @close="$emit('close')"
    >
      <template #body>
        <div class="">
          <div class="flex flex-col gap-6">
            <div v-for="item in menu" :key="item.id" class="cursor-pointer relative" @click.stop="goToRoute(item.route)" >
                <NuxtImg alt="" format="webp" class="w-full" :src="item.img" />
                <div class="w-full flex flex-col gap-3 absolute bottom-0 items-center p-6 pt-10">
                    <div class="font-title text-3xl uppercase cursor-pointer" v-text="item.title" />
                    <div class=" underline underline-offset-4 text-xl" v-text="$t('More')" @click.stop="goToRoute(item.moreRoute)" />
                </div>
            </div>
          </div>
        </div>
      </template>
    </BaseBottomSheet>
</template>

<script setup>
defineProps({
  menu: Array,
  isShow: Boolean
});
const emits = defineEmits(['close'])

const router = useRouter()

const goToRoute = (route) => {
  router.push(route)
  emits('close')
}
</script>
