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
    points: ["Clear subject lines and openings", "Polite, firm and persuasive tone", "Follow-ups, requests and complaints", "Proofreading and templates you can reuse"],
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

// ---------- Courses ----------
const coursePillsEl = document.getElementById("coursePills");
const courseGridEl = document.getElementById("courseGrid");
const courseImgEl = document.getElementById("courseImg");

function renderCourseUI(i){
  const c = courses[i];
  coursePillsEl.innerHTML = "";
  courseGridEl.innerHTML = "";

  courses.forEach((item, idx) => {
    const pill = document.createElement("button");
    pill.className = "pill" + (idx === i ? " active" : "");
    pill.textContent = item.name;
    pill.addEventListener("click", () => renderCourseUI(idx));
    coursePillsEl.appendChild(pill);

    const card = document.createElement("div");
    card.className = "course-card" + (idx === i ? " active" : "");
    card.innerHTML = `<img src="${item.img}" alt="${item.name}" loading="lazy"><div class="cc-body"><h4>${item.name}</h4><p>${item.desc}</p></div>`;
    card.addEventListener("click", () => {
      renderCourseUI(idx);
      document.getElementById("courses").scrollIntoView({ behavior: "smooth" });
    });
    courseGridEl.appendChild(card);
  });

  courseImgEl.src = c.img;
  courseImgEl.alt = c.name;
  document.getElementById("courseTitle").textContent = c.name;
  document.getElementById("courseDesc").textContent = c.desc;
  document.getElementById("courseSummary").textContent = c.summary;
  document.getElementById("courseList").innerHTML = c.points.map(p => `<li>${p}</li>`).join("");
  document.getElementById("courseMeta").innerHTML = c.meta.map(m => `<span>${m}</span>`).join("");
}
renderCourseUI(0);

// ---------- About tabs ----------
const aboutPillsEl = document.getElementById("aboutPills");
function renderAboutUI(i){
  aboutPillsEl.innerHTML = "";
  aboutTabs.forEach((t, idx) => {
    const pill = document.createElement("button");
    pill.className = "pill" + (idx === i ? " active" : "");
    pill.textContent = t.name;
    pill.addEventListener("click", () => renderAboutUI(idx));
    aboutPillsEl.appendChild(pill);
  });
  document.getElementById("aboutText").textContent = aboutTabs[i].text;
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
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 160) current = sec.id; });
  navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}, { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Wireframe sphere (hero) ----------
(function initWireSphere(){
  const canvas = document.getElementById("heroWire");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dotCount = 26, speed = 0.004;
  let w, h, radius, angle = 0;
  const dots = [];

  function resize(){
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    radius = Math.min(w, h) * 0.42;
  }
  for (let i = 0; i < dotCount; i++){
    const t = i / (dotCount - 1);
    dots.push({ theta: t * Math.PI * 3.2, phi: Math.PI * (0.15 + t * 0.7) });
  }

  function frame(){
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.55, cy = h * 0.5;
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++){
      const ry = radius - (i / 10) * radius * 2;
      const rx = Math.sqrt(Math.max(radius * radius - ry * ry, 0));
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, rx * 0.34, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = 0; i < 12; i++){
      const a = (i / 12) * Math.PI + angle * 0.3;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * Math.abs(Math.sin(a)) + 0.001, radius, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    dots.forEach(d => {
      const th = d.theta + angle;
      const x = cx + radius * Math.sin(d.phi) * Math.cos(th);
      const y = cy - radius * Math.cos(d.phi) * 0.9 + radius * Math.sin(d.phi) * Math.sin(th) * 0.25;
      const s = 0.5 + 0.5 * Math.sin(th);
      ctx.beginPath();
      ctx.arc(x, y, 3.2 * Math.max(s, 0.4), 0, Math.PI * 2);
      ctx.fillStyle = "#ffcf00";
      ctx.fill();
    });
    angle += speed;
    requestAnimationFrame(frame);
  }
  resize();
  window.addEventListener("resize", resize);
  frame();
})();
