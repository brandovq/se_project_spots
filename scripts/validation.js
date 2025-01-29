const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`); //To identify the id on the span tag I created the variable "errorMsgEl" and selected it from the DOM, then I added a template literal by making sure to add the # for the identifier followed by the a template literal (`#${`  }-error` . Adding {inputEl.id}-error inside (which refers to all the inputs). Remembering to add the -error afterwards and closing the template literal with the backtick. The template literal and all this code is for the error message to show up. Then all I had to do was add ID's to all of them to identify the error message and have it show / hide somewhere.
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add("modal__input_type_error");
};
//Just an important good to know: make sure to make the span tag's ID in my html is the same as the id for the input for Name, Description, image link, and caption to make validation work. ALSO, MAKE SURE TO NOT FORGET THE -error afterthe name for the ID in the span which is for the error message or else the error message won't show up!!

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`); //To identify the id on the span tag I created the variable "errorMsgEl" and selected it from the DOM, then I added a template literal by making sure to add the # for the identifier followed by the a template literal (`#${`  }-error` . Adding {inputEl.id}-error inside. Remembering to add the -error afterwards and closing the template literal with the backtick.
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__button");

  // toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      // toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();
