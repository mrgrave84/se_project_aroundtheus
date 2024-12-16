export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // Opens popup
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    // Closes popup
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(evt) {
    //Closes the popup by pressing Esc key
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Closes the popup by clicking on the close icon
    const closeButton = this._popupElement.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
    // Closes the popup by clicking on the overlay
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}
