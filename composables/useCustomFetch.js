import ms from 'ms';


const mutateQuery = (query) => {
    const filteredQuery = {};

    Object.keys(query || {})
        .filter((key) => query[key])
        .forEach((key) => {
            if (query[key].toString().split('&').length > 1) {
                filteredQuery[key + '=[]'] = query[key];
            } else {
                filteredQuery[key] = query[key];
            }
        });
    return filteredQuery;
}


const authorizationHeader = (token, noAuthHeader, url) => {
    let res =  
        !noAuthHeader &&
        token &&
        !['/v1/auth/refresh-token/', '/v1/auth/login', '/v1/auth/temp' ].includes(url)
        ? { Authorization: `Bearer ${token}` }
        : {};
    return res;
}

const useCustomFetch = (
    url,
    body = null,
    stateName = null,
    method = 'POST',
    query = null,
    noAuthHeader = false,
    noToast = false
) => {
    const config = useRuntimeConfig();
    const { logout, refreshToken } = useUser();
    const filteredQuery = mutateQuery(query);

    const router = useRouter();
    const route = useRoute();
    const options = {
        method: method,
        body: body,
        query: Object.keys(filteredQuery).length > 0 ? filteredQuery : null,
        headers: authorizationHeader(useCookie('token').value, noAuthHeader, url),
        initialCache: false,
        onResponse({ request, response, options }) {
            const refresh = async () => {
                let refreshTokenCookie = useCookie('refreshToken');
                const payload = {
                    body: { refreshToken: refreshTokenCookie.value },
                };
                const { data, error } = await refreshToken(payload);
                if (error.value) {
                    await logout();
                    router.push({
                        name: 'login',
                        query: {
                            redirect: route.query.redirect || route.fullPath,
                        },
                    });
                } else {
                    useCookie('token', {
                        maxAge: ms(data.value.accessExpireIn) / 1000,
                    }).value = data.value.accessToken;
                }
            };

            // Process the response data
            if (response._data?.accessToken) {
                useCookie('token', {
                    maxAge: ms(response._data.accessExpireIn) / 1000,
                }).value = response._data.accessToken;
            }
            if (response._data?.refreshToken) {
                let refreshToken = response._data?.refreshToken;
                let maxAge = ms(response._data.refreshExpireIn) / 1000;
                useCookie('refreshToken', {maxAge: maxAge}).value = refreshToken;
            }
            if (
                stateName &&
                (response.status === 200 || response.status === 201)
            ) {
                const state = useState(stateName);
                state.value = response._data.body || response._data;
            }
            if (
                useCookie('refreshToken').value &&
                !useCookie('token').value &&
                !response.url.includes('api/v1/auth/refresh-token/')
            ) {
                refresh();
            }
        },
        onResponseError({ request, response, options }) {},
        onRequest({ request, options }) {},
        onRequestError({ request, options, error }) {
        },
    };

    const baseURL = process.server ? config.private.BASE_URL : config.public.BASE_URL;

    console.log("---------------------------------");
    console.log("process.server");
    console.log(process.server);

    console.log(baseURL);
    const apiEndpoint = baseURL + '/api' + url;
    console.log(apiEndpoint);
    console.log("---------------------------------");

    
    return useFetch(apiEndpoint, options);
};

export default useCustomFetch;
