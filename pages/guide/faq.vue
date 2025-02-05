<template>
  <div ref="container" class="base-container">
    <div
      class="w-full bg-faq bg-right h-[200px] laptop:h-[320px] bg-no-repeat bg-cover relative laptop:flex justify-center"
    >
      <div class="bg-black bg-opacity-20 h-full w-full">
        <div
          class="gridClass laptop:max-w-[1096px] mx-auto flex h-full text-center laptop:text-start text-white py-12 flex-col gap-1"
        >
          <div
            class="font-static lowercase font-bold text-[32px] laptop:text-[68px]"
            v-text="$t('FAQ')"
          />
          <h1
            class="text-[20px] laptop:text-[38px] laptop:max-w-[622px] font-medium"
            v-text="$t('frequently asked questions')"
          />
        </div>
      </div>
    </div>
    <div class="gridClass laptop:max-w-[1096px] mx-auto my-8 laptop:hidden">
      <BaseBreadcrumb :dataArray="breadcrumbData" class="w-full" />
    </div>
    <div
      class="gridClass laptop:max-w-[1096px] mx-auto mt-8 mb-20 flex flex-col gap-8 laptop:gap-20"
    >
      <div
        class="flex flex-col gap-4 items-center laptop:px-20 max-w-[872px] mx-auto w-full"
      >
        <div
          class="text-black text-[22px] laptop:text-[28px]"
          v-text="$t('What is your question')"
        />
        <BaseInputSearch v-model="searchText" noErrorMessage class="w-full" :maxlength="50" />
      </div>
      <div
        v-if="data && Array.isArray(data) && data.length > 0 && !searchText"
        class="w-full flex flex-col items-center gap-4"
      >
        <div
          class="text-black text-[22px] laptop:text-[28px]"
          v-text="$t('Categories')"
        />
        <div class="flex flex-row gap-6 justify-center flex-wrap">
          <GuideFaqCategory
            v-for="category in data"
            :key="category.id"
            :icon="category.icon"
            :text="category.title"
            :isSelected="selectedCategory === category.id"
            @click="
              selectedCategory === category.id
               ? (selectedCategory = null)
                : (selectedCategory = category.id)
            "
            class="cursor-pointer"
            :class="selectedCategory && (selectedCategory !== category.id)? 'hidden laptop:flex' : ''"
          />
        </div>
      </div>
      <div id="container" v-if="dataToShow && Array.isArray(dataToShow) && dataToShow.length > 0" class="flex flex-col gap-12">
        <div
          v-for="category in dataToShow"
          :key="category.id"
          class="flex flex-col gap-4"
        >
          <template
            v-if="
              category &&
              category.childs &&
              Array.isArray(category.childs) &&
              category.childs.length > 0
            "
          >
            <div class="flex gap-6 items-center">
              <div
                class="text-[24px] laptop:text-[28px]"
                v-text="category.title"
              />
              <div class="flex-grow border-b border-p5" />
            </div>
            <template v-for="question in category.childs" :key="question.id">
              <GuideFaqQuestionRow
                v-if="question.title && question.desc"
                v-show="searchText? isStringIncludesSearchText([question.title, question.desc], searchText) : true"
                v-model="question.isShow"
                :question="question"
              />
            </template>
          </template>
        </div>
      </div>
      <div v-else class="flex flex-col gap-6 items-center text-lg text-p8">
        <IconEmptyFaq class="w-full laptop:w-[280px] laptop:h-[280px]" />
        <div v-text="$t(`Oops! It seems we didn't find any results for the keyword you searched`)" />
        <div v-text="$t(`Feel free to reach out our support team, and we'll help you find what you're looking for.`)" />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  name: "faq",
});
const { t } = useI18n();

useHead({
  title: `LuxMax - FAQ`,
  meta: [
    {
      name: 'title',
      content: 'LuxMax FAQs - Luxury Repair Experts'
    },
    {
      name: 'description',
      content: "Find answers to frequent questions about LuxMax's unique luxury repair and restoration services, process and pricing."
    }
  ]
})

const searchText = ref('')

const selectedCategory = ref("");

const myHilitor = new Hilitor("container")

const dataToShow = computed(() => {
    myHilitor.apply(searchText.value);
    if(searchText.value){
        data.forEach(cat => cat.childs.forEach(el=> { el.isShow = true}))
        return data.filter(cat => cat.childs.some(el => isStringIncludesSearchText([el.title, el.desc], searchText.value)))
    }
    else if(selectedCategory.value){
        data.forEach(cat => cat.childs.forEach(el=> { el.isShow = false}))
        return data.filter(category => category.id === selectedCategory.value)
    }
    else {    
        data.forEach(cat => cat.childs.forEach(el=> { el.isShow = false}))
        return data
    }
})

const isStringIncludesSearchText = (stringsArr, text) => {
    return stringsArr.filter(string => string.toLowerCase().includes(text?.toLowerCase())).length > 0
}

const data = reactive([
  {
    id: 100000,
    icon: "IconNeedle",
    title: t("Repair"),
    childs: [
      {
        id: 0,
        title: t(`How do I initiate a repair service with LuxMax?`),
        isShow: false,
        desc: t(
          `To start a repair service with LuxMax, simply click on the "Repair" button in the header, footer, or banners on our website. You'll be guided through the identification process.`
        ),
      },
      {
        id: 1,
        title: t(`What is the identification process for repair service?`),
        isShow: false,
        desc: t(
          `During the identification process, you'll first choose the category of your product (Bag, Shoe, or Ready to Wear) and upload photos. LuxMax AI will analyze these images to gather information like brand, model, color, size, and repair issues. You'll have the opportunity to confirm each data point.`
        ),
      },
      {
        id: 2,
        title: t(`How is the initial repair cost determined?`),
        isShow: false,
        desc: t(
          `Based on the information collected during the identification process, LuxMax provides an estimated repair cost. Please note that this is a non-exact price and may change after a thorough examination by our experts.`
        ),
      },
      {
        id: 3,
        title: t(`What's the payment process for repair services?`),
        isShow: false,
        desc: t(
          `After receiving the initial repair cost estimate, you'll be required to pay 25% of the cost to initiate the repair process. Once LuxMax experts assess your product in person, you'll receive the exact repair cost. You can then choose to proceed with the repair by paying the remaining amount.`
        ),
      },
      {
        id: 4,
        title: t(`How do I send my product to LuxMax for repair?`),
        isShow: false,
        desc: t(
          `After making the initial payment, you'll need to securely package your product and send it to LuxMax. We recommend using a reliable shipping partner.`
        ),
      },
      {
        id: 5,
        title: t(`What happens after LuxMax receives my product for repair?`),
        isShow: false,
        desc: t(
          `Upon receiving your product, LuxMax experts will conduct a comprehensive assessment. They will provide you with the exact repair cost. You can then decide whether to proceed with the repair or have your product returned.`
        ),
      },
      {
        id: 6,
        title: t(`How long does the repair process usually take?`),
        isShow: false,
        desc: t(
          `Repair timelines can vary depending on the complexity of the work required. LuxMax will provide you with an estimated completion date once the assessment is complete.`
        ),
      },
      {
        id: 7,
        title: t(
          `What if I decide not to repair my product after the assessment?`
        ),
        isShow: false,
        desc: t(
          `If you choose not to proceed with the repair after the assessment, LuxMax will promptly return your product to the origin address.`
        ),
      },
      {
        id: 8,
        title: t(
          `Is LuxMax responsible for any damage that occurs during shipping to their facilities?`
        ),
        isShow: false,
        desc: t(
          `LuxMax is not responsible for any damage that occurs during shipping to our facilities. We recommend using a trusted shipping partner and secure packaging.`
        ),
      },
      {
        id: 9,
        title: t(
          `How can I contact LuxMax for further assistance with my repair service?`
        ),
        isShow: false,
        desc: t(
          `If you have any additional questions or need assistance with your repair service, please use the "Contact Us" section on our website or app. Our customer support team is here to help.`
        ),
      },
      {
        id: 10,
        title: t(`Is there a warranty on repairs conducted by LuxMax?`),
        isShow: false,
        desc: t(
          `Yes, LuxMax offers a warranty on all repair services. We stand behind the quality of our work, and if you encounter any issues related to the repair, please contact our customer support for assistance.`
        ),
      },
      {
        id: 11,
        title: t(`How can I track the progress of my repair order?`),
        isShow: false,
        desc: t(
          `You can track the progress of your repair order by logging into your LuxMax account. We provide updates on the status of your repair, from assessment to completion.`
        ),
      },
      {
        id: 12,
        title: t(
          `What if my product requires additional repairs not initially identified?`
        ),
        isShow: false,
        desc: t(
          `In the rare event that additional repairs are needed, LuxMax will contact you to discuss the necessary adjustments to the repair cost and get your approval before proceeding.`
        ),
      },
      {
        id: 13,
        title: t(
          `Can I cancel a repair request after sending my product to LuxMax?`
        ),
        isShow: false,
        desc: t(
          `Yes, you can cancel a repair request at any time before our experts begin the repair work. Please contact our customer support team to initiate the cancellation process.`
        ),
      },
      {
        id: 14,
        title: t(
          `What safety measures are in place to protect my product during the repair process?`
        ),
        isShow: false,
        desc: t(
          `LuxMax takes security seriously. We have stringent protocols in place to ensure the safety and security of your luxury goods throughout the entire repair process. Our expert team is committed to handling your items with the utmost care and attention to detail.`
        ),
      },
    ],
  },
  {
    id: 1,
    icon: "IconLightning",
    title: t("Instant Sell"),
    childs: [
      {
        id: 0,
        title: t(`What is LuxMax Instant Sell?`),
        isShow: false,
        desc: t(
          `LuxMax Instant Sell is a service that allows you to sell your luxury product to LuxMax quickly and easily, even if it has minor issues.`
        ),
      },
      {
        id: 1,
        title: t(`How do I initiate an Instant Sell with LuxMax?`),
        isShow: false,
        desc: t(
          `You can start an Instant Sell by clicking on the designated links on LuxMax.ai and following the Identify process. If your product qualifies, LuxMax will make you an instant offer.`
        ),
      },
      {
        id: 2,
        title: t(`What happens during the Identify process for Instant Sell?`),
        isShow: false,
        desc: t(
          `During the Identify process, LuxMax's AI examines your product to determine its condition and value. If it qualifies for Instant Sell, you'll receive an offer.`
        ),
      },
      {
        id: 3,
        title: t(
          `Can I request an Instant Sell offer for a product I want to repair or sell in the LuxMax marketplace?`
        ),
        isShow: false,
        desc: t(
          `Yes, if LuxMax's AI or experts determine that your product qualifies for Instant Sell during the Identify process or in your My Items page, you'll be presented with the option to sell it instantly.`
        ),
      },
      {
        id: 4,
        title: t(`How is the Instant Sell price determined?`),
        isShow: false,
        desc: t(
          `The Instant Sell price is based on the condition, brand, model, and market demand for your product. LuxMax's AI and experts assess these factors to provide a fair offer.`
        ),
      },
      {
        id: 5,
        title: t(`What happens after I accept the Instant Sell offer?`),
        isShow: false,
        desc: t(
          `Once you accept the offer, LuxMax will send you instructions on how to ship your product to them. After a final assessment by LuxMax's experts, you'll receive payment.`
        ),
      },
      {
        id: 6,
        title: t(
          `Is there a cost associated with shipping my product to LuxMax for Instant Sell?`
        ),
        isShow: false,
        desc: t(
          `You are responsible for the shipping cost to send your product to LuxMax. However, if the product meets the offer criteria, LuxMax will reimburse your shipping cost.`
        ),
      },
      {
        id: 7,
        title: t(
          `What if I change my mind after accepting the Instant Sell offer?`
        ),
        isShow: false,
        desc: t(
          `you change your mind before sending your product to LuxMax, you can contact our support team to cancel the Instant Sell process.`
        ),
      },
      {
        id: 8,
        title: t(
          `How long does it take to receive payment after accepting the Instant Sell offer?`
        ),
        isShow: false,
        desc: t(
          `Payment is typically processed within a few business days after LuxMax receives and verifies your product.`
        ),
      },
      {
        id: 9,
        title: t(
          `What happens if my product does not meet the criteria for Instant Sell upon inspection by LuxMax's experts?`
        ),
        isShow: false,
        desc: t(
          `If your product doesn't meet the criteria, LuxMax will notify you, and you can choose to proceed with repair or explore other options such as selling in the marketplace.`
        ),
      },
      {
        id: 10,
        title: t(
          `Is there a limit to the number of products I can Instantly Sell to LuxMax?`
        ),
        isShow: false,
        desc: t(
          `There is no set limit, and you can initiate Instant Sell for multiple products if they meet the eligibility criteria.`
        ),
      },
      {
        id: 11,
        title: t(`Can I Instantly Sell a product that is not a luxury item?`),
        isShow: false,
        desc: t(
          `Instant Sell is primarily for luxury items. LuxMax will evaluate each product's eligibility on a case-by-case basis.`
        ),
      },
      {
        id: 12,
        title: t(
          `What types of products are typically eligible for Instant Sell?`
        ),
        isShow: false,
        desc: t(
          `Products that are in good condition and have demand in the luxury market are usually eligible. Common items include designer handbags, shoes, and clothing.`
        ),
      },
      {
        id: 13,
        title: t(`Is the Instant Sell offer negotiable?`),
        isShow: false,
        desc: t(
          `The Instant Sell offer is determined based on market conditions and LuxMax's assessment. It is not typically negotiable.`
        ),
      },
      {
        id: 14,
        title: t(
          `Can I use the Instant Sell service if I am located outside of LuxMax's operating region?`
        ),
        isShow: false,
        desc: t(
          `LuxMax's Instant Sell service is available to customers within our operating region. Please check our website for the list of supported locations.`
        ),
      },
    ],
  },
  {
    id: 2,
    icon: "IconTagSingle",
    title: t("Repair & Sell"),
    childs: [
      {
        id: 0,
        title: t(`What is the LuxMax "Repair and Sell" service?`),
        isShow: false,
        desc: t(
          `The LuxMax "Repair and Sell" service allows users to request a repair for their luxury product and subsequently list it for sale in the LuxMax marketplace.`
        ),
      },
      {
        id: 1,
        title: t(`How do I initiate a "Repair and Sell" request with LuxMax?`),
        isShow: false,
        desc: t(
          `You can start a "Repair and Sell" request by clicking on the designated links on LuxMax.ai and following the Identify process. If your product is eligible, LuxMax will suggest this option.`
        ),
      },
      {
        id: 2,
        title: t(
          `What happens during the Identify process for "Repair and Sell"?`
        ),
        isShow: false,
        desc: t(
          `During the Identify process, LuxMax's AI and experts assess your product's condition and market potential. If it's suitable for "Repair and Sell," you'll be presented with this option.`
        ),
      },
      {
        id: 3,
        title: t(
          `Can I request "Repair and Sell" for a product I initially wanted to repair only?`
        ),
        isShow: false,
        desc: t(
          `Yes, LuxMax may suggest the "Repair and Sell" option if your product is deemed suitable after the Identify process or expert examination.`
        ),
      },
      {
        id: 4,
        title: t(
          `How is the selling price determined for "Repair and Sell" items?`
        ),
        isShow: false,
        desc: t(
          `When listing your product in the LuxMax marketplace, you'll be guided by LuxMax's AI to set a fair selling price. You can also provide insights about your product to attract potential buyers.`
        ),
      },
      {
        id: 5,
        title: t(
          `What percentage of the repair cost do I need to pay upfront for "Repair and Sell"?`
        ),
        isShow: false,
        desc: t(
          `To proceed with "Repair and Sell," you are required to pay 25% of the overall repair cost upfront.`
        ),
      },
      {
        id: 6,
        title: t(`How do I pay the upfront cost for "Repair and Sell"?`),
        isShow: false,
        desc: t(
          `LuxMax will provide payment instructions once you decide to use the "Repair and Sell" option. Payment methods may vary based on your location.`
        ),
      },
      {
        id: 7,
        title: t(
          `What happens if my product does not qualify for "Repair and Sell" after expert examination?`
        ),
        isShow: false,
        desc: t(
          `If your product does not meet the criteria for "Repair and Sell," LuxMax will inform you, and you can choose to proceed with repair or explore other options.`
        ),
      },
      {
        id: 8,
        title: t(
          `Can I change the selling price of my product in the LuxMax marketplace after it's listed?`
        ),
        isShow: false,
        desc: t(
          `Yes, you can adjust the selling price of your product in the LuxMax marketplace if you believe a different price would be more suitable.`
        ),
      },
      {
        id: 9,
        title: t(
          `How long does it take for a "Repair and Sell" item to sell in the LuxMax marketplace?`
        ),
        isShow: false,
        desc: t(
          `The time it takes for an item to sell varies depending on factors such as demand and market conditions. LuxMax will notify you once your product is sold.`
        ),
      },
      {
        id: 10,
        title: t(
          `Can I track the status of my "Repair and Sell" items on the LuxMax platform?`
        ),
        isShow: false,
        desc: t(
          `Yes, you can monitor the status of your items, including those listed for "Repair and Sell," in the "My Items" section of your LuxMax account.`
        ),
      },
      {
        id: 11,
        title: t(
          `Is there a limit to the number of products I can list for "Repair and Sell" with LuxMax?`
        ),
        isShow: false,
        desc: t(
          `There is typically no set limit, and you can list multiple products for "Repair and Sell" if they meet the eligibility criteria.`
        ),
      },
      {
        id: 12,
        title: t(
          `Can I list items for "Repair and Sell" with LuxMax even if I don't know the exact repair cost?`
        ),
        isShow: false,
        desc: t(
          `Yes, you can list items for "Repair and Sell" without knowing the exact repair cost. LuxMax's AI will provide an estimated cost during the listing process. After expert examination, the precise repair cost will be determined, and you can decide whether to proceed with the repair or choose another option based on the final cost.`
        ),
      },
      {
        id: 13,
        title: t(
          `What happens if my "Repair and Sell" item is damaged during shipping to the buyer?`
        ),
        isShow: false,
        desc: t(
          `Any damage occurring during shipping is typically the responsibility of the shipping service. LuxMax is not liable for damage caused during transit.`
        ),
      },
      {
        id: 14,
        title: t(
          `Can I cancel a "Repair and Sell" listing in the LuxMax marketplace if I change my mind?`
        ),
        isShow: false,
        desc: t(
          `If you decide to remove your item from the LuxMax marketplace, you can do so by accessing your account settings and selecting the appropriate option.`
        ),
      },
    ],
  },
  {
    id: 3,
    icon: "IconHandCoins",
    title: t("Sell in Marketplace"),
    childs: [
      { id: 0, title: t(`How do I list my luxury product for sale without repair on LuxMax?`), isShow: false, desc: t(`To list your luxury product for sale without repair, you first need to complete the identification process on LuxMax. At the end of the process, you can submit a price and include any additional notes to help in the selling process.`) },
      { id: 1, title: t(`Can I adjust the selling price for my item after listing it without repair?`), isShow: false, desc: t(`Yes, you can adjust the selling price of your item after listing it without repair. Simply log in to your LuxMax account, go to "My Items," and edit the listing to update the price or any other relevant information.`) },
      { id: 2, title: t(`How does LuxMax assist me in setting the selling price for my item?`), isShow: false, desc: t(`LuxMax's AI provides guidance in setting the selling price for your item. It analyzes market trends and the condition of your product to suggest a competitive and fair price that will attract potential buyers.`) },
      { id: 3, title: t(`Can I see the buyer's name and address after my product is purchased without repair on LuxMax?`), isShow: false, desc: t(`Yes, as a seller, you will have access to the buyer's name and shipping address after your product is purchased without repair on LuxMax. This information is provided to facilitate the shipping process, ensuring you can send the product securely to the buyer's provided address. Having this information allows sellers to fulfill orders promptly and accurately.`) },
      { id: 4, title: t(`How do I ship my product to the buyer after it's sold without repair?`), isShow: false, desc: t(`As a seller, it's your responsibility to ship the product to the buyer after it's sold. LuxMax does not handle the shipping process. Ensure you package and send the item securely to the buyer's provided address.`) },
      { id: 5, title: t(`What happens to the payment from the buyer when my item is sold without repair?`), isShow: false, desc: t(`When your item is sold, the payment from the buyer is temporarily blocked by LuxMax. It will be released to you once the buyer confirms receipt of the product and is satisfied with the purchase.`) },
      { id: 6, title: t(`Can buyers leave comments and ratings for my product when sold without repair?`), isShow: false, desc: t(`Yes, buyers can leave comments and ratings for your product when it's sold without repair. Positive feedback can help build your reputation as a trusted seller on LuxMax.`) },
      { id: 7, title: t(`How can I check the status of my products listed for sale without repair on LuxMax?`), isShow: false, desc: t(`You can check the status of your products listed for sale without repair by logging into your LuxMax account and visiting the "My Items" page. Here, you can monitor the status of all your listings.`) },
      { id: 8, title: t(`Is there a fee for listing products for sale without repair on LuxMax?`), isShow: false, desc: t(`LuxMax may charge a nominal listing fee for products listed for sale without repair. Please refer to our fee structure for more details, which can be found on our website.`) },
      { id: 9, title: t(`What happens if a buyer is dissatisfied with the product they purchased without repair on LuxMax?`), isShow: false, desc: t(`If a buyer is dissatisfied with their purchase, LuxMax encourages them to reach out to the seller to discuss potential solutions. LuxMax is committed to ensuring a positive buying experience for all users, and disputes can be resolved with assistance from our customer support team if necessary.`) },
    ],
  },
  {
    id: 4,
    icon: "IconShoppingBagSingle",
    title: t("Buy a Product"),
    childs: [
      { id: 0, title: t(`How can I browse and buy products on LuxMax's marketplace?`), isShow: false, desc: t(`To browse and purchase products on LuxMax's marketplace, simply visit the "Marketplace" page on our website. There, you can explore a wide range of luxury items such as bags, shoes, and ready-to-wear products from various sellers.`) },
      { id: 1, title: t(`Can I filter products based on specific criteria, such as price or brand?`), isShow: false, desc: t(`Yes, LuxMax offers various filters that allow you to refine your product search. You can filter products based on price range, category, brand, color, size, and more, making it easier to find exactly what you're looking for.`) },
      { id: 2, title: t(`How do I view detailed information about a product before making a purchase?`), isShow: false, desc: t(`Simply click on the product you're interested in to access its detailed product page. There, you'll find information about the product description, seller's note, product details, carbon footprint data, and the product's condition tag (e.g., "good" or "like new").`) },
      { id: 3, title: t(`What is the "carbon footprint" information provided for each product?`), isShow: false, desc: t(`LuxMax is committed to sustainability. We provide carbon footprint data for each product to help environmentally conscious buyers make informed choices. This information indicates the product's environmental impact.`) },
      { id: 4, title: t(`How does LuxMax handle payments for products sold by LuxMax itself?`), isShow: false, desc: t(`If LuxMax is the seller, you can complete your purchase by making a payment directly on our website. Once payment is confirmed, we will promptly ship the product to you.`) },
      { id: 5, title: t(`What is the process for payments when buying from other sellers on LuxMax's marketplace?`), isShow: false, desc: t(`For products sold by other sellers, you will make a payment to LuxMax, and we will hold the payment securely until you receive the product. Once you confirm receipt and satisfaction with the product, LuxMax will release the payment to the seller.`) },
      { id: 6, title: t(`Can I leave a review or rating for products I've purchased on LuxMax?`), isShow: false, desc: t(`Yes, we encourage buyers to leave reviews and ratings for products they've purchased. Your feedback helps other buyers make informed decisions and ensures transparency in our marketplace.`) },
      { id: 7, title: t(`What happens if I encounter any issues with my purchase or the product I've bought?`), isShow: false, desc: t(`If you experience any issues or have concerns about your purchase, please contact our customer support team. We're here to assist you and resolve any problems promptly.`) },
      { id: 8, title: t(`Is there a return policy for products purchased on LuxMax?`), isShow: false, desc: t(`LuxMax's return policy may vary depending on the seller. Please check the individual product listing for information about returns and exchanges. If you have questions, feel free to reach out to our customer support team for guidance.`) },
      { id: 9, title: t(`Are products on LuxMax's marketplace guaranteed to be authentic luxury items?`), isShow: false, desc: t(`LuxMax is committed to ensuring the authenticity of products listed on our marketplace. We work diligently to verify the authenticity of luxury items, providing you with peace of mind when making a purchase.`) },
      { id: 10, title: t(`Can I save products I'm interested in and come back to them later?`), isShow: false, desc: t(`Yes, you can save products to your "Wishlist" for future reference. This feature allows you to keep track of items you're considering for purchase.`) },
      { id: 11, title: t(`How can I track the status of my orders and purchases on LuxMax?`), isShow: false, desc: t(`To track the status of your orders and purchases, visit the "Buy History" page in your LuxMax account. This page provides updates on the progress of your purchases.`) },
      { id: 12, title: t(`Can I contact the seller directly if I have questions about a product before buying it?`), isShow: false, desc: t(`Yes, you can contact the seller directly through LuxMax's messaging system. If you have questions or need additional information about a product, feel free to reach out to the seller for clarification.`) },
      { id: 13, title: t(`Is there a customer support team available to assist with any issues or inquiries I may have during my shopping experience?`), isShow: false, desc: t(`Absolutely! LuxMax's customer support team is here to assist you with any questions or concerns you may have. You can reach out to us at any time for help.`) },
      { id: 14, title: t(`What happens if I change my mind about a purchase after completing payment?`), isShow: false, desc: t(`LuxMax's return and cancellation policies may vary depending on the seller. Please review the individual product listing and seller's policies for information regarding cancellations and returns. If you have specific concerns, contact our customer support team for guidance.`) }
    ],
  },
  {
    id: 5,
    icon: "IconScan",
    title: t("Identify"),
    childs: [
      { id: 0, title: t(`What is LuxMax's "Identify Products by AI" feature?`), isShow: false, desc: t(`LuxMax's "Identify Products by AI" is a powerful tool that allows users to effortlessly identify and catalog their luxury items, including bags, shoes, and ready-to-wear products. Our AI system assists in extracting key product details.`) },
      { id: 1, title: t(`How does the AI identification process work?`), isShow: false, desc: t(`The process begins when users select the category of their product, upload photos, and let our AI system analyze the images. The AI then identifies essential product details, such as brand, model, color, size, and more.`) },
      { id: 2, title: t(`What do I do if the AI successfully identifies my product's details?`), isShow: false, desc: t(`If the AI successfully identifies your product's details, you can review each piece of information presented and approve it. Make any necessary changes or corrections as needed.`) },
      { id: 3, title: t(`What if the AI is unable to identify my product from the images I provided?`), isShow: false, desc: t(`If the AI cannot identify your product from the images, you have several options. You can search for your product name among all brand products to assist the AI. If that doesn't work, you can manually submit the product details.`) },
      { id: 4, title: t(`How accurate is LuxMax's AI in identifying products?`), isShow: false, desc: t(`LuxMax's AI system is highly accurate and can identify products in approximately 97% of cases. However, there is a small margin for error in about 3% of cases.`) },
      { id: 5, title: t(`What types of products can be identified using this AI feature?`), isShow: false, desc: t(`Currently, LuxMax's AI can identify products in the categories of bags, shoes, and ready-to-wear items. In the future, we plan to expand to include accessories.`) },
      { id: 6, title: t(`How long does it take for the AI to process and identify a product?`), isShow: false, desc: t(`The AI identification process is typically quite quick, taking only a few moments to provide accurate product details.`) },
      { id: 7, title: t(`Can I trust the AI's identification results?`), isShow: false, desc: t(`Yes, you can trust LuxMax's AI identification results. Our system has been trained on a vast dataset of luxury products to ensure accuracy and reliability.`) },
      { id: 8, title: t(`Is it possible to review and confirm the AI's findings before finalizing the product details?`), isShow: false, desc: t(`Absolutely. LuxMax values user input, and you have the opportunity to review and confirm each piece of information identified by the AI before finalizing the product details.`) },
      { id: 9, title: t(`Can I use the AI identification feature for products that are not brand new or from past years?`), isShow: false, desc: t(`Yes, you can use the AI identification feature for a wide range of products, including those that may be older or from past years. LuxMax's AI system is designed to accommodate various product ages.`) },
      { id: 10, title: t(`What happens after I've successfully identified my product with the AI?`), isShow: false, desc: t(`Once you've successfully identified your product using the AI, you can proceed with various actions, such as selling, repairing, or listing your item in the LuxMax marketplace, depending on your preferences.`) },
      { id: 11, title: t(`Can I make changes to the identified product details if needed?`), isShow: false, desc: t(`Yes, you have full control over the identified product details. You can make changes or edits as necessary to ensure accuracy.`) },
      { id: 12, title: t(`Is there a cost associated with using the AI identification feature?`), isShow: false, desc: t(`LuxMax's AI identification feature is provided to users free of charge. There are no additional costs for using this valuable tool.`) },
      { id: 13, title: t(`What should I do if I encounter any issues or inaccuracies with the AI's identification results?`), isShow: false, desc: t(`If you come across any issues or inaccuracies with the AI's identification results, please reach out to our customer support team. We're here to assist you with any concerns.`) },
      { id: 14, title: t(`How can I access the AI identification feature on LuxMax's platform?`), isShow: false, desc: t(`To access the AI identification feature, simply visit LuxMax's website and click on the "Identify Products" option. From there, you can start the identification process by selecting the product category and uploading images.`) },
    ],
  },
  {
    id: 6,
    icon: "IconSignIn",
    title: t("Login & Register"),
    childs: [
      { id: 0, title: t(`Do I need to register to use LuxMax's services?`), isShow: false, desc: t(`Yes, registration is required to access LuxMax's services. You can easily register using your email address.`) },
      { id: 1, title: t(`How can I register for a LuxMax account?`), isShow: false, desc: t(`To register for a LuxMax account, simply click on the "Register" option and follow the prompts. You'll need to provide your email address and create a secure password.`) },
      { id: 2, title: t(`Can I use LuxMax's services without logging in or registering?`), isShow: false, desc: t(`While some features, such as browsing products, can be accessed without logging in, you will need to log in or register when you decide to initiate services like product identification, repair requests, or selling items.`) },
      { id: 3, title: t(`Is my personal information safe when I register with LuxMax?`), isShow: false, desc: t(`Yes, LuxMax takes data security seriously. Your personal information is kept secure, and we have robust measures in place to protect your data.`) },
      { id: 4, title: t(`What are the benefits of registering with LuxMax?`), isShow: false, desc: t(`Registering with LuxMax allows you to access a range of services, including product identification, repair requests, and selling items. It also enables a smoother checkout process for purchases.`) },
      { id: 5, title: t(`I forgot my password. How can I reset it?`), isShow: false, desc: t(`If you've forgotten your password, simply click on the "Forgot Password" option on the login page. You'll receive instructions on how to reset your password via email.`) },
      { id: 6, title: t(`Can I change my registered email address later?`), isShow: false, desc: t(`Currently, LuxMax does not support changing your registered email address after registration. However, we are actively working on adding this feature in the future to provide more flexibility for our users.`) },
      { id: 7, title: t(`Is there a cost associated with registering for a LuxMax account?`), isShow: false, desc: t(`Registering for a LuxMax account is entirely free. There are no registration fees or hidden charges.`) },
      { id: 8, title: t(`What should I do if I encounter any issues with the registration process?`), isShow: false, desc: t(`If you experience any issues during the registration process, please reach out to our customer support team. We're here to assist you in resolving any concerns.`) },
      { id: 9, title: t(`Can I access my LuxMax account from multiple devices?`), isShow: false, desc: t(`Yes, you can access your LuxMax account from multiple devices. Simply log in using your registered email and password on any device to manage your account and use LuxMax's services.`) },
    ],
  },
  {
    id: 7,
    icon: "IconCreditCard",
    title: t("Payment"),
    childs: [
      { id: 0, title: t(`How can I pay for LuxMax services?`), isShow: false, desc: t(`LuxMax accepts payments through various methods, including credit cards, debit cards, and other online payment options. You can choose your preferred payment method during the checkout process.`) },
      { id: 1, title: t(`Is my payment information secure with LuxMax?`), isShow: false, desc: t(`Yes, LuxMax takes data security seriously. We use industry-standard encryption and security measures to protect your payment information. Your data is handled with the utmost care and confidentiality.`) },
      { id: 2, title: t(`Are there any additional fees for using LuxMax services?`), isShow: false, desc: t(`LuxMax is transparent about its pricing. Any additional fees, such as repair costs or service charges, will be clearly communicated to you before you complete your transaction. There are no hidden fees.`) },
      { id: 3, title: t(`Can I get a refund for the services I've paid for if I change my mind?`), isShow: false, desc: t(`LuxMax's refund policy varies depending on the service and stage of the process. Please review our refund policy for specific details. We aim to provide clarity on refund eligibility for each service.`) },
      { id: 4, title: t(`Are payment plans or installment options available for larger repair costs?`), isShow: false, desc: t(`LuxMax understands that repair costs for luxury items can vary. While we currently do not offer payment plans or installment options, we are continually working to improve our services. Please check our website or contact us for any updates on payment options.`) },
      { id: 5, title: t(`Can I see a breakdown of the charges before making a payment?`), isShow: false, desc: t(`Certainly. LuxMax provides a detailed breakdown of all charges, including service fees, repair costs, and any applicable taxes, before you make a payment. You will have a clear understanding of the charges associated with your transaction.`) },
      { id: 6, title: t(`Is my payment processed immediately, or is there a waiting period?`), isShow: false, desc: t(`Payment processing times may vary depending on the service you've chosen. Some services may require immediate payment, while others, such as repair services, may involve a two-step payment process. The exact payment process will be explained to you during your transaction.`) },
    ],
  },
  {
    id: 8,
    icon: "IconSignPost",
    title: t("Post"),
    childs: [
      { id: 0, title: t(`How do I send my product to LuxMax for identification or repair?`), isShow: false, desc: t(`To send your product to LuxMax, please follow the instructions provided after the identification process. LuxMax collaborates with a third-party company for package handling. Simply follow the shipping instructions, and your product will be on its way to us securely.`) },
      { id: 1, title: t(`How can I track the status of my package that I sent to LuxMax?`), isShow: false, desc: t(`You can track the status of your package by using the tracking information provided by the third-party shipping company. Once your package is received by LuxMax, you can also check the status in your LuxMax account under "My Items."`) },
      { id: 2, title: t(`Can I choose my preferred shipping carrier when sending my product to LuxMax?`), isShow: false, desc: t(`Currently, LuxMax collaborates with a specific third-party shipping company for package handling. Therefore, you cannot choose your preferred shipping carrier for sending your product to LuxMax.`) },
      { id: 3, title: t(`Is there any insurance provided for my package during transit to LuxMax?`), isShow: false, desc: t(`Yes, the third-party shipping company we work with typically provides insurance coverage for packages during transit. However, the extent of coverage may vary, so please refer to the shipping company's terms and conditions for specific details.`) },
      { id: 4, title: t(`What should I do if there are any issues or delays with the shipment of my product to LuxMax?`), isShow: false, desc: t(`In case of any issues or delays with the shipment of your product, please contact the third-party shipping company directly. They will be able to assist you with any concerns or inquiries regarding the transportation of your item to LuxMax.`) },
    ],
  },
  {
    id: 9,
    icon: "IconArrowUUpLeft",
    title: t("Return Product"),
    childs: [
      { id: 0, title: t(`What is LuxMax's return policy for products purchased from the LuxMax marketplace?`), isShow: false, desc: t(`LuxMax's return policy allows buyers to return products if there is a conflict with the product description. If you encounter such a conflict, please contact our support team at support@luxmax.ai for assistance with the return process.`) },
      { id: 1, title: t(`Can I return a product if I've received it but changed my mind about the purchase?`), isShow: false, desc: t(`LuxMax's return policy primarily covers conflicts with the product description. If you've received a product and simply changed your mind, LuxMax's return policy may not apply. We encourage you to review the product details and make an informed decision before purchasing.`) },
      { id: 2, title: t(`What is the return process for repair services or repair and sell services if I can't accept the final price?`), isShow: false, desc: t(`If you cannot accept the final repair price for your item, please contact our support team at support@luxmax.ai. They will guide you through the return process, and you will receive further instructions on how to proceed.`) },
      { id: 3, title: t(`What happens if I send a fake product for repair or any other service? Can I still request a return?`), isShow: false, desc: t(`If you send a fake product for any LuxMax service, you will not be eligible for a return, and your account may be subject to restrictions or bans. LuxMax takes authenticity seriously, and sending counterfeit items is against our policies.`) },
      { id: 4, title: t(`How do I initiate a return process for a product that conflicts with the description?`), isShow: false, desc: t(`To initiate a return process for a product that conflicts with the description, please contact our support team at support@luxmax.ai. They will assist you in starting the return process and provide guidance on the required steps.`) },
      { id: 5, title: t(`What information do I need to provide when requesting a return for a product?`), isShow: false, desc: t(`When requesting a return, please provide your order details, a clear description of the conflict with the product description, and any relevant photos or documentation. This information will help us process your return efficiently.`) },
      { id: 6, title: t(`Is there a specific timeframe within which I must request a return for a product?`), isShow: false, desc: t(`LuxMax encourages customers to initiate a return request as soon as they identify a conflict with the product description. While there may not be a strict timeframe, prompt communication with our support team will help expedite the resolution process.`) },
    ],
  },
]);

const breadcrumbData = [
  {
    id: 0,
    text: t("Home"),
    action: () => {
      router.push({ name: "home" });
    },
  },
  { id: 1, text: t("FAQ"), action: () => {} },
];



///////// Hilitor ////////


function Hilitor(id, tag)
{

    if(process.client){

  // Original JavaScript code by Chirp Internet: www.chirpinternet.eu
  // Please acknowledge use of this code by including this header.

  // private variables
  var targetNode = document.getElementById(id) || document.body;
  var hiliteTag = tag || "MARK";
  var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
  var colors = ["#A4B5A2"];
  var wordColor = [];
  var colorIdx = 0;
  var matchRegExp = "";
  var openLeft = true;
  var openRight = false;

  // characters to strip from start and end of the input string
  var endRegExp = new RegExp('^[^\\w]+|[^\\w]+$', "g");

  // characters used to break up the input string into words
  var breakRegExp = new RegExp('[^\\w\'-]+', "g");

  this.setEndRegExp = function(regex) {
    endRegExp = regex;
    return endRegExp;
  };

  this.setBreakRegExp = function(regex) {
    breakRegExp = regex;
    return breakRegExp;
  };

  this.setMatchType = function(type)
  {
    switch(type)
    {
      case "left":
        this.openLeft = false;
        this.openRight = true;
        break;

      case "right":
        this.openLeft = true;
        this.openRight = false;
        break;

      case "open":
        this.openLeft = this.openRight = true;
        break;

      default:
        this.openLeft = this.openRight = false;

    }
  };

  this.setRegex = function(input)
  {
    input = input.replace(endRegExp, "");
    input = input.replace(breakRegExp, "|");
    input = input.replace(/^\||\|$/g, "");
    if(input) {
      var re = "(" + input + ")";
      if(!this.openLeft) {
        re = "\\b" + re;
      }
      if(!this.openRight) {
        re = re + "\\b";
      }
      matchRegExp = new RegExp(re, "i");
      return matchRegExp;
    }
    return false;
  };

  this.getRegex = function()
  {
    var retval = matchRegExp.toString();
    retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
    retval = retval.replace(/\|/g, " ");
    return retval;
  };

  // recursively apply word highlighting
  this.hiliteWords = function(node)
  {
    if(node === undefined || !node) return;
    if(!matchRegExp) return;
    if(skipTags.test(node.nodeName)) return;

    if(node.hasChildNodes()) {
      for(var i=0; i < node.childNodes.length; i++)
        this.hiliteWords(node.childNodes[i]);
    }
    if(node.nodeType == 3) { // NODE_TEXT

      var nv, regs;

      if((nv = node.nodeValue) && (regs = matchRegExp.exec(nv))) {

        if(!wordColor[regs[0].toLowerCase()]) {
          wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
        }

        var match = document.createElement(hiliteTag);
        match.appendChild(document.createTextNode(regs[0]));
        match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
        match.style.color = "#000";

        var after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);

      }
    }
  };

  // remove highlighting
  this.remove = function()
  {
    var arr = document.getElementsByTagName(hiliteTag), el;
    while(arr.length && (el = arr[0])) {
      var parent = el.parentNode;
      parent.replaceChild(el.firstChild, el);
      parent.normalize();
    }
  };

  // start highlighting at target node
  this.apply = function(input)
  {
    this.remove();
    if(input === undefined || !(input = input.replace(/(^\s+|\s+$)/g, ""))) {
      return;
    }
    if(this.setRegex(input)) {
      this.hiliteWords(targetNode);
    }
    return matchRegExp;
  };
    }

}
</script>
