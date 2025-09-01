document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", function () {
    document.querySelector("body").classList.add("loaded");
  });

  // main-color change btn
  const colorBg = localStorage.getItem("primary-color");
  document.documentElement.style.setProperty("--p1", colorBg);

  const ColorBtn = document.querySelectorAll(".color-btn");
  ColorBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const color = btn.getAttribute("data-color");
      document.documentElement.style.setProperty("--p1", color);
      localStorage.setItem("primary-color", color);
    });
  });

  // color swicher
  document.querySelector(".color-switcher").addEventListener("click", () => {
    document.querySelector(".color-switcher").classList.toggle("opened");
  });

  const body = document.querySelector("body");
  const toggleButtons = document.querySelectorAll(".mood_toggle");
  const toggleName = document.querySelector(".toggle_name");
  const icons = document.querySelectorAll(".mood_icon");

  // Function  on the current mode
  function updateUI(isDarkMode) {
    body.classList.toggle("dark", isDarkMode);
    toggleName.innerText = isDarkMode ? "Light Mode" : "Dark Mode";

    icons.forEach((icon) => {
      if (isDarkMode) {
        icon.classList.remove("ph-moon");
        icon.classList.add("ph-sun");
      } else {
        icon.classList.remove("ph-sun");
        icon.classList.add("ph-moon");
      }
    });
  }

  //  stored preference
  let currentMode = localStorage.getItem("mode") || "light";
  updateUI(currentMode === "dark");

  // Add click event listener to all toggle buttons
  toggleButtons.forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", function () {
      currentMode = currentMode === "light" ? "dark" : "light";
      localStorage.setItem("mode", currentMode);
      updateUI(currentMode === "dark");
    });
  });

  // toggle btn for sidebar
  const sidebarBtn = document.querySelectorAll(".sidebar-btn");
  sidebarBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sideMenu = document.querySelector(".side-menu");
      sideMenu && sideMenu.classList.toggle("active");
    });
  });

  // primary button
  document.querySelectorAll(".primary-btn").forEach((btn) => {
    let span = document.createElement("span");
    span.className = "primary-btnSpan";
    btn.appendChild(span);

    btn.onmousemove = (event) => {
      let rect = btn.getBoundingClientRect(),
        offsetX = event.clientX - rect.left,
        offsetY = event.clientY - rect.top;
      span.style.top = `${offsetY}px`;
      span.style.left = `${offsetX}px`;
    };
  });
  // primary button2
  document.querySelectorAll(".primary-btn2").forEach((btn) => {
    let span = document.createElement("span");
    span.className = "primary-btn2Span";
    btn.appendChild(span);

    btn.onmousemove = (event) => {
      let rect = btn.getBoundingClientRect(),
        offsetX = event.clientX - rect.left,
        offsetY = event.clientY - rect.top;
      span.style.top = `${offsetY}px`;
      span.style.left = `${offsetX}px`;
    };
  });
  // counter up
  function counterUp(el, t) {
    let n = 0;
    const r = parseFloat(el.innerHTML);
    const finalValue = Number.isInteger(r) ? parseInt(r, 10) : r;
    const i = t.duration || 2000;
    const u = t.delay || 16;
    const step = finalValue / (i / u);

    const l = setInterval(() => {
      n += step;
      el.innerHTML = Number.isInteger(finalValue)
        ? Math.floor(n)
        : n.toFixed(2);
      if (n >= finalValue) {
        clearInterval(l);
        el.innerHTML = finalValue;
      }
    }, u);
  }

  const counterElements = document.querySelectorAll(".counter");
  counterElements.forEach((el) => {
    const IO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counterUp(entry.target, { duration: 2000, delay: 16 });
          IO.unobserve(entry.target); // Stop observing once the element is intersecting
        }
      });
    });
    IO.observe(el);
  });

  // testimonial slider
  const testimonial = new Swiper(".testimonial_slider", {
    spaceBetween: 30,
    speed: 2500,
    loop: true,
    leftToRight: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      bulletClass: "swiper-custom-bullet",
      bulletActiveClass: "swiper-custom-bullet-active",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1400: {
        slidesPerView: 3,
      },
      1600: {
        slidesPerView: 4,
      },
    },
  });

  // contact -Send us a message
  const btn = document.getElementById("contact-submit-btn");
  btn && emailjs.init("Your public key");
  const contactForm = document.getElementById("contact-form");
  contactForm &&
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      btn.value = "Sending...";
      const serviceID = "Your service id";
      const templateID = "Your template id";
      // Uncomment this for working demo

      // emailjs.sendForm(serviceID, templateID, this).then(
      //   () => {
      //     btn.value = "Send Email";
      //     Swal.fire("Message Sent Successfully", "", "success");
      //     document.querySelector("#name").value = "";
      //     document.querySelector("#email").value = "";
      //     document.querySelector("#phone").value = "";
      //     document.querySelector("#location").value = "";
      //     document.querySelector("#message").value = "";
      //   },
      //   (err) => {
      //     btn.value = "Send Email";
      //     alert(JSON.stringify(err));
      //   }
      // );
    });

  // ----------portfolio page js-------------

  // tab
  const tabs = document.querySelectorAll("[data-tab-target]");
  const tabContents = document.querySelectorAll("[data-tab-content]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.tabTarget);
      tabContents.forEach((tabContent) => {
        tabContent.classList.remove("active");
      });
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
      tab.classList.add("active");
      target.classList.add("active");
    });
  });

  // FAQs According auto height
  const accordionHeaders = document.querySelectorAll(
    ".accordion-single .header-area"
  );

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const accordionSingle = this.closest(".accordion-single");
      const contentArea = this.nextElementSibling;

      if (accordionSingle.classList.contains("active")) {
        accordionSingle.classList.remove("active");
        slideUp(contentArea);
      } else {
        const activeAccordion = document.querySelector(
          ".accordion-single.active"
        );
        if (activeAccordion) {
          activeAccordion.classList.remove("active");
          slideUp(activeAccordion.querySelector(".content-area"));
        }

        accordionSingle.classList.add("active");
        slideDown(contentArea);
      }
    });
  });

  function slideDown(element) {
    element.style.display = "block";
    const height = element.scrollHeight;
    element.animate(
      [
        { height: "0px", opacity: 0 },
        { height: height + "px", opacity: 1 },
      ],
      {
        duration: 300,
        easing: "ease-out",
      }
    );
  }

  function slideUp(element) {
    const height = element.scrollHeight;
    const animation = element.animate(
      [
        { height: height + "px", opacity: 1 },
        { height: "0px", opacity: 0 },
      ],
      {
        duration: 300,
        easing: "ease-in",
      }
    );

    animation.onfinish = () => {
      element.style.display = "none";
    };
  }
  // FAQs According auto height end

  // comment reply
  const replyContainer = document.querySelectorAll(".reply-container");
  replyContainer &&
    replyContainer.forEach((container) => {
      const replyBtn = container.querySelector(".reply-btn");
      const replyAnswer = container.querySelector(".reply-answer");

      replyBtn.addEventListener("click", function () {
        replyAnswer.classList.toggle("show");
      });
    });

  // increment & discrement function
  const incrementButtons = document.querySelectorAll(".increment");
  const decrementButtons = document.querySelectorAll(".discrement");

  incrementButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const countElement = this.previousElementSibling;
      let count = parseInt(countElement.textContent);
      count++;
      countElement.textContent = count;
    });
  });

  decrementButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const countElement = this.nextElementSibling;
      let count = parseInt(countElement.textContent);
      if (count > 1) {
        count--;
        countElement.textContent = count;
      }
    });
  });

  // radio active bg color set
  const radioButtons = document.querySelectorAll('input[name="radio"]');
  radioButtons.forEach(function (radio) {
    radio.addEventListener("change", function () {
      radioButtons.forEach(function (rb) {
        rb.closest(".radioBtn").classList.remove("active");
      });
      if (radio.checked) {
        radio.closest(".radioBtn").classList.add("active");
      }
    });
  });

  // radio active payment content
  {
    const radioButtons = document.querySelectorAll(".payment");

    radioButtons.forEach(function (radio) {
      radio.addEventListener("change", function () {
        radioButtons.forEach(function (rb) {
          const parentDiv = rb.closest(".radio-wrapper");
          const radioBtnDiv = parentDiv.querySelector(".radioBtn");
          const radioContentDiv = parentDiv.querySelector(".radio-content");

          // Slide up and remove active class from all sections
          if (radioContentDiv.style.display === "block") {
            slideUp(radioContentDiv);
          }
          radioBtnDiv.classList.remove("active");
        });

        // Add active class and slide down the selected section
        if (radio.checked) {
          const parentDiv = radio.closest(".radio-wrapper");
          const radioBtnDiv = parentDiv.querySelector(".radioBtn");
          const radioContentDiv = parentDiv.querySelector(".radio-content");

          radioBtnDiv.classList.add("active");
          slideDown(radioContentDiv);
        }
      });
    });

    function slideDown(element) {
      element.style.display = "block";
      const height = element.scrollHeight;
      element.animate(
        [
          { height: "0px", opacity: 0 },
          { height: height + "px", opacity: 1 },
        ],
        {
          duration: 300,
          easing: "ease-out",
        }
      );
    }

    function slideUp(element) {
      const height = element.scrollHeight;
      const animation = element.animate(
        [
          { height: height + "px", opacity: 1 },
          { height: "0px", opacity: 0 },
        ],
        {
          duration: 300,
          easing: "ease-in",
        }
      );

      animation.onfinish = () => {
        element.style.display = "none";
      };
    }
  }
  // radio active Bellings address content
  {
    const radioButtons = document.querySelectorAll(".billing");

    radioButtons.forEach(function (radio) {
      radio.addEventListener("change", function () {
        radioButtons.forEach(function (rb) {
          const parentDiv = rb.closest(".radio-wrapper");
          const radioBtnDiv = parentDiv.querySelector(".radioBtn");
          const radioContentDiv = parentDiv.querySelector(".radio-content");

          // Slide up and remove active class from all sections
          if (radioContentDiv.style.display === "block") {
            slideUp(radioContentDiv);
          }
          radioBtnDiv.classList.remove("active");
        });

        // Add active class and slide down the selected section
        if (radio.checked) {
          const parentDiv = radio.closest(".radio-wrapper");
          const radioBtnDiv = parentDiv.querySelector(".radioBtn");
          const radioContentDiv = parentDiv.querySelector(".radio-content");

          radioBtnDiv.classList.add("active");
          slideDown(radioContentDiv);
        }
      });
    });

    function slideDown(element) {
      element.style.display = "block";
      const height = element.scrollHeight;
      element.animate(
        [
          { height: "0px", opacity: 0 },
          { height: height + "px", opacity: 1 },
        ],
        {
          duration: 300,
          easing: "ease-out",
        }
      );
    }

    function slideUp(element) {
      const height = element.scrollHeight;
      const animation = element.animate(
        [
          { height: height + "px", opacity: 1 },
          { height: "0px", opacity: 0 },
        ],
        {
          duration: 300,
          easing: "ease-in",
        }
      );

      animation.onfinish = () => {
        element.style.display = "none";
      };
    }
  }

  // country select function
  const selectBoxes = document.querySelectorAll(".select-box");
  selectBoxes.forEach((selectBox) => {
    const selected = selectBox.querySelector(".selected");
    const optionsContainer = selectBox.querySelector(".options-container");
    const optionsList = selectBox.querySelectorAll(".option");

    selected.addEventListener("click", () => {
      optionsContainer.classList.toggle("active");
    });

    optionsList.forEach((option) => {
      option.addEventListener("click", () => {
        selected.innerHTML = option.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
      });
    });
  });
  // GLightbox
  if (document.querySelector(".glightbox3") !== null) {
    GLightbox({
      selector: ".glightbox3",
    });
  }
  // Aos
  AOS.init({
    offset: 120,
    duration: 800,
    easing: "ease-in-out",
    anchorPlacement: "top-bottom",
    once: true,
  });
});

/* ===== Timeline v2: fixed sides + chunks + hover link ===== */

/* Config */
const TL_START = new Date(2023, 6, 1); // Jul 2023
const TL_END   = new Date(2025, 6, 1); // Jul 2025

/* Months array */
const months = [];
{
  const d = new Date(TL_START);
  while (d <= TL_END) {
    months.push({ y: d.getFullYear(), m: d.getMonth() + 1 });
    d.setMonth(d.getMonth() + 1);
  }
}

/* Helpers */
function ymLabel(ym) {
  const [Y,M] = ym.split("-").map(Number);
  return new Date(Y, M-1, 1).toLocaleString(undefined, { month:"short", year:"numeric" });
}
function rowOf(ym) {
  const [Y, M] = ym.split("-").map(Number);
  return (Y - TL_START.getFullYear()) * 12 + (M - (TL_START.getMonth()+1)) + 1;
}

/* Build months rail */
const rail = document.getElementById("tl-months");
months.forEach(({y,m}) => {
  const li = document.createElement("li");
  li.textContent = new Date(y, m-1, 1).toLocaleString(undefined, { month:"short", year:"numeric" });
  rail.appendChild(li);
});

/* Chunk bands (group periods for readability) */
const chunks = [
  { label: "Arrival & First Steps",  start:"2023-07", end:"2023-12" },
  { label: "Building & Recognition", start:"2024-01", end:"2024-06" },
  { label: "Teams & Community",      start:"2024-07", end:"2024-12" },
  { label: "Research to Impact",     start:"2025-01", end:"2025-07" }
];

/* Data: each pair has a key; experience on the left, growth on the right */
const pairs = [
  {
    key:"arrive",
    date:"2023-07",
    exp:{ title:"Landed in Chicago", text:"Moved from China; new school, new culture, new goals." },
    growth:{ text:"Resilience & curiosity: adapt quickly to uncertainty." }
  },
  {
    key:"start-research",
    date:"2023-08",
    exp:{ title:"Began Parkinson’s Research", text:"Family experience → survey literature; sketch rehab ideas." },
    growth:{ text:"Math matters: signals, statistics, and ML foundations." }
  },
  {
    key:"gloves-iter",
    date:"2023-10",
    exp:{ title:"3 Rehab Glove Prototypes", text:"Iterated materials, ergonomics, and electronics." },
    growth:{ text:"Rapid prototyping + tooling: CAD, 3D printing, MCUs." }
  },
  {
    key:"aux-device",
    date:"2023-12",
    exp:{ title:"Aux Rehab Device (Finger Tremor)", text:"Focused device for tremor/stiffness relief." },
    growth:{ text:"Human-centered requirements from patient interviews." }
  },
  {
    key:"isef-final",
    date:"2024-01",
    exp:{ title:"ISEF/JSHS Finalist", text:"National recognition of methodology & results." },
    growth:{ text:"Rigor: reproducible experiments & error analysis." }
  },
  {
    key:"parkinaid",
    date:"2024-03",
    exp:{ title:"Founded ParkinAid (NGO)", text:"Visits, webinars with clinicians, caregiver outreach." },
    growth:{ text:"Build with, not for: empathy-in-the-loop." }
  },
  {
    key:"ftc-worlds-24",
    date:"2024-04",
    exp:{ title:"FTC Robotics → Worlds (SW Lead)", text:"Strategy, CV & autonomous; integrated sensor pipelines." },
    growth:{ text:"Team leadership: reviews, testing discipline, CI habits." }
  },
  {
    key:"diamond",
    date:"2024-04",
    exp:{ title:"Diamond Challenge (Semifinalist)", text:"Validated social entrepreneurship plan for ParkinAid." },
    growth:{ text:"Project → Product: value prop & stakeholders." }
  },
  {
    key:"softcom",
    date:"2024-06",
    exp:{ title:"SoftCom Lab Intern (Cal Poly)", text:"SignLang; data curation + model evaluation loops." },
    growth:{ text:"Tools mature: notebooks → versioned pipelines & benchmarks." }
  },
  {
    key:"ai-club",
    date:"2024-09",
    exp:{ title:"AI Club Setup", text:"Led workshops; guided applied ML projects." },
    growth:{ text:"Teaching clarifies thinking; communicate simply." }
  },
  {
    key:"congress-app",
    date:"2024-11",
    exp:{ title:"Congressional App Challenge — 1st (WI-5)", text:"ParkinAid diagnosis app; mobile deployment." },
    growth:{ text:"Full-stack lens: latency, UX, privacy for real users." }
  },
  {
    key:"paper",
    date:"2025-01",
    exp:{ title:"Paper: ParkinAid Multimodal Diagnosis", text:"Motor + speech ML/CV methods with clear baselines." },
    growth:{ text:"Write like a scientist: ablations, claims, limitations." }
  },
  {
    key:"patent",
    date:"2025-02",
    exp:{ title:"U.S. Provisional Patent 63/790,055", text:"Filed diagnostic & rehab innovations." },
    growth:{ text:"IP literacy: novelty search, claims, prior art." }
  },
  {
    key:"ftc-worlds-25",
    date:"2025-04",
    exp:{ title:"FTC Robotics → Worlds (again)", text:"Reliability, auto, and mentoring underclassmen." },
    growth:{ text:"Scale impact: docs, handoff, and repeatability." }
  },
  {
    key:"isef-2nd",
    date:"2025-05",
    exp:{ title:"ISEF — 2nd (Translational Medical Science)", text:"Multimodal AI + robot-assisted rehab recognized." },
    growth:{ text:"Translational focus: clinical relevance over leaderboard." }
  },
  {
    key:"bwsI",
    date:"2025-07",
    exp:{ title:"MIT BWSI — Medlytics", text:"Immersed in medical data science with peers & mentors." },
    growth:{ text:"Responsible deployment: generalize, validate ethically." }
  }
];

/* Mount points */
const leftCol  = document.getElementById("tl-left");
const rightCol = document.getElementById("tl-right");

/* Render chunk bands */
function addChunk({label,start,end}){
  const band = document.createElement("div");
  band.className = "tl-chunk";
  band.style.gridRow = `${rowOf(start)} / ${rowOf(end) + 1}`;
  const tag = document.createElement("div");
  tag.className = "tl-chunk-label";
  tag.textContent = label;
  band.appendChild(tag);
  // Insert before other content so it sits behind
  leftCol.parentElement.insertBefore(band, leftCol);
}
chunks.forEach(addChunk);

/* Create a card */
function makeCard({date, title, text, key, side}){
  const wrap = document.createElement("div");
  wrap.className = `tl-item ${side}`;
  wrap.style.gridRow = rowOf(date);

  const card = document.createElement("div");
  card.className = "tl-card";
  card.dataset.side = side;
  if (key) card.dataset.key = key;
  card.innerHTML = `
    <div class="tl-tag">${ymLabel(date)}</div>
    <div class="tl-title">${title}</div>
    <div class="tl-text">${text}</div>
  `;
  wrap.appendChild(card);
  return wrap;
}

/* Render (experience always left, growth always right) */
pairs.forEach(p => {
  const expNode  = makeCard({date:p.date, title:p.exp.title, text:p.exp.text, key:p.key, side:"left"});
  const growNode = makeCard({date:p.date, title:"Growth", text:p.growth.text, key:p.key, side:"right"});
  leftCol.appendChild(expNode);
  rightCol.appendChild(growNode);
});

/* Hover linking: highlight both cards sharing the same data-key */
function setupHoverLink(){
  const root = document.querySelector("#journey .tl-grid");
  const cards = root.querySelectorAll(".tl-card[data-key]");
  const byKey = {};
  cards.forEach(c => (byKey[c.dataset.key] ??= []).push(c));

  cards.forEach(c => {
    c.addEventListener("mouseenter", () => {
      root.classList.add("tl-dim");
      byKey[c.dataset.key].forEach(x => x.classList.add("is-active"));
    });
    c.addEventListener("mouseleave", () => {
      root.classList.remove("tl-dim");
      byKey[c.dataset.key].forEach(x => x.classList.remove("is-active"));
    });
  });
}
setupHoverLink();

