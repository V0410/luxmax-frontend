<template>
    <div>
        <GuideTemplate :data="data" :breadcrumbData="breadcrumbData" />
    </div>
</template>

<script setup>
definePageMeta({
  name: "cookie",
});
const { t } = useI18n();

useHead({
  title: `LuxMax - Cookie`,
  meta: [
    {
      name: 'title',
      content: 'LuxMax Cookie Consent Policy'
    },
    {
      name: 'description',
      content: "Our cookie policy outlines the data we collect to improve the LuxMax service and repair booking experience."
    }
  ]
})

const router = useRouter()

const data = {
  title: t("Points"),
  categories: [
    { id: 0, name: t("Your Rights"), text: t('Your Rights'), value: 0 },
    { id: 1, name: t("Cookie Declaration"), text: t('Cookie Declaration'), value: 1 },
  ],
  main: [
    {
      id: 0,
      title: t("Privacy Notice"),
      desc: t(
        `Your Rights
When using our website and submitting personal data to us, you may have certain rights under the General Data Protection Regulation (GDPR) and other laws. Depending on the legal basis for processing your personal data, you may have some or all of the following rights:
The right to be informedYou have the right to be informed about the personal data we collect from you, and how we process it.
The right of accessYou have the right to get confirmation that your personal data is being processed and have the ability to access your personal data.
The right to rectificationYou have the right to have your personal data corrected if it is inaccurate or incomplete.
The right to erasure (right to be forgotten)You have the right to request the removal or deletion of your personal data if there is no compelling reason for us to continue processing it.
The right to restrict processingYou have a right to 'block' or restrict the processing of your personal data. When your personal data is restricted, we are permitted to store your data, but not to process it further.
The right to data portabilityYou have the right to request and get your personal data that you provided to us and use it for your own purposes. We will provide your data to you within 30 days of your request. To request your personal data, please contact us using the information at the top of this privacy notice .
The right to objectYou have the right to object to us processing your personal data for the following reasons:
Processing was based on legitimate interests or the performance of a task in the public interest/exercise of official authority (including profiling);
direct marketing (including profiling);
Processing for purposes of scientific/historical research and statistics.
Rights in relation to automated decision-making and profiling.
AUTOMATED INDIVIDUAL DECISION-MAKING AND PROFILING
You will have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or similarly significantly affects you.
FILING A COMPLAINT WITH AUTHORITIES
You have the right to file a complaint with supervisory authorities if your information has not been processed in compliance with the General Data Protection Regulation. If the supervisory authorities fail to address your complaint properly, you may have the right to a judicial remedy.
For details about your rights under the law, visit https://goo.gl/F41vAV
DEFINITIONS
'Non-personal data' (NPD) is information that is in no way personally identifiable.
'Personal data' (PD) means any information relating to an identified or identifiable natural person ('data subject'); an identifiable natural person is one who can be identified, directly or indirectly, by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person. Personal Data is in many ways the same as Personally Identifiable Information (PII). However, Personal Data is broader in scope and covers more data.
A “visitor” is someone who merely browses our website. A "member" is someone who has registered with us to use or buy our services and products. The term “user” is a collective identifier that refers to either a visitor or a member.
Information We Collect
Generally, you control the amount and type of information that you provide to us when using our website.

Cookie Declaration
This website uses cookies. We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you've provided to them or that they've collected from your use of their services.
Cookies are small text files that can be used by websites to make a user's experience more efficient.The law states that we can store cookies on your device if they are strictly necessary for the operation of this site. For all other types of cookies we need your permission.This site uses different types of cookies. Some cookies are placed by third party services that appear on our pages.
Your consent applies to the following domains: www.smashingmagazine.com

Cookie declaration last updated on 8/1/23 by Cookiebot :`
      ),
    },
    {
      id: 1,
      tableData: {
        head: [
          t("Surname"),
          t("providers"),
          t('purpose'),
          t("expiration"),
          t("Type"),
        ],
        body: [
          ["__cf_bm [x6]", "Digital Oceanarduino. ccCodepenPexelsPixabayVimeo", "This cookie is used to distinguish between humans and bots. This is beneficial for the website, in order to make valid reports on the use of their website.", "1 day", "HTTP cookies"],
        ],
      },
    },
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
  { id: 1, text: t("Cookie"), action: () => {} },
];
</script>
