const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formEditProfile = document.getElementById('profile-edit-form');
const inputName = formEditProfile.querySelector('.form__input_el_name');
const inputJob = formEditProfile.querySelector('.form__input_el_caption');
const currentName = document.querySelector('.profile__name');
const currentJob = document.querySelector('.profile__caption');
const buttonAddImage = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('.popup_add-image');
const popupViewImage = document.querySelector('.popup_view-image');
const popupViewImageImage = document.querySelector('.popup__image');
const popupViewImageTitle = document.querySelector('.popup__title');
const elementTemplate = document.getElementById('element-template');
const elementsList = document.querySelector('.elements__list');
const elementForm = document.getElementById('image-add-form');
const inputPlaceName = elementForm.querySelector('.form__input_el_name');
const inputPlaceImage = elementForm.querySelector('.form__input_el_caption');
const like = document.querySelector('.element__like-button');
const iconToTrash = document.querySelector('.element__trash-button');


function openPopup (element) {
  element.classList.add('popup_opened');
}

function closePopup () {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
}

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


function addElements (arr) {
  arr.forEach( function (element) {
    elementsList.append(createElement (element.link, element.name))
  })
}

function moveToTrash (element) {
  element.remove();
}

function toggleLike (element) {
  element.classList.toggle('element__like-button_active');
}

function openImage (image, title) {
  popupViewImageImage.src = image;
  popupViewImageTitle.textContent = title;
  openPopup(popupViewImage);
}

function createElement (image, title) {
  const newElement = elementTemplate.content.cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  const elementTitle = newElement.querySelector('.element__title');

  elementImage.src = image;
  elementTitle.textContent = title;

  elementImage.setAttribute('alt', "Фото, добавленное пользователем: " + title);
  elementImage.setAttribute('title', title);

  return newElement
};


elementsList.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('element__like-button')) {
    toggleLike(evt.target);
  }
})

elementsList.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('element__trash-button')) {
    elementToTrash = evt.target.closest('li');
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
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }));


formEditProfile.addEventListener('submit', (evt) => submitformEditProfile(evt));
elementForm.addEventListener('submit', (evt) => submitElementForm(evt));


addElements(initialCards);
