/* ============================================================
   RENDER ENGINE  ·  Longevity House
   ------------------------------------------------------------
   This file reads the content files and builds the pages.
   You normally won't need to edit this. To change words or
   prices, edit the files in the /content folder.
   ============================================================ */

(function () {
  "use strict";

  const S = window.SITE || {};
  const P = window.PAGE || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };

  /* Wrap a chosen word in italic-emphasis markup */
  function emphasize(text, word, color) {
    if (!word || !text.includes(word)) return text;
    const cls = color === "brass" ? "italic brass-em" : "italic";
    return text.replace(word, `<em class="${cls}">${word}</em>`);
  }

  /* ---------- SVG ICON LIBRARY ---------- */
  const ICONS = {
    // value icons (coaching)
    mindfulness: `<circle cx="18" cy="18" r="13"/><path d="M18 11v7l4 3"/>`,
    education:   `<path d="M8 6h16a2 2 0 0 1 2 2v22l-10-5-10 5V8a2 2 0 0 1 2-2z"/><path d="M12 13h8M12 18h6"/>`,
    support:     `<path d="M6 10h18a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H14l-6 5v-5H6z"/><path d="M12 15h10M12 19h6"/>`,
    budget:      `<rect x="7" y="6" width="22" height="24" rx="2"/><path d="M12 13h12M12 18h12M12 23h7"/>`,
    supplement:  `<rect x="13" y="6" width="10" height="24" rx="5"/><path d="M13 18h10"/>`,
    network:     `<circle cx="18" cy="18" r="6"/><circle cx="18" cy="6.5" r="2.5"/><circle cx="29" cy="22" r="2.5"/><circle cx="7" cy="22" r="2.5"/><path d="M18 12v-3M23 20l4 1M13 20l-4 1"/>`,
    // category icons (resources)
    gut:          `<path d="M13 4c4 0 7 3 7 7 0 5-7 11-7 11S6 16 6 11c0-4 3-7 7-7z"/><path d="M13 9v5"/>`,
    sleep:        `<path d="M5 14a8 8 0 0 0 15 3 7 7 0 0 1-9-9 8 8 0 0 0-6 6z"/>`,
    energy:       `<path d="M14 3l-7 11h6l-1 9 7-11h-6z"/>`,
    hormone:      `<circle cx="13" cy="13" r="3"/><path d="M13 4v3M13 19v3M4 13h3M19 13h3M6.5 6.5l2 2M17.5 17.5l-2-2M6.5 19.5l2-2M17.5 8.5l-2 2"/>`,
    inflammation: `<path d="M13 5c-3 3-3 6 0 9s3 6 0 7M9 9c-2 2-2 4 0 6M17 9c2 2 2 4 0 6"/>`,
    peptide:      `<rect x="9" y="4" width="8" height="18" rx="4"/><path d="M9 13h8"/>`,
  };
  function iconSvg(name, cls, vb = "0 0 36 36") {
    return `<svg class="${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${ICONS[name] || ""}</svg>`;
  }

  /* ============================================================
     HEADER + FOOTER (shared)
     ============================================================ */
  function buildHeader() {
    const mount = $("#site-header");
    if (!mount) return;
    const current = document.body.dataset.page || "";
    const onDark = mount.classList.contains("on-dark");

    const links = S.nav.map(item => {
      const active = item.href === current ? " active" : "";
      return `<a href="${item.href}" class="${active.trim()}">${item.label}</a>`;
    }).join("");

    mount.innerHTML = `
      <nav class="nav">
        <a href="index.html" class="logo"><span class="mark">${S.brandMark}</span> ${S.brandName}</a>
        <button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
        <div class="nav-links">
          ${links}
          <a href="${S.ctaHref}" class="nav-cta">${S.ctaLabel}</a>
        </div>
      </nav>`;

    const toggle = $(".nav-toggle", mount);
    toggle.addEventListener("click", () => document.body.classList.toggle("nav-open"));
  }

  function buildFooter() {
    const mount = $("#site-footer");
    if (!mount) return;
    const navCols = S.nav.map(i => `<a href="${i.href}">${i.label}</a>`).join("");
    mount.innerHTML = `
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="logo"><span class="mark">${S.brandMark}</span> ${S.brandName}</div>
          <p>${S.footerTagline}</p>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          ${navCols}
        </div>
        <div class="footer-col">
          <h4>Connect</h4>
          <a href="mailto:${S.contact.email}">${S.contact.email}</a>
          <a href="${S.ctaHref}">${S.ctaLabel}</a>
          <a href="#">${S.contact.instagram}</a>
          <span style="display:block;font-family:var(--serif-italic);font-style:italic;color:var(--sand-deep);padding:5px 0;font-size:15px;">${S.contact.location}</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>${S.footerCredit}</span>
        <span class="credit">${S.tagline}</span>
      </div>`;
  }

  /* ============================================================
     PAGE BUILDERS
     ============================================================ */
  const BUILDERS = {

    /* ---------- HOME ---------- */
    home() {
      const mount = $("#page");
      mount.innerHTML = `
        <section class="hero grain">
          <div class="cascade">
            <span class="line line-1 display">${P.cascade.line1}</span>
            <span class="line line-2">${P.cascade.line2}</span>
            <span class="line line-3">${P.cascade.line3}</span>
          </div>
          <div class="hero-ctas">
            <a href="${P.primaryCtaHref}" class="cta-italic"><em>${P.primaryCtaLabel}</em><span class="arrow">→</span></a>
            <a href="${P.secondaryCtaHref}" class="cta-ghost">${P.secondaryCtaLabel} →</a>
          </div>
          <div class="est-stamp" data-est="${S.established}">${S.tagline.replace(/, /, ',<br/>')}</div>
        </section>`;
    },

    /* ---------- APPROACH ---------- */
    approach() {
      const mount = $("#page");
      const v = P.venn;
      const pillarCards = P.pillars.map((pil, i) => `
        <button class="pillar-tab" data-pillar="${i}">
          <span class="num">0${i + 1}</span>
          <span class="ptext">
            <span class="ptitle">${pil.title}</span>
            <span class="psub">${pil.sub}</span>
          </span>
          <span class="parrow">→</span>
        </button>`).join("");

      mount.innerHTML = `
        <section class="section approach-section grain">
          <div class="inner">
            <div class="section-head">
              <span class="eyebrow center">${P.eyebrow}</span>
              <h2>${emphasize(P.headline, P.headlineItalicWord)}</h2>
              <p class="lede">${P.lede}</p>
            </div>

            <div class="venn-wrap">
              <div class="venn-col left">
                <h4>— ${v.left.kicker} —</h4>
                <h3>${v.left.title}</h3>
                <ul>${v.left.items.map(i => `<li>${i}</li>`).join("")}</ul>
              </div>
              <div class="venn">
                <div class="circle c1"></div>
                <div class="circle c2"></div>
              </div>
              <div class="venn-col right">
                <h4>— ${v.right.kicker} —</h4>
                <h3>${v.right.title}</h3>
                <ul>${v.right.items.map(i => `<li>${i}</li>`).join("")}</ul>
              </div>
            </div>

            <div class="bridge">
              <div class="small-eye">— How we practice —</div>
              <div class="bridge-text">${emphasize(P.bridgeText, "principles")}</div>
              <div class="pillar-tabs">${pillarCards}</div>
            </div>
          </div>
        </section>

        <div class="modal-overlay" id="pillar-modal">
          <div class="modal">
            <button class="close" aria-label="Close">×</button>
            <div class="num-large"></div>
            <div class="pillar-label"></div>
            <h3></h3>
            <p class="statement"></p>
            <p class="detail"></p>
            <div class="modal-foot">
              <div class="pos"></div>
              <div class="marrows"><button data-dir="-1">←</button><button data-dir="1">→</button></div>
            </div>
          </div>
        </div>`;

      wireApproachModal();
    },

    /* ---------- ROUNDTABLE ---------- */
    roundtable() {
      const mount = $("#page");

      // collect every clickable item into one indexed list for the modal
      const items = [];
      const reg = (title, sub, blurb) => { items.push({ title, sub, blurb }); return items.length - 1; };

      const seats = P.seats.map(s => {
        const i = reg(s.title, s.sub, s.blurb);
        return `
        <div class="rt-seat ${s.position}" data-modal="${i}">
          <div class="dot"></div>
          <span class="stitle">${s.title}</span>
          <span class="ssub">${s.sub}</span>
        </div>`;
      }).join("");

      const mods = P.modalities.map(m => {
        const i = reg(m.name, "", m.blurb);
        return `<li class="clickable" data-modal="${i}">${m.name}</li>`;
      }).join("");

      const pracs = P.practitioners.map(p => {
        const i = reg(p.name, p.meta, p.blurb);
        return `
        <button class="practitioner" data-modal="${i}">
          <span class="avatar">${p.initials}</span>
          <span>
            <span class="pname">${p.name}</span>
            <span class="pmeta">${p.meta}</span>
          </span>
        </button>`;
      }).join("");

      mount.innerHTML = `
        <section class="section grain roundtable-page" style="min-height:calc(100vh - 64px);display:flex;align-items:center;">
          <div class="roundtable-grid">
            <div class="rt-left">
              <span class="eyebrow">${P.eyebrow}</span>
              <h2>${emphasize(P.headline, P.headlineItalicWord)}</h2>
              <p class="lede">${P.lede}</p>
              <ul class="rt-modalities">
                <li class="label">— ${P.modalitiesLabel} —</li>
                ${mods}
              </ul>
            </div>
            <div class="rt-viz">
              <div class="rt-table">
                ${seats}
                <div class="rt-center"><span>${P.centerLabel}<small>${P.centerSub}</small></span></div>
              </div>
            </div>
            <div class="rt-practitioners">
              <div class="strip-label">— ${P.practitionersLabel} —</div>
              ${pracs}
            </div>
          </div>
        </section>
        ${infoModalHtml()}`;

      wireInfoModal(items, P.comingSoon);
    },

    /* ---------- COACHING ---------- */
    coaching() {
      const mount = $("#page");
      const items = [];
      const reg = (title, sub, blurb) => { items.push({ title, sub, blurb }); return items.length - 1; };

      const cards = P.values.map(v => {
        const i = reg(v.title, "", v.blurb);
        return `
        <button class="value-card" data-modal="${i}">
          <div class="ico-wrap">${iconSvg(v.icon, "ico")}</div>
          <h3>${v.title}</h3>
          <p>${v.text}</p>
        </button>`;
      }).join("");

      const tiers = P.tiers.map((t, i) => {
        const mi = reg(t.title, t.duration, t.blurb);
        return `
        <div class="tier t${i}${t.featured ? " featured" : ""}" data-modal="${mi}">
          <div class="ring">${i === 0 ? "○" : i === 1 ? "◐" : "●"}</div>
          <div class="tname">${t.name}</div>
          <h3>${t.title}</h3>
          <div class="duration">${t.duration}</div>
          <div class="price">${t.price}</div>
          <div class="price-note">${t.priceNote}</div>
          <ul>${t.includes.map(x => `<li>${x}</li>`).join("")}</ul>
        </div>`;
      }).join("");

      mount.innerHTML = `
        <section class="section grain">
          <div class="inner">
            <div class="section-head">
              <span class="eyebrow center">${P.valueEyebrow}</span>
              <h2>${emphasize(P.valueHeadline, P.valueHeadlineItalic)}</h2>
              <p class="lede">${P.valueLede}</p>
            </div>
            <div class="value-grid">${cards}</div>
          </div>
        </section>

        <section class="section pricing-section grain">
          <div class="inner">
            <div class="section-head">
              <span class="eyebrow center">${P.pricingEyebrow}</span>
              <h2>${emphasize(P.pricingHeadline, P.pricingHeadlineItalic)}</h2>
              <p class="lede">${P.pricingLede}</p>
            </div>
            <div class="tiers">${tiers}</div>
            <div class="closing-cta">
              <div class="small-eye">— ${P.closingKicker} —</div>
              <h3>${emphasize(P.closingHeadline, P.closingHeadlineItalic)}</h3>
              <a href="${P.closingCtaHref}" class="cta-italic"><em>${P.closingCtaLabel}</em><span class="arrow">→</span></a>
            </div>
          </div>
        </section>
        ${infoModalHtml()}`;

      wireInfoModal(items, P.comingSoon);
    },

    /* ---------- RESOURCES ---------- */
    resources() {
      const mount = $("#page");
      const items = [];
      const reg = (title, sub, blurb) => { items.push({ title, sub, blurb }); return items.length - 1; };

      const essays = P.essays.map(e => {
        const i = reg(e.title, e.sub, e.blurb);
        return `
        <button class="article" data-modal="${i}">
          <span class="anum">${e.num}</span>
          <span class="atitle">${e.title}<small>${e.sub}</small></span>
          <span class="aarrow">→</span>
        </button>`;
      }).join("");

      const cats = P.categories.map(c => {
        const i = reg(c.name, c.sub, c.blurb);
        return `
        <div class="cat" data-modal="${i}">
          ${iconSvg(c.icon, "cat-ico", "0 0 26 26")}
          <span class="cat-name">${c.name}</span>
          <span class="cat-sub">${c.sub}</span>
        </div>`;
      }).join("");

      mount.innerHTML = `
        <section class="section grain">
          <div class="inner">
            <div class="section-head">
              <span class="eyebrow center">${P.eyebrow}</span>
              <h2>${emphasize(P.headline, P.headlineItalic)}</h2>
              <p class="lede">${P.lede}</p>
            </div>
            <div class="res-grid">
              <div class="essays">
                <div class="col-label">${P.essaysLabel}</div>
                ${essays}
              </div>
              <div class="supplements">
                <div class="col-label">${P.supplementLabel}</div>
                <h3>${emphasize(P.supplementHeadline, P.supplementHeadlineItalic, "brass")}</h3>
                <p class="intro">${P.supplementIntro}</p>
                <div class="cat-grid">${cats}</div>
                <div class="supp-foot">${P.supplementFootnote}</div>
              </div>
            </div>
          </div>
        </section>
        ${infoModalHtml()}`;

      wireInfoModal(items, P.comingSoon);
    },

    /* ---------- BEGIN ---------- */
    begin() {
      const mount = $("#page");
      const steps = P.steps.map(s => `
        <div class="begin-step">
          <span class="snum">${s.num}</span>
          <div>
            <h4>${s.title}</h4>
            <p>${s.text}</p>
          </div>
        </div>`).join("");

      /* Booking panel: real embed if bookingUrl set, else placeholder */
      let bookingInner;
      if (S.bookingUrl && S.bookingUrl.trim() !== "") {
        bookingInner = `<iframe src="${S.bookingUrl}" style="width:100%;height:560px;border:none;border-radius:8px;" title="Booking calendar"></iframe>`;
      } else {
        bookingInner = `
          <div class="booking-embed">
            <div class="embed-tag">${P.embedTag}</div>
            <div class="embed-note">${P.embedPlaceholder}</div>
          </div>`;
      }

      mount.innerHTML = `
        <section class="section grain" style="min-height:calc(100vh - 64px);display:flex;align-items:center;">
          <div class="begin-grid">
            <div class="begin-left">
              <span class="eyebrow">${P.eyebrow}</span>
              <h2>${emphasize(P.headline, P.headlineItalic)}</h2>
              <p class="lede">${P.lede}</p>
              <div class="begin-steps">${steps}</div>
            </div>
            <div class="booking">
              <div class="b-head">
                <div>
                  <div class="b-title">${emphasize(S.bookingHeadline, "first session", "brass")}</div>
                  <div class="b-sub">${S.bookingSubtitle}</div>
                </div>
                <div class="duration-pill">${S.bookingDuration}</div>
              </div>
              ${bookingInner}
            </div>
          </div>
        </section>`;
    },
  };

  /* ---------- REUSABLE INFO MODAL (used by Roundtable, etc.) ---------- */
  function infoModalHtml() {
    return `
      <div class="modal-overlay" id="info-modal">
        <div class="modal">
          <button class="close" aria-label="Close">×</button>
          <div class="info-eyebrow"></div>
          <h3></h3>
          <p class="info-body"></p>
        </div>
      </div>`;
  }
  function wireInfoModal(items, comingSoonText) {
    const overlay = $("#info-modal");
    if (!overlay) return;
    const modal = $(".modal", overlay);
    function open(i) {
      const it = items[i];
      if (!it) return;
      $(".info-eyebrow", modal).textContent = it.sub || "";
      $("h3", modal).textContent = it.title;
      $(".info-body", modal).textContent = (it.blurb && it.blurb.trim()) ? it.blurb : comingSoonText;
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() { overlay.classList.remove("open"); document.body.style.overflow = ""; }
    document.querySelectorAll("[data-modal]").forEach(elm => {
      elm.addEventListener("click", () => open(parseInt(elm.dataset.modal, 10)));
    });
    $(".close", modal).addEventListener("click", close);
    overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  /* ---------- APPROACH MODAL LOGIC ---------- */
  function wireApproachModal() {
    const overlay = $("#pillar-modal");
    if (!overlay) return;
    const modal = $(".modal", overlay);
    let idx = 0;

    function fill(i) {
      const p = P.pillars[i];
      idx = i;
      $(".num-large", modal).textContent = "0" + (i + 1);
      $(".pillar-label", modal).textContent = `Pillar ${["one", "two", "three"][i]} of three`;
      $("h3", modal).innerHTML = emphasize(p.modalTitle, p.modalTitle.split(" ").slice(-1)[0]);
      $(".statement", modal).textContent = p.modalStatement;
      $(".detail", modal).textContent = p.modalDetail;
      $(".pos", modal).innerHTML = P.pillars.map((_, k) =>
        k === i ? `<strong>0${k + 1}</strong>` : `0${k + 1}`).join(" · ");
    }
    function open(i) { fill(i); overlay.classList.add("open"); document.body.style.overflow = "hidden"; }
    function close() { overlay.classList.remove("open"); document.body.style.overflow = ""; }

    document.querySelectorAll(".pillar-tab").forEach(tab => {
      tab.addEventListener("click", () => open(parseInt(tab.dataset.pillar, 10)));
    });
    $(".close", modal).addEventListener("click", close);
    overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    modal.querySelectorAll(".marrows button").forEach(btn => {
      btn.addEventListener("click", () => {
        const dir = parseInt(btn.dataset.dir, 10);
        fill((idx + dir + P.pillars.length) % P.pillars.length);
      });
    });
  }

  /* ---------- BOOT ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    buildHeader();
    const page = document.body.dataset.build;
    if (page && BUILDERS[page]) BUILDERS[page]();
    buildFooter();
  });

})();
