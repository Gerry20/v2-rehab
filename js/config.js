/* ==========================================================================
   V2 REHAB — SITE CONFIG
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit for day-to-day facts.
   Every line marked  // TODO  must be replaced before the site goes live.
   Nothing here was invented from a verified source — confirm each one.
   ========================================================================== */

window.SITE = {

  /* --- Identity ---------------------------------------------------------- */
  practiceName:  "V2 Rehab",
  therapistName: "Vignesh",
  // Full name exactly as it should appear in print and on Google:
  therapistFullName: "Vignesh",                    // TODO
  // e.g. "BPT, MPT (Sports)" — do not list a qualification he does not hold.
  credentials:   "BPT",                            // TODO
  // Tamil Nadu Physiotherapy Council registration number. Optional, but it is
  // the single strongest trust signal you can put on an Indian clinic site.
  regNumber:     "",                               // TODO (leave "" to hide)
  yearsExperience: "5",                            // TODO
  // Seen on his Instagram bio as "#psg IMSR" — confirm before publishing.
  alumniOf:      "PSG Institute of Medical Sciences & Research, Coimbatore", // TODO confirm

  /* --- Contact ----------------------------------------------------------- */
  phone:         "+919787943193",
  phoneDisplay:  "+91 97879 43193",
  whatsapp:      "919787943193",
  whatsappMsg:   "Hi Vignesh, I'd like to book a physiotherapy session.",
  email:         "hello@v2rehab.in",               // TODO

  /* --- Clinic ------------------------------------------------------------ */
  clinic: {
    line1:   "V2 Rehab",                           // TODO  building / unit
    line2:   "Street name, Area",                  // TODO
    city:    "Vellore",
    state:   "Tamil Nadu",
    pincode: "632004",                             // TODO
    // Paste the src="..." URL from Google Maps > Share > Embed a map.
    mapEmbed: "",                                  // TODO (leave "" to hide map)
    // Google Maps / Business Profile link for the "Get directions" button.
    mapLink:  "https://maps.google.com/?q=V2+Rehab+Vellore" // TODO
  },

  /* --- Hours -------------------------------------------------------------
     Shown as-is. Use "Closed" for days off.                                 */
  hours: [
    { d: "Monday – Friday", t: "7:00 AM – 8:00 PM" },   // TODO
    { d: "Saturday",        t: "7:00 AM – 2:00 PM" },   // TODO
    { d: "Sunday",          t: "Home visits only"   }   // TODO
  ],

  /* --- Fees --------------------------------------------------------------
     Leave any value as "" to hide that row. Indian patients expect to see
     a number before they call — hiding fees costs you enquiries.           */
  fees: {
    assessment: "",                                // TODO e.g. "₹800"
    clinic:     "",                                // TODO e.g. "₹600 / session"
    home:       "",                                // TODO e.g. "₹1,000 / session"
    note:       ""                                 // TODO e.g. "Packages available for 10+ sessions"
  },

  /* --- Home-visit coverage ----------------------------------------------- */
  homeVisitAreas: [                                // TODO — real localities
    "Gandhi Nagar", "Katpadi", "Sathuvachari", "Bagayam",
    "Officers Line", "Thorapadi", "Viruthampet", "Thottapalayam"
  ],

  /* --- Reviews -------------------------------------------------------------
     Leave "" until there's a real Google Business Profile rating to show —
     do not put a placeholder number on a healthcare site.                   */
  googleRating:      "",                           // TODO e.g. "4.9"
  googleReviewCount: "",                            // TODO e.g. "42"
  googleReviewUrl:   "",                            // TODO link to leave a review

  /* --- Booking & social --------------------------------------------------- */
  // Calendly / Zoho Bookings / Google Appointment link. "" hides the button.
  bookingUrl: "",                                  // TODO
  instagram:  "https://www.instagram.com/vigneshvicky_1011/",
  linkedin:   "https://www.linkedin.com/in/vignesh-vicky-494b84367",

  /* --- Enquiry form -------------------------------------------------------
     Free, no server needed. Sign up at https://web3forms.com with his email,
     paste the access key here, and submissions arrive in his inbox.         */
  web3formsKey: "",                                // TODO

  /* --- SEO ---------------------------------------------------------------- */
  siteUrl: "https://v2rehab.in"                    // TODO  final domain
};
