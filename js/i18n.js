(function () {
  const SUPPORTED = ["pt", "es"];
  const DEFAULT_LANG = "pt";
  const STORAGE_KEY = "medibra-lang";
  const cache = {};

  function getStoredLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  function getByPath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function loadLang(lang) {
    if (cache[lang]) return cache[lang];
    const data = window.I18N_TRANSLATIONS[lang];
    cache[lang] = data;
    return data;
  }

  function applyTranslations(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = getByPath(dict, key);
      if (value === undefined) return;
      if (el.tagName === "META") {
        el.setAttribute("content", value);
      } else if (el.tagName === "TITLE") {
        el.textContent = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      const value = getByPath(dict, key);
      if (value !== undefined) el.setAttribute("alt", value);
    });

    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === dict.__lang);
    });

    document.documentElement.lang = dict.__lang === "pt" ? "pt-BR" : "es-AR";
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    const dict = loadLang(lang);
    dict.__lang = lang;
    applyTranslations(dict);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    setLang(SUPPORTED.includes(urlLang) ? urlLang : getStoredLang());

    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  });
})();
