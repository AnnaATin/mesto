let profileEditButtonElement = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let popupSaveButtonElement = popupElement.querySelector('.popup__save-button');
let popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const togglePopupVisibility = function (){
    popupElement.classList.toggle("popup_opened");
};
profileEditButtonElement.addEventListener("click", togglePopupVisibility);

const openPopup = function (){
    popupElement.classList.add("popup_opened");
};

const closePopup = function (){
    popupElement.classList.remove("popup_opened");
};
profileEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

let formElement = document.querySelector('.form');
let profileNameElement = document.querySelector('.profile__name');
let profileDescriptionElement = document.querySelector('.profile__description');
let inputNameElement = document.querySelector('#name');
let inputDescriptionElement = document.querySelector('#description');

let defaultNameTextElement = profileNameElement.textContent;
inputNameElement.value = defaultNameTextElement;

let defaultDescriptionTextElement = profileDescriptionElement.textContent;
inputDescriptionElement.value = defaultDescriptionTextElement;

function handleFormElementSubmit (evt) {
    evt.preventDefault();

    let inputNameTextElement = inputNameElement.value;
    let inputDescriptionTextElement = inputDescriptionElement.value;

    profileNameElement.textContent = inputNameTextElement;
    profileDescriptionElement.textContent = inputDescriptionTextElement;

    closePopup();
}
formElement.addEventListener('submit', handleFormElementSubmit);