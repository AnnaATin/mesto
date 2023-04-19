class Card{
  constructor(dataCard, templateSelector, openPopupImg){
    this._link = dataCard.link;
    this._name = dataCard.name;
    this._templateSelector = templateSelector;
    this._openPopupImg = openPopupImg;
  }

  _createTemplate(){
    const cardElement = document
    .querySelector(this._templateSelector).content
    .cloneNode(true)

    return cardElement
  }

  createCard(){
    this._cardElement = this._createTemplate();

    this._cardImg = this._cardElement.querySelector('.elements__grid-image');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardText = this._cardElement.querySelector('.elements__grid-text');
    this._cardText.textContent = this._name;

    this._removeButton = this._cardElement.querySelector('.elements__remove-button');
    this._likeButton = this._cardElement.querySelector('.elements__like-button');

    this._addEventListeners();

    return this._cardElement;
  }

  _handleOpenPopupImg = (evt) => {
    this._openPopupImg(this._link, this._name);
  }

  _handleRemove(evt){
    evt.target.closest('.elements__grid-item').remove();
  }

  _handleLike(evt){
    evt.target.classList.toggle('elements__like-button_active');
  }

  _addEventListeners(){
    this._cardImg.addEventListener('click', this._handleOpenPopupImg);

    this._removeButton.addEventListener('click', this._handleRemove);

    this._likeButton.addEventListener('click', this._handleLike);
  }

}

export default Card
