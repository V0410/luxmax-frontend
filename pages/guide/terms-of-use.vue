<template>
    <div>
        <GuideTemplate :data="data" :breadcrumbData="breadcrumbData" />
    </div>
</template>

<script setup>
definePageMeta({
  name: "terms-of-use",
});
const { t } = useI18n();

const router = useRouter()
useHead({
  title: `LuxMax - Terms of use`,
  meta: [
    {
      name: 'title',
      content: `LuxMax Terms of Use`
    },
    {
      name: 'description',
      content: "Read the terms and conditions that govern using LuxMax services for buying, selling, repair and restoration of luxury designer goods."
    }
  ]
})
const data = {
  title: t("Points"),
  categories: [
    { id: 0, name: t("Terms of use"), text: t('Terms of use'), value: 0 },
  ],
  // desc: t("LuxMax Terms of Use"),
  main: [
    {
      id: 0,
      desc:`These Terms of Use ("Terms") govern your use of the LuxMax website, available at https://luxmax.co ("Website"), and any related services provided by LuxMax ("we," "us," "our") as further described herein. By accessing or using the Website, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use the Website.`
    },
    {
      id: 1,
      title: `1. Acceptance of Terms`,
      desc: `By accessing or using the Website, you affirm that you are of legal age to enter into these Terms in your jurisdiction, or you have obtained parental or guardian consent if required. You also affirm that you have read, understood, and agree to be bound by these Terms.`
    },
    {
      id: 2,
      title: `2. Changes to Terms`,
      desc: `LuxMax reserves the right to modify, revise, or update these Terms at any time. Changes to these Terms will be effective upon posting on the Website. Your continued use of the Website after such changes constitute your acceptance of the updated Terms.`
    },
    {
      id: 3,
      title: `3. User Registration`,
      desc: `To access certain features and services on the Website, you may be required to create a user account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.`
    },
    {
      id: 4,
      title: `4. User Content`,
      desc: `You may submit or provide content, including but not limited to images, text, and other materials ("User Content") while using the Website. By submitting User Content, you grant LuxMax a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such User Content on the Website.
            You are solely responsible for the User Content you submit, and you represent and warrant that you have all necessary rights to submit such content and that your User Content does not violate any applicable laws or infringe upon the rights of any third party.`
    },
    {
      id: 5,
      title: `5. Prohibited Conduct`,
      desc: `While using the Website, you agree not to engage in any of the following prohibited activities:
            - Violating any applicable laws or regulations.
            - Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity.
            - Collecting or storing personal data about other users without their express consent.
            - Attempting to gain unauthorized access to or disrupt the integrity or performance of the Website or related systems.
            - Posting, transmitting, or sharing any content that is harmful, defamatory, obscene, infringing, or otherwise objectionable.
            `
    },
    {
      id: 6,
      title: `6. Privacy Policy`,
      desc: `Your use of the Website is also governed by our Privacy Policy, which is incorporated by reference into these Terms. You can review our Privacy Policy at [link to privacy policy].`
    },
    {
      id: 7,
      title: `7. Intellectual Property`,
      desc: `All content, trademarks, logos, and intellectual property displayed on the Website are owned by LuxMax or its licensors. You may not use, reproduce, or distribute any content from the Website without our prior written consent.`
    },
    {
      id: 8,
      title: `8. Termination`,
      desc: `LuxMax reserves the right to terminate or suspend your access to the Website, without notice, for any reason, including if we believe you have violated these Terms.`
    },
    {
      id: 9,
      title: `9. Disclaimer of Warranties`,
      desc: `The Website and its content are provided on an "as-is" and "as available" basis. LuxMax makes no representations or warranties of any kind, express or implied, regarding the Website's availability, accuracy, completeness, or fitness for a particular purpose.`
    },
    {
      id: 10,
      title: `10. Limitation of Liability`,
      desc: `To the fullest extent permitted by applicable law, LuxMax shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Website or these Terms.`
    },
    {
      id: 11,
      title: `11. Governing Law and Jurisdiction`,
      desc: `These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any dispute arising from or relating to these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].`
    },
    {
      id: 12,
      title: `12. Contact Information`,
      desc: `If you have any questions or concerns regarding these Terms, please contact us at support@luxmax.ai`
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
