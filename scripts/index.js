const profileEditButtonElement = document.querySelector('.profile__edit-button');
const popupProfileEditElement = document.querySelector('.popup_profile-edit');
const popupPlaceEditElement = document.querySelector('.popup_place-edit');
const popupCloseButtonProfileElement = popupProfileEditElement.querySelector('.popup__close-button');
const popupCloseButtonPlaceElement = popupPlaceEditElement.querySelector('.popup__close-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const placeNameElement = document.querySelector('.elements__grid-text');
const imgLinkElement = document.querySelector('.elements__grid-image');

let inputNameElement = document.querySelector('#name');
let inputDescriptionElement = document.querySelector('#description');
let inputPlaceNameElement = document.querySelector('#placename');
let inputImgLinkElement = document.querySelector('#imglink');


const openPopupProfileEdit = function (){
  inputNameElement.value = profileNameElement.textContent;
  inputDescriptionElement.value = profileDescriptionElement.textContent;
  popupProfileEditElement.classList.add("popup_opened");
};
profileEditButtonElement.addEventListener('click', openPopupProfileEdit);

const closePopupProfileEdit = function (){
  popupProfileEditElement.classList.remove("popup_opened");
};
popupCloseButtonProfileElement.addEventListener('click', closePopupProfileEdit);

function handleFormElementSubmit (evt) {
  evt.preventDefault();

  profileNameElement.textContent = inputNameElement.value;
  profileDescriptionElement.textContent = inputDescriptionElement.value;

  closePopupProfileEdit();
}
popupProfileEditElement.addEventListener('submit', handleFormElementSubmit);


const openPopupPlaceEdit = function (){
  popupPlaceEditElement.classList.add("popup_opened");
};
profileAddButtonElement.addEventListener('click', openPopupPlaceEdit);

const closePopupPlaceEdit = function (){
  popupPlaceEditElement.classList.remove("popup_opened");
};
popupCloseButtonPlaceElement.addEventListener('click', closePopupPlaceEdit);



const elementsList = document.querySelector('.elements');
const initialCardsTemplate = document.querySelector('#elements-template').content;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupImgContainer = document.getElementById("popup_open-image");
const modalImg = document.getElementById("popup__image");
const captionText = document.getElementById("popup__caption");

function handleFormElementPlaceEdit (evt) {
  evt.preventDefault();
  const initialCardElement = initialCardsTemplate.cloneNode(true);

  initialCardElement.querySelector('.elements__grid-text').textContent = inputPlaceNameElement.value;
  initialCardElement.querySelector('.elements__grid-image').src = inputImgLinkElement.value;

  initialCardElement.querySelector('#elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });

  const removeButtonElement = initialCardElement.querySelector('.elements__remove-button');
  removeButtonElement.addEventListener('click', function () {
    const elementsListItem = removeButtonElement.closest('.elements__grid-item');
    elementsListItem.remove();
  });

  initialCardElement.querySelector('#elements__grid-image').addEventListener('click', function (evt) {
    evt.target.classList.toggle(popupImgContainer.style.visibility = "visible", popupImgContainer.style.opacity = "1");
    modalImg.src = inputImgLinkElement.value;
    captionText.textContent = inputPlaceNameElement.value;
  });

  document.querySelector('#popup__close-img').addEventListener('click', function (evt) {
    evt.target.classList.toggle(popupImgContainer.style.visibility = "hidden", popupImgContainer.style.opacity = "0");
  });

  elementsList.prepend(initialCardElement);

  closePopupPlaceEdit();
}
popupPlaceEditElement.addEventListener('submit', handleFormElementPlaceEdit);


initialCards.forEach(function (element) {
  const initialCardElement = initialCardsTemplate.cloneNode(true);
  initialCardElement.querySelector('.elements__grid-text').textContent = element.name;
  initialCardElement.querySelector('.elements__grid-image').src = element.link;

  initialCardElement.querySelector('#elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });

  const removeButtonElement = initialCardElement.querySelector('.elements__remove-button');
  removeButtonElement.addEventListener('click', function () {
    const elementsListItem = removeButtonElement.closest('.elements__grid-item');
    elementsListItem.remove();
  });

  initialCardElement.querySelector('#elements__grid-image').addEventListener('click', function (evt) {
    evt.target.classList.toggle(popupImgContainer.style.visibility = "visible", popupImgContainer.style.opacity = "1");
    modalImg.src = element.link;
    captionText.textContent = element.name;
  });

  document.querySelector('#popup__close-img').addEventListener('click', function (evt) {
    evt.target.classList.toggle(popupImgContainer.style.visibility = "hidden", popupImgContainer.style.opacity = "0");
  });

  elementsList.append(initialCardElement);
});
