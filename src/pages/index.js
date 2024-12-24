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
});

addCardButton.addEventListener("click", () => {
  popupWithAddCardForm.open();
});

popupWithProfileForm.setEventListeners();
popupWithAddCardForm.setEventListeners();
popupWithImage.setEventListeners();

//Function to submit profile form
function handleProfileEditModalFormSubmit(data) {
  userInfo.setUserInfo({ name: data.title, job: data.description });
  popupWithProfileForm.close();
  formValidators["edit-popup-form"].disableSubmitButton();
}

// Function to add a new card
function handleAddCardModalFormSubmit(data) {
  const newCard = {
    name: data.name,
    link: data.link,
  };

  renderCard(newCard);
  popupWithAddCardForm.close();
  formValidators["card-popup-form"].disableSubmitButton();
}

// Function to open preview modal and handle image click
function handleImageClick(name, link) {
  popupWithImage.open({ name, link });
}

// Function to create Card Element
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

// Function (universal) to add Card Element to DOM and display it on the page
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

// Instance of Section to manage cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
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
// const editFormValidator = new FormValidator(settings, profileEditModalForm);
// editFormValidator.enableValidation();
// const addCardFormValidator = new FormValidator(settings, addCardModalForm);
// addCardFormValidator.enableValidation();

// Object for storing validators
const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);
