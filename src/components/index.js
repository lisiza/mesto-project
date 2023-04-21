import { elementsList, moveToTrash, toggleLike, openImage, addElements } from './card.js';
import { enableValidation } from './validate.js';
import { buttonAddImage, popupAddImage, popupEditProfile, buttonOpenProfilePopup, buttonsClosePopup, openPopup, closePopup } from './modal.js';
import { elementForm, formEditProfile, inputJob, inputName, resetForm, submitformEditProfile, submitElementForm, currentJob, currentName } from './utils.js';
import { initialCards } from './data.js';


addElements(initialCards);
enableValidation();


elementsList.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('element__like-button')) {
    toggleLike(evt.target);
  }
})

elementsList.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('element__trash-button')) {
    const elementToTrash = evt.target.closest('li');
    moveToTrash(elementToTrash);
  }
})

elementsList.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('element__image')) {
    const image = evt.target.src;
    const title = evt.target.title;
    openImage(image, title);
  }
})

buttonOpenProfilePopup.addEventListener('click', () => {
  inputName.value = currentName.textContent;
  inputJob.value = currentJob.textContent;
  resetForm(popupEditProfile);
  openPopup(popupEditProfile);
})

buttonAddImage.addEventListener('click', () => {
  resetForm(popupAddImage);
  openPopup(popupAddImage);
});


buttonsClosePopup.forEach(buttonClosePopup =>
  buttonClosePopup.addEventListener('click', (evt) => {
    // const popupOpened = document.querySelector('.popup_opened');
    closePopup();
  }));


formEditProfile.addEventListener('submit', (evt) => submitformEditProfile(evt));
elementForm.addEventListener('submit', (evt) => submitElementForm(evt));
