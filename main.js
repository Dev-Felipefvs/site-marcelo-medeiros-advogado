document.getElementById("ano").textContent = new Date().getFullYear();

function openTopic(hash) {
  const topic = document.getElementById(hash.slice(1));
  if (topic instanceof HTMLDetailsElement) topic.open = true;
}

document.querySelectorAll(".quick-links a").forEach(link => {
  link.addEventListener("click", event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    openTopic(link.hash);
  });
});

window.addEventListener("hashchange", () => openTopic(window.location.hash));
openTopic(window.location.hash);
