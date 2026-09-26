/* ==========================================================================
   V2 REHAB — site behaviour
   ========================================================================== */
(function () {
  "use strict";
  var S = window.SITE || {};
  var I18N = window.I18N || { en: {}, ta: {} };

  /* ---------- config injection ------------------------------------------ */
  var CFG_MAP = {
    phoneDisplay:    S.phoneDisplay,
    yearsExperience: S.yearsExperience,
    alumniOf:        S.alumniOf,
    credentials:     S.credentials,
    regNumber:       S.regNumber,
    email:           S.email,
    therapistName:   S.therapistName,
    clinicCity:      S.clinic ? S.clinic.city : "",
    clinicState:     S.clinic ? S.clinic.state : "",
    clinicLine1:     S.clinic ? S.clinic.line1 : "",
    clinicLine2:     S.clinic ? S.clinic.line2 : "",
    clinicPincode:   S.clinic ? S.clinic.pincode : "",
    feeClinic:       S.fees ? S.fees.clinic : "",
    feeHome:         S.fees ? S.fees.home : "",
    googleRating:      S.googleRating,
    googleReviewCount: S.googleReviewCount
  };

  var CFG_HREF_MAP = {
    tel:     S.phone ? "tel:" + S.phone : "#",
    mail:    S.email ? "mailto:" + S.email : "#",
    mapLink: S.clinic && S.clinic.mapLink ? S.clinic.mapLink : "#"
  };

  function applyConfig(root) {
    root = root || document;
    root.querySelectorAll("[data-cfg]").forEach(function (el) {
      var key = el.getAttribute("data-cfg");
      var val = CFG_MAP[key];
      if (val) el.textContent = val;
    });
    root.querySelectorAll("[data-cfg-href]").forEach(function (el) {
      var key = el.getAttribute("data-cfg-href");
      var val = CFG_HREF_MAP[key];
      if (val) el.setAttribute("href", val);
    });
  }

  function waLink(extraMsg) {
    if (!S.whatsapp) return "#";
    var msg = extraMsg || S.whatsappMsg || "";
    return "https://wa.me/" + S.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");
  }

  function wireLinks() {
    var wa = waLink();
    ["heroWa", "mnavWa", "mobarWa", "fabWa", "whereWa", "socialWa"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.setAttribute("href", wa);
    });
    var insta = document.getElementById("socialInsta");
    if (insta && S.instagram) insta.setAttribute("href", S.instagram);
    var aboutInsta = document.getElementById("aboutInsta");
    if (aboutInsta && S.instagram) aboutInsta.setAttribute("href", S.instagram);
    var li = document.getElementById("socialLinkedin");
    if (li && S.linkedin) li.setAttribute("href", S.linkedin);
  }

  function buildHours() {
    var list = document.getElementById("hoursList");
    if (!list || !S.hours) return;
    list.innerHTML = "";
    S.hours.forEach(function (row) {
      var li = document.createElement("li");
      var d = document.createElement("span");
      d.textContent = row.d;
      var t = document.createElement("span");
      t.textContent = row.t;
      li.appendChild(d);
      li.appendChild(t);
      list.appendChild(li);
    });
  }

  function buildAreas() {
    var wrap = document.getElementById("areaChips");
    if (!wrap || !S.homeVisitAreas) return;
    wrap.innerHTML = "";
    S.homeVisitAreas.forEach(function (a) {
      var span = document.createElement("span");
      span.textContent = a;
      wrap.appendChild(span);
    });
  }

  function toggleFees() {
    var c = document.getElementById("feeClinic");
    var h = document.getElementById("feeHome");
    if (c) c.hidden = !(S.fees && S.fees.clinic);
    if (h) h.hidden = !(S.fees && S.fees.home);
  }

  function toggleRating() {
    var block = document.getElementById("ratingBlock");
    if (block) block.hidden = !(S.googleRating);
  }

  function setupMap() {
    var card = document.getElementById("mapCard");
    var frame = document.getElementById("mapFrame");
    if (!card || !frame) return;
    if (S.clinic && S.clinic.mapEmbed) {
      frame.src = S.clinic.mapEmbed;
      card.hidden = false;
    } else {
      card.hidden = true;
    }
  }

  /* ---------- language switch -------------------------------------------- */
  function setLanguage(lang) {
    if (!I18N[lang]) lang = "en";
    document.documentElement.setAttribute("lang", lang);
    var dict = I18N[lang];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    var enBtn = document.getElementById("langEn");
    var taBtn = document.getElementById("langTa");
    if (enBtn) enBtn.setAttribute("aria-pressed", String(lang === "en"));
    if (taBtn) taBtn.setAttribute("aria-pressed", String(lang === "ta"));

    try { localStorage.setItem("v2rehab-lang", lang); } catch (e) {}

    // re-apply config values into any spans that i18n innerHTML just reset
    applyConfig();
  }

  function initLanguage() {
    var saved = "en";
    try { saved = localStorage.getItem("v2rehab-lang") || "en"; } catch (e) {}
    setLanguage(saved);

    var enBtn = document.getElementById("langEn");
    var taBtn = document.getElementById("langTa");
    if (enBtn) enBtn.addEventListener("click", function () { setLanguage("en"); });
    if (taBtn) taBtn.addEventListener("click", function () { setLanguage("ta"); });
  }

  /* ---------- header / nav ------------------------------------------------ */
  function initHeader() {
    var hdr = document.getElementById("hdr");
    function onScroll() {
      if (!hdr) return;
      if (window.scrollY > 8) hdr.classList.add("is-stuck");
      else hdr.classList.remove("is-stuck");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var burger = document.getElementById("burger");
    var mnav = document.getElementById("mnav");
    if (burger && mnav) {
      burger.addEventListener("click", function () {
        var open = mnav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : "";
      });
      mnav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          mnav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* ---------- reveal on scroll -------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window) || !items.length) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- contact form ------------------------------------------------ */
  function initForm() {
    var form = document.getElementById("enquiryForm");
    var status = document.getElementById("formStatus");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();

      if (!name || !phone) {
        setStatus("err", currentLang() === "ta"
          ? "பெயர் மற்றும் போன் நம்பர் அவசியம்."
          : "Name and phone are required.");
        return;
      }

      var payload = {
        name: name,
        phone: phone,
        reason: data.get("reason"),
        preference: data.get("preference"),
        message: data.get("message"),
        subject: "New enquiry from V2 Rehab website"
      };

      if (S.web3formsKey) {
        payload.access_key = S.web3formsKey;
        setStatus("wait", currentLang() === "ta" ? "அனுப்பப்படுகிறது..." : "Sending...");
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (r) { return r.json(); })
          .then(function (res) {
            if (res.success) {
              setStatus("ok", currentLang() === "ta"
                ? "நன்றி! உங்கள் என்குவைரி அனுப்பப்பட்டது — வினேஷ் விரைவில் தொடர்பு கொள்வார்."
                : "Thanks! Your enquiry has been sent — Vignesh will be in touch shortly.");
              form.reset();
            } else {
              fallbackToWhatsapp(payload);
            }
          })
          .catch(function () { fallbackToWhatsapp(payload); });
      } else {
        // No form backend configured yet — hand off to WhatsApp so nothing is lost.
        fallbackToWhatsapp(payload);
      }
    });

    function fallbackToWhatsapp(payload) {
      var lines = [
        "New enquiry from V2 Rehab website:",
        "Name: " + payload.name,
        "Phone: " + payload.phone,
        "Issue: " + (payload.reason || "-"),
        "Preference: " + (payload.preference || "-"),
        "Message: " + (payload.message || "-")
      ];
      setStatus("ok", currentLang() === "ta"
        ? "படிவம் இன்னும் இணைக்கப்படவில்லை — WhatsApp திறக்கப்படுகிறது, அங்கே அனுப்பவும்."
        : "The form isn't connected yet — opening WhatsApp so you can send this directly.");
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
    }

    function setStatus(state, text) {
      if (!status) return;
      status.setAttribute("data-state", state);
      status.textContent = text;
    }
  }

  function currentLang() {
    return document.documentElement.getAttribute("lang") || "en";
  }

  /* ---------- misc ---------------------------------------------------------- */
  function initMisc() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- boot ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    wireLinks();
    buildHours();
    buildAreas();
    toggleFees();
    toggleRating();
    setupMap();
    initHeader();
    initForm();
    initMisc();
    initLanguage();   // also calls applyConfig() at the end
    initReveal();
  });
})();
