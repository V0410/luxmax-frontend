export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@vueuse/nuxt',
        '@nuxt/image',
        '@nuxtjs/robots',
        'nuxt-swiper'
    ],
    robots: {
        UserAgent: process.env.NUXT_ENV === 'production' ? '*' : '',
        Disallow: process.env.NUXT_ENV === 'production' ? '/account' : '*',
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
                dir: 'ltr',
            },
            script: [
                {
                    children: `window.$crisp=[];window.CRISP_WEBSITE_ID="f571a939-8d66-4486-af34-025a3c6e9767";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
                },
                {
                    children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-M4RN4Q9V');`,
                }
            ],
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, maximum-scale=1',
                    noscript: `
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M4RN4Q9V"
                    height="0" width="0" style="display:none;visibility:hidden"></iframe>
                  `
                },
            ],
            title: 'LuxMax',
        },
        bodyScripts: [
            {
              hid: 'gtm-noscript',
              children: `
                <noscript>
                  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M4RN4Q9V"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe>
                </noscript>
              `,
            },
        ],
    },
    runtimeConfig: {
        public: {
            BASE_URL: process.env.NUXT_PUBLIC_API_BASE || 'https://core.luxmax.co',
            ENV: process.env.NUXT_PUBLIC_ENV,
            stripe_secret:
                'pk_test_51NNWpJEWUVBLFvaXPS431RP9wd2WvZhjghXfvB0mulXCiCiPHgl9FpQlkEOPs76dmokY8dMmrr2erxrFqRquUWKm00UloyGg7B' ||
                'pk_live_51NNWpJEWUVBLFvaXaLWrOTLgk80gHhNVGE18vOcInOBWY24zflSxhGjlSxR0IQCpXL1gNpCOt3HOmjgMJJlAzdCy00mnwLLYHq',
            GTAG: process.env.NUXT_ENV === 'production' ? 'GTM-M4RN4Q9V' : '',
            gtagId: 'GTM-M4RN4Q9V',
        },    
        private: {
            BASE_URL: process.env.NUXT_SSR_API_BASE || 'http://core:3020'
        }
    },
    routeRules: {
        '/account': { redirect: '/account/info' },
        '/checkout/buy': { redirect: '/checkout' },
        '/dry-cleaning/request/': { ssr: false},
        '/market': {ssr: false},
        '/market/**': {ssr: false},
        '/dry-cleaning/request/**': { ssr: false},
        '/payment/': {ssr:false},
        '/payment/**': {ssr:false}
    },
    i18n: {
        vueI18n: './i18n.config.ts',
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
        },
    },
    image: {
        format: ['webp'],
        quality: 100,
        screens: {
            'mobile-s': 320,
            'mobile-m': 375,
            'mobile-l': 425,
            tablet: 768,
            laptop: 1024,
            'laptop-l': 1440,
            'laptop-x': 1480,
            '2k': 2048,
            '4k': 2560,
        },
        densities: [1, 2],
    },
    vue: {
        compilerOptions: {
            isCustomElement: tag => tag === 'lottie-player'
        }
    },
    vite: {
        define: {
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
        },
        build: {
            cssCodeSplit: false,
            cssMinify: true,
            sourcemap: true,
            minify: true,
            rollupOptions: {
                output: {
                    compact: true,
                    // sourcemap: 'inline',
                    // manualChunks: {},
                    // hoistTransitiveImports: false,
                    // inlineDynamicImports: true,
                    name: 'luxmax',
                    // chunkFileNames: 'luxmax-[name]-[hash].js',
                    // experimentalMinChunkSize: 10000,
                    // inlineDynamicImports: true,
                },
            },
        },
    },
    nitro: {
        compressPublicAssets: { gzip: true, brotli: true },
        minify: true,
        routeRules: {
            '/assets/**': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
            '/img/**': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
            '/video/**': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
            '/_ipx/**': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
            '/_nuxt/**': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
            '/**/*.js': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
            '/**/*.css': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
            '/**/*.json': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
            '/**/*.html': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
            '/**/*.xml': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
            '/**/*.svg': {
                headers: { 'Cache-Control': 'max-age=31536000, immutable' },
            },
        },
    },
});