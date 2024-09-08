// FONT AWESOME CDN
const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css";
link.integrity =
  "sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==";
link.crossOrigin = "anonymous";
link.referrerPolicy = "no-referrer";
document.head.appendChild(link);

// GET ELEMENTS FROM PAGE
const body = document.querySelector("body");
const form = document.querySelector(".contact-form__form form");
const sectionContainer = document.querySelector(".contact-form__form");
const contactContent = document.querySelector(".contact-form__content");

// CREATE SECTION
const section = document.createElement("section");
const h3 = document.createElement("h3");
const para = document.createElement("p");
const btn = document.createElement("button");
const btnDiv = document.createElement("div");

h3.textContent = "Hello Conversion!";
para.textContent = "Click on the button to contact us.";
btn.textContent = "Click here";

section.classList.add("contact-section");
btnDiv.classList.add("btn-div");
btn.classList.add("section-btn");

btnDiv.appendChild(btn);
section.appendChild(h3);
section.appendChild(para);
section.appendChild(btnDiv);
sectionContainer.appendChild(section);

// OVERLAY
const overlayDiv = document.createElement("div");
body.appendChild(overlayDiv);
overlayDiv.classList.add("overlay");

// CREATE MODAL
const dialog = document.createElement("dialog");
const btnCloseModal = document.createElement("button");
const btnCloseTextSpan = document.createElement("span");
const btnCloseStyleSpan = document.createElement("span");

btnCloseModal.appendChild(btnCloseStyleSpan);
btnCloseModal.appendChild(btnCloseTextSpan);
btnCloseTextSpan.classList.add("sr-only");
btnCloseStyleSpan.classList.add("btn-x");
btnCloseTextSpan.textContent = "Close";
btnCloseModal.setAttribute("aria-label", "close");

dialog.prepend(btnCloseModal);
dialog.appendChild(form);
sectionContainer.appendChild(dialog);

dialog.classList.add("dialog");
dialog.classList.add("hbspt-form");
btnCloseModal.classList.add("btn-close");

// OPEN AND CLOSE MODAL
btn.addEventListener("click", () => {
  dialog.showModal();
  setTimeout(() => {
    dialog.classList.add("open");
  }, 10);

  updateProgress();
});

btnCloseModal.addEventListener("click", () => {
  dialog.classList.remove("open");
  setTimeout(() => {
    dialog.close();
  }, 300);
});

dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  dialog.classList.remove("open");
  setTimeout(() => {
    dialog.close();
  }, 300);
});

// FORM
// PROGRESS BAR
const stepsContent = [
  '<i class="fa-regular fa-user"></i>User Information',
  '<i class="fa-regular fa-circle-question"></i>Inquiry',
  '<i class="fa-regular fa-face-smile"></i>Complete',
];

const progressContainer = document.createElement("div");
const progress = document.createElement("div");
const progressSteps = document.createElement("ol");
for (let i = 0; i < 3; i++) {
  const li = document.createElement("li");
  li.classList.add("progress-steps");

  li.innerHTML = stepsContent[i];

  progressSteps.appendChild(li);
}

//FORM NAVIGATION
const formBtnContainer = document.createElement("div");
const formPrevBtn = document.createElement("button");
const formNextBtn = document.createElement("button");
const prevDiv = document.createElement("div");
const nextDiv = document.createElement("div");

formPrevBtn.textContent = "Prev";
formNextBtn.textContent = "Next";

formBtnContainer.classList.add("form-nav-container");
formPrevBtn.classList.add("form-nav-prev");
formNextBtn.classList.add("form-nav-next");
progressContainer.classList.add("progress-container");
progress.classList.add("progress");

progressContainer.appendChild(progress);
progressContainer.appendChild(progressSteps);
prevDiv.appendChild(formPrevBtn);
nextDiv.appendChild(formNextBtn);
formBtnContainer.appendChild(prevDiv);
formBtnContainer.appendChild(nextDiv);
dialog.appendChild(formBtnContainer);

dialog.prepend(progressContainer);

// FORM VIEWS
const formStep1 = document.createElement("div");
const formStep2 = document.createElement("div");
const formStep3 = document.createElement("div");
const thankTitle = document.createElement("h3");
const thankPara = document.createElement("p");
const formContainer = document.createElement("div");

formContainer.classList.add("form-container");
formStep1.classList.add("form-step");
formStep2.classList.add("form-step");
formStep3.classList.add("form-step");

thankTitle.textContent = "Thank you!";
thankPara.textContent =
  "Thank you for reaching out! We'll get back to you shortly.";

// CREATE FORM STEPS
for (let i = 0; i < 2; i++) {
  formStep1.appendChild(form.childNodes[0]);
}

for (let i = 0; i <= form.childNodes.length; i++) {
  formStep2.appendChild(form.childNodes[0]);
}

formStep3.appendChild(thankTitle);
formStep3.appendChild(thankPara);

formContainer.appendChild(formStep1);
formContainer.appendChild(formStep2);
formContainer.appendChild(formStep3);

form.appendChild(formContainer);

let currentStep = 0;
const steps = formContainer.childNodes;

// FORM NAVIGATION FUNCTIONALITY
const updateProgress = () => {
  let progressWidth = currentStep / (progressSteps.childNodes.length - 1);
  progress.style.transform = `scaleX(${progressWidth})`;

  //dynamic sizing for form views
  formContainer.style.height = steps[currentStep].offsetHeight + "px";

  //progress tracking
  progressSteps.childNodes.forEach((step, index) => {
    step.classList.toggle("step-current", currentStep === index);
    step.classList.toggle("step-done", currentStep > index);
  });

  // FORM PAGE UPDATE
  steps.forEach((step, index) => {
    step.style.transform = `translateX(-${currentStep * 100}%)`;
    step.classList.toggle("step-current", currentStep === index);
  });
  if (currentStep === 1) {
    formNextBtn.style.display = "none";
    formPrevBtn.style.display = "block";
  } else if (currentStep === 2) {
    formNextBtn.style.display = "none";
    formPrevBtn.style.display = "none";
  } else {
    formNextBtn.style.display = "block";
    formPrevBtn.style.display = "none";
  }
  updateButtons();
};

// FORM NAVIGATION BUTTONS
const updateButtons = () => {
  formPrevBtn.hidden = currentStep === 0;
  formNextBtn.hidden = currentStep >= progressSteps.childNodes.length - 1;
};

formPrevBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentStep > 0) {
    currentStep--;
  }
  updateProgress();
});

formNextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isValidStep()) return;

  if (currentStep < progressSteps.childNodes.length - 1) {
    currentStep++;
  }
  updateProgress();
});

// FORM VALIDATION
const submitBtn = document.querySelector("input.hs-button");

const isValidStep = () => {
  const fields = steps[currentStep].querySelectorAll(
    "input[name='firstname'], input[name='lastname'], input[name='email'], textarea"
  );

  return [...fields].every((field) => field.reportValidity());
};

// THANK YOU PAGE
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formNextBtn.style.display = "block";
  currentStep++;
  updateProgress();
});

dialog.addEventListener("close", () => {
  if (currentStep === steps.length - 1) currentStep = 0;
  updateProgress();
});
