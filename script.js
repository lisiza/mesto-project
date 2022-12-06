const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup-edit-profile');
const popupEditProfileCloseButton = document.querySelector('.popup-edit-profile__close-button');
const currentName = document.querySelector('.profile__name');
const currentJob = document.querySelector('.profile__caption');
const profileForm = document.getElementById('profile-edit-form');
const inputName = profileForm.querySelector('.form__input_el_name');
const inputJob = profileForm.querySelector('.form__input_el_caption');

const elementTemplate = document.getElementById('element-template').content;
const elementsList = document.querySelector('.elements__list');

const elementForm = document.getElementById('image-add-form');

const addElementButton = document.querySelector('.profile__add-button'); //тут косяк какой-то
const imageAddPopup = document.querySelector('.popup-add-image');
const inputPlaceName = elementForm.querySelector('.form__input_el_name');
const inputPlaceImage = elementForm.querySelector('.form__input_el_caption');
const popupAddImageCloseButton = document.querySelector('.popup-add-image__close-button');


const viewImagePopup = document.querySelector('.popup-view-image');
const viewImagePopupImage = document.querySelector('.popup-view-image__image')
const viewImagePopupTitle = document.querySelector('.popup-view-image__title')


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//открываем попап c редактированием профиля
profileEditButton.addEventListener('click', () => {
  profileEditPopup.classList.add('popup-edit-profile_opened');
  inputName.placeholder = currentName.textContent; //вписываем в плейсхолдер текущее имя
  inputJob.placeholder = currentJob.textContent; //вписываем в плейсхолдер текущую профессию
});

//закрываем попап с редактированием профиля по кнопке "закрыть"
popupEditProfileCloseButton.addEventListener('click', () => profileEditPopup.classList.remove('popup-edit-profile_opened'));

//сохраняем новые данные из попапа с редактированием профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  currentName.textContent = inputName.value; //записываем в профиль введенное имя
  currentJob.textContent = inputJob.value; //записываем в профиль введенную профессию
  profileEditPopup.classList.remove('popup-edit-profile_opened');
}
profileForm.addEventListener('submit', formSubmitHandler);


//генерим фоточки на странице при открытии
function addElements (arr) {
  arr.forEach( function (element) {
    elementsList.append(createElement (element.link, element.name))
  })
}

//функция, создающая одну новую фоточку
function createElement (image, title) {
  const newElement = elementTemplate.cloneNode(true);
  const elementImage = newElement.querySelector('.element__image');
  const elementTitle = newElement.querySelector('.element__title');

  elementImage.src = image;
  elementTitle.textContent = title;

  const like = newElement.querySelector('.element__like-button'); //добавляем возможность лайкать эту фоточку
  like.addEventListener('click', () => like.classList.toggle('element__like-button_active'));

  const moveToTrash = newElement.querySelector('.element__trash-button'); //добавляем возможность удалить эту фоточку
  moveToTrash.addEventListener('click', () => moveToTrash.parentNode.parentNode.remove()) //удаляем прародителя, иначе в гриде будут дырки

  elementImage.addEventListener('click', () => {
    viewImagePopup.classList.add('popup-view-image__opened'); //открываем картинку на весь экран по клику
    viewImagePopupImage.src = elementImage.src; //и передаем в попап изображение, по которому кликнули
    viewImagePopupTitle.textContent = elementTitle.textContent; //и его название

    const closeButton = viewImagePopup.querySelector('.popup-view-image__close-button'); //закрыватель попапа с просмотром фоточки
    closeButton.addEventListener('click', (event) => event.target.parentNode.parentNode.classList.remove('popup-view-image__opened'));
  });

  return newElement
};


//открываем попап c добавлением фоточки
addElementButton.addEventListener('click', () => imageAddPopup.classList.add('popup-add-image_opened'));

//закрываем попап с добавлением фоточки по кнопке "закрыть"
popupAddImageCloseButton.addEventListener('click', () => imageAddPopup.classList.remove('popup-add-image_opened'));

//добавляем новую фоточку через попап
function formSubmitHandler1(evt) {
  evt.preventDefault();
  elementsList.prepend(createElement (inputPlaceImage.value, inputPlaceName.value))
  imageAddPopup.classList.remove('popup-add-image_opened');
}

elementForm.addEventListener('submit', formSubmitHandler1);


// загружаем фоточки при открытии страницы
addElements(initialCards);
