// ---------- Data (sample content, edit freely) ----------
const courses = [
  {
    name: "Business English",
    img: "images/business-english.jpg",
    desc: "Struggle at work? Build confident, professional English communication.",
    summary: "Speak, write and present with confidence at work. Practise client calls, meetings and presentations with live feedback, taught level by level.",
    points: ["Client calls and meetings", "Professional vocabulary and tone", "Presentations that persuade", "Fluency drills with trainer feedback"],
    meta: ["12 weeks", "3 live classes / week", "Beginner to Advanced"]
  },
  {
    name: "Email Writing",
    img: "images/email-writing.jpg",
    desc: "Emails unclear? Write concise, professional messages that get responses.",
    summary: "Learn to structure emails so people read them and reply. From short follow-ups to formal complaints and proposals.",
    points: ["Clear subject lines and openings", "Polite, firm and persuasive tone", "Follow-ups, requests and complaints", "Proofreading and reusable templates"],
    meta: ["6 weeks", "2 live classes / week", "Intermediate"]
  },
  {
    name: "Public Speaking",
    img: "images/public-speaking.jpg",
    desc: "Fear the stage? Speak confidently and engage any audience.",
    summary: "Overcome stage fear and learn to hold a room. You will deliver short talks every week and get honest, helpful feedback.",
    points: ["Beat nerves and build presence", "Structure a talk with a strong opening", "Voice, pace and body language", "Handling questions on the spot"],
    meta: ["8 weeks", "2 live classes / week", "All levels"]
  },
  {
    name: "Basic English",
    img: "images/basic-english.jpg",
    desc: "Weak English basics? Improve grammar, vocabulary, listening, and speaking.",
    summary: "A friendly, step-by-step foundation course. Fix your grammar, grow your vocabulary and start speaking without hesitation.",
    points: ["Core grammar made simple", "Everyday vocabulary and phrases", "Listening practice with real audio", "Daily speaking practice"],
    meta: ["12 weeks", "3 live classes / week", "Beginner"]
  },
  {
    name: "MS Office with AI",
    img: "images/ms-office-ai.jpg",
    desc: "Tired of manual work? Use AI to work faster in MS Office.",
    summary: "Get more done in Word, Excel and PowerPoint using AI assistants. Cut hours of repetitive work down to minutes.",
    points: ["Word: reports and documents with AI", "Excel: formulas, tables and analysis", "PowerPoint: slides built in minutes", "Prompts that save you time daily"],
    meta: ["8 weeks", "2 live classes / week", "Beginner to Intermediate"]
  },
  {
    name: "Digital Marketing with AI",
    img: "images/digital-marketing.jpg",
    desc: "Low reach and engagement? Use AI to create targeted campaigns.",
    summary: "Plan, create and measure campaigns faster with AI tools. Learn what to post, who to target and how to track results.",
    points: ["Social media content with AI", "Audience targeting and ads basics", "Captions, copy and campaign plans", "Reading analytics and improving results"],
    meta: ["10 weeks", "2 live classes / week", "Beginner"]
  },
  {
    name: "Canva",
    img: "images/canva.jpg",
    desc: "No design skills? Create polished graphics quickly with easy tools.",
    summary: "Design posts, presentations, logos and documents that look professional, with no design background needed.",
    points: ["Social posts and stories", "Presentations and brand kits", "Logos, flyers and posters", "Templates and time-saving tricks"],
    meta: ["4 weeks", "2 live classes / week", "Beginner"]
  }
];

const aboutTabs = [
  {
    name: "About",
    text: "Wordify has spent nearly ten years in business communication and skills training, and is regarded as one of Pakistan's most trusted online learning platforms. From Karachi to Khyber, our learners join live online classes from wherever they are and use what they learn at work the very next day. Whether you're fixing your English basics, writing better emails or learning to work smarter with AI, Wordify gives you practical, real-world skills with friendly support at every step."
  },
  {
    name: "Why Wordify",
    text: "Small live batches, real workplace scenarios, and a placement test so you start at exactly the right level. Every class ends with something you can use at work the next day, and our team is always one message away."
  },
  {
    name: "Teachers",
    text: "Our trainers are experienced communication coaches who have worked with professionals across banking, pharma, marketing and corporate sectors, so every lesson connects directly to what you actually do at work."
  }
];

const pad = n => String(n).padStart(2, "0");

// ---------- Courses ----------
const courseNav = document.getElementById("courseNav");
const courseImg = document.getElementById("courseImg");
const courseMedia = courseImg.parentElement;

function buildCourseNav(){
  courseNav.innerHTML = courses.map((c, i) => `
    <li><button class="cn-btn" data-i="${i}">
      <span class="cn-num">${pad(i + 1)}</span>
      <span class="cn-name">${c.name}</span>
      <span class="cn-arrow">&rarr;</span>
    </button></li>`).join("");
  courseNav.querySelectorAll(".cn-btn").forEach(b =>
    b.addEventListener("click", () => selectCourse(+b.dataset.i)));
}

function selectCourse(i, first){
  const c = courses[i];
  courseNav.querySelectorAll(".cn-btn").forEach((b, idx) => b.classList.toggle("active", idx === i));

  const apply = () => {
    courseImg.src = c.img;
    courseImg.alt = c.name;
    document.getElementById("courseTitle").textContent = c.name;
    document.getElementById("courseDesc").textContent = c.desc;
    document.getElementById("courseSummary").textContent = c.summary;
    document.getElementById("courseBullets").innerHTML = c.points.map(p => `<li>${p}</li>`).join("");
    document.getElementById("courseMeta").innerHTML = c.meta.map(m => `<span>${m}</span>`).join("");
    document.getElementById("courseCount").textContent = `${pad(i + 1)} / ${pad(courses.length)}`;
    courseMedia.classList.remove("swap");
  };

  if (first) return apply();
  courseMedia.classList.add("swap");
  setTimeout(apply, 220);
}
buildCourseNav();
selectCourse(0, true);

// ---------- About tabs ----------
const aboutTabsEl = document.getElementById("aboutTabs");
function renderAbout(i){
  aboutTabsEl.innerHTML = aboutTabs.map((t, idx) =>
    `<button class="tab${idx === i ? " active" : ""}" role="tab" data-i="${idx}">${t.name}</button>`).join("");
  aboutTabsEl.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => renderAbout(+b.dataset.i)));
  document.getElementById("aboutText").textContent = aboutTabs[i].text;
}
renderAbout(0);

// ---------- Nav ----------
const navWrap = document.getElementById("navWrap");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", false);
}));

const spyTargets = ["home", "courses", "about", "testimonials", "chat"]
  .map(id => document.getElementById(id)).filter(Boolean);
const spyLinks = navLinks.querySelectorAll("a:not(.nav-enroll-mobile)");
function onScroll(){
  navWrap.classList.toggle("scrolled", window.scrollY > 30);
  let current = "home";
  spyTargets.forEach(sec => { if (window.scrollY >= sec.offsetTop - 220) current = sec.id; });
  spyLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("in"));
}

// ---------- Wireframe sphere (hero) ----------
(function initWireSphere(){
  const canvas = document.getElementById("heroWire");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dotCount = 26;
  let size, radius, angle = 0;
  const dots = [];

  function resize(){
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = canvas.offsetWidth;
    canvas.width = canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    radius = size * 0.4;
  }
  for (let i = 0; i < dotCount; i++){
    const t = i / (dotCount - 1);
    dots.push({ theta: t * Math.PI * 3.2, phi: Math.PI * (0.12 + t * 0.76) });
  }

  function draw(){
    ctx.clearRect(0, 0, size, size);
    const c = size / 2;
    ctx.strokeStyle = "rgba(160,195,255,0.22)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++){
      const ry = radius - (i / 10) * radius * 2;
      const rx = Math.sqrt(Math.max(radius * radius - ry * ry, 0));
      ctx.beginPath();
      ctx.ellipse(c, c + ry * 0.0, rx, rx * 0.34, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = 0; i < 12; i++){
      const a = (i / 12) * Math.PI + angle * 0.3;
      ctx.beginPath();
      ctx.ellipse(c, c, radius * Math.abs(Math.sin(a)) + 0.001, radius, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    dots.forEach(d => {
      const th = d.theta + angle;
      const x = c + radius * Math.sin(d.phi) * Math.cos(th);
      const y = c - radius * Math.cos(d.phi) * 0.9 + radius * Math.sin(d.phi) * Math.sin(th) * 0.25;
      const s = 0.5 + 0.5 * Math.sin(th);
      ctx.beginPath();
      ctx.arc(x, y, 3.4 * Math.max(s, 0.4), 0, Math.PI * 2);
      ctx.fillStyle = "#ffcf00";
      ctx.shadowColor = "rgba(255,207,0,.8)";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  function frame(){
    draw();
    angle += 0.004;
    if (!reduce) requestAnimationFrame(frame);
  }
  resize();
  window.addEventListener("resize", resize);
  frame();
})();
