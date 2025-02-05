<template>
  <div
    v-show="isShow"
    class="hidden laptop:flex flex-row justify-center absolute start-0 end-0 top-[90px] z-30"
  >
    <div class="bg-p1 flex gap-10 w-full base-container shadow-s-5">
      <div class="p-6 flex gap-6 justify-between flex-grow">
        <div v-for="item in menu" :key="item.id" class="min-w-[176px]">
          <div
            v-text="item.title"
            class="text-p8 pb-4 text-lg border-b border-t1 mb-7 font-bold font-title uppercase"
          />
          <ul class="text-t5 text-sm">
            <li v-for="child in item.childs" :key="child.id">
              <template v-if="!child.isComingSoon">
                <div
                  class="py-4 cursor-pointer"
                  v-text="child.label"
                  @click="goToRoute(child.route)"
                />
              </template>
              <template v-else>
                <div class="py-4 cursor-wait flex gap-3 items-center">
                  <div class="text-t3" v-text="child.label" />
                  <BaseBadge
                    size="s"
                    color="info"
                    class="cursor-wait"
                    :text="$t('Coming soon')"
                  />
                </div>
              </template>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="promotions" class="p-6 flex gap-6">
        <div v-for="item in promotions" :key="item.id" class="">
          <NuxtImg alt=""
            :src="item.img"
            class="w-full laptop:w-[280px] cursor-pointer"
            @click="goToRoute(item.route)"
          />
        </div>
      </div>
    </div>
  </div>
    <div
      v-show="isShow"
      @click.stop="() => {}"
      class="bg-white px-4 py-6 laptop:hidden inset-0 fixed w-full flex flex-col gap-6 justify-start h-full overflow-y-auto overflow-x-hidden z-30"
    >
      <div
        class="bg-white gridClass-mobile py-5 flex justify-between gap-3 items-center border-b border-t1"
      >
        <IconArrowLeftLight class="fill-t9 w-4 h-4" @click="$emit('close')" />
        <div class="text-lg text-black font-medium" v-text="$t('Market')" />
        <div class="w-4 h-4" />
      </div>
      <div class="flex flex-col gap-6 gridClass-mobile">
        <div v-if="promotions" class="flex gap-2 w-full">
          <div v-for="item in promotions" :key="item.id" class="w-full">
            <NuxtImg alt=""
              :src="item.img"
              class="w-full laptop:w-[280px] cursor-pointer"
              @click="goToRoute(item.route)"
            />
          </div>
        </div>
          <div class="flex flex-col gap-6 justify-between ">
            <div v-for="item in menu" :key="item.id" class=" border-b border-t1">
              <div
                v-text="item.title"
                class="text-p8 pb-4 text-lg mb-7 font-bold font-title uppercase"
              />
              <ul class="text-t5 text-sm">
                <li v-for="child in item.childs" :key="child.id">
                  <template v-if="!child.isComingSoon">
                    <div
                      class="py-4 cursor-pointer"
                      v-text="child.label"
                      @click="goToRoute(child.route)"
                    />
                  </template>
                  <template v-else>
                    <div class="py-4 cursor-wait flex gap-3 items-center">
                      <div class="text-t3" v-text="child.label" />
                      <BaseBadge
                        size="s"
                        color="info"
                        class="cursor-wait"
                        :text="$t('Coming soon')"
                      />
                    </div>
                  </template>
                </li>
              </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
defineProps({
  menu: Array,
  promotions: Array,
  isShow: Boolean,
});
const emits = defineEmits(["close"]);

const router = useRouter();

const goToRoute = (route) => {
  router.push(route);
  emits("close");
};
</script>
