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
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = this._submitButtonTextContent
    }
  }
}



/*
export default class PopupDeletion extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector)
    this._deleteCard = deleteCard
    this._submitButton = this._popup.querySelector('.popup__submit')
    this._cardToRemove = null
  }

  open(cardToRemove, id) {
    super.open()
    this._cardToRemove = cardToRemove
    this._id = id
  }

  setEventListeners() {
    super.setEventListeners()
    this._submitButton.addEventListener('click', (evt) => {
      this._deleteCard(this._id, this._cardToRemove, evt.target)
    })
  }
}
*/
