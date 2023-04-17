const buttonAddImage = document.querySelector('.profile__add-button');
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const currentJob = document.querySelector('.profile__caption');
const currentName = document.querySelector('.profile__name');
const elementForm = document.getElementById('image-add-form');
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.getElementById('element-template');
const formEditProfile = document.getElementById('profile-edit-form');
const iconToTrash = document.querySelector('.element__trash-button');
const inputJob = formEditProfile.querySelector('.form__input_el_caption');
const inputName = formEditProfile.querySelector('.form__input_el_name');
const inputPlaceImage = elementForm.querySelector('.form__input_el_caption');
const inputPlaceName = elementForm.querySelector('.form__input_el_name');
const like = document.querySelector('.element__like-button');
const popupAddImage = document.querySelector('.popup_add-image');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupViewImage = document.querySelector('.popup_view-image');
const popupViewImageImage = document.querySelector('.popup__image');
const popupViewImageTitle = document.querySelector('.popup__title');


function openPopup (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => closePopupByEsc(evt))
  document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup();
    }
  })
}

function closePopupByEsc(evt) {
  if (evt.key == 'Escape') {
    closePopup();
    document.removeEventListener('keydown', (evt) => closePopupByEsc(evt))
  }
}

function closePopup () {
  popup = document.querySelector('.popup_opened')
  if (popup) {
    popup.classList.remove('popup_opened');
  }
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


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input_error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_error');
  errorElement.classList.remove('form__input_error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  setEventListeners(formElement);
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('form__button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__button_inactive');
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

enableValidation();


