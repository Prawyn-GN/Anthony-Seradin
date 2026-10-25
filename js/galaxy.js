// Fond d'étoiles
const st = $("#stars"); st.setAttribute("viewBox", "0 0 1000 700"); st.setAttribute("preserveAspectRatio", "xMidYMid slice");
for (let i = 0; i < 1000; i++) {
    const c = el("circle", { cx: Math.random() * 1000, cy: Math.random() * 700, r: Math.random() * 1.2 + .2, fill: "#fff", opacity: Math.random() * .6 + .15 }, st);
    if (!reduce && i % 4 == 0) c.innerHTML = `<animate attributeName="opacity" values=".15;.8;.15" dur="${3 + Math.random() * 4}s" repeatCount="indefinite"/>`
}

let raf;
function initGalaxy(PROJECTS, onSelect) {
    // Galaxie
    const g = $("#galaxy"), C = [500, 350], TILT = -18 * Math.PI / 180, FLAT = .5;
    const rings = Math.floor((PROJECTS.length - 1) / 4);
    const half = 170 + rings * 85 + 160;
    g.setAttribute("viewBox", `${500 - half} ${350 - half * .7} ${half * 2} ${half * 1.4}`);
    
    cancelAnimationFrame(raf);
    g.innerHTML = "";
    const defs = el("defs", {}, g);
    function rg(id, a, b) { const r = el("radialGradient", { id, cx: ".35", cy: ".35" }, defs); el("stop", { offset: "0", "stop-color": a }, r); el("stop", { offset: "1", "stop-color": b }, r) }
    const sh=el("radialGradient",{id:"shade",cx:".35",cy:".35",r:".75"},defs);
    el("stop",{offset:".5","stop-color":"#000","stop-opacity":0},sh);
    el("stop",{offset:"1","stop-color":"#000","stop-opacity":.6},sh);
    //Pour remplacer les jpg des planetes par des couleurs
    // rg("gs", "#fff4d0", "#ff2e2e"); rg("g0", "#d9b8ff", "#6a2fc0"); rg("g1", "#9cc8ff", "#2c5fc9"); rg("g2", "#ffd0a0", "#b8531e"); rg("g3", "#ffb6e0", "#a8307a");
    const orb = el("g", {}, g), pl = el("g", {}, g);
    const sun = el("g", { transform: `translate(${C})` }, g);
    el("circle", { r: 48, fill: "#ff9a2e", opacity: .15 }, sun); el("circle", { r: 48, fill: "url(#gs)" }, sun);
    const cs=el("clipPath",{id:"clipSun"},defs);el("circle",{r:48},cs);
    el("image",{href:"assets/images/soleil.jpg",x:-70,y:-70,width:150,height:150,
    "clip-path":"url(#clipSun)",preserveAspectRatio:"xMidYMid slice"},sun);
    const rot = (x, y) => [C[0] + x * Math.cos(TILT) - y * Math.sin(TILT), C[1] + x * Math.sin(TILT) + y * Math.cos(TILT)];

    // Disposition : anneaux de 4 planètes max, rayon croissant, phases en angle d'or
    const nodes = PROJECTS.map((p, i) => {
        const ring = Math.floor(i / 4), rx = 170 + ring * 85, ry = rx * FLAT;
        const e = el("ellipse", { cx: C[0], cy: C[1], rx, ry, fill: "none", stroke: "#a879ff", opacity: .25, transform: `rotate(-18 ${C})` }, orb);
        const a = el("g", { class: "planet", tabindex: 0, role: "button", "aria-label": `Ouvrir ${p.title}` }, pl);
        const b = el("g", { class: "body" }, a); el("circle", { class: "ring", r: 20 }, b);
        if(p.planet){
        const cp=el("clipPath",{id:"clip"+i},defs); el("circle",{r:16},cp);
        el("image",{href:p.planet,x:-16,y:-16,width:32,height:32,
            "clip-path":`url(#clip${i})`,preserveAspectRatio:"xMidYMid slice"},b);
        el("circle",{r:16,fill:"url(#shade)"},b);
        }else{
        el("circle",{r:13,fill:`url(#g${i%4})`},b);
        }
        const t = el("text", { class: "t1", x: 26, y: -2 }, a); t.textContent = L(p.title);
        const u = el("text", { class: "t2", x: 26, y: 16 }, a); u.textContent = L(p.category) || "";
        const open = () => onSelect(p, a); a.addEventListener("click", open);
        a.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open() } });
        return { a, rx, ry, ph: i * 2.39996, sp: .0002 / (1 + ring * .5) };
    });
    function frame(t) { nodes.forEach(n => { const an = n.ph + (reduce ? 0 : t * n.sp), [x, y] = rot(n.rx * Math.cos(an), n.ry * Math.sin(an)); n.a.setAttribute("transform", `translate(${x} ${y})`) }) }
    function loop(t) { if (!paused && !document.hidden) frame(t); raf = requestAnimationFrame(loop) }
    frame(0); if (!reduce) raf = requestAnimationFrame(loop);


}
