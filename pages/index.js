import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-popup");
const addCardModal = document.querySelector("#add-card-popup");
const profileEditModalForm = document.forms["profile-edit-popup-form"];
const addCardModalForm = document.forms["add-card-popup-form"];

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Elements
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditModalInputTitle = document.querySelector("[name='title']");
const profileEditModalInputDescription = document.querySelector(
  "[name='description']"
);
const addCardModalInputTitle = document.querySelector("[name='name']");
const addCardModalInputUrl = document.querySelector("[name='link']");

// Event Handlers
function handleProfileEditModalFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditModalInputTitle.value;
  profileDescription.textContent = profileEditModalInputDescription.value;
  closeModal(profileEditModal);
}

function handleAddCardModalFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardModalInputTitle.value;
  const link = addCardModalInputUrl.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  evt.target.reset();
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileEditModalInputTitle.value = profileTitle.textContent;
  profileEditModalInputDescription.value = profileDescription.textContent;
});
profileEditModalForm.addEventListener(
  "submit",
  handleProfileEditModalFormSubmit
);
addCardModalForm.addEventListener("submit", handleAddCardModalFormSubmit);
addCardButton.addEventListener("click", () => {
  addCardFormValidator.disableSubmitButton();
  openModal(addCardModal);
});

//Functions
function handleImageClick(name, link) {
  const previewImageModal = document.querySelector("#preview-image-popup");
  const previewImage = previewImageModal.querySelector(".popup__preview-image");
  const previewDescription = previewImageModal.querySelector(
    ".popup__preview-description"
  );
  previewImage.src = link;
  previewImage.alt = name;
  previewDescription.textContent = name;
  openModal(previewImageModal);
}

function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keyup", handleEscUp);
}
function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleEscUp);
}

function renderCard(cardData, cardListEl, method = "prepend") {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard(cardData);
  cardListEl[method](cardElement);
}

// Closing the Popup by Pressing Esc
const isEscEvent = (evt) => {
  if (evt.key === "Escape") {
    evt.preventDefault();
    const activePopup = document.querySelector(".popup_opened");
    closeModal(activePopup);
  }
};

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModal);
};

// Loops

initialCards.reverse().forEach((cardData) => {
  renderCard(cardData, cardListEl, "prepend");
});

// Closing the Popup by Clicking on the Overlay

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

// Validation

const editFormValidator = new FormValidator(settings, profileEditModalForm);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(settings, addCardModalForm);
addCardFormValidator.enableValidation();
