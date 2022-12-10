const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const forms = document.querySelectorAll('.form')
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


//универсальный (ну, почти) открыватель попапов
function openPopup (element) {
  element.classList.add('popup_opened');
  if (element == popupEditProfile) {
    inputName.placeholder = currentName.textContent; //вписываем в плейсхолдер текущее имя
    inputJob.placeholder = currentJob.textContent; //вписываем в плейсхолдер текущую профессию
  }
  if (element == popupAddImage || element == popupEditProfile) {
    const currentForm = element.querySelector('form');
    currentForm.reset();
  }
}

//универсальный закрыватель попапов
function closePopup (element) {
  const targetPopup = element.target.parentNode.parentNode;
  targetPopup.classList.remove('popup_opened');
}

//универсальный обработчик форм
function submitForm(evt) {
  evt.preventDefault();
  if (evt.target == formEditProfile) {
    currentName.textContent = inputName.value; //записываем в профиль введенное имя
    currentJob.textContent = inputJob.value; //записываем в профиль введенную профессию
  } else if (evt.target == elementForm) {
    elementsList.prepend(createElement (inputPlaceImage.value, inputPlaceName.value))
  }
  evt.target.parentNode.parentNode.classList.remove('popup_opened');
}


//генератор фотографий на странице при открытии
function addElements (arr) {
  arr.forEach( function (element) {
    elementsList.append(createElement (element.link, element.name))
  })
}

//функция, создающая одну новую фоточку
function createElement (image, title) {
  const newElement = elementTemplate.content.cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  const elementTitle = newElement.querySelector('.element__title');

  elementImage.src = image;
  elementTitle.textContent = title;
  elementImage.setAttribute('alt', "Фото, добавленное пользователем: " + title);

  const like = newElement.querySelector('.element__like-button'); //добавляем возможность лайкать эту фоточку
  like.addEventListener('click', () => like.classList.toggle('element__like-button_active'));

  const moveToTrash = newElement.querySelector('.element__trash-button'); //добавляем возможность удалить эту фоточку
  moveToTrash.addEventListener('click', () => moveToTrash.parentNode.parentNode.remove()) //удаляем прародителя, иначе в гриде будут дырки

  elementImage.addEventListener('click', () => {
    openPopup(popupViewImage); //открываем картинку на весь экран по клику
    popupViewImageImage.src = elementImage.src; //и передаем в попап изображение, по которому кликнули
    popupViewImageTitle.textContent = elementTitle.textContent; //и его название
  });

  return newElement
};


buttonOpenProfilePopup.addEventListener('click', () => openPopup(popupEditProfile));
//мне тоже не нравится, что две очень похожие функции, но как их объединить не придумала
buttonAddImage.addEventListener('click', () => openPopup(popupAddImage));

buttonsClosePopup.forEach(buttonClosePopup => buttonClosePopup.addEventListener('click', (evt) => closePopup(evt)));


forms.forEach (function (form) {
  form.addEventListener('submit', submitForm)
})


//заполняем страницу фотографиями при открытии
addElements(initialCards);
