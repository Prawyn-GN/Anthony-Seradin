/* Point d'entrée : charge les données puis branche tout */
let PROJECTS = [], SKILLS = {};
// Panneau projet
const P = $("#panel"), PC = $("#pc"); let last = null;
const list = (t, a) => a && a.length ? `<h4>${t}</h4><ul>${a.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "";
const txt = (t, s) => s ? `<h4>${t}</h4><p>${esc(s)}</p>` : "";
function openP(p, src) {
  document.querySelectorAll(".planet.sel").forEach(e => e.classList.remove("sel"));
  last = src || document.activeElement; src && src.classList.add("sel"); 
  // paused = true; (pour stop la rotation quand panel ouvert)

  PC.innerHTML = `<h3 id="pt">${esc(L(p.title))}</h3><h3><small>${esc(L(p.category) || "")}</small></h3>` +
    (p.technologies && p.technologies.length ? `<h4>Technologies</h4><ul class="tags">${p.technologies.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "") +
    txt("Description", L(p.description)) + txt("Objectifs", L(p.objectives)) + list(T("features"), L(p.features)) +
    (p.image ? `<p><img src="${esc(p.image)}" alt="Capture de ${esc(L(p.title))}"></p>` : "");
  P.classList.add("open"); $("#close").focus();
}
function closeP() { P.classList.remove("open"); document.querySelectorAll(".planet.sel").forEach(e => e.classList.remove("sel")); last && last.focus && last.focus() }
$("#close").onclick = closeP; addEventListener("keydown", e => { if (e.key === "Escape" && P.classList.contains("open")) closeP() });

// ferme le panel quand on clique a l'exterieur
document.addEventListener("click", e => {
    if (!P.classList.contains("open")) return;
    if (e.target.closest("#panel, .planet, #plist button")) return;
    closeP();
});


function renderContent() {
  // Compétences
  $("#skills").innerHTML = Object.entries(SKILLS)
  .filter(([, v]) => v.length)
  .map(([k, v]) => `<div><h3>${esc(T("cat." + k))}</h3><ul class="tags">${v.map(x => `<li>${esc(L(x))}</li>`).join("")}</ul></div>`)
  .join("");

  // Liste + filtres
  const cats = [null, ...new Set(PROJECTS.map(p => L(p.category)).filter(Boolean))]; let cur = null;
  function draw() {
  const cats = [null, ...new Set(PROJECTS.map(p => L(p.category)).filter(Boolean))];

  $("#filters").innerHTML = cats.map(c =>
    `<button aria-pressed="${c === cur}" data-c="${esc(c ?? "")}">${esc(c ?? T("all"))}</button>`
  ).join("");

  $("#plist").innerHTML = PROJECTS.map((p, i) => ({ p, i }))
    .filter(({ p }) => cur === null || L(p.category) === cur)
    .map(({ p, i }) => `<button data-i="${i}"><span>${esc(L(p.title))}</span><small>${esc(L(p.category) || "")}</small></button>`)
    .join("");
}
  document.addEventListener("click", e => {
    const f = e.target.closest("#filters button"); if (f) { cur = f.dataset.c; draw(); return }
    const b = e.target.closest("#plist button"); if (b) openP(PROJECTS[b.dataset.i], null)
  });
  draw();

}
// Lien actif dans la nav
const links = [...document.querySelectorAll("nav a")];
document.querySelectorAll("main section").forEach(s => new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && s.id) links.forEach(l => l.classList.toggle("on", l.hash === "#" + s.id)) }), { rootMargin: "-40% 0px -55% 0px" }).observe(s));

async function init() {
  try {
    const r = await fetch("data/projects.json");
    if (!r.ok) throw new Error(r.status);
    const data = await r.json();
    PROJECTS = data.projects; SKILLS = data.skills;
    initGalaxy(PROJECTS, openP); renderContent();
  } catch (e) {
    $("#galaxy").insertAdjacentHTML("afterend", '<p class="demo" style="position:relative;z-index:2">Impossible de charger data/projects.json — lance le site avec un serveur local (pas file://).</p>');
    console.error(e);
  }
}

// Menu hamburger
const burger = $("#burger"), menu = $("#menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
init();

function render() {
  applyLang();
  P.classList.remove("open");
  if (PROJECTS.length) { initGalaxy(PROJECTS, openP); renderContent(); }
}
$("#lang").addEventListener("click", () => {
  lang = lang === "fr" ? "en" : "fr";
  try { localStorage.setItem("lang", lang); } catch (e) {}
  render();
});