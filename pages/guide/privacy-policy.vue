<template>
    <div>
        <GuideTemplate :data="data" :breadcrumbData="breadcrumbData" />
    </div>
</template>

<script setup>
definePageMeta({
  name: "privacy-policy",
});
const { t } = useI18n();

const router = useRouter()
useHead({
  title: `LuxMax - privacy policy`,
  meta: [
    {
      name: 'title',
      content: 'LuxMax Privacy Policy'
    },
    {
      name: 'description',
      content: "Learn how LuxMax collects, uses, and protects personal data provided by customers and marketplace sellers."
    }
  ]
})
const data = {
  title: t("Points"),
  categories: [
    { id: 0, name: t("privacy-policy"), text: t('Privacy-policy'), value: 0 },
  ],
  // desc: t("LuxMax Privacy Policy"),
  main: [
    {
      id: 0,
      title: 'Effective Date: [Date]',
      desc: `At LuxMax, we respect and protect your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website or mobile application ("Services"). By accessing or using our Services, you consent to the practices described in this Privacy Policy.`
    },
    {
      id: 1,
      title: `1. Information We Collect`,
      desc: `Personal Information: We may collect personal information such as your name, email address, phone number, shipping address, payment information, and any other information you provide when using our Services.
            User Content: We may collect content that you submit or post to our Services, including comments, reviews, photos, and other materials.
            Device Information:  We may collect information about your device, such as your IP address, browser type, operating system, and mobile device identifiers.
            Usage Information:  We collect information about your interactions with our Services, such as the pages or content you view, your search queries, and other actions you take.`
    },
    {
      id: 2,
      title: `2. How We Use Your Information`,
      desc: `We use your personal information to:
            Provide, maintain, and improve our Services.
            Process transactions and send transaction notifications.
            Respond to your requests, comments, or questions.
            Send you important information, such as updates and changes to our terms, policies, and services.
            Monitor and analyze usage patterns and trends.
            Personalize your experience and deliver relevant content and offers.
            Protect against fraud, unauthorized access, or other harm.
            `
    },
    {
      id: 3,
      title: `3. Sharing Your Information`,
      desc: `We may share your personal information with:
            Service Providers: We may share your information with third-party service providers who assist us in providing, maintaining, and improving our Services.
            Legal Compliance: We may share your information to comply with applicable laws, regulations, legal processes, or government requests.
            `
    },
    {
      id: 4,
      title: `4. Your Choices`,
      desc: `You have the following choices regarding your personal information:
            You can access and update your personal information through your account settings.
            You can unsubscribe from marketing communications by following the instructions in our emails.
            `
    },
    {
      id: 5,
      title: `5. Security`,
      desc: `We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no data transmission over the internet or stored on a server can be guaranteed to be 100% secure.`
    },
    {
      id: 6,
      title: `6. Changes to this Privacy Policy`,
      desc: `We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes, we will revise the "Effective Date" at the beginning of this Privacy Policy.`
    },
    {
      id: 7,
      title: `7. Cookie Declaration`,
      desc: `At LuxMax, we use cookies and similar technologies to enhance your user experience and provide you with personalized content and services. This Cookie Declaration explains what cookies are, how we use them, and your choices regarding their use.`
    },
    {
      id: 8,
      title: `8. What are Cookies?`,
      desc: `Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work or function more efficiently, as well as to provide information to website owners.`
    },
    {
      id: 9,
      title: `9. How We Use Cookies`,
      desc: `We use cookies for various purposes:
            Essential Cookies: These cookies are necessary for the basic functionality of our website. They enable you to navigate our site and use its features.
            Performance Cookies: These cookies collect information about how visitors use our website, such as which pages are visited most often. This data helps us improve our website's performance.
            Functional Cookies: These cookies allow our website to remember choices you make (such as your username, language, or region) and provide enhanced features.
            Advertising Cookies: We may use advertising cookies to deliver ads that are more relevant to your interests. These cookies help us measure the effectiveness of our advertising campaigns.
            `
    },
    {
      id: 10,
      title: `10. Your Choices`,
      desc: `You can control and manage cookies in various ways:
            Browser Settings: Most web browsers allow you to control cookies through their settings. You can usually find these settings in your browser's "Options" or "Preferences" menu.
            Third-Party Tools: There are several third-party tools and browser extensions available that allow you to manage cookies.
            Please note that if you disable or block certain cookies, some features of our website may not function correctly, and your user experience may be affected.
            `
    },
    {
      id: 11,
      title: `11. Cookie Declaration Updates`,
      desc: `We may update this Cookie Declaration to reflect changes in our use of cookies or for other operational, legal, or regulatory reasons. When we make changes, we will revise the "Effective Date" at the beginning of this Cookie Declaration.`
    }
  ],
};


const breadcrumbData = [
  {
    id: 0,
    text: t("Home"),
    action: () => {
      router.push({ name: "home" });
    },
  },
  { id: 1, text: t("Terms of use"), action: () => {} },
];
</script>
