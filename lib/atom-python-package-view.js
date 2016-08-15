'use babel';

export default class AtomPythonPackageView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-python-package');
    this.element.classList.add('editor');
    this.element.classList.add('mini');

    // Create message element
    this.editor = document.createElement('atom-text-editor');
    this.editor.setAttribute('mini', true);
    this.element.appendChild(this.editor);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
