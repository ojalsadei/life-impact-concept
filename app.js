/* ==========================================
   أثر — Prototype State Engine
========================================== */


/* ==========================================
   OFFICIAL SOURCES
========================================== */

const SOURCES = {

  socialSecurity: {
    title: "نظام الضمان الاجتماعي",
    url:
      "https://www.hrsd.gov.sa/knowledge-centre/decisions-and-regulations/regulation-and-procedures/841045"
  },

  contractEnd: {
    title: "إنهاء العلاقة التعاقدية",
    url:
      "https://www.hrsd.gov.sa/ministry-services/services/%D8%A7%D9%86%D9%87%D8%A7%D8%A1-%D8%A7%D9%84%D8%B9%D9%84%D8%A7%D9%82%D8%A9-%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%82%D8%AF%D9%8A%D8%A9"
  },

  contracts: {
    title: "إدارة العقود",
    url:
      "https://www.hrsd.gov.sa/ministry-services/services/%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D9%82%D9%88%D8%AF"
  }

};


/* ==========================================
   PERSONAS

   هذه Initial State فقط.
   لا يوجد Persona مربوط بحدث معين.
========================================== */

const PERSONAS = {

  khalid: {

    id: "khalid",

    name: "خالد",

    age: 41,

    letter: "خ",

    avatarClass: "",

    description:
      "متزوج • أسرة من 4 أفراد",

    employmentStatus:
      "employed",

    employmentLabel:
      "موظف",

    hasActiveContract:
      true,

    contractType:
      "محدد المدة",

    income:
      4500,

    socialSecurityBeneficiary:
      true,

    familySize:
      4,

    stateRows: [
      ["الحالة الوظيفية", "موظف"],
      ["العقد", "فعال • محدد المدة"],
      ["الدخل الافتراضي", "4,500 ريال"],
      ["الأسرة", "4 أفراد"],
      ["الضمان", "مستفيد"]
    ]

  },


  reem: {

    id: "reem",

    name: "ريم",

    age: 27,

    letter: "ر",

    avatarClass: "avatar-two",

    description:
      "موظفة في القطاع الخاص",

    employmentStatus:
      "employed",

    employmentLabel:
      "موظفة",

    hasActiveContract:
      true,

    contractType:
      "محدد المدة",

    income:
      8500,

    socialSecurityBeneficiary:
      false,

    familySize:
      1,

    stateRows: [
      ["الحالة الوظيفية", "موظفة"],
      ["العقد", "فعال • محدد المدة"],
      ["الدخل الافتراضي", "8,500 ريال"],
      ["الأسرة", "فرد واحد"],
      ["الضمان", "غير مستفيدة"]
    ]

  },


  salman: {

    id: "salman",

    name: "سلمان",

    age: 24,

    letter: "س",

    avatarClass: "avatar-three",

    description:
      "باحث عن عمل",

    employmentStatus:
      "job_seeker",

    employmentLabel:
      "باحث عن عمل",

    hasActiveContract:
      false,

    contractType:
      null,

    income:
      0,

    socialSecurityBeneficiary:
      false,

    familySize:
      1,

    stateRows: [
      ["الحالة الوظيفية", "باحث عن عمل"],
      ["العقد", "لا يوجد عقد فعال"],
      ["الدخل الافتراضي", "0 ريال"],
      ["الأسرة", "فرد واحد"],
      ["الضمان", "غير مستفيد"]
    ]

  }

};


/* ==========================================
   APPLICATION STATE
========================================== */

const appState = {

  personaId: null,

  eventId: null,

  answers: {},

  results: []

};


/* ==========================================
   DOM
========================================== */

const views = {

  persona:
    document.getElementById("personaView"),

  event:
    document.getElementById("eventView"),

  questions:
    document.getElementById("questionView"),

  analysis:
    document.getElementById("analysisView"),

  result:
    document.getElementById("resultView")

};


const selectedPersonaContainer =
  document.getElementById("selectedPersona");


const questionPersonaContainer =
  document.getElementById("questionPersona");


const dynamicQuestions =
  document.getElementById("dynamicQuestions");


const resultContent =
  document.getElementById("resultContent");


/* ==========================================
   HELPERS
========================================== */

function formatMoney(value) {

  return Number(value).toLocaleString(
    "en-US"
  ) + " ريال";

}


function currentPersona() {

  return PERSONAS[
    appState.personaId
  ];

}


function scrollToExperience() {

  document
    .getElementById("experience")
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

}


function scrollToId(id) {

  const element =
    document.getElementById(id);

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* ==========================================
   NAVIGATION
========================================== */

document
  .querySelectorAll("[data-scroll]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        scrollToId(
          button.dataset.scroll
        );

      }
    );

  });


document
  .getElementById("startExperience")
  .addEventListener(
    "click",
    () => {

      showView("persona");

      scrollToExperience();

    }
  );


/* ==========================================
   VIEW SYSTEM
========================================== */

function showView(viewName) {

  Object
    .values(views)
    .forEach(view => {

      view.classList.remove("active");

    });


  views[
    viewName
  ].classList.add("active");


  updateProgress(viewName);

}


function updateProgress(viewName) {

  const order = {
    persona: 1,
    event: 2,
    questions: 3,
    analysis: 3,
    result: 4
  };


  const current =
    order[viewName];


  document
    .querySelectorAll(
      ".progress-item"
    )
    .forEach(
      (item, index) => {

        item.classList.toggle(
          "active",
          index + 1 <= current
        );

      }
    );

}


/* ==========================================
   PERSONA
========================================== */

document
  .querySelectorAll(
    "[data-persona]"
  )
  .forEach(card => {

    card.addEventListener(
      "click",
      () => {

        choosePersona(
          card.dataset.persona
        );

      }
    );

  });


function choosePersona(personaId) {

  appState.personaId =
    personaId;

  appState.eventId =
    null;

  appState.answers =
    {};

  appState.results =
    [];


  renderSelectedPersona();


  showView("event");

}


function renderSelectedPersona() {

  const persona =
    currentPersona();


  const html =
    personaSummaryHTML(
      persona
    );


  selectedPersonaContainer
    .innerHTML = html;


  questionPersonaContainer
    .innerHTML = html;

}


function personaSummaryHTML(persona) {

  return `

    <div class="mini-persona">

      <div class="mini-persona-head">

        <div
          class="avatar ${persona.avatarClass}"
        >
          ${persona.letter}
        </div>

        <div>
          <h4>
            ${persona.name}،
            ${persona.age}
          </h4>

          <p>
            ${persona.description}
          </p>
        </div>

      </div>


      <div class="state-list">

        ${
          persona.stateRows
            .map(row => `

              <div class="state-row">

                <span>
                  ${row[0]}
                </span>

                <strong>
                  ${row[1]}
                </strong>

              </div>

            `)
            .join("")
        }

      </div>


      <div class="synthetic-note">

        هذه بيانات افتراضية
        لأغراض توضيح الفكرة فقط.

      </div>

    </div>

  `;

}


/* ==========================================
   BACK BUTTONS
========================================== */

document
  .querySelectorAll(
    "[data-back]"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const target =
          button.dataset.back;

        showView(target);

      }
    );

  });


/* ==========================================
   EVENT SELECTION
========================================== */

document
  .querySelectorAll(
    "[data-event]"
  )
  .forEach(card => {

    card.addEventListener(
      "click",
      () => {

        chooseEvent(
          card.dataset.event
        );

      }
    );

  });


function chooseEvent(eventId) {

  appState.eventId =
    eventId;

  appState.answers =
    {};

  renderQuestions();

  showView("questions");

}


/* ==========================================
   QUESTIONS

   الأسئلة تعتمد على EVENT
   وليس Persona.
========================================== */

function renderQuestions() {

  const eventId =
    appState.eventId;


  if (
    eventId === "income"
  ) {

    renderIncomeQuestions();

  }


  if (
    eventId === "contractEnd"
  ) {

    renderContractEndQuestions();

  }


  if (
    eventId === "newJob"
  ) {

    renderNewJobQuestions();

  }

}


/* ==========================================
   INCOME QUESTIONS
========================================== */

function renderIncomeQuestions() {

  const persona =
    currentPersona();


  dynamicQuestions.innerHTML = `

    <div class="question-header">

      <span class="mini-label">
        تغير الدخل
      </span>

      <h3>
        وش تغير في الدخل؟
      </h3>

      <p>
        نسأل نفس الأسئلة لأي مستفيد.
        حالة ${persona.name}
        الحالية هي اللي بتحدد
        أي نتائج لها علاقة به.
      </p>

    </div>


    <div
      class="options"
      id="incomeDirection"
    >

      <button
        class="option"
        data-value="increase"
      >

        <span>

          <strong>
            الدخل ارتفع
          </strong>

          <small>
            صار عندي دخل أعلى
            من السابق.
          </small>

        </span>

        <span class="option-check">
          ✓
        </span>

      </button>


      <button
        class="option"
        data-value="decrease"
      >

        <span>

          <strong>
            الدخل انخفض
          </strong>

          <small>
            صار دخلي أقل
            من السابق.
          </small>

        </span>

        <span class="option-check">
          ✓
        </span>

      </button>

    </div>


    <div class="form-grid">

      <div class="form-field">

        <label>
          الدخل الحالي
        </label>

        <input
          id="oldIncome"
          type="number"
          value="${persona.income}"
          readonly
        >

      </div>


      <div class="form-field">

        <label>
          الدخل الجديد
        </label>

        <input
          id="newIncome"
          type="number"
          value="${
            persona.income > 0
              ? persona.income + 2000
              : 5000
          }"
          min="0"
        >

      </div>

    </div>


    <div class="question-actions">

      <button
        class="button primary"
        id="analyzeIncome"
      >
        شوف الأثر
        <span>←</span>
      </button>

    </div>

  `;


  setupSingleChoice(
    "incomeDirection",
    value => {

      appState.answers
        .incomeDirection = value;

    }
  );


  document
    .getElementById(
      "analyzeIncome"
    )
    .addEventListener(
      "click",
      () => {

        const newIncome =
          Number(
            document
              .getElementById(
                "newIncome"
              )
              .value
          );


        if (
          !appState.answers
            .incomeDirection
        ) {

          alert(
            "اختر أولًا هل الدخل ارتفع أو انخفض."
          );

          return;

        }


        if (
          Number.isNaN(newIncome) ||
          newIncome < 0
        ) {

          alert(
            "أدخل دخلًا جديدًا صحيحًا."
          );

          return;

        }


        appState.answers
          .oldIncome =
            persona.income;


        appState.answers
          .newIncome =
            newIncome;


        analyze();

      }
    );

}


/* ==========================================
   CONTRACT END QUESTIONS
========================================== */

function renderContractEndQuestions() {

  dynamicQuestions.innerHTML = `

    <div class="question-header">

      <span class="mini-label">
        انتهاء العلاقة الوظيفية
      </span>

      <h3>
        كيف ستنتهي العلاقة؟
      </h3>

      <p>
        سبب انتهاء العلاقة جزء مهم
        من سياق الحدث، لذلك لا نعطي
        نفس النتيجة لكل الحالات.
      </p>

    </div>


    <div
      class="options"
      id="contractReason"
    >

      <button
        class="option"
        data-value="expiry"
      >

        <span>

          <strong>
            انتهاء مدة العقد
          </strong>

          <small>
            وصل العقد إلى
            تاريخ نهايته.
          </small>

        </span>

        <span class="option-check">
          ✓
        </span>

      </button>


      <button
        class="option"
        data-value="resignation"
      >

        <span>

          <strong>
            استقالة
          </strong>

          <small>
            أفكر في إنهاء العلاقة
            من جانبي.
          </small>

        </span>

        <span class="option-check">
          ✓
        </span>

      </button>


      <button
        class="option"
        data-value="employer"
      >

        <span>

          <strong>
            إنهاء من صاحب العمل
          </strong>

          <small>
            العلاقة ستنتهي
            من جهة صاحب العمل.
          </small>

        </span>

        <span class="option-check">
          ✓
        </span>

      </button>

    </div>


    <div class="question-actions">

      <button
        class="button primary"
        id="analyzeContract"
      >
        شوف الأثر
        <span>←</span>
      </button>

    </div>

  `;


  setupSingleChoice(
    "contractReason",
    value => {

      appState.answers
        .contractReason = value;

    }
  );


  document
    .getElementById(
      "analyzeContract"
    )
    .addEventListener(
      "click",
      () => {

        if (
          !appState.answers
            .contractReason
        ) {

          alert(
            "اختر سبب انتهاء العلاقة أولًا."
          );

          return;

        }


        analyze();

      }
    );

}


/* ==========================================
   NEW JOB QUESTIONS
========================================== */

function renderNewJobQuestions() {

  dynamicQuestions.innerHTML = `

    <div class="question-header">

      <span class="mini-label">
        وظيفة جديدة
      </span>

      <h3>
        وش صار مع العقد الجديد؟
      </h3>

      <p>
        نحدد حالة العقد الجديدة
        ثم نربطها بحالة المستفيد الحالية.
      </p>

    </div>


    <div
      class="options"
      id="newJobAction"
    >

      <button
        class="option"
        data-value="received"
      >

        <span>

          <strong>
            وصلني عقد وأراجعه
          </strong>

          <small>
            العقد ما زال
            بانتظار قراري.
          </small>

        </span>

        <span class="option-check">
          ✓
        </span>

      </button>


      <button
        class="option"
        data-value="accepted"
      >

        <span>

          <strong>
            وافقت على العقد
          </strong>

          <small>
            وافقت على العقد
            المرسل لي.
          </small>

        </span>

        <span class="option-check">
          ✓
        </span>

      </button>


      <button
        class="option"
        data-value="modification"
      >

        <span>

          <strong>
            طلبت تعديل العقد
          </strong>

          <small>
            يوجد بند أريد
            تعديله قبل الموافقة.
          </small>

        </span>

        <span class="option-check">
          ✓
        </span>

      </button>

    </div>


    <div class="form-grid">

      <div class="form-field">

        <label>
          الراتب الجديد — افتراضي
        </label>

        <input
          id="newJobSalary"
          type="number"
          value="6500"
          min="0"
        >

      </div>

    </div>


    <div class="question-actions">

      <button
        class="button primary"
        id="analyzeNewJob"
      >
        شوف الأثر
        <span>←</span>
      </button>

    </div>

  `;


  setupSingleChoice(
    "newJobAction",
    value => {

      appState.answers
        .newJobAction = value;

    }
  );


  document
    .getElementById(
      "analyzeNewJob"
    )
    .addEventListener(
      "click",
      () => {

        if (
          !appState.answers
            .newJobAction
        ) {

          alert(
            "اختر حالة العقد الجديد أولًا."
          );

          return;

        }


        appState.answers
          .newJobSalary =
            Number(
              document
                .getElementById(
                  "newJobSalary"
                )
                .value
            );


        analyze();

      }
    );

}


/* ==========================================
   CHOICE HELPER
========================================== */

function setupSingleChoice(
  containerId,
  callback
) {

  const container =
    document.getElementById(
      containerId
    );


  container
    .querySelectorAll(
      ".option"
    )
    .forEach(option => {

      option.addEventListener(
        "click",
        () => {

          container
            .querySelectorAll(
              ".option"
            )
            .forEach(item => {

              item.classList
                .remove(
                  "selected"
                );

            });


          option.classList
            .add(
              "selected"
            );


          callback(
            option.dataset.value
          );

        }
      );

    });

}


/* ==========================================
   ANALYSIS
========================================== */

function analyze() {

  showView(
    "analysis"
  );


  document
    .querySelectorAll(
      ".analysis-step"
    )
    .forEach(step => {

      step.classList
        .remove(
          "done"
        );

    });


  const steps =
    document.querySelectorAll(
      ".analysis-step"
    );


  steps.forEach(
    (step, index) => {

      setTimeout(
        () => {

          step.classList
            .add(
              "done"
            );

        },

        350 +
        index * 400

      );

    }
  );


  setTimeout(
    () => {

      appState.results =
        runRulesEngine();


      renderResults();


      showView(
        "result"
      );

    },

    2300

  );

}


/* ==========================================
   RULES ENGINE
========================================== */

function runRulesEngine() {

  const persona =
    currentPersona();


  const event =
    appState.eventId;


  const answers =
    appState.answers;


  const results = [];


  /* ---------------------------------------
     EVENT: INCOME CHANGE
  --------------------------------------- */

  if (
    event === "income"
  ) {

    const oldIncome =
      answers.oldIncome;


    const newIncome =
      answers.newIncome;


    const difference =
      newIncome - oldIncome;


    /*
      RULE 1:
      Social Security beneficiary
      + income changed
    */

    if (
      persona
        .socialSecurityBeneficiary
    ) {

      results.push({

        icon: "≈",

        title:
          "الضمان الاجتماعي أصبح ضمن الآثار المحتملة",

        description:
          "لأن " +
          persona.name +
          " مستفيد حاليًا من الضمان، فتغير الدخل مرتبط مباشرة بسياق استحقاقه.",

        tag:
          "إعادة تقييم",

        tagType:
          "warning",

        explanation:
          "نظام الضمان الاجتماعي يربط الاستحقاق بالدخل المحتسب إلى جانب بقية الشروط. لذلك لا يفترض أثر أن ارتفاع أو انخفاض الدخل وحده يحدد النتيجة النهائية، بل يحدد أن الحالة تحتاج إعادة تقييم.",

        rule:
          "مستفيد من الضمان + تغير في الدخل → تحقق من أثر التغيير على الاستحقاق أو مقدار المعاش.",

        source:
          SOURCES.socialSecurity

      });


      results.push({

        icon: "!",

        title:
          "قد يكون هناك إجراء مطلوب بعد وقوع التغيير",

        description:
          "إذا كان التغيير مؤثرًا على الاستحقاق أو مقدار المعاش، فهناك التزام بالإبلاغ.",

        tag:
          "خلال 15 يومًا",

        tagType:
          "warning",

        explanation:
          "ينص نظام الضمان الاجتماعي على إبلاغ الوزارة بأي تغيير يؤثر على استحقاق المعاش أو مقداره خلال خمسة عشر يومًا من تاريخ التغيير.",

        rule:
          "تغيير مؤثر على الاستحقاق/المعاش → إبلاغ الوزارة خلال المدة النظامية.",

        source:
          SOURCES.socialSecurity

      });

    }


    /*
      RULE 2:
      NOT a social security beneficiary
    */

    if (
      !persona
        .socialSecurityBeneficiary
    ) {

      results.push({

        icon: "—",

        title:
          "لا يوجد أثر مباشر على ضمان قائم في هذه الحالة",

        description:
          persona.name +
          " غير مسجل في بيانات النموذج كمستفيد حالي من الضمان.",

        tag:
          "غير مرتبط",

        tagType:
          "neutral",

        explanation:
          "نفس حدث تغير الدخل أعطى نتيجة مختلفة لأن حالة المستفيد مختلفة. أثر لا يعرض بطاقة عن تغير معاش قائم إذا لم يكن الشخص مستفيدًا أصلًا ضمن بيانات الحالة.",

        rule:
          "غير مستفيد حاليًا + تغير دخل → لا نفترض وجود معاش قائم يتأثر.",

        source:
          null

      });

    }


    /*
      RULE 3:
      Generic income delta
    */

    results.push({

      icon:
        difference >= 0
          ? "↑"
          : "↓",

      title:
        difference >= 0
          ? "الدخل ارتفع في المحاكاة"
          : "الدخل انخفض في المحاكاة",

      description:
        "من " +
        formatMoney(
          oldIncome
        ) +
        " إلى " +
        formatMoney(
          newIncome
        ) +
        ".",

      tag:
        "بيانات الحالة",

      tagType:
        "neutral",

      explanation:
        "هذا ليس حكمًا على الأهلية. هذه مجرد حقيقة جديدة في حالة المستفيد يستخدمها المحرك عند اختبار القواعد المرتبطة بالخدمات.",

      rule:
        "Current State + New Income → Updated Beneficiary State.",

      source:
        null

    });

  }


  /* ---------------------------------------
     EVENT: CONTRACT END
  --------------------------------------- */

  if (
    event === "contractEnd"
  ) {

    /*
      Active contract
    */

    if (
      persona
        .hasActiveContract
    ) {

      results.push({

        icon: "◷",

        title:
          "العلاقة الوظيفية الحالية ستتغير",

        description:
          persona.name +
          " لديه عقد فعال في بيانات الحالة، لذلك حدث انتهاء العلاقة مرتبط به مباشرة.",

        tag:
          "أثر مباشر",

        tagType:
          "",

        explanation:
          "خدمة إنهاء العلاقة التعاقدية في قوى مرتبطة بوجود عقد ساري، وتتضمن تحديد سبب وتاريخ الإنهاء.",

        rule:
          "عقد فعال + حدث انتهاء علاقة → مسار إنهاء العلاقة يصبح ذا صلة.",

        source:
          SOURCES.contractEnd

      });


      results.push({

        icon: "?",

        title:
          "سبب انتهاء العلاقة جزء من القرار",

        description:
          contractReasonLabel(
            answers.contractReason
          ),

        tag:
          "سياق الحدث",

        tagType:
          "warning",

        explanation:
          "لا يعامل أثر عبارة «انتهى عقدي» كمعلومة كافية وحدها. سبب الانتهاء يصبح جزءًا من الحالة التي تطبق عليها القواعد.",

        rule:
          "Event + Reason → Context used for subsequent rules.",

        source:
          SOURCES.contractEnd

      });

    }


    /*
      No active contract
    */

    if (
      !persona
        .hasActiveContract
    ) {

      results.push({

        icon: "—",

        title:
          "لا يوجد عقد فعال في حالة المستفيد الحالية",

        description:
          "بحسب البيانات الافتراضية، " +
          persona.name +
          " لا يملك علاقة وظيفية فعالة ننهيها.",

        tag:
          "غير منطبق",

        tagType:
          "neutral",

        explanation:
          "وهذه نتيجة مهمة: نفس الحدث لا يجب أن يرسل كل الأشخاص إلى نفس الخدمة. المحرك يتحقق أولًا هل الحدث منطقي بالنسبة للحالة الحالية.",

        rule:
          "لا يوجد عقد فعال + طلب انتهاء علاقة → لا نفترض وجود عقد يمكن إنهاؤه.",

        source:
          SOURCES.contractEnd

      });

    }


    /*
      Social security context
    */

    if (
      persona
        .socialSecurityBeneficiary
    ) {

      results.push({

        icon: "↔",

        title:
          "هناك سياق آخر قد يحتاج إعادة تقييم",

        description:
          "لأن " +
          persona.name +
          " مستفيد من الضمان، فإن تغير وضعه الوظيفي قد يصاحبه تغير في بيانات الدخل.",

        tag:
          "Cross-service",

        tagType:
          "warning",

        explanation:
          "النموذج لا يفترض تلقائيًا تغير الاستحقاق. لكنه يستطيع اكتشاف أن حدثًا في قطاع العمل قد يغير معلومة تستخدم في سياق خدمة أخرى، مثل الدخل.",

        rule:
          "Employment State Change + Existing Social Security Context → flag related state for re-evaluation.",

        source:
          SOURCES.socialSecurity

      });

    }

  }


  /* ---------------------------------------
     EVENT: NEW JOB
  --------------------------------------- */

  if (
    event === "newJob"
  ) {

    const action =
      answers.newJobAction;


    /*
      Contract workflow
    */

    results.push({

      icon: "▤",

      title:
        newJobTitle(
          action
        ),

      description:
        newJobDescription(
          action
        ),

      tag:
        "إدارة العقود",

      tagType:
        "",

      explanation:
        "تتيح خدمة إدارة العقود للموظف التعامل مع العقد عبر قوى، بما يشمل الموافقة أو الرفض أو طلب التعديل. وعند موافقة الطرفين يصبح العقد موثقًا وفق وصف الخدمة الرسمي.",

      rule:
        "New Contract + Employee Action → Update contract workflow state.",

      source:
        SOURCES.contracts

    });


    /*
      Existing active contract
    */

    if (
      persona
        .hasActiveContract
    ) {

      results.push({

        icon: "!",

        title:
          "المستفيد لديه عقد فعال أصلًا",

        description:
          persona.name +
          " ليس باحثًا عن عمل بلا علاقة حالية؛ لديه عقد فعال ضمن بيانات النموذج.",

        tag:
          "سياق مهم",

        tagType:
          "warning",

        explanation:
          "هذا مثال على أهمية حالة المستفيد. وصول عقد جديد لشخص لديه عقد فعال ليس نفس حالة شخص لا يملك عقدًا حاليًا. النموذج لا يصدر حكمًا قانونيًا على الجمع بين العلاقات؛ بل يبرز أن هناك سياقًا إضافيًا يجب فحصه.",

        rule:
          "New Job + Existing Active Contract → additional context required.",

        source:
          SOURCES.contracts

      });

    }


    /*
      Job seeker
    */

    if (
      persona
        .employmentStatus ===
        "job_seeker"
    ) {

      results.push({

        icon: "→",

        title:
          "حالة المستفيد قد تنتقل من باحث عن عمل إلى موظف",

        description:
          "إذا اكتمل العقد الجديد وأصبحت العلاقة فعالة، تتغير الحالة الأساسية المستخدمة في التجربة.",

        tag:
          "State Change",

        tagType:
          "",

        explanation:
          "هذه هي الفكرة المركزية في أثر: وقوع الحدث لا ينتج بطاقة فقط؛ بل يغير Beneficiary State نفسها، وبالتالي يمكن أن تتغير الخدمات والقواعد المرتبطة بالمستفيد لاحقًا.",

        rule:
          "Job Seeker + Active New Employment → Employment State changes.",

        source:
          SOURCES.contracts

      });

    }


    /*
      Social Security beneficiary
    */

    if (
      persona
        .socialSecurityBeneficiary
    ) {

      results.push({

        icon: "≈",

        title:
          "الدخل الجديد قد يصبح ذا صلة بسياق الضمان",

        description:
          "الراتب الافتراضي الجديد هو " +
          formatMoney(
            answers.newJobSalary
          ) +
          ".",

        tag:
          "أثر محتمل",

        tagType:
          "warning",

        explanation:
          "لأن المستفيد لديه سياق ضمان اجتماعي قائم في بيانات النموذج، يمكن للمحرك اكتشاف أن الوظيفة الجديدة قد تغير بيانات الدخل المستخدمة في تقييم ذلك السياق. لا يتم إصدار قرار أهلية تلقائي.",

        rule:
          "Existing Social Security Context + New Employment Income → re-evaluate related income state.",

        source:
          SOURCES.socialSecurity

      });

    }

  }


  return results;

}


/* ==========================================
   LABEL HELPERS
========================================== */

function contractReasonLabel(
  reason
) {

  const labels = {

    expiry:
      "تم اختيار: انتهاء مدة العقد.",

    resignation:
      "تم اختيار: استقالة.",

    employer:
      "تم اختيار: إنهاء من صاحب العمل."

  };


  return labels[reason] || "";

}


function newJobTitle(
  action
) {

  const labels = {

    received:
      "العقد يحتاج مراجعة وقرار",

    accepted:
      "تمت موافقة الموظف على العقد",

    modification:
      "تم طلب تعديل العقد"

  };


  return labels[action] ||
    "العقد الجديد";

}


function newJobDescription(
  action
) {

  const labels = {

    received:
      "العقد ما زال في مرحلة مراجعة الموظف ضمن المحاكاة.",

    accepted:
      "موافقة الموظف خطوة في مسار العقد، ويصبح موثقًا عند تحقق موافقة الطرفين بحسب وصف الخدمة.",

    modification:
      "الموظف اختار طلب تعديل قبل إكمال الموافقة."

  };


  return labels[action] || "";

}


/* ==========================================
   RESULT RENDERING
========================================== */

function renderResults() {

  const persona =
    currentPersona();


  const eventLabel =
    getEventLabel();


  resultContent.innerHTML = `

    <div class="result-layout">


      <aside class="result-summary">

        <button
          class="back-link"
          id="resultBack"
        >
          → تعديل الإجابات
        </button>


        <div class="result-person">

          <div
            class="avatar ${persona.avatarClass}"
          >
            ${persona.letter}
          </div>

          <h4>
            ${persona.name}،
            ${persona.age}
          </h4>

          <p>
            ${persona.description}
          </p>

        </div>


        <div class="event-summary">

          <span>
            الحدث المختبر
          </span>

          <strong>
            ${eventLabel}
          </strong>

        </div>


        <div class="synthetic-note">

          النتيجة مبنية على بيانات
          افتراضية وقواعد نموذجية
          مرتبطة بمصادر رسمية.

        </div>

      </aside>


      <div class="result-main">

        <div class="result-header">

          <span class="mini-label">
            الأثر على ${persona.name}
          </span>

          <h3>
            هذه النتيجة تخص حالته.
          </h3>

          <p>
            لو طبقنا نفس الحدث على شخص
            بحالة مختلفة، قد تظهر نتائج
            مختلفة تمامًا.
          </p>

        </div>


        ${renderDelta()}


        <div class="impact-list">

          ${
            appState.results
              .map(
                renderImpactCard
              )
              .join("")
          }

        </div>


        <div class="result-disclaimer">

          هذا النموذج لا يصدر قرار أهلية
          أو استحقاق أو تفسيرًا قانونيًا.
          البيانات افتراضية، والهدف توضيح
          كيف يمكن ربط حالة المستفيد
          بالتغيير والقواعد ذات العلاقة.

        </div>


        <div class="result-actions">

          <button
            class="button primary"
            id="comparePersona"
          >
            جرّب نفس الحدث مع شخص آخر
            <span>←</span>
          </button>

          <button
            class="button ghost"
            id="newScenario"
          >
            جرّب تغييرًا آخر
          </button>

        </div>

      </div>

    </div>

  `;


  setupResultInteractions();

}


function renderImpactCard(
  result,
  index
) {

  return `

    <article
      class="impact-card"
      data-impact="${index}"
    >

      <div class="impact-top">

        <div class="impact-icon">
          ${result.icon}
        </div>


        <div class="impact-copy">

          <strong>
            ${result.title}
          </strong>

          <p>
            ${result.description}
          </p>

        </div>


        <span
          class="
            impact-tag
            ${result.tagType || ""}
          "
        >
          ${result.tag}
        </span>

      </div>


      <div class="impact-detail">

        <div class="impact-detail-inner">

          <strong>
            لماذا ظهرت هذه النتيجة؟
          </strong>

          <p>
            ${result.explanation}
          </p>


          <div class="rule-path">

            <strong>
              منطق النموذج
            </strong>

            <br>

            ${result.rule}

          </div>


          ${
            result.source

              ? `

                <a
                  class="official-source"
                  href="${result.source.url}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${result.source.title}
                  ↗
                </a>

              `

              : ""
          }

        </div>

      </div>

    </article>

  `;

}


/* ==========================================
   DELTA
========================================== */

function renderDelta() {

  const persona =
    currentPersona();


  if (
    appState.eventId ===
    "income"
  ) {

    return `

      <div class="result-delta">

        <span>
          الدخل
        </span>

        <strong>
          ${
            formatMoney(
              appState.answers
                .oldIncome
            )
          }
        </strong>

        <span class="delta-arrow">
          ←
        </span>

        <strong>
          ${
            formatMoney(
              appState.answers
                .newIncome
            )
          }
        </strong>

      </div>

    `;

  }


  if (
    appState.eventId ===
    "contractEnd"
  ) {

    return `

      <div class="result-delta">

        <span>
          العلاقة
        </span>

        <strong>
          ${
            persona.hasActiveContract
              ? "عقد فعال"
              : "لا يوجد عقد فعال"
          }
        </strong>

        <span class="delta-arrow">
          ←
        </span>

        <strong>
          اختبار انتهاء العلاقة
        </strong>

      </div>

    `;

  }


  return `

    <div class="result-delta">

      <span>
        الحالة الوظيفية
      </span>

      <strong>
        ${persona.employmentLabel}
      </strong>

      <span class="delta-arrow">
        ←
      </span>

      <strong>
        وظيفة جديدة
      </strong>

    </div>

  `;

}


/* ==========================================
   RESULT INTERACTIONS
========================================== */

function setupResultInteractions() {

  document
    .querySelectorAll(
      ".impact-card"
    )
    .forEach(card => {

      card
        .querySelector(
          ".impact-top"
        )
        .addEventListener(
          "click",
          () => {

            card.classList
              .toggle(
                "open"
              );

          }
        );

    });


  document
    .getElementById(
      "resultBack"
    )
    .addEventListener(
      "click",
      () => {

        renderQuestions();

        showView(
          "questions"
        );

      }
    );


  /*
    هذا هو زر الـWOW:
    يحتفظ بنفس الحدث
    لكن يسمح باختيار Persona ثانية.
  */

  document
    .getElementById(
      "comparePersona"
    )
    .addEventListener(
      "click",
      () => {

        const savedEvent =
          appState.eventId;


        appState.personaId =
          null;


        appState.answers =
          {};


        appState.results =
          [];


        appState.eventId =
          savedEvent;


        activateComparisonMode(
          savedEvent
        );


        showView(
          "persona"
        );

      }
    );


  document
    .getElementById(
      "newScenario"
    )
    .addEventListener(
      "click",
      () => {

        appState.eventId =
          null;

        appState.answers =
          {};

        appState.results =
          [];


        renderSelectedPersona();

        showView(
          "event"
        );

      }
    );

}


/* ==========================================
   COMPARISON MODE

   نفس الحدث + Persona جديدة
========================================== */

function activateComparisonMode(
  eventId
) {

  const intro =
    views.persona
      .querySelector(
        ".view-intro"
      );


  const original =
    intro.innerHTML;


  intro.innerHTML = `

    <span class="mini-label">
      قارن نفس الحدث
    </span>

    <h3>
      اختر شخصًا ثانيًا
    </h3>

    <p>
      سنطبق
      <strong>
        "${getEventLabel(eventId)}"
      </strong>
      على حالة مختلفة
      ونشوف كيف تتغير النتيجة.
    </p>

  `;


  /*
    نغير سلوك البطاقات مؤقتًا.
  */

  document
    .querySelectorAll(
      "[data-persona]"
    )
    .forEach(card => {

      const clone =
        card.cloneNode(true);


      card.replaceWith(
        clone
      );


      clone.addEventListener(
        "click",
        () => {

          appState.personaId =
            clone.dataset.persona;


          appState.eventId =
            eventId;


          appState.answers =
            {};


          renderSelectedPersona();

          renderQuestions();

          restorePersonaListeners(
            original
          );

          showView(
            "questions"
          );

        }
      );

    });

}


/* ==========================================
   RESTORE PERSONA LISTENERS
========================================== */

function restorePersonaListeners(
  originalIntro
) {

  views.persona
    .querySelector(
      ".view-intro"
    )
    .innerHTML =
      originalIntro;


  document
    .querySelectorAll(
      "[data-persona]"
    )
    .forEach(card => {

      const clone =
        card.cloneNode(true);


      card.replaceWith(
        clone
      );


      clone.addEventListener(
        "click",
        () => {

          choosePersona(
            clone.dataset.persona
          );

        }
      );

    });

}


/* ==========================================
   EVENT LABEL
========================================== */

function getEventLabel(
  eventId = appState.eventId
) {

  const labels = {

    income:
      "تغيّر الدخل",

    contractEnd:
      "انتهاء العلاقة الوظيفية",

    newJob:
      "بدء وظيفة جديدة"

  };


  return labels[eventId] || "";

}
