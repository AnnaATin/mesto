import '../pages/index.css';

import {
  initialCards,
  placeEdit,
  profileEdit,
  profileNameSelector,
  profileAboutSelector,
  validationRule,
  profileEditButtonElement,
  profileAddButtonElement,
} from '../scripts/utils/constans.js'

import Card from '../scripts/components/Card'
import FormValidator from '../scripts/components/FormValidator.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import Section from '../scripts/components/Section.js'
import UserInfo from '../scripts/components/UserInfo.js'


// UserInfo с формы
const userInfo = new UserInfo({
  name: profileNameSelector,
  description: profileAboutSelector
});

//Для сохранения с Profile inf
const handleProfileFormSubmit = (userData) => {
  userInfo.setUserInfo(userData);
  popupProfileEdit.close();
};

//Создаем popup с Profile inf
const popupProfileEdit = new PopupWithForm(
  '.popup_profile-edit',
  handleProfileFormSubmit,
);
popupProfileEdit.setEventListeners();


//Для сохранения с Place edit
const handleCardFormSubmit = ({'placename': name, 'imglink': link}) => {
  prependCard({name , link} );
  formValidators[placeEdit.name].resetValidation();
  popupPlaceEdit.close();
};


//Создаем popup с Place edit
const popupPlaceEdit = new PopupWithForm(
  '.popup_place-edit',
  handleCardFormSubmit
)
popupPlaceEdit.setEventListeners();


//Открываем popup с картинкой
const handleCardClick = (name, link) => {
  popupImg.open(name, link);
}

const popupImg = new PopupWithImage('.popup_open-image');
popupImg.setEventListeners();


//Создание карточки с картинкой
const createCard = (name, link) => {
  const cardElementTemplate = new Card({name, link}, '#elements-template', handleCardClick);
  const cardElement = cardElementTemplate.createCard();
  return cardElement;
}


const prependCard = ({ name, link }) => {
  const cardElementTemplate = createCard(name, link)
  initialCardList.addItem(cardElementTemplate)
}

//Создание секции с карточкой
const initialCardList = new Section(
  {
    items: initialCards,
    renderer: prependCard,
  },
  '.elements',
)
initialCardList.render();


//Открываем popup с Profile inf и заполняем его перед открытием
profileEditButtonElement.addEventListener('click', _ => {
  const userData = userInfo.getUserInfo()
  popupProfileEdit.setInputValues(userData);
  formValidators[profileEdit.name].resetValidation();
  popupProfileEdit.open();
})

//Открываем popup с Place inf
profileAddButtonElement.addEventListener('click', () => {
  formValidators[placeEdit.name].resetValidation();
  popupPlaceEdit.open();
})


const formValidators = {};
const validation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const { name } = formElement;
    formValidators[name] = validator;
    validator.enableValidation();
  });
}

validation(validationRule);
