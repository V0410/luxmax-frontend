<template>
    <div>
      <button
        v-if="!fakeButton"
        @click.stop="isDisabled || isLoading ? () => {} : $emit('click')"
        :disabled="isDisabled || isLoading"
        :type="type || `submit`"
        :id="buttonId"
        class="flex flex-row items-center justify-center whitespace-nowrap w-full rounded-full"
        :class="[
          styleType === 'fill'
            ? 'bg-[#7E3A4F] text-p1 fill-p1 hover:bg-p8 active:bg-p7 visited:bg-p8 disabled:bg-p4 disabled:text-p2 disabled:fill-p2'
            : styleType === 'outlined'
            ? 'text-p7 fill-p7 border border-p7 hover:bg-p2 hover:text-p8 hover:fill-p8 hover:border-p8 active:bg-p2 active:text-p8 active:fill-p8 active:border-p8 visited:bg-p3 visited:border-p9  disabled:bg-p1 disabled:text-p3 disabled:fill-p3 disabled:border-p3'
            : styleType === 'text'
            ? 'text-p7 fill-p7 hover:text-p8 hover:fill-p8 disabled:text-p3 disabled:fill-p3'
            : '',
          size === 'l'
            ? 'laptop:text-lg laptop:font-medium px-4 laptop:px-12 h-12 laptop:h-14'
            : size === 'm'
            ? 'text-base px-7 h-12'
            : size === 's'
            ? 'text-sm px-4 h-10'
            : '',
          isDisabled ? 'cursor-not-allowed' : isLoading ? 'cursor-wait' : '',
          classes,
        ]"
      >
        <template v-if="!isLoading">
          <IconViewer
            v-if="startIcon"
            :name="startIcon"
            class="me-2"
            :class="[
              rotateIcon ? 'rotate-180' : rotateIcon270 ? 'rotate-[270deg]' : '',
              size === 's'
                ? 'h-4 w-4'
                : size === 'm'
                ? 'h-5 w-5'
                : size === 'l'
                ? 'h-6 w-6'
                : '',
            ]"
          />
          <div v-text="text" class="" />
          <IconViewer
            v-if="endIcon"
            :name="endIcon"
            class="ms-2"
            :class="[
              rotateIcon ? 'rotate-180' : rotateIcon270 ? 'rotate-[270deg]' : '',
              size === 's'
                ? 'h-4 w-4'
                : size === 'm'
                ? 'h-5 w-5'
                : size === 'l'
                ? 'h-6 w-6'
                : '',
            ]"
          />
        </template>
        <template v-else>
          <IconSpinner
            class="animate-spin"
            :class="
              styleType === 'fill'
                ? 'fill-white'
                : styleType === 'outlined'
                ? 'fill-p8'
                : styleType === 'text'
                ? 'fill-p8'
                : ''
            "
          />
        </template>
      </button>
      <div
        v-else
        @click.stop="isDisabled || isLoading ? () => {} : $emit('click')"
        :disabled="isDisabled || isLoading"
        class="flex flex-row items-center justify-center whitespace-nowrap w-full cursor-pointer"
        :class="[
          styleType === 'fill'
            ? 'bg-p7 text-p1 fill-p1 hover:bg-p8 active:bg-p7 visited:bg-p8 disabled:bg-p4 disabled:text-p2 disabled:fill-p2'
            : styleType === 'outlined'
            ? 'bg-white text-p7 fill-p7 border border-p7 hover:bg-p2 hover:text-p8 hover:fill-p8 hover:border-p8 active:bg-p2 active:text-p8 active:fill-p8 active:border-p8 visited:bg-p3 visited:border-p9  disabled:bg-p1 disabled:text-p3 disabled:fill-p3 disabled:border-p3'
            : styleType === 'text'
            ? 'text-p7 fill-p7 hover:text-p8 hover:fill-p8 disabled:text-p3 disabled:fill-p3'
            : '',
          size === 'l'
            ? 'laptop:text-lg laptop:font-medium px-4 laptop:px-6 h-12 laptop:h-14'
            : size === 'm'
            ? 'text-base px-4 h-12'
            : size === 's'
            ? 'text-sm px-4 h-10'
            : '',
          isDisabled ? 'cursor-not-allowed' : isLoading ? 'cursor-wait' : '',
          classes,
        ]"
      >
        <template v-if="!isLoading">
          <IconViewer
            v-if="startIcon"
            :name="startIcon"
            class="me-2"
            :class="[
              rotateIcon ? 'rotate-180' : rotateIcon270 ? 'rotate-[270deg]' : '',
              size === 's'
                ? 'h-4 w-4'
                : size === 'm'
                ? 'h-5 w-5'
                : size === 'l'
                ? 'h-6 w-6'
                : '',
            ]"
          />
          <div v-text="text" class="" />
          <IconViewer
            v-if="endIcon"
            :name="endIcon"
            class="ms-2"
            :class="[
              rotateIcon ? 'rotate-180' : rotateIcon270 ? 'rotate-[270deg]' : '',
              size === 's'
                ? 'h-4 w-4'
                : size === 'm'
                ? 'h-5 w-5'
                : size === 'l'
                ? 'h-6 w-6'
                : '',
            ]"
          />
        </template>
        <template v-else>
          <IconSpinner
            class="animate-spin"
            :class="
              styleType === 'fill'
                ? 'fill-white'
                : styleType === 'outlined'
                ? 'fill-p8'
                : styleType === 'text'
                ? 'fill-p8'
                : ''
            "
          />
        </template>
      </div>
    </div>
  </template>
  
  <script setup>
  defineEmits(["click"]);
  defineProps({
    text: String,
    startIcon: String,
    type: {
      type: String,
    },
    endIcon: String,
    buttonId: String,
    classes: Array || String,
    rotateIcon: Boolean,
    rotateIcon270: Boolean,
    styleType: {
      type: String,
      default: "fill",
    },
    size: {
      type: String,
      default: "m",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isSelected: Boolean,
    fakeButton: Boolean,
  });
  </script>
  