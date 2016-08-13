'use babel';

import AtomPythonPackageView from './atom-python-package-view';
import { CompositeDisposable } from 'atom';

export default {

  atomPythonPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomPythonPackageView = new AtomPythonPackageView(state.atomPythonPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomPythonPackageView.getElement(),
      visible: false
    });

    this.atomPythonPackageView.editor.focus();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-python-package:toggle': () => this.toggle(),
      'core:confirm': () => this.confirm(),
      'core:cancel': () => this.cancel()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomPythonPackageView.destroy();
  },

  serialize() {
    return {
      atomPythonPackageViewState: this.atomPythonPackageView.serialize()
    };
  },

  confirm() {
    this.atomPythonPackageView.confirm();
    this.modalPanel.hide();
  },

  cancel() {
    this.atomPythonPackageView.cancel();
    this.modalPanel.hide();
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      this.modalPanel.show();
      this.atomPythonPackageView.editor.focus();
    }
  }

};
