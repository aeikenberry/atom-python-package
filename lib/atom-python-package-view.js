'use babel';

import mkdirp from 'mkdirp';
import touch from 'touch';

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
    this.resetDefaultText();
    this.element.appendChild(this.editor);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  confirm() {
    let p = this.editor.getModel().getText();
    if (!p.endsWith('/')) p += '/';

    mkdirp(p, err => {
      if (err) {
        console.log(err);
      } else {
        touch(`${p}/__init__.py`);
        this.cancel();
      }
    });
  }

  resetDefaultText() {
    this.editor.getModel().setText(atom.project.getPaths()[0]);
  }

  cancel() {
    this.resetDefaultText();
  }

  getElement() {
    return this.element;
  }

}
