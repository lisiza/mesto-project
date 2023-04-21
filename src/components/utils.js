import { createElement, elementsList } from './card.js';
import { closePopup } from './modal.js';

const currentJob = document.querySelector('.profile__caption');
const currentName = document.querySelector('.profile__name');
const elementForm = document.getElementById('image-add-form');
const inputPlaceImage = elementForm.querySelector('.form__input_el_caption');
const inputPlaceName = elementForm.querySelector('.form__input_el_name');
const formEditProfile = document.getElementById('profile-edit-form');
const inputJob = formEditProfile.querySelector('.form__input_el_caption');
const inputName = formEditProfile.querySelector('.form__input_el_name');


function resetForm (element) {
  const currentForm = element.querySelector('form');
  currentForm.reset();
}

function submitformEditProfile (evt) {
  evt.preventDefault();
  currentName.textContent = inputName.value;
  currentJob.textContent = inputJob.value;
  closePopup();
}

function submitElementForm (evt) {
  evt.preventDefault();
  elementsList.prepend(createElement (inputPlaceImage.value, inputPlaceName.value));
  closePopup();
}


export { elementForm, currentJob, currentName, formEditProfile, inputJob, inputName, resetForm, submitformEditProfile, submitElementForm }
