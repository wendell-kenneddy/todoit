export class HandleDom {
  static createCustomElement(tag, attributes, cssClasses) {
    let el = document.createElement(tag);

    if (attributes && Array.isArray(attributes)) {
      for (const [attribute, value] of attributes) {
        el.setAttribute(attribute, value);
      }
    }

    if (cssClasses && Array.isArray(cssClasses)) {
      for (const cssClass of cssClasses) {
        el.classList.add(cssClass);
      }
    }

    return el;
  }
}
