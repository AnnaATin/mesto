class Card{
  constructor( {data, handleLikeClick, handleSubmitDelete, handleCardClick}, templateSelector, api, userId){
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._templateSelector = templateSelector;

    this._handleLikeClick = handleLikeClick;
    this._handleSubmitDelete = handleSubmitDelete;
    this._handleCardClick = handleCardClick;

    this._api = api;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
  }

  _getTemplate(){
    this._cardElement = document
    .querySelector(this._templateSelector).content
    .querySelector('.elements__grid-item')
    .cloneNode(true)
  }

  renderCard(){
    this._getTemplate();
    this._addEventListeners();

    this._cardImg = this._cardElement.querySelector('.elements__grid-image');
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardText = this._cardElement.querySelector('.elements__grid-text');
    this._cardText.textContent = this._name;
    this._likesCount = this._cardElement.querySelector('.elements__like-count');
    this._likesCount.textContent = this._likes.length;

    if(!(this._ownerId === this._userId)) {
      this._removeButton.style.display = 'none'
    }

    if(this._likes.find((obj) => this._userId === obj._id)) {
      this._likeButton.classList.add('elements__like-button_active')
    }

    return this._cardElement;

  }

  _addEventListeners(){
    this._removeButton = this._cardElement.querySelector('.elements__remove-button');
    this._likeButton = this._cardElement.querySelector('.elements__like-button');

    this._cardElement.querySelector('.elements__grid-image').
    addEventListener('click', () => {this._handleCardClick(
      {
        name: this._name,
        src: this._link
      }
    )});

    this._removeButton.addEventListener('click', () => this._handleSubmitDelete());

    this._likeButton.addEventListener('click', () => this._handleLikeClick())
  }

  handleRemove () {
    this._cardElement.remove();
    this._cardElement = null;
  }

  handleLike() {
    if(!(this._likeButton.classList.contains('elements__like-button_active'))) {
      this._api.like(this._id)
        .then((data) => {
          this._likeButton.classList.add('elements__like-button_active');
          this._likesCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      this._api.deleteLike(this._id)
        .then((data) => {
          this._likeButton.classList.remove('elements__like-button_active');
          this._likesCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

export default Card
