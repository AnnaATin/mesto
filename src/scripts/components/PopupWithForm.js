import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor(popupSelector, handleProfileFormSubmit) {
    super(popupSelector);
    this._handleProfileFormSubmit = handleProfileFormSubmit.bind(this);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._newValues = {};
    this._inputList.forEach((inputElement) => {
      this._newValues[inputElement.name] = inputElement.value;
    });
    return this._newValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setInputValues(data) {
    this._inputList.forEach((inputElement) => {
      inputElement.value = data[inputElement.name]
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._getInputValues();
      this._handleProfileFormSubmit(this._newValues);
    });
  }
}
