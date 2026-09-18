/* ============================================================================
   MAIN — render konten dari data.js + semua interaksi
   Tidak perlu diedit untuk mengganti isi website. Cukup ubah js/data.js.
   ============================================================================ */
(function () {
  "use strict";

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Cegah teks dari data.js merusak halaman bila mengandung < atau & */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function has(v) { return v !== undefined && v !== null && String(v).trim() !== ""; }
  function list(v) { return Array.isArray(v) ? v.filter(Boolean) : []; }

  /* Sembunyikan satu section beserta link navigasinya bila datanya kosong */
  function hideSection(id) {
    var sec = document.getElementById(id);
    if (sec) sec.remove();
    var link = $('.nav__links a[href="#' + id + '"]');
    if (link) link.remove();
  }

  var ICONS = {
    mail:      '<svg viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/></svg>',
    phone:     '<svg viewBox="0 0 24 24"><path d="M21 16.2v2.7a1.8 1.8 0 0 1-2 1.8 17.8 17.8 0 0 1-7.7-2.8 17.5 17.5 0 0 1-5.4-5.4A17.8 17.8 0 0 1 3.1 4.8 1.8 1.8 0 0 1 4.9 3h2.7a1.8 1.8 0 0 1 1.8 1.6c.1.9.3 1.7.6 2.5a1.8 1.8 0 0 1-.4 1.9L8.5 10.1a14.4 14.4 0 0 0 5.4 5.4l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.5 2.5.6a1.8 1.8 0 0 1 1.6 1.6z"/></svg>',
    pin:       '<svg viewBox="0 0 24 24"><path d="M20 10.5c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10.3" r="2.8"/></svg>',
    download:  '<svg viewBox="0 0 24 24"><path d="M21 15.5v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"/><path d="M7.5 10.5 12 15l4.5-4.5M12 15V3"/></svg>',
    arrow:     '<svg viewBox="0 0 24 24"><path d="M7 17 17 7M8.5 7H17v8.5"/></svg>',
    spark:     '<svg viewBox="0 0 24 24"><path d="m12 3 2.2 5.9L20 11l-5.8 2.1L12 19l-2.2-5.9L4 11l5.8-2.1z"/></svg>',
    linkedin:  '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05a4.2 4.2 0 0 1 3.75-2c4 0 4.4 2.6 4.4 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21H9z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.43.43.7.83.91 1.4.17.42.36 1.04.42 2.24.06 1.27.07 1.65.07 4.87s0 3.6-.07 4.87c-.06 1.2-.25 1.82-.42 2.24-.22.57-.48.97-.9 1.4-.43.42-.83.68-1.4.9-.42.17-1.04.36-2.24.42-1.27.06-1.65.07-4.87.07s-3.6 0-4.87-.07c-1.2-.06-1.82-.25-2.24-.42-.57-.22-.97-.48-1.4-.9a3.9 3.9 0 0 1-.9-1.4c-.17-.42-.36-1.04-.42-2.24C2.2 15.6 2.2 15.22 2.2 12s0-3.6.07-4.87c.06-1.2.25-1.82.42-2.24.22-.57.48-.97.9-1.4a3.9 3.9 0 0 1 1.4-.9c.42-.17 1.04-.36 2.24-.42C8.4 2.2 8.78 2.2 12 2.2zm0 1.8c-3.17 0-3.5 0-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17C2.4 10.1 2.4 10.43 2.4 12s0 1.9.07 3.13c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.07 1.57.07 4.74.07s3.5 0 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.07-1.24.07-1.57.07-3.13s0-1.9-.07-3.13c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4C15.5 4 15.17 4 12 4zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.1-3.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z"/></svg>',
    github:    '<svg viewBox="0 0 24 24"><path d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.68-.21.68-.47v-1.8c-2.77.6-3.35-1.18-3.35-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.09.63-1.34-2.21-.25-4.54-1.11-4.54-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.56 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A9.8 9.8 0 0 0 12 2.2z"/></svg>',
    whatsapp:  '<svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07a8.1 8.1 0 0 1-2.38-1.47 8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 2.2A9.75 9.75 0 0 0 3.7 17.03L2.2 21.8l4.9-1.45A9.75 9.75 0 1 0 12.04 2.2zm0 17.86a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.9.92-2.99-.19-.31a8.11 8.11 0 1 1 6.77 3.71z"/></svg>',
    tiktok:    '<svg viewBox="0 0 24 24"><path d="M16.9 2h-3.2v13.9a2.7 2.7 0 1 1-2.3-2.7v-3.2a5.9 5.9 0 1 0 5.5 5.9V9.4a6.8 6.8 0 0 0 4 1.3V7.5a3.9 3.9 0 0 1-4-3.9V2z"/></svg>',
    x:         '<svg viewBox="0 0 24 24"><path d="M17.2 3h3.3l-7.2 8.2L21.8 21h-6.4l-5-6.5L4.6 21H1.3l7.7-8.8L1.5 3h6.6l4.5 6L17.2 3zm-1.1 16.1h1.8L7.9 4.8H6l10.1 14.3z"/></svg>',
    web:       '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 2.8c2.4 2.5 3.7 5.8 3.7 9.2s-1.3 6.7-3.7 9.2C9.6 18.7 8.3 15.4 8.3 12S9.6 5.3 12 2.8z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    link:      '<svg viewBox="0 0 24 24"><path d="M10 13a4 4 0 0 0 5.66 0l3-3A4 4 0 0 0 13 4.34l-1.7 1.7M14 11a4 4 0 0 0-5.66 0l-3 3A4 4 0 0 0 11 19.66l1.7-1.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
  };

  function socialIcon(key) {
    return ICONS[String(key || "").toLowerCase()] || ICONS.link;
  }

  /* Ikon bidang keahlian & layanan — dipilih lewat properti "ikon" di data.js */
  var TECH = {
    android:  '<svg viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/></svg>',
    web:      '<svg viewBox="0 0 24 24"><rect x="2.5" y="4" width="19" height="16" rx="2.5"/><path d="M2.5 9h19M5.8 6.5h.01M8.4 6.5h.01"/></svg>',
    video:    '<svg viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M10 9.2l5 2.8-5 2.8z"/></svg>',
    web3:     '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.4"/><circle cx="5" cy="17" r="2.4"/><circle cx="19" cy="17" r="2.4"/><path d="M10.6 7.1 6.4 14.9M13.4 7.1l4.2 7.8M7.4 17h9.2"/></svg>',
    flow:     '<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 2.5v3M14 2.5v3M10 18.5v3M14 18.5v3M2.5 10h3M2.5 14h3M18.5 10h3M18.5 14h3"/></svg>',
    code:     '<svg viewBox="0 0 24 24"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16"/></svg>',
    design:   '<svg viewBox="0 0 24 24"><path d="M16.5 3.5a2.6 2.6 0 0 1 3.7 3.7L7.8 19.6l-4.6 1 1-4.6z"/></svg>',
    database: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5.8" rx="7.5" ry="3.3"/><path d="M4.5 5.8v12.4c0 1.8 3.4 3.3 7.5 3.3s7.5-1.5 7.5-3.3V5.8M4.5 12c0 1.8 3.4 3.3 7.5 3.3s7.5-1.5 7.5-3.3"/></svg>',
    cloud:    '<svg viewBox="0 0 24 24"><path d="M17.5 19a4 4 0 0 0 .4-8 6 6 0 0 0-11.6 1.4A3.5 3.5 0 0 0 7 19z"/></svg>',
    chat:     '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L3.5 20.5l1.4-5.9A8 8 0 1 1 21 12z"/></svg>'
  };

  function techIcon(key) {
    return TECH[String(key || "").toLowerCase()] || TECH.code;
  }

  function initials(name) {
    var parts = String(name || "").trim().split(/\s+/);
    return ((parts[0] || "")[0] || "" ).concat((parts[1] || "")[0] || "").toUpperCase() || "?";
  }

  /* ========================================================================
     RENDER
     ======================================================================== */

  var D = window.DATA || (typeof DATA !== "undefined" ? DATA : null);
  if (!D) { console.error("data.js tidak termuat."); return; }

  var profil  = D.profil  || {};
  var kontak  = D.kontak  || {};

  /* ---- Judul halaman & navbar ---- */
  var peran = list(profil.peran);
  if (has(profil.nama)) {
    document.title = profil.nama + (peran[0] ? " — " + peran[0] : " — Profil Profesional");
    $("#navName").textContent   = profil.nama;
    $("#footerName").textContent = profil.nama;
  }
  $("#year").textContent = new Date().getFullYear();

  /* ---- HERO ---- */
  if (has(profil.lokasi)) {
    $("#heroLocation").textContent = "Tersedia untuk proyek — " + profil.lokasi;
  } else {
    $("#heroLocation").remove();
  }
  $("#heroName").textContent = profil.nama || "Nama Anda";

  if (has(profil.moto)) {
    $("#heroMoto").textContent = profil.moto;
  } else {
    $("#heroMoto").remove();
  }

  if (has(profil.tagline)) {
    $("#heroTagline").textContent = profil.tagline;
  } else {
    $("#heroTagline").remove();
  }

  /* Tombol hero */
  var heroBtns = ['<a class="btn btn--primary" href="#kontak" data-scroll>Hubungi Saya ' + ICONS.arrow + "</a>"];
  if (has(kontak.cv)) {
    heroBtns.push('<a class="btn btn--ghost" href="' + esc(kontak.cv) + '" download>' + ICONS.download + " Download CV</a>");
  }
  if (list(D.karya).length) {
    heroBtns.push('<a class="btn btn--ghost" href="#karya" data-scroll>Lihat Karya</a>');
  }
  $("#heroActions").innerHTML = heroBtns.join("");

  /* Statistik hero */
  var stats = list(profil.statistik);
  if (stats.length) {
    $("#heroStats").innerHTML = stats.map(function (s) {
      return "<li><b>" + esc(s.angka) + "</b><span>" + esc(s.label) + "</span></li>";
    }).join("");
  } else {
    $("#heroStats").remove();
  }

  /* Foto profil */
  $("#heroPortrait").innerHTML = has(profil.foto)
    ? '<img src="' + esc(profil.foto) + '" alt="Foto ' + esc(profil.nama) + '" loading="lazy">'
    : '<div class="portrait__fallback">' + esc(profil.inisial || initials(profil.nama)) + "</div>";

  /* ---- TENTANG ---- */
  var tentang   = D.tentang || {};
  var paragraf  = list(tentang.paragraf);
  var fakta     = list(tentang.fakta);
  if (paragraf.length) {
    $("#aboutBio").innerHTML = paragraf.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    if (fakta.length) {
      $("#aboutFacts").innerHTML = fakta.map(function (f) {
        return '<div><span class="k">' + esc(f.label) + '</span><span class="v">' + esc(f.nilai) + "</span></div>";
      }).join("");
    } else {
      $("#aboutFacts").remove();
    }
  } else {
    hideSection("tentang");
  }

  /* ---- KEAHLIAN ---- */
  var keahlian = list(D.keahlian).filter(function (g) { return list(g.items).length; });
  if (keahlian.length) {
    $("#skillsGrid").innerHTML = keahlian.map(function (g, i) {
      return '<div class="spec__row reveal">' +
        '<div class="spec__key">' +
          '<span class="spec__idx">' + ("0" + (i + 1)).slice(-2) + "</span>" +
          '<span class="spec__icon">' + techIcon(g.ikon) + "</span>" +
          "<h3>" + esc(g.grup) + "</h3>" +
        "</div>" +
        '<div class="spec__val">' +
          list(g.items).map(function (it) { return "<span>" + esc(it) + "</span>"; }).join("") +
        "</div>" +
      "</div>";
    }).join("");
  } else {
    hideSection("keahlian");
  }

  /* ---- Strip berjalan ---- */
  var marqueeEl = $("#marquee");
  var marqueeItems = list(D.marquee);
  if (!marqueeItems.length) {
    /* tanpa daftar khusus, ambil dari daftar keahlian */
    keahlian.forEach(function (g) {
      list(g.items).forEach(function (i) {
        if (marqueeItems.indexOf(i) === -1) marqueeItems.push(i);
      });
    });
  }
  if (marqueeEl && marqueeItems.length) {
    var run = marqueeItems.map(function (i) {
      return '<span class="marquee__item">' + esc(i) + "</span>";
    }).join("");
    /* digandakan supaya perulangannya mulus tanpa jeda */
    marqueeEl.innerHTML = '<div class="marquee__track">' + run + run + "</div>";
  } else if (marqueeEl) {
    marqueeEl.remove();
  }

  /* ---- LAYANAN ---- */
  var layanan = list(D.layanan);
  if (layanan.length) {
    $("#servicesGrid").innerHTML = layanan.map(function (s, i) {
      var poin = list(s.poin);
      return '<article class="offer__row reveal">' +
        '<span class="offer__num">' + esc(s.nomor || ("0" + (i + 1))) + "</span>" +
        '<div class="offer__body">' +
          "<h3>" + '<span class="offer__icon">' + techIcon(s.ikon) + "</span>" + esc(s.judul) + "</h3>" +
          '<p class="offer__desc">' + esc(s.deskripsi) + "</p>" +
          (has(s.harga) ? '<p class="offer__price">' + esc(s.harga) + "</p>" : "") +
        "</div>" +
        (poin.length
          ? '<ul class="offer__points">' + poin.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>"
          : "<span></span>") +
        "</article>";
    }).join("");
  } else {
    hideSection("layanan");
  }

  /* ---- KARYA ---- */
  var karya = list(D.karya);
  if (karya.length) {
    var kategori = [];
    karya.forEach(function (k) {
      if (has(k.kategori) && kategori.indexOf(k.kategori) === -1) kategori.push(k.kategori);
    });

    if (kategori.length > 1) {
      $("#workFilters").innerHTML =
        '<button class="filter is-active" type="button" data-filter="*" aria-pressed="true">Semua</button>' +
        kategori.map(function (c) {
          return '<button class="filter" type="button" data-filter="' + esc(c) + '" aria-pressed="false">' + esc(c) + "</button>";
        }).join("");
    } else {
      $("#workFilters").remove();
    }

    $("#worksGrid").innerHTML = karya.map(function (k, idx) {
      var meta = [k.klien, k.peran].filter(has)
        .map(function (m) { return esc(m); })
        .join(' <span class="dot">•</span> ');
      var tags = list(k.tags);
      /* karya pertama ditampilkan besar melebar penuh sebagai karya utama */
      return '<article class="work reveal' + (idx === 0 ? " work--feature" : "") +
        '" data-category="' + esc(k.kategori || "") + '">' +
        '<div class="work__thumb' + (has(k.gambar) ? "" : " work__thumb--empty") + '">' +
          (has(k.gambar)
            ? '<img src="' + esc(k.gambar) + '" alt="' + esc(k.judul) + '" loading="lazy">'
            : esc(k.kategori || "Proyek")) +
          (has(k.tahun) ? '<span class="work__year">' + esc(k.tahun) + "</span>" : "") +
        "</div>" +
        '<div class="work__body">' +
          (meta ? '<p class="work__meta">' + meta + "</p>" : "") +
          "<h3>" + esc(k.judul) + "</h3>" +
          (has(k.deskripsi) ? '<p class="work__desc">' + esc(k.deskripsi) + "</p>" : "") +
          (has(k.hasil) ? '<p class="work__result">' + ICONS.spark + "<span>" + esc(k.hasil) + "</span></p>" : "") +
          (tags.length ? '<div class="work__tags">' + tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>" : "") +
          (has(k.link) ? '<a class="work__link" href="' + esc(k.link) + '" target="_blank" rel="noopener noreferrer">Lihat proyek ' + ICONS.arrow + "</a>" : "") +
        "</div></article>";
    }).join("");
  } else {
    hideSection("karya");
  }

  /* ---- PERJALANAN ---- */
  function timelineHTML(items) {
    return list(items).map(function (it) {
      var poin = list(it.poin);
      var org  = [it.instansi, it.lokasi].filter(has).map(esc).join(" · ");
      return '<li class="reveal">' +
        (has(it.periode) ? '<p class="tl__period">' + esc(it.periode) + "</p>" : "") +
        '<h4 class="tl__role">' + esc(it.posisi) + "</h4>" +
        (org ? '<p class="tl__org">' + org + "</p>" : "") +
        (poin.length ? '<ul class="tl__points">' + poin.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" : "") +
        "</li>";
    }).join("");
  }

  var pengalaman  = list(D.pengalaman);
  var pendidikan  = list(D.pendidikan);
  var sertifikasi = list(D.sertifikasi);

  if (pengalaman.length || pendidikan.length || sertifikasi.length) {
    if (pengalaman.length) {
      $("#experienceList").innerHTML = timelineHTML(pengalaman);
    } else {
      $("#experienceList").closest(".journey__col").remove();
    }

    if (pendidikan.length) {
      $("#educationList").innerHTML = timelineHTML(pendidikan);
    } else if ($("#educationList")) {
      $("#educationList").previousElementSibling.remove();
      $("#educationList").remove();
    }

    if (sertifikasi.length) {
      $("#certList").innerHTML = sertifikasi.map(function (c) {
        var meta = [c.penerbit, c.tahun].filter(has).map(esc).join(" · ");
        var inner = "<span><strong>" + esc(c.nama) + "</strong></span>" +
                    (meta ? '<span class="cert__issuer">' + meta + "</span>" : "");
        return has(c.link)
          ? '<li><a href="' + esc(c.link) + '" target="_blank" rel="noopener noreferrer" style="display:contents">' + inner + "</a></li>"
          : "<li>" + inner + "</li>";
      }).join("");
    } else {
      if ($("#certLabel")) $("#certLabel").remove();
      if ($("#certList"))  $("#certList").remove();
    }
  } else {
    hideSection("perjalanan");
  }

  /* ---- TESTIMONI ---- */
  var testimoni = list(D.testimoni);
  if (testimoni.length) {
    $("#quotesGrid").innerHTML = testimoni.map(function (t) {
      return '<figure class="quote reveal"><p>' + esc(t.kutipan) + "</p>" +
        '<footer><span class="quote__avatar">' + esc(initials(t.nama)) + "</span>" +
        '<span><span class="quote__name">' + esc(t.nama) + "</span><br>" +
        '<span class="quote__role">' + esc(t.jabatan) + "</span></span></footer></figure>";
    }).join("");
  } else {
    hideSection("testimoni");
  }

  /* ---- KONTAK ---- */
  if (has(kontak.ajakan)) $("#contactSub").textContent = kontak.ajakan;

  var infoRows = [];
  if (has(kontak.email)) {
    infoRows.push('<a class="contact__item" href="mailto:' + esc(kontak.email) + '">' + ICONS.mail +
      '<span><span class="k">Email</span><span class="v">' + esc(kontak.email) + "</span></span>" +
      '<button class="contact__copy" type="button" data-copy="' + esc(kontak.email) + '">Salin</button></a>');
  }
  if (has(kontak.whatsapp)) {
    var wa = String(kontak.whatsapp).replace(/[^\d]/g, "");
    infoRows.push('<a class="contact__item" href="https://wa.me/' + esc(wa) + '" target="_blank" rel="noopener noreferrer">' + ICONS.phone +
      '<span><span class="k">WhatsApp</span><span class="v">+' + esc(wa) + "</span></span></a>");
  }
  if (has(kontak.lokasi)) {
    infoRows.push('<div class="contact__item">' + ICONS.pin +
      '<span><span class="k">Lokasi</span><span class="v">' + esc(kontak.lokasi) + "</span></span></div>");
  }

  var sosial = list(kontak.sosial).filter(function (s) { return has(s.url); });
  $("#contactInfo").innerHTML =
    (infoRows.length ? '<div class="contact__list">' + infoRows.join("") + "</div>" : "") +
    (sosial.length ? '<div class="socials">' + sosial.map(function (s) {
      return '<a class="social" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' +
        socialIcon(s.ikon) + esc(s.nama) + "</a>";
    }).join("") + "</div>" : "");

  $("#footerSocial").innerHTML = sosial.map(function (s) {
    return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.nama) + '">' + socialIcon(s.ikon) + "</a>";
  }).join("");

  /* ---- Pecah judul jadi kata per kata, supaya bisa muncul bergantian.
          Harus dilakukan SEBELUM observer scroll dipasang: kalau elemen
          disisipkan setelah induknya sudah bertanda "is-in", transisinya
          tidak ikut berjalan. ---- */
  function splitWords(el, step) {
    if (!el || el.dataset.split) return;
    var words = String(el.textContent || "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return;
    el.dataset.split = "1";
    el.innerHTML = words.map(function (word, i) {
      return '<span class="w"><i style="transition-delay:' + (i * (step || 55)) + 'ms">' + esc(word) + "</i></span>";
    }).join(" ");
  }
  splitWords($("#heroName"), 70);
  $$("main .section__title").forEach(function (el) { splitWords(el, 55); });

  /* ========================================================================
     INTERAKSI
     ======================================================================== */

  /* ---- Tema terang/gelap ---- */
  $("#themeToggle").addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("fy-theme", next); } catch (e) {}
    document.dispatchEvent(new CustomEvent("fy:theme"));
  });

  /* ---- Menu mobile ---- */
  var navLinks  = $("#navLinks");
  var navToggle = $("#navToggle");
  function closeMenu() {
    navLinks.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  });
  document.addEventListener("click", function (e) {
    if (navLinks.classList.contains("is-open") && !e.target.closest(".nav")) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Scroll halus + tutup menu saat link diklik ---- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-scroll]");
    if (!link) return;
    var target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    closeMenu();
    var top = target.getBoundingClientRect().top + window.pageYOffset - ($("#nav").offsetHeight - 2);
    window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", link.getAttribute("href"));
  });

  /* ---- Navbar sticky, progress bar, tombol ke atas ---- */
  var nav        = $("#nav");
  var progressEl = $("#progressBar");
  var toTop      = $("#toTop");
  var ticking    = false;

  function onScroll() {
    var y = window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle("is-stuck", y > 8);
    progressEl.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    toTop.classList.toggle("is-visible", y > 600);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---- Scroll spy: tandai menu sesuai section yang terlihat ---- */
  var sections = $$("main section[id]");
  var navMap   = {};
  $$(".nav__links a").forEach(function (a) { navMap[a.getAttribute("href").slice(1)] = a; });

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var link = navMap[entry.target.id];
        if (!link) return;
        $$(".nav__links a").forEach(function (a) { a.classList.remove("is-active"); });
        link.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Animasi muncul saat di-scroll ---- */
  var revealEls = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var siblings = Array.prototype.slice.call(entry.target.parentElement.children);
        var idx = Math.min(siblings.indexOf(entry.target), 5);
        entry.target.style.transitionDelay = (idx * 70) + "ms";
        entry.target.classList.add("is-in");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { ro.observe(el); });
  }

  /* ---- Rotasi profesi di hero ---- */
  var roleEl = $("#heroRole");
  if (roleEl && peran.length) {
    if (reduceMotion || peran.length === 1) {
      roleEl.textContent = peran.join(" · ");
      var caret = $(".caret");
      if (caret) caret.remove();
    } else {
      var rIdx = 0, cIdx = 0, deleting = false;
      (function type() {
        var word = peran[rIdx];
        cIdx += deleting ? -1 : 1;
        roleEl.textContent = word.slice(0, cIdx);
        var delay = deleting ? 45 : 85;
        if (!deleting && cIdx === word.length) { deleting = true; delay = 1900; }
        else if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % peran.length; delay = 350; }
        setTimeout(type, delay);
      })();
    }
  }

  /* ---- Filter karya ---- */
  var filterBox = $("#workFilters");
  if (filterBox) {
    filterBox.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter");
      if (!btn) return;
      var value = btn.dataset.filter;
      $$(".filter", filterBox).forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      var shown = 0;
      $$(".work").forEach(function (card) {
        var match = value === "*" || card.dataset.category === value;
        card.classList.toggle("is-hidden", !match);
        /* bersihkan sisa kemiringan bila kartu disembunyikan saat masih di-hover */
        card.style.transform = "";
        card.style.transition = "";
        if (match) shown++;
      });
      $("#worksEmpty").hidden = shown > 0;
    });
  }

  /* ---- Tombol salin email ---- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy]");
    if (!btn) return;
    e.preventDefault();
    var text = btn.dataset.copy;
    var done = function () {
      var old = btn.textContent;
      btn.textContent = "Tersalin";
      setTimeout(function () { btn.textContent = old; }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(function () {});
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (err) {}
      document.body.removeChild(ta);
    }
  });

  /* ---- Form kontak ---- */
  var form = $("#contactForm");
  var note = $("#formNote");

  function setError(input, message) {
    var field = input.closest(".field");
    field.classList.toggle("has-error", !!message);
    var slot = $('.field__error[data-for="' + input.id + '"]', field);
    if (slot) slot.textContent = message || "";
    return !message;
  }

  function validate() {
    var name  = $("#cfName");
    var email = $("#cfEmail");
    var msg   = $("#cfMessage");
    var ok = true;
    ok = setError(name,  name.value.trim() ? "" : "Nama wajib diisi.") && ok;
    ok = setError(email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()) ? "" : "Masukkan alamat email yang valid.") && ok;
    ok = setError(msg,   msg.value.trim().length >= 10 ? "" : "Tulis pesan minimal 10 karakter.") && ok;
    return ok;
  }

  $$("#contactForm input, #contactForm textarea").forEach(function (el) {
    el.addEventListener("input", function () {
      if (el.closest(".field").classList.contains("has-error")) validate();
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    note.className = "form__note";
    note.textContent = "";
    if (!validate()) return;

    var btn      = $("#cfSubmit");
    var payload  = {
      name:    $("#cfName").value.trim(),
      email:   $("#cfEmail").value.trim(),
      message: $("#cfMessage").value.trim()
    };
    var endpoint = D.formEndpoint;

    /* Tanpa endpoint: buka aplikasi email dengan pesan sudah terisi */
    if (!has(endpoint)) {
      if (!has(kontak.email)) {
        note.className = "form__note is-fail";
        note.textContent = "Alamat email tujuan belum diisi di js/data.js.";
        return;
      }
      var subject = "Pesan dari website — " + payload.name;
      var body    = payload.message + "\n\n—\n" + payload.name + "\n" + payload.email;
      window.location.href = "mailto:" + kontak.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      note.className = "form__note is-ok";
      note.textContent = "Aplikasi email Anda sedang dibuka dengan pesan yang sudah terisi.";
      return;
    }

    /* Dengan endpoint Formspree: kirim langsung */
    btn.disabled = true;
    btn.textContent = "Mengirim...";
    fetch(endpoint, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error("gagal");
      form.reset();
      note.className = "form__note is-ok";
      note.textContent = "Terima kasih. Pesan Anda sudah terkirim.";
    }).catch(function () {
      note.className = "form__note is-fail";
      note.textContent = "Pesan gagal terkirim. Silakan hubungi lewat email atau WhatsApp.";
    }).finally(function () {
      btn.disabled = false;
      btn.textContent = "Kirim Pesan";
    });
  });

  /* ---- Perbarui penomoran section setelah ada yang dihapus ---- */
  $$("main .section__num").forEach(function (el, i) {
    el.textContent = ("0" + (i + 1)).slice(-2);
  });

  /* ========================================================================
     EFEK VISUAL
     Semua efek di bawah otomatis mati bila pengunjung mengaktifkan
     "reduce motion" di perangkatnya, dan efek yang bergantung pada kursor
     tidak dipasang di layar sentuh.
     ======================================================================== */

  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---- 1. Angka statistik menghitung naik ---- */
  function countUp(el) {
    var raw = String(el.textContent).trim();
    var m = raw.match(/^(\D*?)(\d+(?:[.,]\d+)?)(.*)$/);
    if (!m) return;
    var prefix = m[1], suffix = m[3];
    var target = parseFloat(m[2].replace(",", "."));
    var decimals = (m[2].split(/[.,]/)[1] || "").length;
    var duration = 1200, start = null;

    function frame(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = raw;
    }
    el.textContent = prefix + (0).toFixed(decimals) + suffix;
    requestAnimationFrame(frame);
  }

  var statsBox = $("#heroStats");
  if (statsBox && !reduceMotion && "IntersectionObserver" in window) {
    var statObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        $$("b", statsBox).forEach(function (b, i) {
          setTimeout(function () { countUp(b); }, i * 130);
        });
      });
    }, { threshold: 0.4 });
    statObserver.observe(statsBox);
  }

  /* ---- 3. Kartu miring 3D mengikuti kursor + pantulan cahaya ---- */
  /* Hanya gambar yang dimiringkan. Baris teks tidak dimiringkan — memiringkan
     teks membuatnya sulit dibaca dan justru terasa seperti efek tempelan. */
  if (finePointer && !reduceMotion) {
    $$(".portrait, .work__thumb").forEach(function (card) {
      card.classList.add("tilt");
      var glare = document.createElement("span");
      glare.className = "glare";
      card.appendChild(glare);

      var rect = null, pending = false, mx = 0, my = 0;

      function apply() {
        pending = false;
        if (!rect) return;
        var px = (mx - rect.left) / rect.width;
        var py = (my - rect.top) / rect.height;
        var rotY = (px - 0.5) * 11;
        var rotX = (0.5 - py) * 11;
        card.style.transform =
          "perspective(950px) rotateX(" + rotX.toFixed(2) + "deg) rotateY(" +
          rotY.toFixed(2) + "deg) translateY(-6px)";
        glare.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
        glare.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
      }

      card.addEventListener("pointerenter", function () {
        rect = card.getBoundingClientRect();
        /* transisi bawaan kartu 0,3 detik membuat kemiringan tertinggal dari
           kursor — dipersingkat selama tilt aktif, lalu dikembalikan saat lepas
           supaya gerak pulangnya tetap halus */
        card.style.transition = "transform .08s linear, box-shadow .3s ease";
      });
      card.addEventListener("pointermove", function (e) {
        mx = e.clientX; my = e.clientY;
        if (!rect) rect = card.getBoundingClientRect();
        if (!pending) { pending = true; requestAnimationFrame(apply); }
      });
      card.addEventListener("pointerleave", function () {
        rect = null;
        card.style.transition = "";   /* kembali ke transisi bawaan CSS */
        card.style.transform = "";
      });
    });
  }

  /* ---- 4. Tombol magnetik ---- */
  if (finePointer && !reduceMotion) {
    $$("#heroActions .btn, .nav__cta").forEach(function (btn) {
      var box = null;
      btn.style.transition = "transform .25s var(--ease)";
      btn.addEventListener("pointerenter", function () { box = btn.getBoundingClientRect(); });
      btn.addEventListener("pointermove", function (e) {
        if (!box) box = btn.getBoundingClientRect();
        var dx = (e.clientX - (box.left + box.width / 2)) / (box.width / 2);
        var dy = (e.clientY - (box.top + box.height / 2)) / (box.height / 2);
        btn.style.transform = "translate(" + (dx * 6).toFixed(1) + "px," + (dy * 5).toFixed(1) + "px)";
      });
      btn.addEventListener("pointerleave", function () {
        box = null;
        btn.style.transform = "";
      });
    });
  }

  /* ---- 5. Parallax foto profil ---- */
  var heroMedia = $(".hero__media");
  var heroSection = $(".hero");
  if (heroMedia && heroSection && !reduceMotion) {
    var pTicking = false;
    var onParallax = function () {
      pTicking = false;
      var limit = heroSection.offsetHeight;
      var y = Math.min(window.pageYOffset, limit);
      heroMedia.style.transform = "translate3d(0," + (y * 0.13).toFixed(1) + "px,0)";
    };
    window.addEventListener("scroll", function () {
      if (!pTicking) { pTicking = true; requestAnimationFrame(onParallax); }
    }, { passive: true });
    onParallax();
  }

  /* ---- 6. Partikel jaringan di hero ---- */
  (function particles() {
    var canvas = $("#heroCanvas");
    if (!canvas) return;
    if (reduceMotion) { canvas.remove(); return; }

    var hero = $(".hero");
    var ctx = canvas.getContext("2d");
    if (!hero || !ctx) { canvas.remove(); return; }

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, points = [], frameId = null, running = false;
    var pointer = { x: -9999, y: -9999 };
    var color = "#2563EB";

    function readColor() {
      var c = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      if (c) color = c;
    }

    function build() {
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* jumlah titik menyesuaikan luas layar, dibatasi agar tetap ringan */
      var count = Math.max(24, Math.min(80, Math.round((w * h) / 17000)));
      points = [];
      for (var i = 0; i < count; i++) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: Math.random() * 1.5 + 1
        });
      }
    }

    var LINK = 132;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      var i, j, p, q, dx, dy, dist;

      for (i = 0; i < points.length; i++) {
        p = points[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; } else if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; } else if (p.y > h) { p.y = h; p.vy *= -1; }

        dx = pointer.x - p.x;
        dy = pointer.y - p.y;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 1) {
          p.x += (dx / dist) * 0.42;
          p.y += (dy / dist) * 0.42;
        }
      }

      for (i = 0; i < points.length; i++) {
        p = points[i];
        for (j = i + 1; j < points.length; j++) {
          q = points[j];
          dx = p.x - q.x;
          dy = p.y - q.y;
          dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK) {
            ctx.globalAlpha = (1 - dist / LINK) * 0.34;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      for (i = 0; i < points.length; i++) {
        p = points[i];
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(draw);
    }
    function stop() {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
    }

    readColor();
    build();
    start();

    hero.addEventListener("pointermove", function (e) {
      var box = hero.getBoundingClientRect();
      pointer.x = e.clientX - box.left;
      pointer.y = e.clientY - box.top;
    });
    hero.addEventListener("pointerleave", function () {
      pointer.x = pointer.y = -9999;
    });

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    });

    document.addEventListener("fy:theme", readColor);

    /* berhenti menggambar saat hero tidak terlihat atau tab tidak aktif */
    var heroVisible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          heroVisible = entry.isIntersecting;
          if (heroVisible) start(); else stop();
        });
      }, { threshold: 0 }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else if (heroVisible) start();
    });
  })();

})();
