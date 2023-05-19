import '../pages/index.css';

import {
  placeEdit,
  profileEdit,
  avatarEdit,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  templateSelector,
  elementsContainerSelector,
  profilePopupName,
  profilePopupDescription,
  validationRule,
  profileEditButtonElement,
  profileAddButtonElement,
  avatarEditButton,
} from '../scripts/utils/constans.js'

import Api from '../scripts/components/Api.js'
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupDeletion from '../scripts/components/PopupDeletion.js'
import Section from '../scripts/components/Section.js'
import UserInfo from '../scripts/components/UserInfo.js'


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '6292d62a-29b0-4b08-9705-e346ec49902c',
    'Content-Type': 'application/json'
  }
});

// UserInfo с формы
const userInfo = new UserInfo({
  name: profileNameSelector,
  description: profileAboutSelector,
  avatar: profileAvatarSelector
});

const popupProfileEdit = new PopupWithForm(
  '.popup_profile-edit', newValues => {
  popupProfileEdit.renderLoading(true)
  api.setUserInfoByApi(newValues)
    .then((userData) => {
      userInfo.setUserInfo(userData)
      popupProfileEdit.close()
    })
    .catch((err) => console.log(err))
    .finally( _ => popupProfileEdit.renderLoading(false))
})
popupProfileEdit.setEventListeners()


const popupAvatarEdit = new PopupWithForm(
  '.popup_avatar-edit', newValues => {
  popupAvatarEdit.renderLoading(true)
  api.handleUserAvatar(newValues)
    .then((data) => {
      userInfo.setUserInfo(data)
      popupAvatarEdit.close()
    })
    .catch((err) => console.log(err))
    .finally( _ => popupAvatarEdit.renderLoading(false))
})
popupAvatarEdit.setEventListeners()


const popupPlaceEdit = new PopupWithForm(
  '.popup_place-edit', newValues => {
    popupPlaceEdit.renderLoading(true)
  api.addCard(newValues)
    .then((data) => {
      const card = createCard(data)
      initialCardList.addItem(card)
      popupPlaceEdit.close()
    })
    .catch((err) => console.log(err))
    .finally( _ => popupPlaceEdit.renderLoading(false))
})
popupPlaceEdit.setEventListeners()

const popupImg = new PopupWithImage('.popup_open-image');
popupImg.setEventListeners();

const popupDeleteCard = new PopupDeletion('.popup_submit-delete');
popupDeleteCard.setEventListeners();

//Создание карточки с картинкой
const createCard = (data) => {
  const card = new Card
  ({
    data: data,
    handleCardClick: _ => popupImg.open(data),
    handleLikeClick: _ => card.handleLike(),
    handleSubmitDelete: _ => {
      popupDeleteCard.setSubmitAction( _ => {
        popupDeleteCard.renderLoadingWhileDeleting(true)
        api.deleteCard(data._id)
          .then( _ => {
            card.handleRemove()
            popupDeleteCard.close()
          })
          .catch((err) => console.log(err))
          .finally( _ => popupDeleteCard.renderLoadingWhileDeleting(false))
      })
      popupDeleteCard.open()
    }
  },
  templateSelector, api, userId
  )
  const cardElement = card.renderCard()
  return cardElement

}

//Создание секции с карточкой
const initialCardList = new Section( {
  renderer: item => {
    const card = createCard(item)
    initialCardList.addItem(card)
  } }, elementsContainerSelector)


//Открываем popup с Profile inf и заполняем его перед открытием
profileEditButtonElement.addEventListener('click', _ => {
  const userData = userInfo.getUserInfo();
  profilePopupName.value = userData.name;
  profilePopupDescription.value = userData.about;
  formValidators[profileEdit.name].resetValidation();
  popupProfileEdit.open();
})

//Открываем popup с Place inf
profileAddButtonElement.addEventListener('click', _ => {
  formValidators[placeEdit.name].resetValidation();
  popupPlaceEdit.open();
})

//Открываем popup с Avatar
avatarEditButton.addEventListener('click', _ => {
  formValidators[avatarEdit.name].resetValidation();
  popupAvatarEdit.open();
})


//Правила валидации
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


// Возвращаем результат
let userId

api.getAllData()
  .then(( [cards, userData] ) => {
    userInfo.setUserInfo(userData)
    userId = userData._id
    initialCardList.render(cards)
  })
  .catch((err) => console.log(err))
