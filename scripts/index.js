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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-popup");
const addCardModal = document.querySelector("#add-card-popup");
const previewImageModal = document.querySelector("#preview-image-popup");
// const profileEditModalForm = profileEditModal.querySelector(".popup__form");
// const addCardModalForm = addCardModal.querySelector(".popup__form");
const profileEditModalForm = document.forms["form1"];
const addCardModalForm = document.forms["form2"];

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".popup__close");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModalCloseButton = addCardModal.querySelector(".popup__close");
const previewImageModalCloseButton =
  previewImageModal.querySelector(".popup__close");

// Elements
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditModalInputTitle = document.querySelector("[name='title']");
const profileEditModalInputDescription = document.querySelector(
  "[name='description']"
);
const addCardModalInputTitle = document.querySelector("[name='name']");
const addCardModalInputUrl = document.querySelector("[name='link']");
const previewImage = previewImageModal.querySelector(".popup__preview-image");
const previewDescription = previewImageModal.querySelector(
  ".popup__preview-description"
);

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
addCardButton.addEventListener("click", () => openModal(addCardModal));

//Functions
function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keyup", handleEscUp);
}
function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleEscUp);
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    previewImage.setAttribute("src", data.link);
    previewImage.setAttribute("alt", data.name);
    previewDescription.textContent = data.name;
    openModal(previewImageModal);
  });
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  return cardElement;
}

function renderCard(cardData, cardListEl) {
  const cardEl = getCardElement(cardData);
  cardListEl.prepend(cardEl);
}

// Closing the Popup by Pressing Esc
const isEscEvent = (evt, action) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    action(activePopup);
  }
};

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModal);
};

// Loops
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

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
