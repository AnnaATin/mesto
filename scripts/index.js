import Card from './Card.js'
import FormValidator from './FormValidator.js'
import validationRule from './validate.js'
import initialCards from './initialCards.js'

const profileEditButtonElement = document.querySelector('.profile__edit-button');
const popupProfileEditElement = document.querySelector('.popup_profile-edit');
const profileAddButtonElement = document.querySelector('.profile__add-button');
const popupPlaceEditElement = document.querySelector('.popup_place-edit');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const inputNameElement = document.querySelector('#name');
const inputDescriptionElement = document.querySelector('#description');
const inputPlaceNameElement = document.querySelector('#placename');
const inputImgLinkElement = document.querySelector('#imglink');

const popups = document.querySelectorAll('.popup');


//Добавляем popup_opened к любому popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

//Заполняем popup с Profile inf перед открытием
const openPopupProfileEdit = () => {
  inputNameElement.value = profileNameElement.textContent;
  inputDescriptionElement.value = profileDescriptionElement.textContent;
  openPopup(popupProfileEditElement);
};
//Открываем popup с Profile inf
profileEditButtonElement.addEventListener('click', openPopupProfileEdit);

//2. Форма добавления карточки
const openPopupPLaceAdd = () => {
  openPopup(popupPlaceEditElement);
};
//Открываем popup с Place inf
profileAddButtonElement.addEventListener('click', openPopupPLaceAdd);


//Убираем popup_opened у popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

//ПР6 3. Закрытие попапа кликом на оверлей
const closePopupOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) return;
  closePopup(evt.target);
};
popups.forEach((popup) => popup.addEventListener('click', closePopupOverlay));


//ПР6 4. Закрытие попапа нажатием на Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Устанавливаем обработчик закрытия на крестик
const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Сохраняем значения внесенные в popup Profile
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileNameElement.textContent = inputNameElement.value;
  profileDescriptionElement.textContent = inputDescriptionElement.value;
  closePopup(popupProfileEditElement);
}
popupProfileEditElement.addEventListener('submit', handleProfileFormSubmit);



const elementsList = document.querySelector('.elements');
const popupImgContainer = document.getElementById("popup_open-image");
const modalImg = document.getElementById("popup__image");
const captionText = document.getElementById("popup__caption");
//6. Открытие попапа с картинкой
function openPopupImg(link, name){
  modalImg.src = link;
  modalImg.alt = name;
  captionText.textContent = name;
  openPopup(popupImgContainer);
};

//Создание карточки с картинкой
const createCard = (name, link) => {
  const cardElementTemplate = new Card({name, link}, '#elements-template', openPopupImg);
  const cardElement = cardElementTemplate.createCard();
  return cardElement;
}

const prependCard = ({ name, link }) => {
  const cardElementTemplate = createCard(name, link)
  elementsList.prepend(cardElementTemplate)
}
initialCards.forEach(prependCard)

//3. Добавление карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const dataCard = {name: inputPlaceNameElement.value, link: inputImgLinkElement.value};
  prependCard(dataCard);
  inputPlaceNameElement.value = '';
  inputImgLinkElement.value = '';
  evt.submitter.classList.add('popup__save-button_inactive')
  evt.submitter.disabled = true;
  closePopup(popupPlaceEditElement);
};
popupPlaceEditElement.addEventListener('submit', handleCardFormSubmit);

const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const { name } = formElement;
    formValidators[name] = validator;
    validator.enableValidation();
  });
}

enableValidation(validationRule);
