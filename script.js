/* ============ EDIT YOUR CONTENT HERE ============ */
const SITE = {
  email: "snehaskhanvilkar@gmail.com",
  behance: "https://www.behance.net/snehak2",   // Behance URL (also edit the 3 links in index.html)
  names: ["Sneha Khanvilkar", "Design Portfolio"]
};
const SKILLS = ["UX Research","UI Design","Product Design","Interaction Design","Design Audits","User Interviews","Wireframing","Prototyping","Figma","Miro","Photoshop","Canva","AI Tools","GDevelop","Wix Studio","HTML","CSS","JavaScript"];
const SOON = "Coming soon";
const ul=a=>`<ul class="pts">${a.map(x=>`<li>${x}</li>`).join("")}</ul>`;
const G=(h,a)=>`<h4>${h}</h4>`+ul(a);
const PROJECTS = [
 {id:"pethospital",n:"01",custom:true,title:"Government Pet Hospital",short:"A centralized digital platform concept that makes government veterinary services easier to find, book and trust.",role:"UX Research + UI Design",cat:"UX Research / Product Design · UX Studio",year:""},
 {id:"chronos",n:"02",title:"Chronos City",cover:"assets/chronos-cover.jpg",short:"A focus and task-initiation experience designed around the challenges of starting and managing tasks.",role:"UX Research + UI Design",cat:"UX Research / Product Design",year:""},
 {id:"farmsetu",n:"03",title:"FarmSetu",cover:"assets/farmsetu-cover.jpg",short:"A smart livestock monitoring and alert experience using technology to help farmers respond to disease and environmental risks.",role:"UX Research + UI Design",cat:"UX / AI / Agriculture",year:""},
 {id:"recap",n:"04",title:"RECAP",cover:"assets/recap-cover.jpg",short:"A research-driven exploration of continuity, trust and belonging in sports experiences.",role:"UX Research + UI Design",cat:"UX Research / Sports",year:""}
];
/* ================================================= */

const $ = s => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const cover = (id, label, n) => `<div class="cover"><span class="ph">${label}</span><img src="assets/${id}-${n}.jpg" alt="${label}" onerror="this.remove()"></div>`;

// Work list
if($("#works"))$("#works").innerHTML = PROJECTS.map(p => `<li><button class="work" data-id="${p.id}" aria-label="Open case study: ${p.title}">
  <span class="n">${p.n}</span>
  <span><h3>${p.title}</h3><span>${p.short}</span><p class="meta">${p.role} · ${p.cat}${p.year?" · "+p.year:""}</p></span>
  ${p.cover?`<div class="cover"><img src="${p.cover}" alt="${p.title}"></div>`:cover(p.id,p.title+" — replace assets/"+p.id+"-cover.jpg","cover")}</button></li>`).join("");

// Skills ticker (duplicated for seamless loop)
if($("#track"))$("#track").innerHTML = [...SKILLS,...SKILLS].map(s=>`<span>${s}</span>`).join("");

// Rotating name
let i=0; const nt=$("#nameText");
if(!reduce) setInterval(()=>{ nt.classList.add("out"); setTimeout(()=>{ i=(i+1)%SITE.names.length; nt.textContent=SITE.names[i]; nt.classList.remove("out"); },500); },4500);

const CASES={pethospital:()=>PETCASE(),recap:()=>RECAPCASE(),chronos:()=>CHRONOSCASE(),farmsetu:()=>FARMCASE()};
// Case study overlay
const cs=$("#case")||{}, body=$("#caseBody"); let opener=null;
const sec=(h,t,extra="")=>`<div class="cs"><h3>${h}</h3><div>${t?(t[0]==="<"?t:`<p>${t}</p>`):`<p class="soon">${SOON}</p>`}${extra}</div></div>`;
function openCase(id){
  const p=PROJECTS.find(x=>x.id===id); opener=document.activeElement;
  body.classList.toggle("wide",!!CASES[p.id]);
  if(CASES[p.id]){ body.innerHTML=`<button class="back" id="back">← Back to Work</button>`+CASES[p.id](); } else body.innerHTML=`<button class="back" id="back">← Back to Work</button><h2 id="caseTitle">${p.title}</h2><p class="lead">${p.overview}</p>
  <dl class="facts"><div><dt>Role</dt><dd>${p.role}</dd></div><div><dt>Category</dt><dd>${p.cat}</dd></div>${p.year?`<div><dt>Year</dt><dd>${p.year}</dd></div>`:""}</dl>`
  +cover(p.id,"Cover — assets/"+p.id+"-cover.jpg","cover")
  +(p.sections?p.sections.map(([h,t,slug,n])=>sec(h,t,n?`<div class="shots">${Array.from({length:n},(_,i)=>cover(p.id+"-"+slug,h+" — assets/"+p.id+"-"+slug+"-0"+(i+1)+".jpg","0"+(i+1))).join("")}</div>`:"")).join(""):""+sec("Problem",p.problem)+sec("Context",p.context)+sec("My role",p.myrole)+sec("Research",p.research||"Research findings coming soon")
  +sec("Key insights",p.insights)+sec("Design process",p.process)
  +sec("Wireframes & iterations",p.wire,`<div class="shots">${cover(p.id,"Wireframe — "+p.id+"-01.jpg","01")}${cover(p.id,"Iteration — "+p.id+"-02.jpg","02")}</div>`)
  +sec("Final design",p.final,`<div class="shots">${cover(p.id,"Final — "+p.id+"-03.jpg","03")}</div>`)+sec("Outcome & learnings",p.learn));
  if(CASES[p.id]) hookCase(); cs.hidden=false; requestAnimationFrame(()=>cs.classList.add("open"));
  document.body.style.overflow="hidden"; cs.scrollTop=0; $("#back").focus();
  $("#back").onclick=closeCase;
}
function closeCase(){
  cs.classList.remove("open"); document.body.style.overflow="";
  setTimeout(()=>{cs.hidden=true; opener&&opener.focus();}, reduce?0:700);
}
document.querySelectorAll(".work").forEach(b=>b.onclick=()=>openCase(b.dataset.id));
addEventListener("keydown",e=>{ if(e.key==="Escape"&&cs.hidden===false) closeCase(); });
document.querySelectorAll("nav a").forEach(a=>{ if(a.getAttribute("href")===location.pathname.split("/").pop()) a.setAttribute("aria-current","page"); });

// Mobile menu
const burger=$("#burger"), nav=$("#nav");
burger.onclick=()=>{ const o=nav.classList.toggle("open"); burger.setAttribute("aria-expanded",o); };
nav.querySelectorAll("a").forEach(a=>a.onclick=()=>{nav.classList.remove("open");burger.setAttribute("aria-expanded",false);});

// About statement reveals on scroll
new IntersectionObserver((en,o)=>en.forEach(e=>{ if(e.isIntersecting){e.target.classList.add("on");o.unobserve(e.target);} }),{threshold:.5}).observe($("#loop")||document.body);

// Photo reacts slightly to the mouse (home page, desktop only)
const ph=$("#photo");
if(ph && matchMedia("(pointer:fine)").matches && !reduce) addEventListener("mousemove",e=>{
  const r=ph.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
  if(Math.abs(x)<1.5&&Math.abs(y)<1.5) ph.style.transform=`rotate(${3+x*4}deg) translate(${x*10}px,${y*10}px)`; });

// Contact form: sends to your inbox through FormSubmit (no backend needed)
const form=$("#form");
if(form) form.addEventListener("submit",async e=>{
  e.preventDefault(); const st=$("#status"), d=Object.fromEntries(new FormData(form));
  if(d._honey) return; st.textContent="Sending…";
  try{
    const r=await fetch("https://formsubmit.co/ajax/"+SITE.email,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},
      body:JSON.stringify({name:d.name,email:d.email,message:d.message,_subject:"New portfolio message from "+d.name,_replyto:d.email,_captcha:"false"})});
    const j=await r.json(); if(String(j.success)!=="true") throw new Error(j.message);
    form.reset(); st.textContent="Thank you! Your message is on its way ✶";
  }catch(err){ st.innerHTML=`Couldn't send from here. Please <a href="mailto:${SITE.email}">email me directly</a>.`; }
});

// Case study helpers: reveal on scroll inside the overlay, table of contents, close buttons
function hookCase(){
  // fold dense research blocks into tap-to-open rows so the page reads as a story, not a wall of text
  body.querySelectorAll("#pc-research>.g,#pc-flows>.g").forEach(g=>{
    const h=g.querySelector(".sub"),d=document.createElement("details"),s=document.createElement("summary");
    d.className="dt rv";s.textContent=h?h.textContent:"More";if(h)h.remove();d.append(s);g.replaceWith(d);d.append(g);g.style.marginTop="1.2rem";});
  const io=new IntersectionObserver(en=>en.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }),{root:cs,threshold:.08});
  body.querySelectorAll(".rv").forEach(el=>io.observe(el));
  if(reduce) body.querySelectorAll(".rv").forEach(el=>el.classList.add("in"));
  body.querySelectorAll(".toc a").forEach(a=>a.onclick=e=>{ e.preventDefault(); body.querySelector(a.getAttribute("href")).scrollIntoView({behavior:reduce?"auto":"smooth"}); });
  body.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeCase);
}

// My Approach: the three cards slide into place one after another when the section scrolls into view (runs once)
const cardsEl=$("#cards");
if(cardsEl){
  const bx=[...cardsEl.querySelectorAll("article")], mob=()=>innerWidth<=820;
  const offs=()=>mob()?[[0,56,3],[0,48,-2],[0,40,2]]:[[-70,46,-4],[90,70,3],[70,34,-2]];   // [dx, dy, rotation] before they settle
  let o=offs(), started=false;
  const setBox=(i,p)=>{const[dx,dy,r]=o[i],q=1-p; bx[i].style.transform=`translate(${dx*q}px,${dy*q}px) rotate(${r*q}deg)`; bx[i].style.opacity=.35+.65*p;};
  const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
  const init=()=>{o=offs();bx.forEach((_,i)=>setBox(i,0));};
  const finish=()=>{bx.forEach(b=>{b.style.transform="";b.style.opacity="";});cardsEl.classList.remove("ap");};
  const run=()=>{ started=true; init(); const dur=1100,gap=450; let t0=null;
    const tick=t=>{ if(t0===null)t0=t; const e=t-t0; bx.forEach((_,i)=>setBox(i,ease(Math.min(1,Math.max(0,(e-i*gap)/dur)))));
      if(e>=dur+gap*2){finish();return;} requestAnimationFrame(tick); };
    requestAnimationFrame(tick); };
  if(reduce) finish(); else { init(); addEventListener("resize",()=>{ if(!started) init(); });
    new IntersectionObserver(([e],io)=>{ if(e.isIntersecting&&!started){ io.disconnect(); run(); } },{threshold:mob()?.12:.4}).observe(cardsEl); }
}
