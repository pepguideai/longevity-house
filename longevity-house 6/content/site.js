/* ============================================================
   SITE-WIDE CONTENT  ·  Longevity House
   ------------------------------------------------------------
   This file controls things that appear on EVERY page:
   the brand name, the navigation menu, the footer, and your
   booking link. Edit the text inside the quotes. Don't remove
   the quotes, commas, or brackets.
   ============================================================ */

window.SITE = {

  /* ---- BRAND ---- */
  brandName: "Longevity House",
  brandMark: "L",                 // the single letter inside the circle logo
  established: "EST. 2025",
  tagline: "A practice in presence, presence in practice.",

  /* ---- NAVIGATION MENU ----
     label = what shows in the menu, href = the page file it links to.
     The CTA button on the right is set by ctaLabel / ctaHref. */
  nav: [
    { label: "Home",           href: "index.html" },
    { label: "Approach",       href: "approach.html" },
    { label: "The Roundtable", href: "roundtable.html" },
    { label: "Coaching",       href: "coaching.html" },
    { label: "Resources",      href: "resources.html" },
  ],
  ctaLabel: "Step Inside",
  ctaHref: "begin.html",

  /* ---- BOOKING ----
     When you have a Calendly / Acuity / Cal.com link, paste it here.
     Until then, leave it as "" and the Begin page shows a styled
     placeholder where the calendar will appear. */
  bookingUrl: "",
  bookingHeadline: "Book your first session",
  bookingSubtitle: "Free 20-minute intro call",
  bookingDuration: "20 min",

  /* ---- CONTACT (shown in the footer) ---- */
  contact: {
    email: "hello@longevityhouse.com",
    location: "Nashville, Tennessee",
    instagram: "@longevityhouse",
  },

  /* ---- FOOTER ---- */
  footerTagline: "Reimagined health coaching — a practice of presence in Nashville and beyond.",
  footerCredit: "© 2025 Longevity House LLC",
};
