<template>

    <div class="background">
        <div class="content content-center items-center justify-center mobile-sss:pt-60 mobile-s:pt-40 mobile-m:pt-48 mobile-l:pt-60 tablet:pt-20">

            <div class="london-specialist mx-auto mobile-sss:mt-0 mobile-l:mt-4">
                <h1 class="w-full font-semibold mobile-ss:text-3xl text-3xl tablet:text-4xl laptop:text-6xl laptop:max-w-[50%] laptop:!leading-[76px] text-p1 flex flex-wrap justify-center mobile-sss:justify-center mobile-sss:text-center tablet:justify-start tablet:text-start">
                    <div class="w-fit mobile-sss:ml-0 tablet:ml-10">
                        <span class="font-extrabold block flex flex-wrap mobile-sss:justify-center tablet:justify-start">London</span>
                        <span class="font-extrabold block laptop:w-[750px]">Specialist Dry Cleaning</span>
                    </div>
                </h1>
            </div>
        
            <div class="15%off mx-auto mobile-sss:mt-32 mobile-m:mt-32 tablet:mt-8 m laptop-l:mt-20 obile-sss:text-center mobile-sss:ml-0 tablet:ml-10">
                <h3 class="w-full font-semibold mobile-sss:mt-10 mobile-l:mt-0 mobile-sss:text-2xl text-2xl laptop:text-3xl laptop:max-w-[50%] laptop:!leading-[50px] text-p1 flex flex-wrap mobile-sss:justify-center tablet:justify-start">
                    <div class="w-fit">
                        Get 
                        <span class="underline mr-2 ml-2 italic">15%</span>
                        off your first order
                    </div>
                </h3>
            </div>

            <div class="freePickupAndDelivery mobile-sss:mt-6 mobile-m:mt-12 laptop:mt-2 mobile-sss:ml-0 tablet:ml-10">
                <div class="flex w-full mobile-sss:justify-center tablet:justify-start">
                    <div class="w-fit flex items-center font-semibold mobile-sss:text-lg text-lg laptop:text-xl laptop:max-w-[50%] laptop:!leading-[50px] text-p1 backdrop-blur-sm">
                        Free Pickup & Delivery
                    </div>
                </div>
            </div>

            <div class="orderButton">
                <NuxtLink
                    :to="{ name: firstButton?.link }"
                    :id="secondButton?.id"
                    class="laptop:w-full mobile-sss:mt-8 laptop:mt-2 laptop-l:mt-20 px-2 laptop:px-6 flex items-center h-12 mobile-sss:justify-center tablet:justify-start mobile-sss:ml-0 tablet:ml-8 laptop:ml-2"
                >
                    <BaseButton 
                        text="Book Your First Order" 
                        size="m"
                    />
                </NuxtLink>
            </div>
        
        </div>
        <div class="color-bottom mobile-sss:visible tablet:invisible"></div>
    </div>
</template>

<script setup>

const props = defineProps({
    src: String,
    titleFirstLine: String,
    titleSecondLine: String,
    description: String,
    firstButton: Object,
    secondButton: Object,
});

// Reactive variables for image sources
const desktopImageSrc = '/img/DryCleaning/banner3.webp';
const mobileImageSrc = '/img/DryCleaning/HeroMobile.webp';


// Watch for changes in window width and update bgImageSrc accordingly
// watch(window.innerWidth, () => {
//   bgImageSrc.value = process.client ? (window.innerWidth >= 640 ? desktopImageSrc : mobileImageSrc) : '';
// });

// Reactive reference for background image source
const bgImageSrc = ref('');

// Update bgImageSrc on component mount and window resize
const updateBgImageSrc = () => {
  bgImageSrc.value = window.innerWidth >= 640 ? desktopImageSrc : mobileImageSrc;
};

// Call updateBgImageSrc on component mount
onMounted(() => {
    if(process.client) {
        updateBgImageSrc();
        window.addEventListener('resize', updateBgImageSrc);
    }
});

// Remove resize listener on component unmount
onUnmounted(() => {
    if(process.client) {
        window.removeEventListener('resize', updateBgImageSrc);
    }
});

// Adjust title styles based on screen width
const titleStyle = computed(() => ({
  width: '100%',
  fontWeight: '600',
  marginTop: window.innerWidth >= 640 ? '0' : '-20px', // Adjust margin-top based on screen width
  fontSize: window.innerWidth >= 640 ? '3rem' : '6rem', // Adjust font size based on screen width
  maxWidth: window.innerWidth >= 640 ? '50%' : '100%', // Adjust max width based on screen width
  textAlign: window.innerWidth >= 640 ? 'center' : 'left', // Adjust text alignment based on screen width
  lineHeight: window.innerWidth >= 640 ? '76px' : '50px', // Adjust line height based on screen width
}));

// Dynamic background image style based on computed bgImageSrc
const bgImageStyle = computed(() => ({
    background: `url(${bgImageSrc.value}) no-repeat center top`,
    backgroundSize: 'cover',
    backgroundColor: process.client ? window.innerWidth >= 640 ? 'white' : '#154033' : 'white',
    backgroundSize: process.client ? window.innerWidth < 400 ? 'cover' : 'cover' : 'cover',
    height: '100%',
    maxHeight: '733px',
    paddingBottom: process.client ? window.innerWidth >= 640 ? '0' : '10px' : '0', // Adjust margin-top based on screen width
}));

</script>

<style scoped>
@media (min-width: 768px) {
    .background {
      position: relative;
      width: 100vw;
      height: 50vh;
      background: 
        linear-gradient(to bottom, transparent 20%, rgba(0, 0, 0, 0.5) 75%, #154033 100%),
        url('/img/DryCleaning/banner3.webp') no-repeat center top;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .content {
        height: 60%;
    }

    .color-bottom {
      width: 100%;
      height: 15%;
      background-color: #154033;
      margin-top:-1px;
    }
}


@media (min-width: 1440px) {
    .background {
      position: relative;
      width: 100vw;
      height: 90vh;
      background: 
        linear-gradient(to bottom, transparent 20%, rgba(0, 0, 0, 0.5) 75%, #154033 100%),
        url('/img/DryCleaning/banner3.webp') no-repeat center top;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .content {
        height: 60%;
    }

    .color-bottom {
      width: 100%;
      height: 15%;
      background-color: #154033;
      margin-top:-1px;
    }
}

@media (min-width: 200px) and (max-width: 390px) {
    .background {
      position: relative;
      width: 100vw;
      height: 100vh;
      background: 
        linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 75%, #154033 100%),
        url('/img/DryCleaning/HeroMobile.webp') no-repeat center top;
      background-size: 100% 50%;
      background-repeat: no-repeat;
    }

    .content {
        height: 50%;
    }

    .color-bottom {
      width: 100%;
      height: 25%;
      background-color: #154033;
      margin-top:-1px;
    }
}


@media (min-width: 390px) and (max-width: 425px) {
    .background {
      position: relative;
      width: 100vw;
      height: 100vh;
      background: 
        linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 75%, #154033 100%),
        url('/img/DryCleaning/HeroMobile.webp') no-repeat center top;
      background-size: 100% 50%;
      background-repeat: no-repeat;
    }

    .content {
        height: 50%;
    }

    .color-bottom {
      width: 100%;
      height: 40%;
      background-color: #154033;
      margin-top:-1px;
    }
}


@media (min-width: 425px) and (max-width: 500px) {
    .background {
      position: relative;
      width: 100vw;
      height: 80vh;
      background: 
        linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 75%, #154033 100%),
        url('/img/DryCleaning/HeroMobile.webp') no-repeat center top;
      background-size: 100% 75%;
      background-repeat: no-repeat;
    }

    .content {
        height: 75%;
    }

    .color-bottom {
      width: 100%;
      height: 40%;
      background-color: #154033;
      margin-top:-1px;
    }
}


@media (min-width: 500px) and (max-width: 768px) {
    .background {
      position: relative;
      width: 100vw;
      height: 100vh;
      background: 
        linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 75%, #154033 100%),
        url('/img/DryCleaning/HeroMobile.webp') no-repeat center top;
      background-size: 100% 75%;
      background-repeat: no-repeat;
    }

    .content {
        height: 75%;
    }

    .color-bottom {
      width: 100%;
      height: 25%;
      background-color: #154033;
      margin-top:-1px;
    }
}
</style>
