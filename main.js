(() => {
  const WA = "5582981739907";
  const top = document.getElementById("top");
  const menu = document.getElementById("menu");
  const nav = document.getElementById("nav");
  document.getElementById("y").textContent = new Date().getFullYear();

  addEventListener("scroll", () => top.classList.toggle("scrolled", scrollY > 8), { passive: true });

  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("open", open);
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    menu.setAttribute("aria-expanded", "false"); nav.classList.remove("open");
  }));

  // Cada serviço abre o WhatsApp com a mensagem do assunto
  document.querySelectorAll("[data-wa]").forEach(li => {
    li.tabIndex = 0;
    li.setAttribute("role", "link");
    const go = () => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`Olá, Dr. Marcelo. Gostaria de informações sobre ${li.dataset.wa}.`)}`, "_blank", "noopener");
    li.addEventListener("click", go);
    li.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  // Vídeos: carrega o player só no clique
  document.querySelectorAll(".yt").forEach(b => b.addEventListener("click", () => {
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.id}?autoplay=1`;
    f.title = b.getAttribute("aria-label");
    f.allow = "autoplay; encrypted-media; picture-in-picture";
    f.allowFullscreen = true;
    b.replaceChildren(f);
  }, { once: true }));

  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add("in"));
})();
