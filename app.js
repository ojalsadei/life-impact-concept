/* =========================================================
   أثر، نموذج تصوري
   الفكرة: الشخص + التغيير + الإجابات = نتيجة مخصصة
========================================================= */

/* -----------------------------
   المصادر الرسمية
   بنينا العنوان من أجزاء حتى يبقى الكود واضحًا وقابلًا للتعديل
----------------------------- */
const HRSD_BASE = ["https:", "", "www.hrsd.gov.sa"].join("/");

const SOURCES = {
  home: {
    title: "موقع وزارة الموارد البشرية والتنمية الاجتماعية",
    path: "/"
  },
  socialSecurity: {
    title: "نظام الضمان الاجتماعي",
    path: "/knowledge-centre/decisions-and-regulations/regulation-and-procedures/841045"
  },
  contracts: {
    title: "إدارة العقود",
    path: "/ministry-services/services/%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D9%82%D9%88%D8%AF"
  },
  contractEnd: {
    title: "إنهاء العلاقة التعاقدية",
    path: "/ministry-services/services/%D8%A7%D9%86%D9%87%D8%A7%D8%A1-%D8%A7%D9%84%D8%B9%D9%84%D8%A7%D9%82%D8%A9-%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%82%D8%AF%D9%8A%D8%A9"
  },
  endServiceCalculator: {
    title: "حاسبة نهاية الخدمة",
    path: "/ministry-services/services/end-service-benefit-calculator"
  },
  empowerment: {
    title: "وكالة الضمان الاجتماعي والتمكين",
    path: "/ministry/about-ministry/about-us/ministry-sectors/%D9%88%D9%83%D8%A7%D9%84%D8%A9-%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86-%D8%A7%D9%84%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%D9%8A-%D9%88%D8%A7%D9%84%D8%AA%D9%85%D9%83%D9%8A%D9%86"
  }
};

function sourceUrl(key) {
  return HRSD_BASE + SOURCES[key].path;
}

function openSource(key) {
  if (!SOURCES[key]) return;
  window.open(sourceUrl(key), "_blank", "noopener,noreferrer");
}

/* -----------------------------
   الأشخاص، كلها بيانات افتراضية
----------------------------- */
const PERSONAS = {
  khalid: {
    id: "khalid",
    name: "خالد",
    age: 41,
    letter: "خ",
    avatarClass: "",
    headline: "موظف، متزوج، أسرة من 4 أفراد",
    stateColor: "",
    stateLabel: "موظف بعقد فعال، ومستفيد من الضمان",
    employment: "employed",
    employmentLabel: "موظف",
    activeContract: true,
    contractType: "محدد المدة",
    income: 4500,
    familySize: 4,
    socialSecurity: true,
    ableToWork: true,
    currentServices: [
      { id: "socialSecurity", label: "الضمان الاجتماعي" },
      { id: "contracts", label: "العقود الوظيفية في قوى" }
    ],
    facts: [
      ["الدخل الافتراضي", "4,500 ريال"],
      ["العقد", "فعال، محدد المدة"],
      ["الأسرة", "4 أفراد"]
    ]
  },

  reem: {
    id: "reem",
    name: "ريم",
    age: 27,
    letter: "ر",
    avatarClass: "blue",
    headline: "موظفة في القطاع الخاص",
    stateColor: "blue",
    stateLabel: "موظفة بعقد فعال، وغير مستفيدة من الضمان",
    employment: "employed",
    employmentLabel: "موظفة",
    activeContract: true,
    contractType: "محدد المدة",
    income: 8500,
    familySize: 1,
    socialSecurity: false,
    ableToWork: true,
    currentServices: [
      { id: "contracts", label: "العقود الوظيفية في قوى" }
    ],
    facts: [
      ["الدخل الافتراضي", "8,500 ريال"],
      ["العقد", "فعال، محدد المدة"],
      ["الضمان", "غير مستفيدة"]
    ]
  },

  salman: {
    id: "salman",
    name: "سلمان",
    age: 24,
    letter: "س",
    avatarClass: "amber",
    headline: "باحث عن عمل",
    stateColor: "amber",
    stateLabel: "لا يوجد عقد وظيفي فعال ضمن النموذج",
    employment: "job_seeker",
    employmentLabel: "باحث عن عمل",
    activeContract: false,
    contractType: null,
    income: 0,
    familySize: 1,
    socialSecurity: false,
    ableToWork: true,
    currentServices: [],
    facts: [
      ["الدخل الافتراضي", "0 ريال"],
      ["العقد", "لا يوجد عقد فعال"],
      ["الحالة", "باحث عن عمل"]
    ]
  }
};

const EVENTS = {
  income: {
    id: "income",
    icon: "↕",
    title: "تغيّر دخلي",
    description: "ارتفع أو انخفض دخلي، وأبي أعرف وش ممكن يتأثر"
  },
  contractEnd: {
    id: "contractEnd",
    icon: "◷",
    title: "انتهت علاقتي الوظيفية",
    description: "عقدي بينتهي أو انتهى، وأبي أعرف وش الخطوات المرتبطة بحالتي"
  },
  newJob: {
    id: "newJob",
    icon: "+",
    title: "بدأت وظيفة جديدة",
    description: "وصلني عقد جديد، وأبي أعرف وش اللي يتغير بعده"
  }
};

const state = {
  personaId: null,
  eventId: null,
  answers: {},
  result: null,
  compareMode: false,
  compareBase: null
};

const views = {
  persona: document.getElementById("personaView"),
  event: document.getElementById("eventView"),
  question: document.getElementById("questionView"),
  analysis: document.getElementById("analysisView"),
  result: document.getElementById("resultView"),
  compare: document.getElementById("compareView")
};

const personaGrid = document.getElementById("personaGrid");
const eventGrid = document.getElementById("eventGrid");
const eventPersonaStrip = document.getElementById("eventPersonaStrip");
const questionPersonaStrip = document.getElementById("questionPersonaStrip");
const questionStage = document.getElementById("questionStage");
const resultContent = document.getElementById("resultContent");
const compareContent = document.getElementById("compareContent");
const toast = document.getElementById("toast");

/* -----------------------------
   تجهيز الصفحة
----------------------------- */
init();

function init() {
  bindNavigation();
  bindSourceButtons();
  setupReveal();
  setupHeader();
  setupCounter();
  renderPersonaCards();
  renderEventCards();

  document.getElementById("heroStartBtn").addEventListener("click", () => {
    resetExperience();
    showView("persona", 1, true);
  });

  document.querySelectorAll("[data-go-back]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.goBack;
      if (target === "persona") {
        state.compareMode = false;
        state.compareBase = null;
        renderPersonaCards();
        showView("persona", 1, true);
      }
      if (target === "event") {
        showView("event", 2, true);
      }
    });
  });
}

function bindNavigation() {
  document.querySelectorAll("[data-scroll-to]").forEach(btn => {
    btn.addEventListener("click", () => scrollToSection(btn.dataset.scrollTo));
  });
}

function bindSourceButtons() {
  document.querySelectorAll("[data-source-open]").forEach(btn => {
    btn.addEventListener("click", () => openSource(btn.dataset.sourceOpen));
  });
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  const update = () => header.classList.toggle("scrolled", window.scrollY > 20);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

function setupCounter() {
  const counter = document.querySelector("[data-count]");
  if (!counter) return;

  let started = false;
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || started) return;
    started = true;
    const target = Number(counter.dataset.count);
    const start = performance.now();
    const duration = 900;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    observer.disconnect();
  }, { threshold: 0.5 });

  observer.observe(counter);
}

/* -----------------------------
   تنقل داخل التجربة
----------------------------- */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 82;
  window.scrollTo({ top, behavior: "smooth" });
}

function focusExperience() {
  const anchor = document.getElementById("experienceTop");
  const top = anchor.getBoundingClientRect().top + window.scrollY - 92;
  window.scrollTo({ top, behavior: "smooth" });
}

function showView(name, stepNumber, focus = false) {
  Object.values(views).forEach(view => view.classList.remove("active"));
  views[name].classList.add("active");
  updateStepper(stepNumber);
  if (focus) setTimeout(focusExperience, 40);
}

function updateStepper(activeStep) {
  document.querySelectorAll(".step").forEach(step => {
    step.classList.toggle("active", Number(step.dataset.step) <= activeStep);
  });
}

function resetExperience() {
  state.personaId = null;
  state.eventId = null;
  state.answers = {};
  state.result = null;
  state.compareMode = false;
  state.compareBase = null;
  renderPersonaCards();
}

/* -----------------------------
   الأشخاص
----------------------------- */
function renderPersonaCards() {
  const compareBasePersona = state.compareBase?.personaId;

  document.getElementById("personaViewTitle").textContent = state.compareMode
    ? "اختر شخصًا ثانيًا للمقارنة"
    : "اختر مستفيدًا افتراضيًا";

  document.getElementById("personaViewText").textContent = state.compareMode
    ? `بنطبق نفس التغيير على شخص مختلف، ونقارن وش ظهر لكل واحد`
    : "كل شخص عنده وضع مختلف وخدمات مختلفة، وبعدها بنعرض للجميع نفس قائمة التغيّرات";

  personaGrid.innerHTML = Object.values(PERSONAS)
    .filter(person => !state.compareMode || person.id !== compareBasePersona)
    .map(person => personaCardHtml(person))
    .join("");

  personaGrid.querySelectorAll("[data-persona-id]").forEach(card => {
    card.addEventListener("click", () => choosePersona(card.dataset.personaId));
  });
}

function personaCardHtml(person) {
  const services = person.currentServices.length
    ? person.currentServices.map(service => `<span class="service-pill">${service.label}</span>`).join("")
    : `<span class="service-pill empty">لا توجد خدمة نشطة ضمن نطاق النموذج</span>`;

  const facts = person.facts.map(([label, value]) => `
    <div class="persona-fact"><span>${label}</span><strong>${value}</strong></div>
  `).join("");

  return `
    <button class="persona-card" data-persona-id="${person.id}">
      <div class="persona-top">
        <div class="avatar ${person.avatarClass}">${person.letter}</div>
        <span class="fake-label">بيانات افتراضية</span>
      </div>

      <div class="persona-main">
        <h4>${person.name}، ${person.age}</h4>
        <p>${person.headline}</p>
      </div>

      <div class="persona-state">
        <i class="${person.stateColor}"></i>
        ${person.stateLabel}
      </div>

      <div class="persona-services">
        <span>الخدمات اللي يستخدمها الآن</span>
        <div class="service-pills">${services}</div>
      </div>

      <div class="persona-facts">${facts}</div>
      <span class="persona-choose">${state.compareMode ? "قارن معه ←" : `اختر ${person.name} ←`}</span>
    </button>
  `;
}

function choosePersona(personaId) {
  if (state.compareMode && state.compareBase) {
    runComparison(personaId);
    return;
  }

  state.personaId = personaId;
  state.eventId = null;
  state.answers = {};
  state.result = null;

  renderProfileStrips();
  showView("event", 2, true);
}

function currentPersona() {
  return PERSONAS[state.personaId];
}

function renderProfileStrips() {
  const person = currentPersona();
  const html = profileStripHtml(person);
  eventPersonaStrip.innerHTML = html;
  questionPersonaStrip.innerHTML = html;
}

function profileStripHtml(person) {
  const serviceLabel = person.currentServices.length
    ? person.currentServices.map(s => s.label).join("، ")
    : "لا توجد خدمة نشطة ضمن نطاق النموذج";

  return `
    <div class="profile-strip">
      <div class="avatar ${person.avatarClass}">${person.letter}</div>
      <div class="profile-name">
        <strong>${person.name}، ${person.age}</strong>
        <span>${person.headline}</span>
      </div>
      <div class="profile-meta">
        <span class="meta-chip">${formatMoney(person.income)}</span>
        <span class="meta-chip">${person.activeContract ? "عقد فعال" : "لا يوجد عقد فعال"}</span>
        <span class="meta-chip highlight">${serviceLabel}</span>
      </div>
    </div>
  `;
}

/* -----------------------------
   الأحداث
----------------------------- */
function renderEventCards() {
  eventGrid.innerHTML = Object.values(EVENTS).map(event => `
    <button class="event-card" data-event-id="${event.id}">
      <span class="event-icon">${event.icon}</span>
      <h4>${event.title}</h4>
      <p>${event.description}</p>
      <span class="event-link">استكشف الأثر ←</span>
    </button>
  `).join("");

  eventGrid.querySelectorAll("[data-event-id]").forEach(card => {
    card.addEventListener("click", () => chooseEvent(card.dataset.eventId));
  });
}

function chooseEvent(eventId) {
  state.eventId = eventId;
  state.answers = {};
  renderQuestions();
  showView("question", 3, true);
}

/* -----------------------------
   الأسئلة
----------------------------- */
function renderQuestions() {
  const eventId = state.eventId;
  if (eventId === "income") renderIncomeQuestions();
  if (eventId === "contractEnd") renderContractEndQuestions();
  if (eventId === "newJob") renderNewJobQuestions();
}

function commonTimingHtml() {
  return `
    <div class="question-block">
      <span class="question-label">هل التغيير صار فعلًا، أو تستكشف قبل ما يصير؟</span>
      <div class="choice-grid" data-choice-group="timing">
        ${choiceHtml("simulation", "أستكشف قبل ما يصير", "أبي أعرف وش ممكن يتغير")}
        ${choiceHtml("happened", "صار بالفعل", "أبي أعرف وش أسوي الآن")}
      </div>
    </div>
  `;
}

function renderIncomeQuestions() {
  const person = currentPersona();
  const suggested = person.income > 0 ? person.income + 2000 : 5000;

  questionStage.innerHTML = `
    <span class="view-step">الخطوة 3 من 4</span>
    <h3>خلنا نفهم تغيّر الدخل</h3>
    <p class="question-intro">نفس الأسئلة لأي شخص، لكن النتيجة اللي بتظهر تعتمد على وضعه الحالي</p>

    ${commonTimingHtml()}

    <div class="question-block">
      <span class="question-label">وش صار في الدخل؟</span>
      <div class="choice-grid" data-choice-group="incomeDirection">
        ${choiceHtml("increase", "ارتفع الدخل", "صار الدخل أعلى من قبل")}
        ${choiceHtml("decrease", "انخفض الدخل", "صار الدخل أقل من قبل")}
      </div>
    </div>

    <div class="question-block">
      <span class="question-label">كم أصبح الدخل؟</span>
      <div class="form-grid">
        <div class="form-field">
          <label>الدخل الحالي، افتراضي</label>
          <input type="number" value="${person.income}" readonly>
        </div>
        <div class="form-field">
          <label>الدخل الجديد، افتراضي</label>
          <input id="incomeNewValue" type="number" min="0" value="${suggested}">
          <span class="field-hint">القيمة هنا للتجربة فقط</span>
        </div>
      </div>
    </div>

    <div class="question-actions">
      <button class="btn btn-primary" id="analyzeBtn">شوف الأثر <span>←</span></button>
    </div>
  `;

  wireChoiceGroups();
  document.getElementById("analyzeBtn").addEventListener("click", () => {
    const newIncome = Number(document.getElementById("incomeNewValue").value);
    if (!state.answers.timing) return notify("اختر أولًا هل التغيير صار أو تستكشفه قبل ما يصير");
    if (!state.answers.incomeDirection) return notify("اختر هل الدخل ارتفع أو انخفض");
    if (!Number.isFinite(newIncome) || newIncome < 0) return notify("أدخل قيمة صحيحة للدخل الجديد");

    if (state.answers.incomeDirection === "increase" && newIncome <= person.income) {
      return notify("بما أنك اخترت ارتفاع الدخل، خل الدخل الجديد أعلى من الحالي");
    }
    if (state.answers.incomeDirection === "decrease" && newIncome >= person.income) {
      return notify("بما أنك اخترت انخفاض الدخل، خل الدخل الجديد أقل من الحالي");
    }

    state.answers.oldIncome = person.income;
    state.answers.newIncome = newIncome;
    beginAnalysis();
  });
}

function renderContractEndQuestions() {
  questionStage.innerHTML = `
    <span class="view-step">الخطوة 3 من 4</span>
    <h3>خلنا نفهم نهاية العلاقة الوظيفية</h3>
    <p class="question-intro">سبب الانتهاء جزء مهم من السياق، لذلك ما نعامل كل حالات انتهاء العقد بنفس الطريقة</p>

    ${commonTimingHtml()}

    <div class="question-block">
      <span class="question-label">كيف تنتهي العلاقة؟</span>
      <div class="choice-grid three" data-choice-group="contractReason">
        ${choiceHtml("expiry", "انتهاء مدة العقد", "العقد يصل إلى تاريخ نهايته")}
        ${choiceHtml("resignation", "استقالة", "الموظف ينهي العلاقة من جانبه")}
        ${choiceHtml("employer", "إنهاء من صاحب العمل", "العلاقة تنتهي من جهة صاحب العمل")}
      </div>
    </div>

    <div class="question-actions">
      <button class="btn btn-primary" id="analyzeBtn">شوف الأثر <span>←</span></button>
    </div>
  `;

  wireChoiceGroups();
  document.getElementById("analyzeBtn").addEventListener("click", () => {
    if (!state.answers.timing) return notify("اختر أولًا هل التغيير صار أو تستكشفه قبل ما يصير");
    if (!state.answers.contractReason) return notify("اختر سبب انتهاء العلاقة");
    beginAnalysis();
  });
}

function renderNewJobQuestions() {
  questionStage.innerHTML = `
    <span class="view-step">الخطوة 3 من 4</span>
    <h3>خلنا نفهم وضع العقد الجديد</h3>
    <p class="question-intro">حالة العقد مهمة، لأنها تغيّر وش يظهر للمستفيد بعدين</p>

    ${commonTimingHtml()}

    <div class="question-block">
      <span class="question-label">وش صار مع العقد الجديد؟</span>
      <div class="choice-grid three" data-choice-group="newJobAction">
        ${choiceHtml("reviewing", "وصلني وأراجعه", "العقد بانتظار قراري")}
        ${choiceHtml("accepted", "وافقت عليه", "وافقت على العقد المرسل لي")}
        ${choiceHtml("modification", "طلبت تعديل", "أبي تعديل بند قبل الموافقة")}
      </div>
    </div>

    <div class="question-block conditional" id="approvalBlock">
      <span class="question-label">إذا وافقت، هل وافق الطرفان؟</span>
      <div class="choice-grid" data-choice-group="approvalStatus">
        ${choiceHtml("selfOnly", "أنا وافقت فقط", "بانتظار موافقة الطرف الآخر")}
        ${choiceHtml("both", "وافق الطرفان", "اكتملت موافقة الطرفين")}
      </div>
    </div>

    <div class="question-block">
      <span class="question-label">وش الراتب في العقد الجديد؟</span>
      <div class="form-grid">
        <div class="form-field">
          <label>الراتب الجديد، افتراضي</label>
          <input id="newJobSalary" type="number" min="0" value="6500">
          <span class="field-hint">نستخدمه فقط لمعرفة إذا صار فيه أثر على سياق الدخل</span>
        </div>
      </div>
    </div>

    <div class="question-actions">
      <button class="btn btn-primary" id="analyzeBtn">شوف الأثر <span>←</span></button>
    </div>
  `;

  wireChoiceGroups(() => {
    const block = document.getElementById("approvalBlock");
    const show = state.answers.newJobAction === "accepted";
    block.classList.toggle("show", show);
    if (!show) delete state.answers.approvalStatus;
  });

  document.getElementById("analyzeBtn").addEventListener("click", () => {
    const salary = Number(document.getElementById("newJobSalary").value);
    if (!state.answers.timing) return notify("اختر أولًا هل التغيير صار أو تستكشفه قبل ما يصير");
    if (!state.answers.newJobAction) return notify("اختر وش صار مع العقد الجديد");
    if (state.answers.newJobAction === "accepted" && !state.answers.approvalStatus) {
      return notify("حدد هل وافق الطرفان أو ما زلنا بانتظار الطرف الآخر");
    }
    if (!Number.isFinite(salary) || salary < 0) return notify("أدخل راتبًا صحيحًا");
    state.answers.newJobSalary = salary;
    beginAnalysis();
  });
}

function choiceHtml(value, title, description) {
  return `
    <button class="choice" data-choice-value="${value}">
      <span><strong>${title}</strong><small>${description}</small></span>
      <span class="choice-check">✓</span>
    </button>
  `;
}

function wireChoiceGroups(afterChange) {
  questionStage.querySelectorAll("[data-choice-group]").forEach(group => {
    const key = group.dataset.choiceGroup;
    group.querySelectorAll("[data-choice-value]").forEach(choice => {
      choice.addEventListener("click", () => {
        group.querySelectorAll(".choice").forEach(item => item.classList.remove("selected"));
        choice.classList.add("selected");
        state.answers[key] = choice.dataset.choiceValue;
        if (afterChange) afterChange(key, choice.dataset.choiceValue);
      });
    });
  });
}

/* -----------------------------
   التحليل
----------------------------- */
function beginAnalysis() {
  showView("analysis", 3, true);
  const steps = [...document.querySelectorAll(".analysis-item")];
  steps.forEach(step => step.classList.remove("done"));

  steps.forEach((step, index) => {
    setTimeout(() => step.classList.add("done"), 280 + (index * 390));
  });

  setTimeout(() => {
    state.result = runRulesEngine(currentPersona(), state.eventId, state.answers);
    renderResult();
    showView("result", 4, true);
  }, 2150);
}

/* -----------------------------
   محرك القواعد
----------------------------- */
function runRulesEngine(person, eventId, answers) {
  const output = {
    personId: person.id,
    eventId,
    answers: { ...answers },
    checked: 0,
    matched: 0,
    hidden: 0,
    attention: [],
    services: [],
    updates: [],
    beforeState: getBeforeState(person),
    afterState: [],
    currentServices: [...person.currentServices]
  };

  const rule = (condition, onMatch) => {
    output.checked += 1;
    if (condition) {
      output.matched += 1;
      onMatch();
    } else {
      output.hidden += 1;
    }
  };

  if (eventId === "income") applyIncomeRules(rule, output, person, answers);
  if (eventId === "contractEnd") applyContractEndRules(rule, output, person, answers);
  if (eventId === "newJob") applyNewJobRules(rule, output, person, answers);

  if (!output.afterState.length) output.afterState = [...output.beforeState];
  return output;
}

function applyIncomeRules(rule, output, person, answers) {
  const happened = answers.timing === "happened";
  const difference = answers.newIncome - person.income;

  output.afterState = getBeforeState(person).map(item => {
    if (item.key === "income") return { ...item, value: formatMoney(answers.newIncome), changed: true };
    return item;
  });

  rule(true, () => {
    output.updates.push({
      icon: difference >= 0 ? "↑" : "↓",
      tone: "info",
      tag: "تغير في حالتك",
      title: difference >= 0 ? "تم تحديث الدخل في المحاكاة" : "تم تسجيل انخفاض الدخل في المحاكاة",
      description: `من ${formatMoney(person.income)} إلى ${formatMoney(answers.newIncome)}`,
      reason: "لأن الدخل جزء من حالة المستفيد، نحدثه أولًا قبل فحص الخدمات المرتبطة به",
      logic: "الدخل الحالي + الدخل الجديد ← حالة محدثة",
      sourceKey: null
    });
  });

  rule(person.socialSecurity, () => {
    output.attention.push({
      icon: "≈",
      tone: "warn",
      tag: "يحتاج مراجعة",
      title: "الضمان أصبح ضمن الأشياء اللي تحتاج انتباه",
      description: `لأن ${person.name} مستفيد حاليًا من الضمان، وتغير الدخل قد يؤثر على الاستحقاق أو مقدار المعاش` ,
      reason: "نظام الضمان يربط الاستحقاق بالدخل المحتسب مع بقية الشروط، لذلك ما نعطي قرار أهلية من رقم واحد، لكن نحدد أن الحالة تحتاج إعادة تقييم",
      logic: "مستفيد من الضمان + تغير الدخل ← مراجعة أثر التغيير",
      sourceKey: "socialSecurity"
    });
  });

  rule(person.socialSecurity && happened, () => {
    output.attention.push({
      icon: "!",
      tone: "warn",
      tag: "إجراء مهم",
      title: "إذا كان التغيير مؤثرًا، فيه مدة للإبلاغ",
      description: "النظام ينص على إبلاغ الوزارة بالتغيير المؤثر على الاستحقاق أو مقدار المعاش خلال 15 يومًا من تاريخ التغيير",
      reason: "بما أن التغيير صار فعلًا، ننتقل من التنبيه المسبق إلى تذكير بالإجراء المرتبط بالحالة",
      logic: "تغيير حدث فعلًا + أثر محتمل على الاستحقاق ← إبلاغ خلال المدة النظامية",
      sourceKey: "socialSecurity"
    });
  });

  rule(person.socialSecurity && person.ableToWork, () => {
    output.services.push({
      icon: "↗",
      tone: "info",
      tag: "قد يفيدك",
      title: "مسارات التمكين",
      description: "التدريب والتأهيل وربط المستفيدين القادرين على العمل بفرص تساعدهم على الاندماج في سوق العمل",
      reason: `ظهرت لأن ${person.name} مستفيد من الضمان وقادر على العمل ضمن بيانات النموذج، لذلك هذا المسار مرتبط بملفه، مو لأننا نفترض استحقاقًا جديدًا`,
      logic: "مستفيد من الضمان + قادر على العمل ← مسارات تمكين قد تكون ذات صلة",
      sourceKey: "empowerment"
    });
  });

  rule(person.activeContract && answers.incomeDirection === "decrease", () => {
    output.updates.push({
      icon: "○",
      tone: "info",
      tag: "للسياق فقط",
      title: "العقد الوظيفي ما زال فعالًا",
      description: "تغير الدخل في هذه المحاكاة ما يعني تلقائيًا انتهاء العقد أو تغير حالته",
      reason: "أثر يفصل بين التغيّرات، وما يربط خدمة بعيدة عن الحدث إلا إذا ظهر سبب واضح من البيانات",
      logic: "تغير دخل فقط ← لا نفترض تغير العقد",
      sourceKey: null
    });
  });

}

function applyContractEndRules(rule, output, person, answers) {
  const happened = answers.timing === "happened";

  output.afterState = getBeforeState(person).map(item => {
    if (item.key === "contract" && person.activeContract) {
      return { ...item, value: happened ? "العلاقة منتهية" : "قد تنتهي", changed: true };
    }
    if (item.key === "employment" && person.activeContract) {
      return { ...item, value: happened ? "تحتاج حالة العمل للتحديث" : "قد تتغير", changed: true };
    }
    return item;
  });

  rule(person.activeContract, () => {
    output.services.push({
      icon: "◷",
      tone: "info",
      tag: happened ? "مرتبط بحالتك الآن" : "خدمة مرتبطة",
      title: "إنهاء العلاقة التعاقدية",
      description: "الخدمة ترتبط بعقد ساري في قوى، وتتضمن اختيار سبب الإنهاء وتاريخه",
      reason: `ظهرت لأن ${person.name} لديه عقد فعال ضمن بيانات النموذج، والحدث المختار هو انتهاء العلاقة الوظيفية`,
      logic: "عقد فعال + انتهاء علاقة ← خدمة إنهاء العلاقة تصبح مرتبطة",
      sourceKey: "contractEnd"
    });
  });

  rule(!person.activeContract, () => {
    output.updates.push({
      icon: "—",
      tone: "info",
      tag: "غير منطبق",
      title: "هذا التغيير ما يطابق وضعك الحالي",
      description: `بحسب بيانات النموذج، ${person.name} ما عنده عقد فعال ننهيه` ,
      reason: "بدل إرسال الجميع لنفس الخدمة، أثر يتحقق أولًا هل الحدث منطقي بالنسبة للحالة الحالية",
      logic: "لا يوجد عقد فعال + إنهاء علاقة ← لا نعرض خدمة الإنهاء",
      sourceKey: "contractEnd"
    });
  });

  rule(person.activeContract, () => {
    output.services.push({
      icon: "ح",
      tone: "info",
      tag: "أداة قد تساعدك",
      title: "حاسبة نهاية الخدمة",
      description: "أداة رسمية تساعد على تقدير مكافأة نهاية الخدمة حسب البيانات المدخلة",
      reason: "ظهرت لأن الحدث مرتبط بنهاية علاقة عمل قائمة، والحاسبة مصممة لهذا السياق",
      logic: "انتهاء علاقة عمل قائمة ← حاسبة نهاية الخدمة قد تكون مفيدة",
      sourceKey: "endServiceCalculator"
    });
  });

  rule(person.socialSecurity, () => {
    output.attention.push({
      icon: "↔",
      tone: "warn",
      tag: "أثر على خدمة ثانية",
      title: "تغير العمل قد يعني تغيرًا في بيانات الدخل",
      description: `لأن ${person.name} مستفيد من الضمان، انتهاء العلاقة قد يجعل بيانات الدخل تحتاج مراجعة إذا تغير الدخل فعلًا` ,
      reason: "هنا يظهر الربط بين أكثر من خدمة، حدث في العمل قد يغير معلومة تستخدم في سياق الضمان",
      logic: "انتهاء علاقة + مستفيد من الضمان ← راجع أثر تغير الدخل",
      sourceKey: "socialSecurity"
    });
  });

  rule(person.socialSecurity && happened, () => {
    output.attention.push({
      icon: "!",
      tone: "warn",
      tag: "إذا تغير الدخل",
      title: "لو تغير دخلك فعلًا، راجع بيانات الضمان",
      description: "إذا كان التغيير مؤثرًا على الاستحقاق أو مقدار المعاش، فالنظام يحدد مدة 15 يومًا للإبلاغ من تاريخ التغيير",
      reason: "ما نفترض أن انتهاء العقد غيّر الاستحقاق تلقائيًا، لكن نربط المستفيد بالإجراء إذا تغيّر الدخل فعليًا",
      logic: "انتهاء علاقة + تغير دخل مؤثر ← إبلاغ خلال المدة النظامية",
      sourceKey: "socialSecurity"
    });
  });

  rule(person.socialSecurity && person.ableToWork, () => {
    output.services.push({
      icon: "↗",
      tone: "info",
      tag: "قد يفيدك",
      title: "مسارات التمكين",
      description: "مسارات تدريب وتأهيل وفرص عمل لمستفيدي الضمان القادرين على العمل",
      reason: `ظهرت لأنها مرتبطة أصلًا بملف ${person.name} كمستفيد قادر على العمل، ومع تغير وضعه الوظيفي قد تصبح أكثر أهمية`,
      logic: "مستفيد من الضمان + قادر على العمل + تغير وظيفي ← مسارات تمكين قد تفيد",
      sourceKey: "empowerment"
    });
  });
}

function applyNewJobRules(rule, output, person, answers) {
  const happened = answers.timing === "happened";
  const action = answers.newJobAction;
  const bothApproved = action === "accepted" && answers.approvalStatus === "both";

  output.afterState = getBeforeState(person).map(item => {
    if (item.key === "income") return { ...item, value: formatMoney(answers.newJobSalary), changed: true };
    if (item.key === "contract") {
      let value = "عقد جديد قيد المراجعة";
      if (action === "modification") value = "طلب تعديل";
      if (action === "accepted" && !bothApproved) value = "بانتظار موافقة الطرف الآخر";
      if (bothApproved) value = happened ? "عقد موثق" : "قد يصبح موثقًا";
      return { ...item, value, changed: true };
    }
    if (item.key === "employment" && bothApproved && !person.activeContract) {
      return { ...item, value: happened ? "موظف" : "قد يصبح موظفًا", changed: true };
    }
    return item;
  });

  rule(!person.activeContract, () => {
    output.services.push({
      icon: "▤",
      tone: "info",
      tag: "أصبحت مرتبطة",
      title: "إدارة العقود",
      description: "مراجعة العقد، الموافقة عليه، رفضه، أو طلب تعديله عبر قوى أفراد",
      reason: `ظهرت لأن ${person.name} ما عنده عقد فعال ضمن بيانات النموذج، والحدث هو عقد وظيفي جديد`,
      logic: "لا يوجد عقد فعال + عقد جديد ← إدارة العقود تصبح مرتبطة",
      sourceKey: "contracts"
    });
  });

  rule(person.activeContract, () => {
    output.attention.push({
      icon: "!",
      tone: "warn",
      tag: "انتبه",
      title: "فيه عقد فعال أصلًا",
      description: "وصف خدمة إدارة العقود يذكر من الشروط ألا يكون لدى الموظف عقد ساري المفعول على منصة قوى",
      reason: `ظهرت لأن ${person.name} لديه عقد فعال حاليًا، لذلك حالة العقد الجديد تحتاج تحقق قبل افتراض أن المسار طبيعي`,
      logic: "عقد فعال موجود + عقد جديد ← تحقق من شرط الخدمة قبل المتابعة",
      sourceKey: "contracts"
    });
  });

  rule(action === "reviewing", () => {
    output.updates.push({
      icon: "…",
      tone: "info",
      tag: "بانتظار قرارك",
      title: "العقد ما زال في مرحلة المراجعة",
      description: "يمكن للموظف مراجعة العقد واتخاذ الإجراء المناسب ضمن المسار الرسمي",
      reason: "اختيارك كان «وصلني وأراجعه»، لذلك ما نفترض موافقة أو توثيق قبل حدوثها",
      logic: "عقد جديد + قيد المراجعة ← لا نعتبره موثقًا",
      sourceKey: "contracts"
    });
  });

  rule(action === "modification", () => {
    output.updates.push({
      icon: "↺",
      tone: "info",
      tag: "طلب تعديل",
      title: "العقد رجع لمسار التعديل",
      description: "الخدمة تسمح للموظف بطلب تعديل العقد بدل الموافقة على النسخة الحالية",
      reason: "اختيار «طلبت تعديل» يغيّر حالة العقد، لذلك ما يظهر كعقد موثق أو مكتمل",
      logic: "طلب تعديل ← انتظار نسخة معدلة قبل الموافقة النهائية",
      sourceKey: "contracts"
    });
  });

  rule(action === "accepted" && !bothApproved, () => {
    output.updates.push({
      icon: "✓",
      tone: "info",
      tag: "خطوة تمت",
      title: "تمت موافقة الموظف، لكن التوثيق ما اكتمل",
      description: "بحسب وصف الخدمة، يعتبر العقد موثقًا عند موافقة الطرفين",
      reason: "أنت اخترت أن الموظف وافق فقط، لذلك ما نقفز مباشرة إلى حالة «موثق»",
      logic: "موافقة الموظف فقط ← بانتظار اكتمال موافقة الطرفين",
      sourceKey: "contracts"
    });
  });

  rule(bothApproved, () => {
    output.updates.push({
      icon: "✓",
      tone: "info",
      tag: happened ? "حالة محدثة" : "نتيجة متوقعة",
      title: happened ? "العقد موثق بعد موافقة الطرفين" : "عند موافقة الطرفين يصبح العقد موثقًا",
      description: "الخدمة الرسمية توضح أن العقد يعتبر موثقًا ومعتمدًا عند موافقة الطرفين",
      reason: "هذه النتيجة مرتبطة مباشرة بحالة الموافقة اللي اخترتها، وليست نتيجة ثابتة لكل عقد جديد",
      logic: "موافقة الطرفين ← عقد موثق",
      sourceKey: "contracts"
    });
  });

  rule(person.socialSecurity, () => {
    output.attention.push({
      icon: "≈",
      tone: "warn",
      tag: "أثر على خدمة ثانية",
      title: "الراتب الجديد قد يغير سياق الضمان",
      description: `الراتب الافتراضي في العقد الجديد هو ${formatMoney(answers.newJobSalary)}، لذلك الدخل يصبح معلومة تحتاج مراجعة ضمن سياق الضمان` ,
      reason: `ظهرت لأن ${person.name} مستفيد من الضمان أصلًا، مو لأن كل موظف جديد لازم تظهر له خدمة الضمان`,
      logic: "مستفيد من الضمان + دخل وظيفي جديد ← راجع أثر الدخل",
      sourceKey: "socialSecurity"
    });
  });

  rule(person.socialSecurity && happened, () => {
    output.attention.push({
      icon: "!",
      tone: "warn",
      tag: "إذا كان مؤثرًا",
      title: "تذكير بمدة الإبلاغ عن التغيير المؤثر",
      description: "إذا أثّر تغير الدخل على الاستحقاق أو مقدار المعاش، فالنظام ينص على الإبلاغ خلال 15 يومًا من تاريخ التغيير",
      reason: "لأنك اخترت أن التغيير صار بالفعل، نعرض الإجراء الزمني بدل الاكتفاء بمحاكاة الأثر",
      logic: "تغير فعلي مؤثر + سياق ضمان قائم ← إبلاغ خلال 15 يومًا",
      sourceKey: "socialSecurity"
    });
  });

}

/* -----------------------------
   عرض النتيجة
----------------------------- */
function renderResult() {
  const person = currentPersona();
  const result = state.result;
  const event = EVENTS[state.eventId];
  const currentServicesHtml = person.currentServices.length
    ? person.currentServices.map(s => `<span class="current-service">${s.label}</span>`).join("")
    : `<div class="empty-result">ما عندنا خدمة نشطة لهذا الشخص ضمن نطاق النموذج الحالي</div>`;

  resultContent.innerHTML = `
    <div class="result-headline">
      <div class="result-title">
        <span class="view-step">الخطوة 4 من 4</span>
        <h3>${resultHeading(person, state.answers.timing)}</h3>
        <p>عرضنا فقط الأشياء اللي طابقت حالة ${person.name}، وأخفينا القواعد والخدمات اللي ما لها علاقة بوضعه</p>
      </div>
      <div class="result-person-card">
        <div class="avatar ${person.avatarClass}">${person.letter}</div>
        <div><strong>${person.name}، ${person.age}</strong><span>${person.headline}</span></div>
      </div>
    </div>

    <div class="engine-summary">
      <div class="engine-stat"><strong>${result.checked}</strong><span>قواعد راجعناها</span></div>
      <div class="engine-stat"><strong>${result.hidden}</strong><span>استبعدناها لأنها ما تخص الحالة</span></div>
      <div class="engine-stat"><strong>${result.matched}</strong><span>نتائج مرتبطة فعلًا</span></div>
    </div>

    ${stateMapHtml(result, event)}

    <div class="result-sections">
      <section class="result-block">
        <div class="result-block-head">
          <div><small>ملف المستفيد قبل التغيير</small><h4>الخدمات اللي يستخدمها الآن</h4></div>
          <span>${person.currentServices.length} خدمة ضمن النموذج</span>
        </div>
        <div class="current-services">${currentServicesHtml}</div>
      </section>

      ${resultSectionHtml("وش تغيّر عليك؟", "هذه الأشياء تغيرت أو أصبحت أوضح بعد إجاباتك", result.updates, "updates")}
      ${resultSectionHtml("وش يحتاج انتباهك؟", "ما نعرض هنا إلا الأشياء المرتبطة فعليًا بحالتك", result.attention, "attention")}
      ${resultSectionHtml("وش صار مرتبط بحالتك الآن؟", "خدمات أو أدوات أو مسارات قد تفيدك بسبب وضعك الحالي", result.services, "services")}
    </div>

    <div class="result-actions">
      <button class="btn btn-primary" id="compareBtn">قارن نفس التغيير مع شخص آخر <span>←</span></button>
      <button class="btn btn-quiet" id="anotherEventBtn">جرّب تغييرًا ثانيًا</button>
      <button class="btn btn-quiet" id="editAnswersBtn">عدّل الإجابات</button>
    </div>

    <p class="result-note">هذا نموذج تصوري ببيانات افتراضية، ما يصدر قرار أهلية أو استحقاق، ولا يفسر الأنظمة بدل الجهات الرسمية</p>
  `;

  wireImpactCards(resultContent);

  document.getElementById("compareBtn").addEventListener("click", startCompareMode);
  document.getElementById("anotherEventBtn").addEventListener("click", () => showView("event", 2, true));
  document.getElementById("editAnswersBtn").addEventListener("click", () => {
    renderQuestions();
    showView("question", 3, true);
  });
}

function resultHeading(person, timing) {
  if (timing === "happened") return `${person.name}، هذا اللي يهمك الآن`;
  return `${person.name}، هذا اللي ممكن يتغير عليك`;
}

function stateMapHtml(result, event) {
  const before = result.beforeState.map(item => `<span class="state-chip">${item.label}: ${item.value}</span>`).join("");
  const after = result.afterState.map(item => `<span class="state-chip ${item.changed ? "changed" : ""}">${item.label}: ${item.value}</span>`).join("");

  return `
    <div class="state-map">
      <div class="state-side">
        <span>قبل</span>
        <div class="state-chips">${before}</div>
      </div>
      <div class="state-event">${event.title}</div>
      <div class="state-side">
        <span>${state.answers.timing === "happened" ? "الآن" : "لو صار التغيير"}</span>
        <div class="state-chips">${after}</div>
      </div>
    </div>
  `;
}

function resultSectionHtml(title, subtitle, items, kind) {
  if (!items.length) {
    const emptyText = kind === "attention"
      ? "ما ظهر تنبيه إضافي مرتبط بحالة هذا الشخص ضمن القواعد الحالية"
      : kind === "services"
        ? "ما ظهرت خدمة جديدة مرتبطة بهذا التغيير ضمن نطاق النموذج، وهذا مقصود، أثر ما يعرض شيء ما يخصك"
        : "ما فيه تغير إضافي نحتاج نعرضه";

    return `
      <section class="result-block">
        <div class="result-block-head"><div><small>${subtitle}</small><h4>${title}</h4></div></div>
        <div class="empty-result">${emptyText}</div>
      </section>
    `;
  }

  return `
    <section class="result-block">
      <div class="result-block-head">
        <div><small>${subtitle}</small><h4>${title}</h4></div>
        <span>${items.length} ${items.length === 1 ? "نتيجة" : "نتائج"}</span>
      </div>
      <div class="impact-list">
        ${items.map(impactCardHtml).join("")}
      </div>
    </section>
  `;
}

function impactCardHtml(item) {
  const toneClass = item.tone === "warn" ? "warn" : item.tone === "info" ? "info" : "";
  const sourceButton = item.sourceKey
    ? `<button class="impact-source" data-impact-source="${item.sourceKey}">${SOURCES[item.sourceKey].title} ↗</button>`
    : "";

  return `
    <article class="impact-card">
      <div class="impact-main">
        <div class="impact-icon ${toneClass}">${item.icon}</div>
        <div class="impact-copy"><strong>${item.title}</strong><p>${item.description}</p></div>
        <span class="impact-tag ${toneClass}">${item.tag}</span>
      </div>
      <div class="impact-detail">
        <div class="impact-detail-inner">
          <strong>ليش ظهر لك هذا؟</strong>
          <p>${item.reason}</p>
          <div class="rule-line"><strong>ببساطة:</strong> ${item.logic}</div>
          ${sourceButton}
        </div>
      </div>
    </article>
  `;
}

function wireImpactCards(container) {
  container.querySelectorAll(".impact-card").forEach(card => {
    card.querySelector(".impact-main").addEventListener("click", () => card.classList.toggle("open"));
  });

  container.querySelectorAll("[data-impact-source]").forEach(btn => {
    btn.addEventListener("click", event => {
      event.stopPropagation();
      openSource(btn.dataset.impactSource);
    });
  });
}

/* -----------------------------
   المقارنة، نفس التغيير مع شخص آخر
----------------------------- */
function startCompareMode() {
  state.compareMode = true;
  state.compareBase = {
    personaId: state.personaId,
    eventId: state.eventId,
    answers: { ...state.answers },
    result: state.result
  };
  renderPersonaCards();
  showView("persona", 1, true);
}

function runComparison(targetPersonaId) {
  const base = state.compareBase;
  const targetPerson = PERSONAS[targetPersonaId];
  const adaptedAnswers = adaptAnswersForPersona(base, targetPerson);
  const targetResult = runRulesEngine(targetPerson, base.eventId, adaptedAnswers);

  renderComparison(base, targetPerson, adaptedAnswers, targetResult);
  showView("compare", 4, true);
}

function adaptAnswersForPersona(base, targetPerson) {
  const answers = { ...base.answers };

  if (base.eventId === "income") {
    const originalPerson = PERSONAS[base.personaId];
    const delta = base.answers.newIncome - originalPerson.income;
    answers.oldIncome = targetPerson.income;
    answers.newIncome = Math.max(0, targetPerson.income + delta);
    answers.incomeDirection = delta >= 0 ? "increase" : "decrease";
  }

  return answers;
}

function renderComparison(base, targetPerson, targetAnswers, targetResult) {
  const basePerson = PERSONAS[base.personaId];
  const event = EVENTS[base.eventId];
  const baseTitles = collectVisibleTitles(base.result);
  const targetTitles = collectVisibleTitles(targetResult);
  const onlyBase = baseTitles.filter(title => !targetTitles.includes(title));
  const onlyTarget = targetTitles.filter(title => !baseTitles.includes(title));

  compareContent.innerHTML = `
    <div class="compare-title">
      <span class="view-step">المقارنة</span>
      <h3>نفس التغيير، مو نفس الأثر</h3>
      <p>طبقنا نفس نوع التغيير على شخصين مختلفين، وأثر عرض لكل واحد فقط الأشياء اللي طابقت حالته</p>
    </div>

    <div class="compare-hero">
      ${comparePersonHtml(basePerson, base.result, onlyBase, true)}
      <div class="compare-event">${event.title}<br><small>${comparisonDetail(base, targetPerson, targetAnswers)}</small></div>
      ${comparePersonHtml(targetPerson, targetResult, onlyTarget, false)}
    </div>

    <div class="compare-message">
      <strong>الحدث وحده ما يكفي</strong>
      <p>النتيجة تتغير لأن وضع الشخص، خدماته الحالية، وإجاباته هي اللي تحدد وش يظهر له</p>
    </div>

    <div class="result-actions">
      <button class="btn btn-primary" id="returnResultBtn">ارجع لنتيجة ${basePerson.name}</button>
      <button class="btn btn-quiet" id="restartBtn">ابدأ تجربة جديدة</button>
    </div>
  `;

  document.getElementById("returnResultBtn").addEventListener("click", () => {
    state.personaId = base.personaId;
    state.eventId = base.eventId;
    state.answers = { ...base.answers };
    state.result = base.result;
    state.compareMode = false;
    state.compareBase = null;
    renderResult();
    showView("result", 4, true);
  });

  document.getElementById("restartBtn").addEventListener("click", () => {
    resetExperience();
    showView("persona", 1, true);
  });
}

function comparePersonHtml(person, result, uniqueTitles, active) {
  const items = uniqueTitles.length
    ? uniqueTitles.slice(0, 4).map(title => `<div class="compare-item">${title}</div>`).join("")
    : `<div class="compare-item">ما فيه نتيجة حصرية، لكن ترتيب وأولوية النتائج تختلف</div>`;

  return `
    <article class="compare-person ${active ? "active" : ""}">
      <div class="compare-person-top">
        <div class="avatar ${person.avatarClass}">${person.letter}</div>
        <div><strong>${person.name}</strong><span>${person.headline}</span></div>
      </div>
      <div class="compare-metrics">
        <div class="compare-metric"><strong>${result.matched}</strong><span>نتائج ظهرت</span></div>
        <div class="compare-metric"><strong>${result.hidden}</strong><span>قواعد استبعدت</span></div>
      </div>
      <div class="compare-items">${items}</div>
    </article>
  `;
}

function comparisonDetail(base, targetPerson, targetAnswers) {
  if (base.eventId !== "income") return "طبقنا نفس اختيارات الحدث";
  const basePerson = PERSONAS[base.personaId];
  const delta = base.answers.newIncome - basePerson.income;
  const sign = delta >= 0 ? "+" : "";
  return `طبقنا نفس مقدار التغير ${sign}${formatMoney(delta)}، فصار دخل ${targetPerson.name} ${formatMoney(targetAnswers.newIncome)}`;
}

function collectVisibleTitles(result) {
  return [...result.updates, ...result.attention, ...result.services].map(item => item.title);
}

/* -----------------------------
   أدوات مساعدة
----------------------------- */
function getBeforeState(person) {
  return [
    { key: "employment", label: "الحالة", value: person.employmentLabel, changed: false },
    { key: "contract", label: "العقد", value: person.activeContract ? "فعال" : "لا يوجد", changed: false },
    { key: "income", label: "الدخل", value: formatMoney(person.income), changed: false },
    ...(person.socialSecurity ? [{ key: "social", label: "الضمان", value: "مستفيد", changed: false }] : [])
  ];
}

function formatMoney(value) {
  return `${Number(value).toLocaleString("en-US")} ريال`;
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}
