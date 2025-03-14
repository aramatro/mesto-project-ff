import {deleteCardFromServer, addLike, removeLike} from './api.js';

export function createCard(
  item,
  { cardTemplate, deleteCard, likeCard, expandCard},
  userId
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikes = cardElement.querySelector('.likes-counter');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = `Фотография места: ${item.name}`;
  cardLikes.textContent = item.likes.length;

  if (item.owner._id === userId) {
    deleteButton.addEventListener('click', () =>
      deleteCard(deleteButton.closest(`.places__item`), item._id)
    );
  } else {
    deleteButton.classList.add('hidden');
  }

  const likeButton = cardElement.querySelector('.card__like-button');

  if (item.likes.find(item => item._id === userId) !== undefined) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => likeCard(likeButton, item, cardLikes));

  cardImage.addEventListener('click', () => expandCard(cardImage, cardTitle));

  return cardElement;
}

export function deleteCard(card, cardId) {
  card.remove();
  deleteCardFromServer(cardId);
}

export function likeCard(cardLocal, cardFromServer, cardLikesLocal) {
  if (cardLocal.classList.contains('card__like-button_is-active')) {
    cardLocal.classList.remove('card__like-button_is-active');
    removeLike(cardFromServer._id)
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .then((res) => {
      cardLikesLocal.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    cardLocal.classList.add('card__like-button_is-active');
    addLike(cardFromServer._id)
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .then((res) => {
      cardLikesLocal.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}