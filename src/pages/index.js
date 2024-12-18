import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, settings } from "../utils/constants.js";
import Section from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

//Forms
const profileEditModalForm = document.forms["profile-edit-popup-form"];
const addCardModalForm = document.forms["add-card-popup-form"];

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector(".profile__add-button");

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

popupWithProfileForm.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithImage.setEventListeners();

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
}

function renderCard(cardData, cardListEl, method = "prepend") {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard(cardData);
  cardListEl[method](cardElement);
}

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
