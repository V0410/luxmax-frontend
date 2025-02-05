<template>
    <div v-if="isShow" class="shadow-s-5">
        <div
            @click.stop="() => {}"
            class="bg-white fixed laptop:static p-6 min-w-[320px] max-w-[320px] flex flex-col justify-between laptop:justify-start gap-4 h-screen laptop:h-fit laptop:min-h-0 laptop:max-h-[80vh] overflow-y-auto"
        >
            <div class="laptop:hidden absolute top-6">
                <IconX class="fill-p9 cursor-pointer" @click="$emit('close')" />
            </div>
            <template v-if="!!token || !!refreshToken">
                <div
                    class="cursor-pointer mt-10 laptop:mt-0"
                    @click="goTo('info')"
                >
                    <div
                        class="p-4 bg-p1 rounded-lg w-full flex justify-between"
                    >
                        <BaseAvatar
                            size="l"
                            :name="{
                                first: accountInfoState?.firstName || '',
                                last: accountInfoState?.lastName || '',
                            }"
                            :text="$t('Account Info')"
                            :hasDetails="true"
                        />
                        <div class="flex items-center">
                            <IconArrowDown class="rotate-[270deg] fill-p9" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-4">
                    <div class="cursor-pointer" @click="goTo('bank')">
                        <div class="p-4 w-full flex justify-between">
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
                    <div class="cursor-pointer" @click="goTo('items')">
                        <div class="p-4 w-full flex justify-between">
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
                    <div class="cursor-pointer" @click="goTo('purchase')">
                        <div class="p-4 w-full flex justify-between">
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
                    <div class="cursor-pointer" @click="goTo('sale')">
                        <div class="p-4 w-full flex justify-between">
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
                <div
                    class="p-4 bg-p1 rounded-lg w-full mb-16 laptop:mb-0 flex justify-between cursor-pointer"
                    @click="logout"
                >
                    <div class="flex gap-3 items-center">
                        <IconLogout class="w-6 h-6 fill-p7" />
                        <div v-text="$t('Log out')" />
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="flex-grow flex justify-center items-center">
                    <div class="flex flex-col gap-8 px-6 items-center">
                        <IconNoCard class="w-[200px] h-[200px]" />
                        <div
                            v-text="
                                $t(
                                    'Log in to your account to use all the features'
                                )
                            "
                        />
                        <div class="w-full">
                            <BaseButton
                                styleType="outlined"
                                :text="$t('Login')"
                                @click="goTo('login')"
                            />
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
const emits = defineEmits(["close"]);
const props = defineProps({
    isShow: Boolean,
});

const router = useRouter();
const { account_info } = useAccount();

const token = useCookie("token");
const refreshToken = useCookie("refreshToken");
const accountInfoState = useState("account_info");

const logout = () => {
    const { logout } = useUser();
    logout();
    router.push({ name: "home" });
    emits("close");
};

const goTo = (name) => {
    router.push({ name: name });
    emits("close");
};

watch(
    () => props.isShow,
    (newVal) => {
        if (
            newVal === true &&
            (!!token.value || !!refreshToken.value) &&
            !accountInfoState.value
        ) {
            account_info();
        }
    },
    { immediate: true }
);
</script>
