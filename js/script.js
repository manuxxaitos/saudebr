(function () {
  const header = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");

  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      header.classList.toggle("menu-open");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => header.classList.remove("menu-open"));
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

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const subject = encodeURIComponent("Cotação MediBra +Saúde");
      const body = encodeURIComponent(
        `Nome: ${data.get("name")}\nE-mail: ${data.get("email")}\nTelefone: ${data.get("phone")}\nPlano: ${data.get("plan")}\nMensagem: ${data.get("message")}`
      );
      window.location.href = `mailto:contato@medibra.com.ar?subject=${subject}&body=${body}`;
    });
  }
})();
