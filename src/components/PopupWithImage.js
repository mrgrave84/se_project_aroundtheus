import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  open(data) {
    const { name, link } = data;
    const previewImage = this._popupElement.querySelector(
      ".popup__preview-image"
    );
    const previewDescription = this._popupElement.querySelector(
      ".popup__preview-description"
    );

    previewImage.src = link;
    previewImage.alt = name;
    previewDescription.textContent = name;

    super.open();
  }
}
