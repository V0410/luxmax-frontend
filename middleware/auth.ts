const { callBack, refreshToken } = useUser();
export default defineNuxtRouteMiddleware((to, from) => {
    const redirect = to.query.redirect;
    const token = redirect?.toString()?.split('token=')[1];
    const tokenCookie = useCookie('token');
    const refreshTokenCookie = useCookie('refreshToken');
    const router = useRouter();

    const refresh = async(refToken: string) => {
        const { data, error } = await refreshToken({
            body: {
                refreshToken: refToken
            }
        });
        const myData: any = data.value;
        tokenCookie.value = myData.accessToken;
        refreshTokenCookie.value = myData.refreshToken;
    };

    const call = async (tok: string) => {
        const { data, error } = await callBack(tok);
        const myData: any = data.value;
        if (myData) {
            tokenCookie.value = myData.accessToken;
            refreshTokenCookie.value = myData.refreshToken;
            if (from.query.redirect) {
                router.push(
                    `/account/info?${
                        from.query.redirect?.split('?')[1]
                            ? 'token=true'
                            : ''
                    }`
                );
            }
        } else {
            const { create } = useToast();
            create({
                id: Math.random(),
                type: 'danger',
                title: 'Your login has expired. Please login again',
                noClose: true,
                time: 5,
            });
        }
    };

    if (token && to.query.redirect && to.query.redirect.toString().split('token=')[1]) {
        call(token);
    }
    if (to.name === 'login' && useCookie('token').value) {
        return navigateTo({ name: 'home' });
    } 
    else if(
        to.name !== 'login' &&    
        !useCookie('token').value &&
        useCookie('refreshToken').value
    ) {
        refresh(useCookie('refreshToken').value as string);
    }
    else if (
        !['login', 'signup'].includes(to.name as string) &&
        !useCookie('token').value &&
        !useCookie('refreshToken').value
    ) {
        return navigateTo({
            name: 'login',
            query: { redirect: to.fullPath },
        });
    }
});
