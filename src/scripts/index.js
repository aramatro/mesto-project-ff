import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal, addListenerClosePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUser,
  getInitialCards,
  editProfileOnServer,
  addCardToServer,
  editAvatarOnServer,
} from "./api.js";

const cardList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");

const profileEditPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const openCardPopup = document.querySelector(".popup_type_image");
const editAvatarPopup = document.querySelector(".popup_type_avatar");
const popups = document.querySelectorAll(".popup");

const openCardPopupImg = document.querySelector(".popup__image");
const openCardPopupCaption = document.querySelector(".popup__caption");

const formNewPlace = document.forms["new-place"];
const formEditProfile = document.forms["edit-profile"];
const formEditAvatar = document.forms["edit-avatar"];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
let userId = null;

// Настройки валидации и ее вызов

const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationOptions);

// Инициализация проекта данными с сервера

const fillProfile = (userData) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style = `background-image: url(${userData.avatar})`;
  userId = userData._id;
};

const fillInitialCards = (cardsData) => {
  cardsData.forEach((item) => {
    cardList.append(createCard(item, createCardOptions, userId));
  });
};

Promise.all([getUser(), getInitialCards()])
  .then(([userData, cardsData]) => {
    fillProfile(userData);
    fillInitialCards(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

//Карточка по шаблону

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

// Уведомление о процессе загрузки

function renderLoading(isLoading, savePopupButton) {
  if (isLoading) {
    savePopupButton.textContent = "Сохранение...";
  } else {
    savePopupButton.textContent = "Сохранить";
  }
}

// Анимации для всех попапов

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  addListenerClosePopup(popup);
});

// Раскрытие карточки по клику

function expandCard(cardImage, cardTitle) {
  openCardPopupImg.src = cardImage.src;
  openCardPopupImg.alt = `Фотография места: ${cardTitle.textContent}`;
  openCardPopupCaption.textContent = cardTitle.textContent;
  openModal(openCardPopup);
}

// Редактирование профиля

const fillProfileEditForm = (nameInput, jobInput) => {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
};

function editProfile(name, job) {
  const profilTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profilTitle.textContent = name;
  profileDescription.textContent = job;
}

function submitProfileEdit(evt) {
  evt.preventDefault();

  const savePopupButton = formEditProfile.elements["button-edit-profile"];
  renderLoading(true, savePopupButton);

  editProfileOnServer(nameInput.value, jobInput.value)
    .then(() => {
      editProfile(nameInput.value, jobInput.value);
      closeModal(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, savePopupButton);
    });
}

profileEditButton.addEventListener("click", () => {
  openModal(profileEditPopup);
  fillProfileEditForm(nameInput, jobInput);
  clearValidation(formEditProfile, validationOptions);
});

formEditProfile.addEventListener("submit", submitProfileEdit);

// Создание своей карточки

function addCard(newCard) {
  cardList.prepend(createCard(newCard, createCardOptions, userId));
}

newCardButton.addEventListener("click", () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationOptions);
  openModal(newCardPopup);
});

function submitNewCard(evt) {
  evt.preventDefault();

  const savePopupButton = formNewPlace.elements["button-new-card"];
  renderLoading(true, savePopupButton);

  const nameInput = formNewPlace.elements["place-name"];
  const linkInput = formNewPlace.elements.link;
  const newCard = {
    name: nameInput.value,
    link: linkInput.value,
  };
  addCardToServer(newCard)
    .then((res) => {
      addCard(res);
      closeModal(newCardPopup);
      formNewPlace.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, savePopupButton);
    });
}

formNewPlace.addEventListener("submit", submitNewCard);

// Изменение аватарки профиля

profileImage.addEventListener("click", () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationOptions);
  openModal(editAvatarPopup);
});

function editAvatar(linkInput) {
  profileImage.style = `background-image: url("${linkInput.value}")`;
}

function submitEditAvatar(evt) {
  evt.preventDefault();

  const savePopupButton = formEditAvatar.elements["button-edit-avatar"];
  renderLoading(true, savePopupButton);

  const linkInput = formEditAvatar.elements.link;
  editAvatarOnServer(linkInput.value)
    .then(() => {
      editAvatar(linkInput);
      closeModal(editAvatarPopup);
      formEditAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, savePopupButton);
    });
}

formEditAvatar.addEventListener("submit", submitEditAvatar);
