<template>
    <div ref="container" class="flex flex-col gap-8 p-4 laptop:p-8 shadow-s-3" :class="$route.query.favorite ? ' order-first' : ''">
    <div class="flex items-center">
      <div
        class="text-lg font-semibold text-p8 pe-8 whitespace-nowrap"
        v-text="$t('Favorites')"
      />
      <div class="border-b border-t1 flex-grow"></div>
    </div>
    <div class="flex flex-col gap-4">
      <template
        v-if="
          favoriteData &&
          Array.isArray(favoriteData) &&
          favoriteData.length > 0
        "
      >
      <BaseRepairRow
        v-for="item in favoriteData"
        :key="item?.id"
        :data="item"
        @buttonClick="buttonClick"
        @infoClick="showItemDetails"
        class="cursor-pointer"
        @click.stop="(item?.itemData?.id && !item?.isDisabled) ? $router.push({name: 'single-product', params: { id: item?.itemData?.id } }) : () => {}"
      />
      </template>
      <div
        v-else
        class="flex flex-col items-center justify-between h-full gap-8"
      >
        <IconNoFavorite
          class="w-[120px] h-[120px] laptop:w-[200px] laptop:h-[200px]"
        />
        <div
          class="text-p8"
          v-text="$t('There are no items in the favorites items section')"
        />
      </div>
    </div>
  </div>

</template>

<script setup>
definePageMeta({
  name: "favorites",
  key: (route) => route.fullPath,
  layout: false
});

const { t } = useI18n();
const route = useRoute();

const favoriteState = useState('favoriteState');

const favoriteData = computed(() =>
  favoriteState.value?.data?.map(item => {
    return {
      id: item?.product?.id,
      price: item?.product?.price,
      images: item?.product?.images,
      features: item?.product?.color || '' + ' ' + item?.product?.material || '' + ' ' + item?.product?.size || '' + ' ' + item?.product?.category?.name || '',
      status: {
        type: item?.extra?.error ? 'danger' : null,
        icon: item?.extra?.error ? 'IconDanger' : item?.extra?.icon ? item?.extra?.icon : "",
        title: item?.current_state,
        desc: item?.next_state,
      },
      extraInfo: {
        title: item?.extra?.description || '',
        desc: item?.extra?.price || ''
      },
      desc: {
        type: item?.extra?.error ? 'danger' : 'success',
        text: item?.product?.name || "",
      },
      buttons: [
        {
          id: 0,
          startIcon: item?.Item?.state && item?.Item?.state !== 'ready for sell' ? '' : "IconBasket",
          type: item?.Item?.state && item?.Item?.state !== 'ready for sell' ? 'outlined' : "text",
          text: item?.Item?.state && item?.Item?.state !== 'ready for sell' ? t('Sold') : '',
          size: item?.Item?.state && item?.Item?.state !== 'ready for sell' ? 's' : 's',
          isDisabled: item?.Item?.state && item?.Item?.state !== 'ready for sell' ? true : false,
          emit: item?.Item?.state && item?.Item?.state !== 'ready for sell' ? '' : "addToBasket",
        },
        {
          id: 1,
          startIcon: "IconDelete",
          type: "text",
          size: 'l',
          emit: "delete",
        },
      ],
      itemData: item?.product
    }
}
))

const { favorite_list, delete_favorite } = useItem();
const { addCart, cart } = useCheckout();

const addToBasket = async(id) => {
  const body = { productId: String(id) }
  const { error } = await addCart({ body: body });
  if(!error.value ){
    const { create } = useToast();
    create({
      id: Math.random(),
      type: "success",
      title: t("Item has been added to the cart"),
      noClose: true,
      time: 5,
    });
  }
  await cart();
}

const deleteFromFavorite = async(id) => {
  const body = { item_id: String(id) };
  await delete_favorite({ body:body })
  await favorite_list();
}

const container = ref()

onMounted(() => {
  if(route.query.favorite){
    window.scrollTo({top: container.value?.offsetTop - 100, behavior: 'smooth'})
  }
})


const buttonClick = async (data) => {
  const router = useRouter()
  if(data?.emit === 'deposit') {
    router.push({ name: 'deposit', query: { item_id: data?.id } })
  } else if(data?.emit === 'addToBasket') {
    await addToBasket(data?.id)
  } else if(data?.emit === 'delete') {
    await deleteFromFavorite(data?.id)
  }
  else {
  }
}

</script>
