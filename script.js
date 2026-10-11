// ---------- Data ----------
const courses = [
  { name: "Business English", desc: "Struggle at work? Build confident, professional English communication." },
  { name: "Email Writing", desc: "Emails unclear? Write concise, professional messages that get responses." },
  { name: "Public Speaking", desc: "Fear the stage? Speak confidently and engage any audience." },
  { name: "Basic English", desc: "Weak English basics? Improve grammar, vocabulary, listening, and speaking." },
  { name: "MS Office with AI", desc: "Tired of manual work? Use AI to work faster in MS Office." },
  { name: "Digital Marketing with AI", desc: "Low reach and engagement? Use AI to create targeted campaigns." },
  { name: "Canva", desc: "No design skills? Create polished graphics quickly with easy tools." },
];

const aboutTabs = [
  {
    name: "About",
    text: "Wordify has spent nearly ten years in business communication and skills training, and is regarded as one of Pakistan's most trusted online learning platforms. From Karachi to Khyber, our learners join live online classes from wherever they are and use what they learn at work the very next day."
  },
  {
    name: "Why Wordify",
    text: "Whether you're fixing your English basics, writing better emails or learning to work smarter with AI, Wordify gives you practical, real-world skills with friendly support at every step. Small live batches, real workplace scenarios, and a placement test so you start at the right level."
  },
  {
    name: "Teachers",
    text: "Our trainers are experienced communication coaches who've worked with professionals across banking, pharma, marketing and corporate sectors — so every lesson connects directly to what you actually do at work."
  }
];

// ---------- Course pills + grid ----------
const coursePillsEl = document.getElementById("coursePills");
const courseGridEl = document.getElementById("courseGrid");
const courseTitleEl = document.getElementById("courseTitle");
const courseDescEl = document.getElementById("courseDesc");

function renderCourseUI(activeIndex){
  coursePillsEl.innerHTML = "";
  courseGridEl.innerHTML = "";

  courses.forEach((c, i) => {
    const pill = document.createElement("button");
    pill.className = "pill" + (i === activeIndex ? " active" : "");
    pill.textContent = c.name;
    pill.addEventListener("click", () => selectCourse(i));
    coursePillsEl.appendChild(pill);

    const card = document.createElement("div");
    card.className = "course-card" + (i === activeIndex ? " active" : "");
    card.innerHTML = `<h4>${c.name}</h4><p>${c.desc}</p>`;
    card.addEventListener("click", () => {
      selectCourse(i);
      document.getElementById("courses").scrollIntoView({ behavior: "smooth", block: "center" });
    });
    courseGridEl.appendChild(card);
  });

  courseTitleEl.textContent = courses[activeIndex].name;
  courseDescEl.textContent = courses[activeIndex].desc;
}

function selectCourse(i){
  renderCourseUI(i);
}

renderCourseUI(0);

// ---------- About tabs ----------
const aboutPillsEl = document.getElementById("aboutPills");
const aboutTextEl = document.getElementById("aboutText");

function renderAboutUI(activeIndex){
  aboutPillsEl.innerHTML = "";
  aboutTabs.forEach((t, i) => {
    const pill = document.createElement("button");
    pill.className = "pill" + (i === activeIndex ? " active" : "");
    pill.textContent = t.name;
    pill.addEventListener("click", () => renderAboutUI(i));
    aboutPillsEl.appendChild(pill);
  });
  aboutTextEl.textContent = aboutTabs[activeIndex].text;
}
renderAboutUI(0);

// ---------- Nav ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const sections = document.querySelectorAll("section[id], footer[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}, { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Wireframe sphere (decorative, matches brand mockups) ----------
function initWireSphere(canvasId, opts = {}){
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dotCount = opts.dots ?? 26;
  const speed = opts.speed ?? 0.0035;

  let w, h, radius;
  const dots = [];

  function resize(){
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = canvas.offsetWidth || rect.width;
    h = canvas.height = canvas.offsetHeight || rect.height;
    radius = Math.min(w, h) * 0.42;
  }

  // dots spiral from bottom to top of sphere, matching the reference art
  function buildDots(){
    dots.length = 0;
    for (let i = 0; i < dotCount; i++){
      const t = i / (dotCount - 1);
      dots.push({
        theta: t * Math.PI * 3.2,
        phi: Math.PI * (0.15 + t * 0.7)
      });
    }
  }

  let angle = 0;
  function drawSphere(cx, cy){
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    const rings = 10;
    for (let i = 0; i <= rings; i++){
      const ry = radius - (i / rings) * radius * 2;
      const rx = Math.sqrt(Math.max(radius * radius - ry * ry, 0));
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, rx * 0.34, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    const meridians = 12;
    for (let i = 0; i < meridians; i++){
      const a = (i / meridians) * Math.PI + angle * 0.3;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * Math.abs(Math.sin(a)) + 0.001, radius, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function drawDots(cx, cy){
    dots.forEach(d => {
      const theta = d.theta + angle;
      const x = cx + radius * Math.sin(d.phi) * Math.cos(theta);
      const y = cy - radius * Math.cos(d.phi) * 0.9 + radius * Math.sin(d.phi) * Math.sin(theta) * 0.25;
      const scale = 0.5 + 0.5 * Math.sin(theta);
      ctx.beginPath();
      ctx.arc(x, y, 3.2 * Math.max(scale, 0.4), 0, Math.PI * 2);
      ctx.fillStyle = "#ffcf00";
      ctx.fill();
    });
  }

  function frame(){
    ctx.clearRect(0, 0, w, h);
    const cx = w * (opts.cx ?? 0.5);
    const cy = h * (opts.cy ?? 0.5);
    drawSphere(cx, cy);
    drawDots(cx, cy);
    angle += speed;
    requestAnimationFrame(frame);
  }

  resize();
  buildDots();
  window.addEventListener("resize", () => { resize(); });
  frame();
}

initWireSphere("heroWire", { dots: 26, speed: 0.004, cx: 0.55, cy: 0.5 });
initWireSphere("coursesWire", { dots: 20, speed: 0.003, cx: 0.5, cy: 0.5 });
initWireSphere("aboutWire", { dots: 20, speed: 0.003, cx: 0.5, cy: 0.5 });
