import { openPopup } from './modal.js';

const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.getElementById('element-template');
const popupViewImageImage = document.querySelector('.popup__image');
const popupViewImageTitle = document.querySelector('.popup__title');
const popupViewImage = document.querySelector('.popup_view-image');


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


function addElements (arr) {
  arr.forEach( function (element) {
    elementsList.append(createElement (element.link, element.name))
  })
}

export { elementsList, createElement, moveToTrash, toggleLike, openImage, addElements }
