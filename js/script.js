(function () {
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");

  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("menu-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const planSelect = document.getElementById("planSelect");
  if (planSelect) {
    document.querySelectorAll(".plan-cta[data-plan]").forEach((btn) => {
      btn.addEventListener("click", () => {
        planSelect.value = btn.getAttribute("data-plan");
      });
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCounter = document.getElementById("lightboxCounter");
  let galleryImages = [];
  let galleryIndex = 0;

  function updateLightbox() {
    lightboxImg.src = galleryImages[galleryIndex];
    lightboxCounter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
  }

  function openLightbox(images, index) {
    galleryImages = images;
    galleryIndex = index;
    updateLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showPrev() {
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  }

  function showNext() {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    updateLightbox();
  }

  if (lightbox) {
    document.querySelectorAll(".gallery-trigger").forEach((el) => {
      const mainSrc = el.querySelector("img").getAttribute("src");
      const extra = (el.getAttribute("data-images") || "").split(",").filter(Boolean);
      const images = [mainSrc, ...extra];

      const trigger = () => openLightbox(images, 0);
      el.addEventListener("click", trigger);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          trigger();
        }
      });
    });

    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxPrev").addEventListener("click", showPrev);
    document.getElementById("lightboxNext").addEventListener("click", showNext);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    });
  }

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  function getFormMessage(key) {
    const lang = localStorage.getItem("medibra-lang") === "es" ? "es" : "pt";
    return (window.I18N_TRANSLATIONS && window.I18N_TRANSLATIONS[lang].contato[key]) || "";
  }

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Form submission failed");
          formStatus.textContent = getFormMessage("formSuccess");
          formStatus.className = "form-status success";
          contactForm.reset();
        })
        .catch(() => {
          formStatus.textContent = getFormMessage("formError");
          formStatus.className = "form-status error";
        });
    });
  }
})();
