export function createCard(
  item,
  { cardTemplate, deleteCard, likeCard, expandCard }
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = `Фотография места: ${item.name}`;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () =>
    deleteCard(deleteButton.closest(`.places__item`))
  );

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton));

  cardImage.addEventListener('click', () => expandCard(cardImage, cardTitle));

  return cardElement;
}

export function deleteCard(item) {
  item.remove();
}

export function likeCard(item) {
  item.classList.toggle('card__like-button_is-active');
}