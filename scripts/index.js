const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

function createCard(item, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () =>
    deleteCard(deleteButton.closest(`.places__item`))
  );

  return cardElement;
};

function deleteCard(item) {
  item.remove();
};

initialCards.forEach((item) => {
  cardContainer.append(createCard(item, deleteCard));
});