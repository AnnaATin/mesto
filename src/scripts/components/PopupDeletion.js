import Popup from './Popup.js'

export default class PopupDeletion extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__form')

    this._submitButton = this._popupForm.querySelector('.popup__submit')
    this._submitButtonTextContent = this._submitButton.textContent
  }

  setEventListeners() {
    super.setEventListeners()

    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault()
      this._handleSubmitCallback()
    })
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action
  }

  renderLoadingWhileDeleting(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Удаление...'
    } else {
      this._submitButton.textContent = this._submitButtonTextContent
    }
  }
}
