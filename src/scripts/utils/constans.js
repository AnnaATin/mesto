const placeEdit = document.forms['placeEdit'];
const profileEdit = document.forms['profileEdit'];
const avatarEdit = document.forms['avatarEdit'];
const profileNameSelector = '.profile__name';
const profileAboutSelector = '.profile__description';
const profileAvatarSelector = '.profile__avatar';
const templateSelector = '#elements-template';
const elementsContainerSelector = '.elements';
const profilePopupName = document.querySelector('#name');
const profilePopupDescription = document.querySelector('#description');

const validationRule = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: '.popup__input_error',
}

const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');


export{
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
}
