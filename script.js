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

function createElement (image, title) {
  const newElement = elementTemplate.content.cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  const elementTitle = newElement.querySelector('.element__title');

  elementImage.src = image;
  elementTitle.textContent = title;
  elementImage.setAttribute('alt', "Фото, добавленное пользователем: " + title);

  const like = newElement.querySelector('.element__like-button');
  like.addEventListener('click', () => toggleLike(like));

  const iconToTrash = newElement.querySelector('.element__trash-button');
  iconToTrash.addEventListener('click', () => {
    elementToTrash = iconToTrash.closest('li');
    moveToTrash(elementToTrash);
  })

  elementImage.addEventListener('click', () => {
    popupViewImageImage.src = elementImage.src;
    popupViewImageTitle.textContent = elementTitle.textContent;
    openPopup(popupViewImage);
  });

  return newElement
};


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
