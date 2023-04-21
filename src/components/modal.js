const buttonAddImage = document.querySelector('.profile__add-button');
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const popupAddImage = document.querySelector('.popup_add-image');
const popupEditProfile = document.querySelector('.popup_edit-profile');


function openPopup (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => closePopupByEsc(evt))
  document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup();
    }
  })
}

function closePopupByEsc (evt) {
  if (evt.key == 'Escape') {
    closePopup();
    document.removeEventListener('keydown', (evt) => closePopupByEsc(evt))
  }
}

function closePopup () {
  const popup = document.querySelector('.popup_opened')
  if (popup) {
    popup.classList.remove('popup_opened');
  }
}


export { popupAddImage, popupEditProfile, buttonAddImage, buttonOpenProfilePopup, buttonsClosePopup, openPopup, closePopup  }
