import { HandleDom } from './HandleDom.js';
import { HandleTasks } from './HandleTasks.js';
import { App } from './App.js';

export class Task {
  constructor(description, isConcluded, id) {
    this.description = description;
    this.isConcluded = isConcluded;
    this.id = id;
  }

  createCheckmarkImage() {
    const imgAttributes = [
      ['src', './assets/images/icon-check.svg'],
      ['alt', 'Ícone de tarefa concluída'],
    ];
    const img = HandleDom.createCustomElement('img', imgAttributes, false);
    return img;
  }

  createRemoveTaskImage() {
    const removeTaskImg = HandleDom.createCustomElement('img',
      [['src', './assets/images/icon-cross.svg'],
      ['alt', 'Remover tarefa']], false);
    return removeTaskImg;
  }

  createCheckmarkAndTaskDiv() {
    const checkmarkAndTaskDiv = HandleDom
      .createCustomElement('div', '', ['checkmark-and-task']);
    const checkmarkRoundedContainerDiv = HandleDom
      .createCustomElement('div', '', ['checkmark-rounded-container']);
    const checkmarkContainer = HandleDom
      .createCustomElement('div', '', ['checkmark-container']);
    const checkmarkImage = this.createCheckmarkImage();
    const taskP = document.createElement('p');
    taskP.innerText = this.description;

    if (!this.isConcluded) {
      checkmarkRoundedContainerDiv.addEventListener('click', e => {
        HandleTasks.markAsConcluded(this.id);
        App.reload(true);
      })
    }

    checkmarkContainer.appendChild(checkmarkImage);
    checkmarkRoundedContainerDiv.appendChild(checkmarkContainer);
    checkmarkAndTaskDiv.appendChild(checkmarkRoundedContainerDiv);
    checkmarkAndTaskDiv.appendChild(taskP);

    return checkmarkAndTaskDiv;
  }

  createRemoveTaskAnchor() {
    const removeTaskAnchor = HandleDom.createCustomElement('a',
      [['href', '#']],
      ['remove-task']);
    const removeTaskImg = this.createRemoveTaskImage();
    removeTaskAnchor.appendChild(removeTaskImg);

    removeTaskAnchor.addEventListener('click', e => {
      e.preventDefault();

      HandleTasks.removeTask(this.id, 1);
      App.reload(true);
    });

    return removeTaskAnchor;
  }

  createTaskLiElement() {
    const checkmarkAndTaskDiv = this.createCheckmarkAndTaskDiv();
    const isConcludedClass = this.isConcluded
      ? ['completed-task']
      : false;
    const removeTaskAnchor = this.createRemoveTaskAnchor();
    const li = HandleDom.createCustomElement('li', false, isConcludedClass);
    li.appendChild(checkmarkAndTaskDiv);
    li.appendChild(removeTaskAnchor);
    return li;
  }
}