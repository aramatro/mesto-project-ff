const pressKey = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};

const togglePopup = (modal) => {
  modal.classList.toggle('popup_is-opened');
};

export const openModal = (modal) => {
  togglePopup(modal);
  document.addEventListener('keydown', pressKey);
};

export const closeModal = (modal) => {
  togglePopup(modal);
  document.removeEventListener('keydown', pressKey);
};

export const addListenerClosePopup = (modal) => {
  const xButtonPopup = modal.querySelector('.popup__close');
  xButtonPopup.addEventListener('click', () => {
    togglePopup(modal);
  });
  modal.addEventListener('mousedown', (evt) => {
    if (!evt.target.closest('.popup__content')) {
      togglePopup(modal);
    }
  });
};