class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    console.log(errorElement);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement, inputSelector) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        inputSelector,
      )
    } else {
      this._hideInputError(inputElement, inputSelector)
    }
  }

  _hasInvalidInput() {
    return [...this._inputList].some((input) => !input.validity.valid)
  }

  _toggleButtonState({ inactiveButtonClass }) {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners({ inputSelector, submitButtonSelector, ...rest }) {
    this._inputList = this._formElement.querySelectorAll(inputSelector);
    this._buttonElement = this._formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(rest);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, inputSelector);
        this._toggleButtonState(rest);
      })
    })
  }

  enableValidation() {
    this._setEventListeners(this._validationSettings)
  }
}

export default FormValidator
