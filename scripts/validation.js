const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`); //To identify the id on the span tag I created the variable "errorMsgEl" and selected it from the DOM, then I added a template literal by making sure to add the # for the identifier followed by the a template literal (`#${`  }-error` . Adding {inputEl.id}-error inside (which refers to all the inputs). Remembering to add the -error afterwards and closing the template literal with the backtick. The template literal and all this code is for the error message to show up. Then all I had to do was add ID's to all of them to identify the error message and have it show / hide somewhere.
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
  console.log(config);
};
//Just an important good to know: make sure to make the span tag's ID in my html is the same as the id for the input for Name, Description, image link, and caption to make validation work. ALSO, MAKE SURE TO NOT FORGET THE -error afterthe name for the ID in the span which is for the error message or else the error message won't show up!!

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`); //To identify the id on the span tag I created the variable "errorMsgEl" and selected it from the DOM, then I added a template literal by making sure to add the # for the identifier followed by the a template literal (`#${`  }-error` . Adding {inputEl.id}-error inside. Remembering to add the -error afterwards and closing the template literal with the backtick.
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  // console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const disableButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

//OPTIONAL (resetValidation function below was OPTIONAL)
const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector)); //I removed the hard coded string inside the (), which was .modal__input, and I specified the parameter (from the config object. From const settings down below)
  const buttonElement = formEl.querySelector(config.submitButtonSelector); // Same thing as the above line was done here. I removed hard code string which was ".modal__submit-btn" in this case and added config.submitButtonSelector which is from the object down below. I can test out random names after config... to see if its right or not. If the error message doesn't activate then it means the code is wrong.

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//config is an arbitrary name in this case but not settings. We need to pass settings an an argument on enableValidation
const enableValidation = (config) => {
  // console.log(config.formSelector);
  const formList = document.querySelectorAll(config.formSelector); //Here we used config.modal__formSelector in this case. A property from the const Settings below.
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};
//(GOOD TO KNOW!): the the two lines of code above, I passed config as a parameter for the settings object its the same thing, just that in index.js I'm referring to it as settings not config. Same thing I'm just refferring to the object directly. config is the parameter to the whole enable Validation which I can use a parameter in validation.js to be able to refer to the settings object as a parameter as well.
//settings is the object in index.js.
//config is just the name of the parameter used in validation.js.
// You can rename config to settings inside validation.js for consistency, but it's not required.
//SO REMEMBER this important step I did in Sprint 6: I used the settings object in all functions by removing the hard coded strings for classes in them and running the config parameter which refers to the settings object in validation.js. In index.js, I'm referring to the object directly as "settings"
enableValidation(settings);
