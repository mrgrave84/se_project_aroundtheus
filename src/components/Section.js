export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  //Render all items on page load
  renderItems() {
    this._items.forEach((item) => {
      // const renderElement = this._renderer(item);
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
