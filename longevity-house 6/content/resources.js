/* ============================================================
   RESOURCES PAGE CONTENT  ·  resources.html
   ------------------------------------------------------------
   Left side: your essays / education library.
   Right side: supplement guidance, organized by category.
   You'll fill each category with your real product picks later —
   for now the categories show the structure.
   ============================================================ */

window.PAGE = {
  eyebrow: "Resources",
  headline: "Learn, then live it.",     // "live it." in italic green
  headlineItalic: "live it.",
  lede: "A growing library of education and guidance — to help you understand the why behind the what.",

  /* ---- ESSAYS (left column) ----
     Each opens a pop-up. Add a "blurb" to fill it, or leave "" for
     the friendly coming-soon note. (When a real article exists, you
     can instead set href to its link — see note at bottom.) */
  essaysLabel: "Essays & Education",
  essays: [
    { num: "No. 01", title: "Primary & Secondary Food, Explained", sub: "Why what nourishes you matters more than what you eat", blurb: "" },
    { num: "No. 02", title: "The Gut–Mitochondria Connection",     sub: "How cellular energy and digestion shape every system", blurb: "" },
    { num: "No. 03", title: "Cycling On & Off Peptides",           sub: "What to do during, between, and after a cycle", blurb: "" },
    { num: "No. 04", title: "Reading Your Bloodwork",              sub: "The numbers that matter, and what they mean", blurb: "" },
    { num: "No. 05", title: "The 4-7-8 Breath, Made Simple",       sub: "A nervous-system reset you can do anywhere", blurb: "" },
  ],

  /* ---- SUPPLEMENT GUIDE (right column) ----
     Categories now; you'll add your trusted products under each
     one later. Each opens a pop-up — add a "blurb" to fill it.
     "icon" options: gut, sleep, energy, hormone, inflammation, peptide */
  supplementLabel: "Supplement Guide",
  supplementHeadline: "Organized by what you need.",   // "what you need." in italic brass
  supplementHeadlineItalic: "what you need.",
  supplementIntro: "Hand-picked guidance, grouped by the system it supports — curated and updated by Nicole.",
  categories: [
    { icon: "gut",          name: "Gut Health",      sub: "digestion & microbiome", blurb: "" },
    { icon: "sleep",        name: "Sleep & Calm",    sub: "rest & nervous system",  blurb: "" },
    { icon: "energy",       name: "Energy & Mito",   sub: "cellular fuel",          blurb: "" },
    { icon: "hormone",      name: "Hormones",        sub: "balance & vitality",     blurb: "" },
    { icon: "inflammation", name: "Inflammation",    sub: "recovery & repair",      blurb: "" },
    { icon: "peptide",      name: "Peptide Support", sub: "on, off & between",      blurb: "" },
  ],
  supplementFootnote: "A framework, not medical advice. Specific guidance is always personal, and lives inside your sessions.",

  /* Message shown in any pop-up that doesn't have a blurb yet. */
  comingSoon: "This piece is coming soon. Reach out any time and Nicole can walk you through it in the meantime.",
};
