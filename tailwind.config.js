const colors = require("tailwindcss/colors");
export default {
  theme: {
    colors: {
      transparent: colors.transparent,
      black: "#000000",
      "white-light": "#00000",
      white: "#ffffff",
      gold: "#D6BD68",
      success: "#03A65A",
      warning: "#F9943B",
      danger: "#F64B3C",
      info: "#65ACF0",
      amber: "#FFCF40",
      blue: '#316D98',
      purple: '#8E6BFF',
      // primary colors
      p10: "#154033",
      p9: "#1C5444",
      p8: "#296956",
      p7: "#3A7E69",
      p6: "#50937D",
      p5: "#6AA792",
      p4: "#88BBA9",
      p3: "#A8CFC0",
      p2: "#CAE2D9",
      p1: "#EDF5F2",
      // text colors
      t10: "#0D0D0D",
      t9: "#393939",
      t8: "#4B4B4B",
      t7: "#5E5E5E",
      t6: "#727272",
      t5: "#868686",
      t4: "#9B9B9B",
      t3: "#B0B0B0",
      t2: "#C6C6C6",
      t1: "#DDDDDD",
    },
    boxShadow: {
      "s-1": "0px -1px 4px 0px #0000000A",
      "s-2": "0px 1px 4px 0px #0000000A",
      "s-3": "0px 1px 8px 0px #00000014",
      "s-4": "0px 8px 12px 0px #0000001F",
      "s-5": "0px 8px 16px 0px #00000029",
      "s-6": "0px 16px 24px 0px #00000029",
      "s-7": "0px 16px 24px 0px rgba(0, 0, 0, 0.16)",
    },
    dropShadow: {
      "s-1": "0px 0px 20px 0px #84848433",
      "s-2": "0px 10px 40px 0px #00000026",
      "s-3": "0px 10px 40px 0px #768C7480",
    },
    backgroundImage: {
      "home-texture": "url('/img/home/background.webp')",
      login: "url('/img/login/background.webp')",
      identify: "url('/img/repair/background.webp')",
      repair: "url('/img/guide/repair-landing/background.webp')",
      "repair-and-sell": "url('/img/guide/repair-and-sell-landing/bg.webp')",
      "instant-sell": "url('/img/guide/instant-sell-landing/bg.webp')",
      "sell-without-repair":
        "url('/img/guide/sell-without-repair-landing/bg.webp')",
      faq: "url('/img/guide/FAQ/bg.webp')",
      about: "url('/img/aboutUs/bg.webp')",
    },
    letterSpacing: {
      tighter: "-.2em",
      tight: "-4%",
      normal: "0",
      wide: "4%",
      wider: ".2em",
    },
    fontFamily: {
      title: ["Granjon"],
      static: ["Cinzel"],
    },
// [0 - 320)     : x
// [320 - 375)   : mobile-s
// [375 - 425)   : mobile-m
// [425 - 768)   : mobile-l
// [768 - 1024)  : tablet
// [1024 - 1440) : laptop
// [1440 - 2048) : laptop-l
// [2048 - 2560) : 2k
// 2560 and above: 4k
    screens: {
      "mobile-sss": "200px",
      "mobile-ss": "240px",
      "mobile-s": "320px",
      "mobile-m": "375px",
      "mobile-l": "425px",
      "mobile-xl": "500px",
      "mobile-2xl": "640px",
      "tablet": "768px",
      "laptop": "1024px",
      "laptop-l": "1440px",
      "laptop-x": "1480px",
      "2k": "2048px",
      "4k": "2560px",
    },
    extend: {
      spacing: {
        "mobile-s-grid": "296px",
        "mobile-m-grid": "351px",
        "mobile-l-grid": "401px",
        "tablet-grid": "704px",
        "laptop-grid": "960px",
        "laptop-l-grid": "1376px",
        "4k-grid": "1376px",
        "header-height": "90px",
      },
      lineHeight: {
        '0': '0',
      },
      fontSize: {
        'xxs': '0.625rem', // 10px
      },
      padding: {
        '82': '20.5rem', // Equivalent to pt-82
        '84': '21rem',   // Equivalent to pt-84
        '86': '21.5rem', // Equivalent to pt-86
        '88': '22rem',   // Equivalent to pt-88
        '90': '22.5rem', // Equivalent to pt-90      
      },
    },
    plugins: [require("tailwindcss-rtl")],
  },
};
