import '../pages/index.css';
import { initialCards, createCard, deleteCard, likeCard } from './cards.js';
import { openModal, closeModal, addListenerClosePopup } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const openCardPopup = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

const openCardPopupImg = document.querySelector('.popup__image');
const openCardPopupCaption = document.querySelector('.popup__caption');

const formNewPlace = document.forms['new-place'];
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

initialCards.forEach((item) => {
  cardContainer.append(
    createCard(item, cardTemplate, deleteCard, likeCard, expandCard)
  );
});

function expandCard(cardImage, cardTitle) {
  openCardPopupImg.src = cardImage.src;
  openCardPopupCaption.textContent = cardTitle.textContent;
  openModal(openCardPopup);
}

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  addListenerClosePopup(popup);
});

const fillProfileEditForm = (nameInput, jobInput) => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
};

function submitProfileEdit(evt) {
  evt.preventDefault();
  const profilTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  profilTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileEditPopup);
}

profileEditButton.addEventListener('click', () => {
  openModal(profileEditPopup);
  fillProfileEditForm(nameInput, jobInput);
});

formEditProfile.addEventListener('submit', submitProfileEdit);

function addCard(newCard) {
  cardContainer.prepend(
    createCard(newCard, cardTemplate, deleteCard, likeCard, expandCard)
  );
  closeModal(newCardPopup);
}

function cleanNewCardForm(nameInput, linkInput) {
  nameInput.value = '';
  linkInput.value = '';
}

newCardButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

function submitNewCard(evt) {
  evt.preventDefault();
  const nameInput = formNewPlace.elements['place-name'];
  const linkInput = formNewPlace.elements.link;
  const newCard = {
    name: nameInput.value,
    link: linkInput.value,
  };
  addCard(newCard);
  cleanNewCardForm(nameInput, linkInput);
}

formNewPlace.addEventListener('submit', submitNewCard);