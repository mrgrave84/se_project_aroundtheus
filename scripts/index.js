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

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const profileCloseButton = document.querySelector("#profile-close-button");

// Elements
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditModalInputTitle = document.querySelector(
  ".modal__input_type_title"
);
const profileEditModalInputDescription = document.querySelector(
  ".modal__input_type_description"
);
const profileEditModalForm = profileEditModal.querySelector(".modal__form");
const cardTemplate = document.querySelector("#card-template").content;
const cardListEl = document.querySelector(".cards__list");

// Event Handlers
function handleProfileEditModalFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditModalInputTitle.value;
  profileDescription.textContent = profileEditModalInputDescription.value;
  closeProfileEditModal();
}

// Event Listeners
profileEditButton.addEventListener("click", openProfileEditModal);
profileCloseButton.addEventListener("click", closeProfileEditModal);
profileEditModalForm.addEventListener(
  "submit",
  handleProfileEditModalFormSubmit
);

//Functions
function openProfileEditModal() {
  profileEditModal.classList.add("modal_opened");
  profileEditModalInputTitle.value = profileTitle.textContent;
  profileEditModalInputDescription.value = profileDescription.textContent;
}
function closeProfileEditModal() {
  profileEditModal.classList.remove("modal_opened");
}
function getCardElement(data) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  // set the path to the image to the link field of the object
  cardImageEl.src = data.link;
  // set the image alt text to the name field of the object
  cardImageEl.alt = data.name;
  // set the card title to the name field of the object, too
  cardTitleEl.textContent = data.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}
// Loops
for (let i = 0; i < initialCards.length; i++) {
  const data = initialCards[i];
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
}
