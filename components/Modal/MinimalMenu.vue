<template>
  <div
    v-show="isShow"
    class="hidden laptop:flex flex-row justify-center absolute top-[90px] z-10"
  >
    <div class="flex justify-center w-full base-container">
      <div class="bg-white flex flex-col gap-6 p-6 shadow-s-5">
        <div
          v-for="item in menu"
          :key="item.id"
          class="w-[280px] cursor-pointer relative flex flex-row gap-6 bg-p1 px-4 py-3 rounded-md"
          @click.stop="goToRoute(item.route)"
        >
          <div class="flex justify-center items-center">
            <div class="rounded-full bg-p2 p-3">
              <IconViewer :name="item.iconName" class="w-8 h-8 fill-p7" />
            </div>
          </div>
          <div class="w-full flex flex-col gap-2 justify-center text-start">
            <div
              class="text-t9 font-medium text-lg cursor-pointer"
              v-text="item.title"
            />
            <div
              v-if="item.moreText"
              class="underline underline-offset-4 text-p7 w-fit first-letter:capitalize"
              v-text="item.moreText"
              @click.stop="goToRoute(item.moreRoute)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <BaseBottomSheet isMobileOnly :isShow="isShow" @close="$emit('close')">
    <template #body>
        <div class="flex flex-col gap-6 w-full">
          <div
          v-for="item in menu"
          :key="item.id"
          class="w-full cursor-pointer relative flex flex-row gap-6 bg-p1 px-4 py-3 rounded-md"
          @click.stop="goToRoute(item.route)"
        >
          <div class="flex justify-center items-center">
            <div class="rounded-full bg-p2 p-3">
              <IconViewer :name="item.iconName" class="w-8 h-8 fill-p7" />
            </div>
          </div>
          <div class="w-full flex flex-col gap-2 justify-center text-start">
            <div
              class="text-t9 font-medium text-lg cursor-pointer"
              v-text="item.title"
            />
            <div
              v-if="item.moreText"
              class="underline underline-offset-4 text-p7 w-fit first-letter:capitalize"
              v-text="item.moreText"
              @click.stop="goToRoute(item.moreRoute)"
            />
          </div>
        </div>
        </div>
    </template>
  </BaseBottomSheet>
</template>

<script setup>
defineProps({
  menu: Array,
  isShow: Boolean,
});
const emits = defineEmits(["close"]);

const router = useRouter();

const goToRoute = (route) => {
  router.push({ name: route });
  emits("close");
};
</script>
