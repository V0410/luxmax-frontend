<template>
    <div>
        <div
            :class="
                route.path === '/market'
                    ? 'laptop:h-[114px] h-[133px]'
                    : 'laptop:h-[106px] h-[66px]'
            "
        />
        <div
            class="fixed top-0 w-full z-40 px-16 pt-3 bg-white hidden laptop:block"
            style="box-shadow: 0px 1px 8px 0px #00000014"
        >
            <div
                class="flex justify-between items-center pb-3 border-b border-p1"
            >
                <div class="flex items-center gap-10">
                    <NuxtLink
                        :to="{ name: 'home' }"
                        id="luxmax-logo"
                        class="flex items-center select-none"
                    >
                        <IconLogo class="me-4 stroke-p8 w-[18px] h-[18px]" />
                        <span
                            class="uppercase font-light text-p8 text-[20px] laptop:text-2xl tracking-wider"
                            v-text="$t('luxmax')"
                        />
                    </NuxtLink>
                    <div
                        class="relative w-[200px] laptop-l:w-[400px] hidden laptop:block"
                        @focus="searchMenuIsShow = true"
                        @blur="searchMenuIsShow = false"
                        :tabindex="0"
                    >
                        <BaseInputSearch
                            v-if="route.path === '/market'"
                            v-model="searchText"
                            ref="search"
                            :maxlength="50"
                            size="s"
                            noErrorMessage
                            class="first-letter:capitalize"
                            :placeholder="
                                $t('Try searching “Gucci” or “Black tote”')
                            "
                            @focus="searchMenuIsShow = true"
                            @change="searchMenuIsShow = true"
                            @blur="searchMenuIsShow = false"
                            @keyup.enter="enterSearch"
                            @keyup.esc="($event) => $event.target.blur()"
                        />
                        <div class="flex flex-row absolute top-12 start-0 z-20">
                            <ModalSearch
                                ref="searchModal"
                                :isShow="searchMenuIsShow"
                                @open="searchMenuIsShow = true"
                                v-model="searchText"
                                @close="searchMenuIsShow = false"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-7">
                    <IconBookmark
                        v-if="!!token || !!refreshToken"
                        class="h-8 w-8 fill-p8 cursor-pointer hidden laptop:block"
                        @click="
                            $router.push({
                                name: 'purchase',
                                query: { favorite: true },
                            })
                        "
                    />
                    <div
                        v-if="!!token || !!refreshToken"
                        @click="$router.push({ name: 'buy' })"
                        class="cursor-pointer relative"
                    >
                        <IconBasket class="h-8 w-8 fill-p8" />
                        <div
                            v-if="cartList?.items?.length > 0"
                            class="w-4 h-4 min-h-4 min-w-4 max-w-4 max-h-4 bg-amber rounded absolute top-0 end-0 flex justify-center items-center text-xs text-black"
                            v-text="cartList?.items?.length || 0"
                        />
                    </div>
                    <BaseButton
                        v-else
                        @click="
                            router.push({
                                name: 'login',
                                query: { redirect: route.fullPath },
                            })
                        "
                        class="hidden laptop:block"
                        size="m"
                        :text="$t(`login sign up`)"
                        styleType="fill"
                        buttonId="login-signup"
                    />
                    <div
                        v-if="!!token || !!refreshToken"
                        @blur="isProfileShow = false"
                        tabindex="1"
                    >
                        <IconPersonLogin
                            size="m"
                            class="h-8 w-8 fill-p8 cursor-pointer"
                            @click="toggleProfile"
                        />
                        <div
                            class="absolute laptop:top-24 laptop:start-auto laptop:end-4 z-20"
                        >
                            <ModalProfile
                                :isShow="isProfileShow"
                                @close="isProfileShow = false"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center py-3">
                <div class="flex gap-14 items-center">
                    <template v-for="item in menuItems[0]" :key="item.id">        
                        <NuxtLink
                            v-if="!item.menu && !item.disable"
                            :to="{ name: item.routeName }"
                            class="border-b border-transparent text-p8"
                        >
                            <div v-text="item.label" />
                        </NuxtLink>

                        <NuxtLink
                            v-else-if="!item.menu && item.disable"
                            :to="null"
                            class="border-b border-transparent text-p8 disable"
                            title="Coming Soon! Stay tuned for exciting updates on this feature."
                        >
                            <div v-text="item.label" />
                        </NuxtLink>
                        <div
                            v-else
                            class="z-20"
                            @blur="item.isShow = false"
                            :tabindex="0"
                        >
                            <div
                                @click="item.isShow = !item.isShow"
                                class="flex items-center cursor-pointer border-b py-1 text-p8"
                                :class="
                                    item.isShow
                                        ? ' border-p4'
                                        : 'border-transparent'
                                "
                            >
                                <div v-text="item.label" />
                                <IconArrowDown
                                    v-if="item.menu"
                                    class="fill-p8 w-4 h-4 laptop:ms-1 laptop-l:ms-2"
                                />
                            </div>
                            <template v-if="item.menu">
                                <ModalMegaMenu
                                    v-if="item.menuType === 'mega'"
                                    :menu="item.menu"
                                    :promotions="promotions"
                                    :isShow="item.isShow"
                                    @close="item.isShow = false"
                                />
                                <ModalPicMenu
                                    v-else-if="item.menuType === 'pic'"
                                    :menu="item.menu"
                                    :isShow="item.isShow"
                                    @close="item.isShow = false"
                                />
                                <ModalMinimalMenu
                                    v-else-if="item.menuType === 'minimal'"
                                    :menu="item.menu"
                                    :isShow="item.isShow"
                                    @close="item.isShow = false"
                                />
                            </template>
                        </div>
                    </template>
                </div>
                <div class="flex gap-14">
                    <template v-for="item in menuItems[1]" :key="item.id">
                        <NuxtLink
                            v-if="item.routeName"
                            :to="{ name: item.routeName }"
                            class="border-b border-transparent text-p8"
                        >
                            <div v-text="item.label" />
                        </NuxtLink>
                        <a
                            v-else
                            :href="item.link"
                            target="_blank"
                            class="border-b border-transparent text-p8"
                        >
                            <div v-text="item.label"
                        /></a>
                    </template>
                </div>
            </div>
        </div>
        <div
            class="fixed top-0 w-full z-40 px-7 py-4 bg-white laptop:hidden flex flex-col gap-2"
            style="box-shadow: 0px 1px 8px 0px #00000014"
        >
            <div class="flex justify-between items-center">
                <div @blur="isProfileShow = false" tabindex="1">
                    <IconPersonLogin
                        size="m"
                        class="h-[18px] w-[18px] laptop:h-10 laptop:w-10 fill-p8 cursor-pointer"
                        @click="toggleProfile"
                    />
                    <div
                        :class="isProfileShow ? '' : '-translate-x-full'"
                        class="fixed transition-all left-0 top-0 h-[100svh] w-screen bg-white p-7 z-50"
                        style="box-shadow: 0px 8px 16px 0px #00000029"
                    >
                        <IconX @click="isProfileShow = false" />
                        <div
                            v-if="!!token || !!refreshToken"
                            class="h-full flex flex-col justify-between py-10"
                        >
                            <div
                                class="cursor-pointer laptop:mt-0"
                                @click="goTo('info')"
                            >
                                <div
                                    class="p-4 bg-p1 rounded-lg w-full flex justify-between"
                                >
                                    <BaseAvatar
                                        size="l"
                                        :name="{
                                            first:
                                                accountInfoState?.firstName ||
                                                '',
                                            last:
                                                accountInfoState?.lastName ||
                                                '',
                                        }"
                                        :text="$t('Account Info')"
                                        :hasDetails="true"
                                    />
                                    <div class="flex items-center">
                                        <IconArrowDown
                                            class="rotate-[270deg] fill-p9"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-4">
                                <div
                                    class="cursor-pointer"
                                    @click="goTo('bank')"
                                >
                                    <div
                                        class="p-4 w-full flex justify-between"
                                    >
                                        <div
                                            class="flex-grow text-[#0D0D0D]"
                                            v-text="$t('Bank Account')"
                                        />
                                        <div class="flex items-center">
                                            <IconArrowDown
                                                class="rotate-[270deg] fill-p9"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="cursor-pointer"
                                    @click="goTo('items')"
                                >
                                    <div
                                        class="p-4 w-full flex justify-between"
                                    >
                                        <div
                                            class="flex-grow text-[#0D0D0D]"
                                            v-text="$t('My Items')"
                                        />
                                        <div class="flex items-center">
                                            <IconArrowDown
                                                class="rotate-[270deg] fill-p9"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="cursor-pointer"
                                    @click="goTo('purchase')"
                                >
                                    <div
                                        class="p-4 w-full flex justify-between"
                                    >
                                        <div
                                            class="flex-grow text-[#0D0D0D]"
                                            v-text="$t('Order History')"
                                        />
                                        <div class="flex items-center">
                                            <IconArrowDown
                                                class="rotate-[270deg] fill-p9"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="cursor-pointer"
                                    @click="goTo('sale')"
                                >
                                    <div
                                        class="p-4 w-full flex justify-between"
                                    >
                                        <div
                                            class="flex-grow text-[#0D0D0D]"
                                            v-text="$t('Instant Sales History')"
                                        />
                                        <div class="flex items-center">
                                            <IconArrowDown
                                                class="rotate-[270deg] fill-p9"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center px-4">
                                <template
                                    v-for="(item, index) in menuItems[1]"
                                    :key="item.id"
                                >
                                    <span
                                        v-if="index !== 0"
                                        class="h-full w-[1px] bg-p2"
                                    />
                                    <NuxtLink
                                        v-if="item.routeName"
                                        :to="{ name: item.routeName }"
                                        class="border-b border-transparent text-sm text-p8"
                                    >
                                        <div v-text="item.label" />
                                    </NuxtLink>
                                    <a
                                        v-else
                                        :href="item.link"
                                        target="_blank"
                                        class="border-b border-transparent text-sm text-p8"
                                    >
                                        <div v-text="item.label"
                                    /></a>
                                </template>
                            </div>
                            <div
                                class="p-4 bg-p1 rounded-lg w-full laptop:mb-0 flex justify-between cursor-pointer"
                                @click="logout"
                            >
                                <div class="flex gap-3 items-center">
                                    <IconLogout class="w-6 h-6 fill-p7" />
                                    <div v-text="$t('Log out')" />
                                </div>
                            </div>
                        </div>
                        <div
                            v-else
                            class="w-full h-full flex flex-col gap-8 items-center justify-center"
                        >
                            <NuxtImg
                                src="/img/login/wallet.webp"
                                class="w-full"
                            />
                            <div
                                v-text="
                                    $t(
                                        'Log in to your account to use all the features'
                                    )
                                "
                                class="text-p8 text-center"
                            />
                            <nuxt-link
                                :to="{
                                    name: 'login',
                                    query: { redirect: route.fullPath },
                                }"
                                class="w-full px-5"
                            >
                                <button
                                    class="border rounded-full border-p7 py-[14px] text-p7 w-full"
                                    id="login-signup"
                                >
                                    login / sign up
                                </button>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <NuxtLink
                    :to="{ name: 'home' }"
                    class="flex items-center select-none"
                    id="luxmax-logo"
                >
                    <IconLogo class="me-4 stroke-p8 w-4 h-4" />
                    <span
                        class="uppercase font-light text-p8 tracking-wider"
                        v-text="$t('luxmax')"
                    />
                </NuxtLink>
                <div
                    @click="$router.push({ name: 'buy' })"
                    class="cursor-pointer relative"
                >
                    <IconBasket class="h-[19px] w-[19px] fill-p8" />
                    <div
                        v-if="cartList?.items?.length > 0"
                        class="w-3 h-3 min-h-3 min-w-3 max-w-3 max-h-3 bg-amber rounded absolute -top-1 -end-1 flex justify-center items-center text-[9px] text-black"
                        v-text="cartList?.items?.length || 0"
                    />
                </div>
                <BaseButton
                    v-if="!token && !refreshToken"
                    class="hidden laptop:block"
                    @click="
                        router.push({
                            name: 'login',
                            query: { redirect: route.fullPath },
                        })
                    "
                    size="m"
                    :text="$t(`login sign up`)"
                    styleType="fill"
                    buttonId="login-signup"
                />
            </div>
            <div class="flex justify-between items-center">
                <template v-for="item in menuItems[0]" :key="item.id">

                    <NuxtLink
                        v-if="!item.menu && !item.disable"
                        :to="item.disable ? null : { name: item.routeName }"
                        class="border-b border-transparent text-p8 text-sm"
                        title="Coming soon! Stay tuned for this new feature."
                    >
                        <div v-text="item.label" />
                    </NuxtLink>

                    <NuxtLink
                        v-else-if="!item.menu && item.disable"
                        :to="item.disable ? null : { name: item.routeName }"
                        class="border-b border-transparent text-p8 text-sm disable hidden laptop:visible"
                        title="Coming soon! Stay tuned for this new feature."
                    >
                        <div v-text="item.label" />
                    </NuxtLink>
                    <div
                        v-else
                        class="z-20"
                        @blur="item.isShow = false"
                        :tabindex="0"
                    >
                        <div
                            @click="item.isShow = !item.isShow"
                            class="flex items-center cursor-pointer border-b py-1 text-p8 text-sm"
                            :class="
                                item.isShow
                                    ? ' border-p4'
                                    : 'border-transparent'
                            "
                        >
                            <div v-text="item.label" />
                        </div>
                        <template v-if="item.menu">
                            <ModalMegaMenu
                                v-if="item.menuType === 'mega'"
                                :menu="item.menu"
                                :promotions="promotions"
                                :isShow="item.isShow"
                                @close="item.isShow = false"
                            />
                            <ModalPicMenu
                                v-else-if="item.menuType === 'pic'"
                                :menu="item.menu"
                                :isShow="item.isShow"
                                @close="item.isShow = false"
                            />
                            <ModalMinimalMenu
                                v-else-if="item.menuType === 'minimal'"
                                :menu="item.menu"
                                :isShow="item.isShow"
                                @close="item.isShow = false"
                            />
                        </template>
                    </div>
                </template>
            </div>
            <div
                class="relative w-full"
                @focus="searchMenuIsShow = true"
                @blur="searchMenuIsShow = false"
                :tabindex="0"
            >
    
                <BaseInputSearch
                    v-if="route.path === '/market'"
                    v-model="searchText"
                    ref="search"
                    :maxlength="50"
                    size="s"
                    noErrorMessage
                    class="first-letter:capitalize"
                    :placeholder="$t('Try searching “Gucci” or “Black tote”')"
                    @focus="searchMenuIsShow = true"
                    @change="searchMenuIsShow = true"
                    @blur="searchMenuIsShow = false"
                    @keyup.enter="enterSearch"
                    @keyup.esc="($event) => $event.target.blur()"
                />
                <div class="flex flex-row absolute top-12 start-0 z-20">
                    <ModalSearch
                        ref="searchModal"
                        :isShow="searchMenuIsShow"
                        @open="searchMenuIsShow = true"
                        v-model="searchText"
                        @close="searchMenuIsShow = false"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.disable {
    color: gray;
}
</style>

<script setup>
const searchText = ref('');
const accountInfoState = useState('account_info');

const token = useCookie('token');
const refreshToken = useCookie('refreshToken');

const favoriteState = useState('favoriteState');
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const goTo = (name) => {
    router.push({ name });
};

const logout = () => {
    const { logout } = useUser();
    logout();
    router.push({ name: 'home' });
    emits('close');
};

watch(
    () => route?.name,
    () => {
        searchText.value = '';
    }
);

const enterSearch = () => {
    if (searchText.value) {
        router.push({ name: 'market', query: { keyword: searchText.value } });
        searchText.value = '';
        searchMenuIsShow.value = false;
    }
};

const menuItems = reactive([
    [
        {
            id: 0,
            label: 'Market',
            isShow: false,
            routeName: 'market',
            menuType: 'mega',
            disable: false
        },
        {
            id: 1,
            label: 'Repair',
            routeName: 'repair',
            isShow: false,
            menuType: 'minimal',
            disable: false
        },
        {
            id: 2,
            label: 'Sell',
            routeName: 'sellpage',
            isShow: false,
            menuType: 'minimal',
            disable: true
        },
        {
            id: 3,
            label: 'Dry Cleaning',
            isShow: false,
            routeName: 'dry-cleaning',
            menuType: 'mega',
            disable: false
        },
    ],
    [
        { id: 4, label: 'Blog', link: 'https://luxmax.co/blog/' },
        { id: 5, label: 'About Us', routeName: 'about' },
        { id: 6, label: 'Contact Us', routeName: 'contact' },
    ],
]);

const promotions = [
    {
        id: 0,
        img: '/img/home/mega-promotion-1.webp',
        route: '/market?sort=newest',
    },
    {
        id: 1,
        img: '/img/home/mega-promotion-2.webp',
        route: '/market?offer=off',
    },
];

//// search menu
const searchMenuIsShow = ref(false);
//// search menu

//// profile
const isProfileShow = ref(false);

const toggleProfile = () => {
    isProfileShow.value = !isProfileShow.value;
};
//// profile

//// search
const isSearchShow = ref(false);

const toggleSearch = () => {
    isSearchShow.value = !isSearchShow.value;
};

//// search

//// download app
const isDownloadAppShow = ref(false);

const toggleDownloadApp = () => {
    isDownloadAppShow.value = !isDownloadAppShow.value;
};
//// download app
let cartList = useState('cartList');

useTimeout(async () => {
    if (!cartList.value && token.value) {
        const { cart } = useCheckout();
        const { data } = await cart();
        cartList.value = data.value;
    }
    const favoriteState = useState('favoriteState');
    if (!favoriteState.value && token.value) {
        const { favorite_list } = useItem();
        await favorite_list();
    }
    const account_info = useState('account_info');
    if (!account_info.value && token.value) {
        const { account_info } = useAccount();
        await account_info();
    }
}, 10);
</script>
