import { createContext, useContext, useState, useEffect } from 'react'

// Translations for English and Myanmar
const translations = {
  en: {
    // Navbar
    home: 'Home',
    products: 'Products',
    aboutUs: 'About Us',
    contact: 'Contact',
    dashboard: 'Dashboard',
    claims: 'Claims',
    admin: 'Admin',
    manageClaims: 'Manage Claims',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    signOut: 'Sign Out',
    myProfile: 'My Profile',
    signedInAs: 'Signed in as',
    allProducts: 'All Products',
    account: 'Account',
    
    // Product Categories
    life: 'Life',
    health: 'Health',
    auto: 'Auto',
    property: 'Property',
    general: 'General',
    lifeInsurance: 'Life Insurance',
    healthInsurance: 'Health Insurance',
    autoInsurance: 'Auto Insurance',
    propertyInsurance: 'Property Insurance',
    generalInsurance: 'General Insurance',
    homeInsurance: 'Home Insurance',
    
    // Footer
    footerDescription: "Providing trusted insurance solutions since 2009. We're committed to protecting what matters most to you and your family.",
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    allRightsReserved: 'All rights reserved.',
    company: 'Company',
    
    // Common
    loading: 'Loading W&N Insurance...',
    language: 'Language',
    english: 'English',
    myanmar: 'မြန်မာ',
    learnMore: 'Learn More',
    getQuote: 'Get a Quote',
    viewAll: 'View All',
    readMore: 'Read More',
    submit: 'Submit',
    send: 'Send',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    filter: 'Filter',
    
    // Home Page
    heroTitle: 'Protect What Matters Most',
    heroSubtitle: 'Comprehensive insurance solutions tailored for you and your family. Get peace of mind with our trusted coverage.',
    exploreProducts: 'Explore Products',
    contactUs: 'Contact Us',
    whyChooseUs: 'Why Choose Us',
    trustedPartner: 'Your Trusted Insurance Partner',
    trustedPartnerDesc: 'We provide comprehensive coverage options with transparent policies and dedicated support.',
    yearsExperience: 'Years of Experience',
    happyCustomers: 'Happy Customers',
    claimsProcessed: 'Claims Processed',
    coverageAmount: 'Coverage Amount',
    
    // Features
    ourServices: 'Our Services',
    completeProtection: 'Complete Protection for What Matters Most',
    completeProtectionDesc: 'We offer a full range of insurance products designed to give you peace of mind.',
    
    // Testimonials
    testimonials: 'Testimonials',
    whatCustomersSay: 'What Our Customers Say',
    customerTestimonialsDesc: 'Hear from our satisfied customers about their experience with us.',
    
    // How It Works
    howItWorks: 'How It Works',
    simpleProcess: 'Simple 3-Step Process',
    simpleProcessDesc: 'Getting insured has never been easier. Follow these simple steps.',
    step1Title: 'Choose Your Plan',
    step1Desc: 'Browse our comprehensive insurance plans and select the one that fits your needs.',
    step2Title: 'Get a Quote',
    step2Desc: 'Receive an instant quote with transparent pricing and no hidden fees.',
    step3Title: 'Get Covered',
    step3Desc: 'Complete your application and enjoy peace of mind with your new coverage.',
    
    // Insurance Deals
    specialOffers: 'Special Offers',
    exclusiveDeals: 'Exclusive Insurance Deals',
    exclusiveDealsDesc: 'Take advantage of our limited-time offers and save on your coverage.',
    
    // Promotional Banner
    limitedTimeOffer: 'LIMITED TIME OFFER',
    getDiscount: 'Get 25% OFF Your First Year!',
    discountDesc: "New customers save big on all insurance plans. Don't miss out!",
    claimDiscount: 'Claim Your Discount',
    endsIn: 'Ends in 48 hours!',
    
    // About Us Page
    aboutWNInsurance: 'About W&N Insurance',
    ourStory: 'Our Story',
    ourStoryDesc: 'W&N Insurance was founded with a simple belief: insurance should protect people, not confuse them.',
    ourMission: 'Our Mission',
    ourMissionDesc: 'To provide accessible, transparent, and reliable insurance solutions that empower individuals and businesses.',
    ourVision: 'Our Vision',
    ourVisionDesc: 'To be the most trusted insurance provider in Myanmar, known for integrity and customer-first approach.',
    ourValues: 'Our Values',
    integrity: 'Integrity',
    integrityDesc: 'We operate with honesty and transparency in all our dealings.',
    customerFirst: 'Customer First',
    customerFirstDesc: 'Our customers are at the heart of everything we do.',
    excellence: 'Excellence',
    excellenceDesc: 'We strive for excellence in service delivery and claims processing.',
    innovation: 'Innovation',
    innovationDesc: 'We continuously improve our products and services.',
    whyWNInsurance: 'Why W&N Insurance',
    wnDifference: 'The W&N Insurance Difference',
    wnDifferenceDesc: 'Join thousands of satisfied customers who trust W&N Insurance with their protection needs.',
    headquarters: 'Our Headquarters',
    wnHQ: 'W&N Insurance HQ',
    
    // Contact Page
    getInTouch: 'Get In Touch',
    contactFormDesc: 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    messageSent: 'Message sent successfully!',
    ourOffice: 'Our Office',
    address: 'Address',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    workingHours: 'Working Hours',
    
    // Products Page
    ourProducts: 'Our Products',
    browseInsurance: 'Browse Insurance Plans',
    browseInsuranceDesc: 'Find the perfect coverage for your needs from our comprehensive range of insurance products.',
    allCategories: 'All Categories',
    viewDetails: 'View Details',
    coverage: 'Coverage',
    premium: 'Premium',
    perMonth: '/month',
    benefits: 'Benefits',
    
    // Auth Pages
    welcomeBack: 'Welcome Back',
    loginDesc: 'Sign in to access your account',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    registerNow: 'Register Now',
    createAccount: 'Create Account',
    registerDesc: 'Join us today and get protected',
    confirmPassword: 'Confirm Password',
    alreadyHaveAccount: 'Already have an account?',
    loginNow: 'Login Now',
    
    // Dashboard
    myDashboard: 'My Dashboard',
    myPolicies: 'My Policies',
    activePolicies: 'Active Policies',
    pendingClaims: 'Pending Claims',
    totalCoverage: 'Total Coverage',
    recentActivity: 'Recent Activity',
    policyDetails: 'Policy Details',
    policyNumber: 'Policy Number',
    startDate: 'Start Date',
    endDate: 'End Date',
    status: 'Status',
    active: 'Active',
    expired: 'Expired',
    pending: 'Pending',
    
    // Claims
    fileClaim: 'File a Claim',
    claimHistory: 'Claim History',
    claimStatus: 'Claim Status',
    claimAmount: 'Claim Amount',
    claimDate: 'Claim Date',
    claimDescription: 'Claim Description',
    approved: 'Approved',
    rejected: 'Rejected',
    inReview: 'In Review',
  },
  mm: {
    // Navbar
    home: 'ပင်မ',
    products: 'အာမခံများ',
    aboutUs: 'ကျွန်ုပ်တို့အကြောင်း',
    contact: 'ဆက်သွယ်ရန်',
    dashboard: 'ဒက်ရှ်ဘုတ်',
    claims: 'တောင်းဆိုမှုများ',
    admin: 'စီမံခန့်ခွဲသူ',
    manageClaims: 'တောင်းဆိုမှုများ စီမံရန်',
    signIn: 'ဝင်ရောက်ရန်',
    getStarted: 'စတင်ရန်',
    signOut: 'ထွက်ရန်',
    myProfile: 'ကျွန်ုပ်၏ပရိုဖိုင်',
    signedInAs: 'အဖြစ် ဝင်ရောက်ထားသည်',
    allProducts: 'ထုတ်ကုန်အားလုံး',
    account: 'အကောင့်',
    
    // Product Categories
    life: 'အသက်',
    health: 'ကျန်းမာရေး',
    auto: 'ယာဉ်',
    property: 'ပိုင်ဆိုင်မှု',
    general: 'အထွေထွေ',
    lifeInsurance: 'အသက်အာမခံ',
    healthInsurance: 'ကျန်းမာရေးအာမခံ',
    autoInsurance: 'ယာဉ်အာမခံ',
    propertyInsurance: 'ပိုင်ဆိုင်မှုအာမခံ',
    generalInsurance: 'အထွေထွေအာမခံ',
    homeInsurance: 'အိမ်အာမခံ',
    
    // Footer
    footerDescription: "၂၀၀၉ ခုနှစ်မှစ၍ ယုံကြည်စိတ်ချရသော အာမခံဖြေရှင်းချက်များကို ပေးအပ်နေပါသည်။ သင်နှင့် သင့်မိသားစုအတွက် အရေးကြီးဆုံးအရာများကို ကာကွယ်ရန် ကျွန်ုပ်တို့ ကတိပြုပါသည်။",
    privacyPolicy: 'ကိုယ်ရေးလုံခြုံမှုမူဝါဒ',
    termsOfService: 'ဝန်ဆောင်မှုစည်းမျဉ်းများ',
    allRightsReserved: 'မူပိုင်ခွင့်အားလုံး ရယူထားသည်။',
    company: 'ကုမ္ပဏီ',
    
    // Common
    loading: 'W&N Insurance ကို ဖွင့်နေသည်...',
    language: 'ဘာသာစကား',
    english: 'English',
    myanmar: 'မြန်မာ',
    learnMore: 'ပိုမိုလေ့လာရန်',
    getQuote: 'စျေးနှုန်းရယူရန်',
    viewAll: 'အားလုံးကြည့်ရန်',
    readMore: 'ပိုမိုဖတ်ရှုရန်',
    submit: 'တင်သွင်းရန်',
    send: 'ပို့ရန်',
    cancel: 'ပယ်ဖျက်ရန်',
    save: 'သိမ်းဆည်းရန်',
    edit: 'တည်းဖြတ်ရန်',
    delete: 'ဖျက်ရန်',
    search: 'ရှာဖွေရန်',
    filter: 'စစ်ထုတ်ရန်',
    
    // Home Page
    heroTitle: 'အရေးကြီးဆုံးအရာများကို ကာကွယ်ပါ',
    heroSubtitle: 'သင်နှင့် သင့်မိသားစုအတွက် သင့်လျော်သော ပြည့်စုံသော အာမခံဖြေရှင်းချက်များ။ ကျွန်ုပ်တို့၏ ယုံကြည်စိတ်ချရသော အကာအကွယ်ဖြင့် စိတ်အေးချမ်းမှု ရယူပါ။',
    exploreProducts: 'ထုတ်ကုန်များ ကြည့်ရှုရန်',
    contactUs: 'ဆက်သွယ်ရန်',
    whyChooseUs: 'ကျွန်ုပ်တို့ကို ဘာကြောင့် ရွေးချယ်သင့်သနည်း',
    trustedPartner: 'သင်၏ ယုံကြည်စိတ်ချရသော အာမခံမိတ်ဖက်',
    trustedPartnerDesc: 'ကျွန်ုပ်တို့သည် ပွင့်လင်းသော မူဝါဒများနှင့် သီးသန့်ပံ့ပိုးမှုဖြင့် ပြည့်စုံသော အကာအကွယ်ရွေးချယ်စရာများကို ပေးပါသည်။',
    yearsExperience: 'နှစ်ပေါင်း အတွေ့အကြုံ',
    happyCustomers: 'ပျော်ရွှင်သော ဖောက်သည်များ',
    claimsProcessed: 'လုပ်ဆောင်ပြီး တောင်းဆိုမှုများ',
    coverageAmount: 'အကာအကွယ်ပမာဏ',
    
    // Features
    ourServices: 'ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုများ',
    completeProtection: 'အရေးကြီးဆုံးအရာများအတွက် ပြည့်စုံသော ကာကွယ်မှု',
    completeProtectionDesc: 'သင့်အား စိတ်အေးချမ်းမှုပေးရန် ဒီဇိုင်းထုတ်ထားသော အာမခံထုတ်ကုန် အပြည့်အစုံကို ကျွန်ုပ်တို့ ပေးဆောင်ပါသည်။',
    
    // Testimonials
    testimonials: 'သက်သေခံချက်များ',
    whatCustomersSay: 'ကျွန်ုပ်တို့၏ ဖောက်သည်များ ပြောကြားချက်',
    customerTestimonialsDesc: 'ကျွန်ုပ်တို့နှင့် အတွေ့အကြုံအကြောင်း ကျေနပ်သော ဖောက်သည်များထံမှ ကြားပါ။',
    
    // How It Works
    howItWorks: 'အလုပ်လုပ်ပုံ',
    simpleProcess: 'ရိုးရှင်းသော ၃ အဆင့် လုပ်ငန်းစဉ်',
    simpleProcessDesc: 'အာမခံရယူခြင်းသည် ယခုအချိန်ထက် ပိုလွယ်ကူဖူးတယ်မရှိပါ။ ဤရိုးရှင်းသော အဆင့်များကို လိုက်နာပါ။',
    step1Title: 'သင့်အစီအစဉ်ကို ရွေးချယ်ပါ',
    step1Desc: 'ကျွန်ုပ်တို့၏ ပြည့်စုံသော အာမခံအစီအစဉ်များကို ကြည့်ရှုပြီး သင့်လိုအပ်ချက်များနှင့် ကိုက်ညီသည့်တစ်ခုကို ရွေးချယ်ပါ။',
    step2Title: 'စျေးနှုန်းရယူပါ',
    step2Desc: 'ပွင့်လင်းသော စျေးနှုန်းသတ်မှတ်ခြင်းနှင့် လျှို့ဝှက်အခကြေးငွေမရှိဘဲ ချက်ချင်း စျေးနှုန်းရယူပါ။',
    step3Title: 'အကာအကွယ်ရယူပါ',
    step3Desc: 'သင်၏ လျှောက်လွှာကို ပြီးမြောက်အောင် ဆောင်ရွက်ပြီး သင်၏ အကာအကွယ်အသစ်ဖြင့် စိတ်အေးချမ်းမှု ခံစားပါ။',
    
    // Insurance Deals
    specialOffers: 'အထူးကမ်းလှမ်းချက်များ',
    exclusiveDeals: 'သီးသန့် အာမခံ သဘောတူညီချက်များ',
    exclusiveDealsDesc: 'ကျွန်ုပ်တို့၏ အချိန်ကန့်သတ်ကမ်းလှမ်းချက်များကို အခွင့်ကောင်းယူပြီး သင်၏အကာအကွယ်တွင် ငွေစုပါ။',
    
    // Promotional Banner
    limitedTimeOffer: 'အချိန်ကန့်သတ် ကမ်းလှမ်းချက်',
    getDiscount: 'ပထမနှစ်အတွက် ၂၅% လျှော့စျေးရယူပါ!',
    discountDesc: 'ဖောက်သည်အသစ်များသည် အာမခံအစီအစဉ်အားလုံးတွင် ကြီးမားစွာ သက်သာပါသည်။ လက်လွတ်မခံပါနှင့်!',
    claimDiscount: 'သင်၏လျှော့စျေးကို ရယူပါ',
    endsIn: '၄၈ နာရီအတွင်း ကုန်ဆုံးမည်!',
    
    // About Us Page
    aboutWNInsurance: 'W&N Insurance အကြောင်း',
    ourStory: 'ကျွန်ုပ်တို့၏ ဇာတ်ကြောင်း',
    ourStoryDesc: 'W&N Insurance သည် ရိုးရှင်းသော ယုံကြည်ချက်ဖြင့် တည်ထောင်ခဲ့သည်: အာမခံသည် လူများကို ကာကွယ်သင့်သည်၊ ရှုပ်ထွေးစေမသင့်ပါ။',
    ourMission: 'ကျွန်ုပ်တို့၏ မျှော်မှန်းချက်',
    ourMissionDesc: 'လူတစ်ဦးချင်းနှင့် စီးပွားရေးလုပ်ငန်းများကို စွမ်းဆောင်ရည်မြှင့်တင်သော လက်လှမ်းမီနိုင်၊ ပွင့်လင်းမြင်သာပြီး ယုံကြည်စိတ်ချရသော အာမခံဖြေရှင်းချက်များ ပေးအပ်ရန်။',
    ourVision: 'ကျွန်ုပ်တို့၏ ရည်မှန်းချက်',
    ourVisionDesc: 'ရိုးသားမှုနှင့် ဖောက်သည်ကို ဦးစားပေးသော ချဉ်းကပ်မှုဖြင့် ထင်ရှားသော မြန်မာနိုင်ငံတွင် အယုံကြည်အရဆုံး အာမခံပံ့ပိုးသူ ဖြစ်လာရန်။',
    ourValues: 'ကျွန်ုပ်တို့၏ တန်ဖိုးများ',
    integrity: 'ရိုးသားမှု',
    integrityDesc: 'ကျွန်ုပ်တို့သည် ကျွန်ုပ်တို့၏ ဆောင်ရွက်မှုအားလုံးတွင် ရိုးသားမှုနှင့် ပွင့်လင်းမြင်သာမှုဖြင့် လုပ်ကိုင်ပါသည်။',
    customerFirst: 'ဖောက်သည် ဦးစားပေး',
    customerFirstDesc: 'ကျွန်ုပ်တို့၏ ဖောက်သည်များသည် ကျွန်ုပ်တို့ လုပ်ဆောင်သမျှ၏ အဓိကဗဟိုဖြစ်သည်။',
    excellence: 'အထူးကောင်းမှု',
    excellenceDesc: 'ကျွန်ုပ်တို့သည် ဝန်ဆောင်မှုပေးအပ်ခြင်းနှင့် တောင်းဆိုမှုလုပ်ဆောင်ခြင်းတွင် အထူးကောင်းမှုအတွက် ကြိုးစားပါသည်။',
    innovation: 'ဆန်းသစ်တီထွင်မှု',
    innovationDesc: 'ကျွန်ုပ်တို့သည် ကျွန်ုပ်တို့၏ ထုတ်ကုန်များနှင့် ဝန်ဆောင်မှုများကို စဉ်ဆက်မပြတ် တိုးတက်အောင် လုပ်ဆောင်ပါသည်။',
    whyWNInsurance: 'ဘာကြောင့် W&N Insurance',
    wnDifference: 'W&N Insurance ကွာခြားချက်',
    wnDifferenceDesc: 'W&N Insurance ကို ၎င်းတို့၏ အကာအကွယ်လိုအပ်ချက်များအတွက် ယုံကြည်သော ကျေနပ်သော ဖောက်သည်ထောင်ပေါင်းများစွာနှင့် ပူးပေါင်းပါ။',
    headquarters: 'ကျွန်ုပ်တို့၏ ရုံးချုပ်',
    wnHQ: 'W&N Insurance ရုံးချုပ်',
    
    // Contact Page
    getInTouch: 'ဆက်သွယ်ပါ',
    contactFormDesc: 'မေးခွန်းများ ရှိပါသလား? သင့်ထံမှ ကြားလိုပါသည်။ ကျွန်ုပ်တို့ထံ စာတိုပို့ပါ၊ အမြန်ဆုံး ပြန်လည်တုံ့ပြန်ပါမည်။',
    fullName: 'အမည်အပြည့်အစုံ',
    email: 'အီးမေးလ်',
    phone: 'ဖုန်း',
    subject: 'ခေါင်းစဉ်',
    message: 'စာတို',
    sendMessage: 'စာတိုပို့ရန်',
    messageSent: 'စာတို အောင်မြင်စွာ ပို့ပြီးပါပြီ!',
    ourOffice: 'ကျွန်ုပ်တို့၏ ရုံး',
    address: 'လိပ်စာ',
    phoneNumber: 'ဖုန်းနံပါတ်',
    emailAddress: 'အီးမေးလ်လိပ်စာ',
    workingHours: 'အလုပ်ချိန်',
    
    // Products Page
    ourProducts: 'ကျွန်ုပ်တို့၏ ထုတ်ကုန်များ',
    browseInsurance: 'အာမခံအစီအစဉ်များ ကြည့်ရှုရန်',
    browseInsuranceDesc: 'ကျွန်ုပ်တို့၏ ပြည့်စုံသော အာမခံထုတ်ကုန်အမျိုးအစားများမှ သင့်လိုအပ်ချက်များအတွက် ပြည့်စုံသော အကာအကွယ်ကို ရှာဖွေပါ။',
    allCategories: 'အမျိုးအစားအားလုံး',
    viewDetails: 'အသေးစိတ်ကြည့်ရှုရန်',
    coverage: 'အကာအကွယ်',
    premium: 'ပရီမီယံ',
    perMonth: '/လ',
    benefits: 'အကျိုးခံစားခွင့်များ',
    
    // Auth Pages
    welcomeBack: 'ပြန်လည်ကြိုဆိုပါသည်',
    loginDesc: 'သင်၏ အကောင့်သို့ ဝင်ရောက်ရန် ဝင်ရောက်ပါ',
    password: 'စကားဝှက်',
    forgotPassword: 'စကားဝှက် မေ့နေပါသလား?',
    noAccount: 'အကောင့်မရှိဘူးလား?',
    registerNow: 'ယခုစာရင်းသွင်းပါ',
    createAccount: 'အကောင့်ဖန်တီးရန်',
    registerDesc: 'ယနေ့ ကျွန်ုပ်တို့နှင့် ပူးပေါင်းပြီး အကာအကွယ်ရယူပါ',
    confirmPassword: 'စကားဝှက် အတည်ပြုပါ',
    alreadyHaveAccount: 'အကောင့်ရှိပြီးသားလား?',
    loginNow: 'ယခုဝင်ရောက်ပါ',
    
    // Dashboard
    myDashboard: 'ကျွန်ုပ်၏ ဒက်ရှ်ဘုတ်',
    myPolicies: 'ကျွန်ုပ်၏ မူဝါဒများ',
    activePolicies: 'အသက်ဝင်သော မူဝါဒများ',
    pendingClaims: 'ဆိုင်းငံ့ထားသော တောင်းဆိုမှုများ',
    totalCoverage: 'စုစုပေါင်း အကာအကွယ်',
    recentActivity: 'မကြာသေးမီ လှုပ်ရှားမှု',
    policyDetails: 'မူဝါဒ အသေးစိတ်',
    policyNumber: 'မူဝါဒ နံပါတ်',
    startDate: 'စတင်သည့်ရက်',
    endDate: 'ပြီးဆုံးရက်',
    status: 'အခြေအနေ',
    active: 'အသက်ဝင်',
    expired: 'သက်တမ်းကုန်',
    pending: 'ဆိုင်းငံ့',
    
    // Claims
    fileClaim: 'တောင်းဆိုမှု တင်သွင်းရန်',
    claimHistory: 'တောင်းဆိုမှု မှတ်တမ်း',
    claimStatus: 'တောင်းဆိုမှု အခြေအနေ',
    claimAmount: 'တောင်းဆိုမှု ပမာဏ',
    claimDate: 'တောင်းဆိုသည့် ရက်စွဲ',
    claimDescription: 'တောင်းဆိုမှု ဖော်ပြချက်',
    approved: 'အတည်ပြုပြီး',
    rejected: 'ငြင်းပယ်ပြီး',
    inReview: 'သုံးသပ်နေဆဲ',
  }
}

const LanguageContext = createContext()

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    const saved = localStorage.getItem('language')
    return saved || 'en'
  })

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'mm' : 'en')
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isMyanmar: language === 'mm',
    isEnglish: language === 'en',
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
