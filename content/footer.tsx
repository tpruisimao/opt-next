export function useFooterContent(): any {
  return {
    backgroundColor: "#272a2e",
    logo: {
      file: {
        url: "./svg/logo-white.svg",
      },
      title: "Optum Homepage",
    },
    valuePropText: {
      valuePropText:
        "Simplify your health experience by finding everything you need, all in one place, the Optum Store.",
    },
    valuePropLink: {
      text: "About Optum Store",
      link: "/about-us",
      title: "About Button",
    },
    newsLetterTitle: "Sign up for promotions.",
    newsLetterCopy: {
      json: "ddd",
    },
    emailInputPlaceholder: "Enter Your Email Address",
    freeShippingText: {
      freeShippingText:
        "*Free and expedited shipping offers do not apply to shipping outside the contiguous United States. Additional shipping restrictions may apply.",
    },
    copyrightText: "©2021 Optum, Inc. All rights reserved.",
    affiliateText: {
      affiliateText:
        "The Optum Store is an affiliate of the UnitedHealth Group family of companies.",
    },
    linkGroups: [
      {
        contentfulfields: [{ text: "Services", name: "service" }],
        linkFields: [
          { text: "Get Care", link: "/get-care", name: "Get Care" },
          {
            text: "Fill Prescriptions",
            link: "/fill-prescriptions",
            name: "Fill Prescriptions",
          },
        ],
      },
      {
        contentfulfields: [{ text: "About", name: "about" }],
        linkFields: [
          {
            text: "About Optum Store",
            name: "About Optum Store",
            link: "/about",
          },
          { text: "Contact Us", name: "Contact Us", link: "/contact-us" },
          {
            text: "Privacy Policy",
            name: "Privacy Policy",
            link: "/privacy-policy",
          },
        ],
      },
      {
        contentfulfields: [{ text: "Get Help", name: "get-help" }],
        linkFields: [
          { text: "FAQs", name: "FAQs", link: "/faq" },
          {
            text: "Shipping & Returns",
            name: "Shipping & Returns",
            link: "/shipping-returns",
          },
        ],
      },
    ],
  };
}
