'use babel';

import AtomPythonModuleView from './atom-python-module-view';
import { CompositeDisposable } from 'atom';

export default {

  atomPythonModuleView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomPythonModuleView = new AtomPythonModuleView(state.atomPythonModuleViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomPythonModuleView.getElement(),
      visible: false
    });

    this.atomPythonModuleView.editor.focus();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-python-module:toggle': () => this.toggle(),
      'core:confirm': () => this.confirm(),
      'core:cancel': () => this.cancel()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomPythonModuleView.destroy();
  },

  serialize() {
    return {
      atomPythonModuleViewState: this.atomPythonModuleView.serialize()
    };
  },

  confirm() {
    this.atomPythonModuleView.confirm();
    this.modalPanel.hide();
  },

  cancel() {
    this.atomPythonModuleView.cancel();
    this.modalPanel.hide();
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      this.modalPanel.show();
      this.atomPythonModuleView.editor.focus();
    }
  }

};
