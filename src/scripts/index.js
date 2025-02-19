import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal, addListenerClosePopup } from './modal.js';

const cardList = document.querySelector('.places__list');

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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const getTemplate = () => {
  return document.querySelector("#card-template").content;
}; 

const cardTemplate = getTemplate();

const createCardOptions = {
  cardTemplate: cardTemplate,
  deleteCard: deleteCard,
  likeCard: likeCard,
  expandCard: expandCard,
};

initialCards.forEach((item) => {
  cardList.append(createCard(item, createCardOptions));
});

function expandCard(cardImage, cardTitle) {
  openCardPopupImg.src = cardImage.src;
  openCardPopupImg.alt = `Фотография места: ${cardTitle.textContent}`;
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
  cardList.prepend(createCard(newCard, createCardOptions));
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
  closeModal(newCardPopup);
  formNewPlace.reset();
}

formNewPlace.addEventListener('submit', submitNewCard);