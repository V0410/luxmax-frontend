<template>
  <div class="flex flex-col gap-12 items-center laptop:max-w-[672px] pb-12">
    <div
      v-text="$t('Upload More Photos')"
      class="text-center text-[28px] text-p8"
    />
    <div
      v-text="
        $t(
          'We highly recommend uploading additional pictures of your product here. It will help showcase your item and increase its chances of selling.'
        )
      "
      class="text-center text-p8 font-normal leading-6"
    />
    <div
      class="w-full flex flex-col justify-center laptop:flex-row gap-4 laptop:gap-10"
    >
      <RepairImageStep
        v-for="(step, i) in additionalImages"
        :id="step.id"
        :key="step.id"
        :text="step.text"
        :isOptional="step.optional"
        :number="i + 1"
        :img="images[step.id]"
        :isCurrent="currentStep.id === step.id"
        :cantDelete="i == 0 ? true : false"
        @delete="deleteImage"
        @uploadImage="uploadClicked"
      />
    </div>
    <div
      class="flex gap-4 w-full justify-center [&>*]:w-full laptop:[&>*]:w-[120px]"
    >
      <BaseButton
        buttonId="identify-back-additional-image"
        styleType="outlined"
        :text="$t('Back')"
        :isDisabled="isLoading"
        @click="$emit('back')"
      />
      <BaseButton
        buttonId="identify-select-additional-image"
        :text="$t('Next')"
        @click="uploadImages"
        :isLoading="isLoading"
        :isDisabled="!additionalImages.every((el) => images[el.id])"
      />
    </div>
    <input
      type="file"
      ref="imageInput"
      class="hidden"
      accept="image/jpeg, image/png"
      @change="uploadFile"
    />
  </div>
</template>

<script setup>
import Compressor from "compressorjs";

const props = defineProps({
  additionalImages: Array,
});
const emits = defineEmits(["next"]);
const route = useRoute();
const { t } = useI18n();
const isLoading = ref(false);

const { product, editProduct, file } = useItem();
const { data: productDetail } = await product(route.params.id);

const images = reactive({});
const imageInput = ref();
const maximumImageSizeInMB = 5;
const minimumImageSizeInMB = 0.02;

const currentStep = computed(
  () => props.additionalImages.find((el) => !images[el.id]) || { id: "confirm" }
);

props.additionalImages.forEach((el) => {
  images[el.id] = null;
});

const uploadClicked = () => {
  imageInput.value.click();
};

const addPhoto = (photo) => {
  if (photo?.type !== "image/jpeg" && photo?.type !== "image/png") {
    const { create } = useToast();
    create({
      id: Math.random(),
      type: "danger",
      title: t("Your image format is not supported"),
      desc: t("We just support PNG and JPG."),
      noClose: true,
      time: 5,
    });
  } else if (+photo.size > +maximumImageSizeInMB * 1024 * 1024) {
    const { create } = useToast();
    create({
      id: Math.random(),
      type: "danger",
      title: t(
        `Your image exceeds the size limit of ${maximumImageSizeInMB} MB.`
      ),
      noClose: true,
      time: 5,
    });
  } else if (+photo.size < +minimumImageSizeInMB * 1024 * 1024) {
    const { create } = useToast();
    create({
      id: Math.random(),
      type: "danger",
      title: t(
        `Images must be at least ${minimumImageSizeInMB * 1000} KB in size.`
      ),
      noClose: true,
      time: 5,
    });
  } else {
    new Compressor(photo, {
      quality: 0.6,
      maxHeight: 1200,
      maxWidth: 1200,
      mimeType: "image/jpeg",
      success(result) {
        images[currentStep.value.id] = new File([result], result?.name, {
          type: "image/jpeg",
        });
      },
      error(err) {},
    });
  }
  imageInput.value.value = null;
};

const uploadFile = () => {
  addPhoto(imageInput.value.files[0]);
};

const deleteImage = (id) => {
  if (!props.imageUploadLoading) {
    images[id] = null;
    imageInput.value.value = null;
  }
};

const uploadImages = async () => {
  isLoading.value = true;
  let files = [];
  Object.keys(images).forEach(async (key) => {
    const formFile = new FormData();
    formFile.append("file", images[key]);
    const { data, error } = await file({ body: formFile });
    let type = "";
    if (
      props.additionalImages[key - 1].text == "Front" ||
      props.additionalImages[key - 1].text == "Side" ||
      props.additionalImages[key - 1].text == "Lable"
    ) {
      type = props.additionalImages[key - 1].text.toUpperCase();
    } else {
      type = "ETC";
    }
    if (data.value) {
      files.push({ type: type, fileId: data.value.id });
    }
    if (files.length == 5) {
      const { data, error } = await editProduct(route.params.id, {
        body: { images: files },
      });
      if (!error.value) {
        emits("next");
      } else {
        isLoading.value = false;
      }
    }
  });
};
</script>
