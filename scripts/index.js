let profileEditButtonElement = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const togglePopupVisibility = function (){
    popupElement.classList.toggle("popup_opened");
};
profileEditButtonElement.addEventListener("click", togglePopupVisibility);

const openPopup = function (){
    inputNameElement.value = profileNameElement.textContent;
    inputDescriptionElement.value = profileDescriptionElement.textContent;
    popupElement.classList.add("popup_opened");
};

const closePopup = function (){
    popupElement.classList.remove("popup_opened");
};
profileEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__form');
let profileNameElement = document.querySelector('.profile__name');
let profileDescriptionElement = document.querySelector('.profile__description');
let inputNameElement = document.querySelector('#name');
let inputDescriptionElement = document.querySelector('#description');

function handleFormElementSubmit (evt) {
    evt.preventDefault();

    profileNameElement.textContent = inputNameElement.value; 
    profileDescriptionElement.textContent = inputDescriptionElement.value;

    closePopup();
}
formElement.addEventListener('submit', handleFormElementSubmit);