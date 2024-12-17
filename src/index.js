import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { initialCards, settings } from "./utils/constants.js";
import Section from "./components/Section.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import "./pages/index.css";

// const cardListEl = document.querySelector(".cards__list");
// const profileEditModal = document.querySelector("#profile-edit-popup");
// const addCardModal = document.querySelector("#add-card-popup");
const profileEditModalForm = document.forms["profile-edit-popup-form"];
const addCardModalForm = document.forms["add-card-popup-form"];

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

// Instance of PopupWithForm for profile edit modal
const popupWithProfileForm = new PopupWithForm(
  "#profile-edit-popup",
  handleProfileEditModalFormSubmit
);

//Instance of PopupWithForm for add card modal
const popupWithAddCardForm = new PopupWithForm(
  "#add-card-popup",
  handleAddCardModalFormSubmit
);

// Instance of PopupWithImage
const popupWithImage = new PopupWithImage({
  popupSelector: "#preview-image-popup",
});

// // Event Handlers
// function handleProfileEditModalFormSubmit(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = profileEditModalInputTitle.value;
//   profileDescription.textContent = profileEditModalInputDescription.value;
//   closeModal(profileEditModal);
// }

// function handleAddCardModalFormSubmit(evt) {
//   evt.preventDefault();
//   const name = addCardModalInputTitle.value;
//   const link = addCardModalInputUrl.value;
//   renderCard({ name, link }, cardListEl);
//   closeModal(addCardModal);
//   evt.target.reset();
// }

// Event Listeners
profileEditButton.addEventListener("click", () => {
  popupWithProfileForm.open();
  const userData = userInfo.getUserInfo();
  profileEditModalForm.elements["title"].value = userData.name;
  profileEditModalForm.elements["description"].value = userData.job;
  console.log(userData);
});
profileEditModalForm.addEventListener(
  "submit",
  handleProfileEditModalFormSubmit
);
addCardModalForm.addEventListener("submit", handleAddCardModalFormSubmit);
addCardButton.addEventListener("click", () => {
  addCardFormValidator.disableSubmitButton();
  popupWithAddCardForm.open();
});

// EVENT LISTENERS

popupWithProfileForm.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithImage.setEventListeners();

// addCardButton.addEventListener("click", () => {
//   popupWithAddCardForm.open();
// });

//FUNCTIONS

//Function to submit profile form
function handleProfileEditModalFormSubmit(data) {
  userInfo.setUserInfo({ name: data.title, job: data.description });
  popupWithProfileForm.close();
}

// Function to add a new card
function handleAddCardModalFormSubmit(data) {
  const newCard = {
    name: data.title,
    link: data.link,
  };

  renderCard(newCard);
  popupWithAddCardForm.close();
}

// Function to open preview modal and handle image click
function handleImageClick(name, link) {
  popupWithImage.open({ name, link });
  // const previewImageModal = document.querySelector("#preview-image-popup");
  // const previewImage = previewImageModal.querySelector(".popup__preview-image");
  // const previewDescription = previewImageModal.querySelector(
  //   ".popup__preview-description"
  // );
  // previewImage.src = link;
  // previewImage.alt = name;
  // previewDescription.textContent = name;
  // openModal(previewImageModal);
}

// function openModal(modal) {
//   modal.classList.add("popup_opened");
//   document.addEventListener("keyup", handleEscClose);
// }

// function closeModal(modal) {
//   modal.classList.remove("popup_opened");
//   document.removeEventListener("keyup", handleEscClose);
// }

function renderCard(cardData, cardListEl, method = "prepend") {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard(cardData);
  cardListEl[method](cardElement);
}

// Closing the Popup by Pressing Esc
// const isEscEvent = (evt) => {
//   if (evt.key === "Escape") {
//     evt.preventDefault();
//     const activePopup = document.querySelector(".popup_opened");
//     closeModal(activePopup);
//   }
// };
// const handleEscUp = (evt) => {
//   evt.preventDefault();
//   isEscEvent(evt, closeModal);
// };

// INSTANCES OF CLASSES

// Instance of Section to manage cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

// Instance of UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// Instances of Validation
const editFormValidator = new FormValidator(settings, profileEditModalForm);
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(settings, addCardModalForm);
addCardFormValidator.enableValidation();

// Loops
// initialCards.reverse().forEach((cardData) => {
//   renderCard(cardData, cardListEl, "prepend");
// });

// Closing the Popup by Clicking on the Overlay
// const popups = document.querySelectorAll(".popup");
// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("popup_opened")) {
//       closeModal(popup);
//     }
//     if (evt.target.classList.contains("popup__close")) {
//       closeModal(popup);
//     }
//   });
// });
