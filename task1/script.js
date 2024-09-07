//get form div
// const form = document.querySelector("form");
const body = document.querySelector("body");
const form = document.querySelector(".contact-form__form form");
const sectionContainer = document.querySelector(".contact-form__form");
const contactContent = document.querySelector(".contact-form__content");

//create first section

//Create section elements
const section = document.createElement("section");
const h3 = document.createElement("h3");
const para = document.createElement("p");
const btn = document.createElement("button");
const btnDiv = document.createElement("div");

//Add text
h3.textContent = "Hello Conversion!";
para.textContent = "Click on the button to contact us.";
btn.textContent = "Click Me";

//Add classes
section.classList.add("contact-section");
btnDiv.classList.add("btn-div");
btn.classList.add("section-btn");

//append everything to section
btnDiv.appendChild(btn);
section.appendChild(h3);
section.appendChild(para);
section.appendChild(btnDiv);

// contactContent.insertAdjacentElement("afterend", section);
sectionContainer.appendChild(section);

//glass-wall
const overlayDiv = document.createElement("div");
body.appendChild(overlayDiv);
overlayDiv.classList.add("overlay");

//modal
const dialog = document.createElement("dialog");
const btnCloseModal = document.createElement("button");

btnCloseModal.textContent = "X";
btnCloseModal.setAttribute("aria-label", "Close");

dialog.prepend(btnCloseModal);
dialog.appendChild(form);
sectionContainer.appendChild(dialog);

dialog.classList.add("dialog");
dialog.classList.add("hbspt-form");
btnCloseModal.classList.add("btn-close");

//Open and close modal buttons listeners
btn.addEventListener("click", () => {
  dialog.showModal();

  // progressSteps.childNodes[0].classList.add("step-current");
  updateProgress();
});

btnCloseModal.addEventListener("click", () => {
  dialog.close();
});

// FORM

//progress bar
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

//form navigation
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

//Form steps
//input[name:'firstname'], input[name:'lastname'], input[name:'email'], textarea

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
  "Thank you for reaching out! we'll get back to you shortly.";

form.childNodes[0].appendChild;

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

//Form steps
let currentStep = 0;
const steps = formContainer.childNodes;

const updateProgress = () => {
  let progressWidth = currentStep / (progressSteps.childNodes.length - 1);
  progress.style.transform = `scaleX(${progressWidth})`;

  formContainer.style.height = steps[currentStep].offsetHeight + "px";

  //progress tracking
  progressSteps.childNodes.forEach((step, index) => {
    step.classList.toggle("step-current", currentStep === index);
    step.classList.toggle("step-done", currentStep > index);
  });

  //form page update
  steps.forEach((step, index) => {
    step.style.transform = `translateX(-${currentStep * 100}%)`;
    step.classList.toggle("step-current", currentStep === index);
  });

  updateButtons();
};

const updateButtons = () => {
  formPrevBtn.hidden = currentStep === 0;
  formNextBtn.hidden = currentStep >= progressSteps.childNodes.length - 1;
};

const showForm = (n) => {};

//form buttons event listener
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

// Form validation
const submitBtn = document.querySelector('input[type="submit"]');

const isValidStep = () => {
  const fields = steps[currentStep].querySelectorAll(
    "input[name='firstname'], input[name='lastname'], input[name='email'], textarea"
  );

  return [...fields].every((field) => field.reportValidity());
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
