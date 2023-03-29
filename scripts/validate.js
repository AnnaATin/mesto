const validationRule = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'ppopup__input-error_active'
};


const showInputError = (formElement, inputElement, errorMessage, validationRule) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add(validationRule.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationRule.errorClass);
};

const hideInputError = (formElement, inputElement, validationRule) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(validationRule.inputErrorClass);
  errorElement.classList.remove(validationRule.errorClass);
  errorElement.textContent = ' '
};

 const checkInputValidity = (formElement, inputElement, inputSelector) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputSelector);
  } else {
    hideInputError(formElement, inputElement, inputSelector);
  }
};

function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
};

function toggleButtonState (inputList, buttonElement, validationRule){
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationRule.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationRule.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};


function setEventListeners(formElement, validationRule){
  const inputList = Array.from(formElement.querySelectorAll(validationRule.inputSelector));
  const buttonElement = formElement.querySelector(validationRule.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationRule);
  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(formElement, inputElement, validationRule.inputSelector);
    toggleButtonState(inputList, buttonElement, validationRule);
  });
});
};


function enableValidation (validationRule){
  const formList = Array.from(document.querySelectorAll(validationRule.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationRule);
});
};
enableValidation(validationRule);

