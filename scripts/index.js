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


//1. Шесть карточек «из коробки»
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

//4. Лайк карточки
const activateLikeButton = (evt) => {
  evt.target.classList.toggle('elements__like-button_active');
};

//5. Удаление карточки
const removeCard = (evt) => {
  const chosenCard = evt.target.closest('.elements__grid-item');
  chosenCard.remove();
};

const popupImgContainer = document.getElementById("popup_open-image");
const modalImg = document.getElementById("popup__image");
const captionText = document.getElementById("popup__caption");
//6. Открытие попапа с картинкой
const openPopupImg = (name, link) => {
  modalImg.src = link;
  modalImg.alt = name;
  captionText.textContent = name;
  openPopup(popupImgContainer);
};

//Создание каждой карточки с картинкой
function createCard(item) {
  const initialCardElement = initialCardsTemplate.cloneNode(true);
  const cardImg = initialCardElement.querySelector('.elements__grid-image');
  const cardText = initialCardElement.querySelector('.elements__grid-text');
  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardText.textContent = item.name;
  cardImg.addEventListener('click', () => openPopupImg(item.name, item.link));
  const removeButton = initialCardElement.querySelector('.elements__remove-button');
  removeButton.addEventListener('click', removeCard);
  const likeButton = initialCardElement.querySelector('.elements__like-button');
  likeButton.addEventListener('click', activateLikeButton);
  return initialCardElement;
}

//3. Добавление карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const element = {name: inputPlaceNameElement.value, link: inputImgLinkElement.value}
  const initialCardElement = createCard(element)
  elementsList.prepend(initialCardElement);
  inputPlaceNameElement.value = '';
  inputImgLinkElement.value = '';
  evt.submitter.classList.add('popup__save-button_inactive')
  evt.submitter.disabled = true;
  closePopup(popupPlaceEditElement);
};
popupPlaceEditElement.addEventListener('submit', handleCardFormSubmit);


//Вывод всего массива сразу
initialCards.forEach(function (element) {
  const initialCardElement = createCard(element)
  elementsList.append(initialCardElement);
});
