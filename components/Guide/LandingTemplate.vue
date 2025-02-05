<template>
  <div ref="container" class="base-container">
    <div
      class="w-full h-[200px] laptop:h-[320px] bg-no-repeat bg-cover relative laptop:flex justify-center"
      :class="
        data.type === 'repair'
          ? 'bg-repair'
          : data.type === 'repair-and-sell'
          ? 'bg-repair-and-sell'
          : data.type === 'instant-sell'
          ? 'bg-instant-sell'
          : data.type === 'sell-without-repair'
          ? 'bg-sell-without-repair'
          : ''
      "
    >
      <div class="bg-black bg-opacity-20 h-full w-full">
        <div
          class="gridClass flex h-full text-center laptop:text-start text-white py-4 laptop:py-12 flex-col gap-1"
        >
        <NuxtImg alt="coming soon" width="348" height="141" v-if="data.top.isComingSoon" src="/img/guide/coming-soon.webp" format="webp" :quality="100" class="w-[200px] laptop:w-[300px]" />
          <div
            class="font-static font-bold text-[32px] laptop:text-[68px]"
            v-text="data.top.title"
          />
          <h1
            class="text-[20px] laptop:text-[38px] laptop:max-w-[622px] font-medium"
            v-text="data.top.desc"
          />
        </div>
      </div>
    </div>
    <div class="gridClass my-8 laptop:hidden">
        <BaseBreadcrumb
          :dataArray="data.breadcrumbData"
          class="w-full"
        />
    </div>
    <div class="my-8 laptop:py-[60px] flex flex-col gap-8 laptop:gap-20">
      <template
        v-if="
          data.howWorks &&
          Array.isArray(data.howWorks) &&
          data.howWorks.length > 0
        "
      >
        <div
          v-for="item in data.howWorks"
          :key="item.id"
          class="flex gap-[60px] gridClass"
          :class="item.isReverse ? ' flex-row-reverse' : ''"
        >
          <div class="flex flex-grow flex-col justify-between gap-10">
            <div class="flex flex-col gap-10">
              <div
                class="font-static lowercase font-bold text-[40px] text-t8"
                v-text="item.title"
              />
              <div class="laptop:hidden">
                <NuxtImg alt="" width="2561" height="1440" format="webp" quality="100" :src="item.img" />
              </div>
              <div class="text-t7 text-xl" v-text="item.text" />
            </div>
            <div v-if="item?.button?.text && item?.button?.routeName" class="flex">
              <BaseButton
                :text="item.button.text"
                @click="$router.push({ name: item.button.routeName })"
              />
            </div>
          </div>
          <div
            class="hidden laptop:flex min-w-[48%] max-w-[48%] flex-col justify-center"
          >
            <NuxtImg alt="" width="2561" height="1440" format="webp" quality="100" :src="item.img" />
          </div>
        </div>
      </template>
      <template v-if="data.benefits">
        <div v-if="data.benefits.isLean" class="bg-p1 py-6 laptop:py-20">
          <div class="gridClass flex flex-col gap-10">
            <div
              class="font-static laptop:text-center lowercase text-p10 text-3xl font-bold"
              v-text="data.benefits.title"
            />
            <div class="grid grid-cols-1 laptop:grid-cols-2 gap-8 laptop:mx-10">
              <div
                v-for="item in data.benefits.childs"
                :key="item.id"
                class="flex gap-4 items-center"
              >
                <div>
                  <IconViewer :name="item.icon" class="h-6 w-6 laptop:w-[91px] laptop:h-[68px]" />
                </div>
                <div class="flex flex-col gap-6">
                  <div
                    v-if="item.title"
                    class="text-p9 laptop:text-2xl"
                    v-text="item.title"
                  />
                  <div v-if="item.text" class="text-t7" v-text="item.text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="gridClass flex flex-col gap-10">
          <div
            class="font-static lowercase text-p10 text-3xl font-bold"
            v-text="data.benefits.title"
          />
          <div class="grid grid-cols-1 laptop:grid-cols-2 gap-4 laptop:gap-10">
            <div
              v-for="item in data.benefits.childs"
              :key="item.id"
              class="bg-p1 p-6 laptop:p-10 flex gap-10 items-center flex-col laptop:flex-row"
            >
              <div
                class="flex gap-4 laptop:gap-10 items-center w-full laptop:w-fit"
              >
                <IconViewer
                  :name="item.icon"
                  class="h-6 w-6 laptop:w-[91px] laptop:h-[68px]"
                />
                <div
                  v-if="item.title"
                  class="text-p9 text-xl laptop:hidden"
                  v-text="item.title"
                />
              </div>
              <div class="flex flex-col gap-6">
                <div
                  v-if="item.title"
                  class="text-p9 text-2xl hidden laptop:block"
                  v-text="item.title"
                />
                <div v-if="item.text" class="text-t7" v-text="item.text" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template
        v-if="
          data.extraHowWorks &&
          Array.isArray(data.extraHowWorks) &&
          data.extraHowWorks.length > 0
        "
      >
        <div
          v-for="item in data.extraHowWorks"
          :key="item.id"
          class="flex gap-[60px] gridClass"
          :class="item.isReverse ? ' flex-row-reverse' : ''"
        >
          <div class="flex flex-grow flex-col justify-between gap-10">
            <div class="flex flex-col gap-10">
              <div
                class="font-static lowercase font-bold text-[40px] text-t8"
                v-text="item.title"
              />
              <div class="laptop:hidden">
                <NuxtImg alt="" width="2561" height="1440" format="webp" quality="100" :src="item.img" />
              </div>
              <div class="text-t7 text-xl" v-text="item.text" />
            </div>
            <div v-if="item?.button?.text && item?.button?.routeName" class="flex">
              <BaseButton
                :text="item.button.text"
                @click="$router.push({ name: item.button.routeName })"
              />
            </div>
          </div>
          <div
            class="hidden laptop:flex min-w-[48%] max-w-[48%] flex-col justify-center"
          >
            <NuxtImg alt="" width="2561" height="1440" format="webp" quality="100" :src="item.img" />
          </div>
        </div>
      </template>
      <div v-if="data.testimonials" class="flex flex-col gap-10 gridClass relative">
        <div
          class="font-static lowercase text-p10 text-3xl font-bold"
          v-text="data.testimonials.title"
        />
        <div class="flex gap-10 w-full overflow-x-auto "  id="itemsContainer"  ref="itemsContainer">
          <div
            v-for="(item, i) in data.testimonials.childs"
            :key="item.id"
            :id="`item-${i}`"
            class="p-10 flex flex-col border border-p2 gap-10 min-w-[280px] max-w-[280px] laptop:min-w-[500px] laptop:max-w-[500px]"
          >
            <div>
              <NuxtImg
                alt=""
                width="2478"
                height="1652"
                format="webp"
                quality="100"
                :src="item.img"
                class="w-full"
              />
            </div>
            <div class="flex flex-col gap-6">
              <div class="flex gap-5 items-center">
                <NuxtImg
                  alt=""
                  width="176"
                  height="176"
                  format="webp"
                  quality="100"
                  :src="item.profileImg"
                  class="rounded-full w-11 h-11"
                />
                <div class="text-t8 font-semibold text-xl" v-text="item.name" />
              </div>
              <div class="text-t7" v-text="item.text" />
            </div>
          </div>
          
           <div class="w-12 h-12 border border-p7 bg-white rounded-full  cursor-pointer absolute top-[24rem] left-5 flex justify-center items-center" @click="
                selectedSlider <= 0
                ? (selectedSlider = data.testimonials.childs.length - 1)
                : (selectedSlider = selectedSlider - 1)
                ">
              <IconCaretUpLight
              class="w-8 h-8 p-1.5 fill-p7 me-0.5"
              
            />
            </div>
              <div  class="w-12 h-12 border border-p7 bg-white rounded-full  cursor-pointer absolute top-[24rem] right-5 flex justify-center items-center" @click="
                  selectedSlider >= data.testimonials.childs.length - 1
                    ? (selectedSlider = 0)
                    : (selectedSlider = selectedSlider + 1)
                ">
              <IconCaretUpLight
                class="w-8 h-8 p-1.5 fill-p7 rotate-180 ms-0.5"
                
              />
              </div>
        </div>
      </div>
    </div>
    <HomeAppAd :customText="data.donwloadAppCustomText || null" />
  </div>
</template>

<script setup>
defineProps({
  data: Object,
  breadcrumbData: Object
});

const selectedSlider = ref(0)

watch(() => selectedSlider.value, (newVal, oldVal) => {
  const selectedItem = document.getElementById(`item-${newVal}`)
  const container = document.getElementById(`itemsContainer`)
  if(newVal === -1 || ((container.scrollWidth - container.clientWidth) - container.scrollLeft === 0) && oldVal < newVal){
      selectedSlider.value = 0
      container.scrollTo({left: 0, behavior: 'smooth'})
  }else{
    container.scrollTo({left: selectedItem?.offsetLeft - container?.offsetLeft, behavior: 'smooth'})
  }
})
</script>
