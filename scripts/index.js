const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;

  const cardImage= cardElement.querySelector('.card__image');
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () =>
    deleteCard(cardElement)
  );

  return cardElement;
};

function deleteCard(item) {
  item.remove();
};

initialCards.forEach((item) => {
  cardContainer.append(createCard(item, deleteCard));
});