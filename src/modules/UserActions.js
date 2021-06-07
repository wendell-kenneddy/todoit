import { HandleTasks } from './HandleTasks.js';
import { App } from './App.js';
import { currentState } from './currentState.js';
import { Toast } from './Toast.js';

class UserActionsUtils {
  static validateTask(description) {
    if (description == '') throw new Error('Por favor, digite a tarefa.');

    for (const task of HandleTasks.allTasks) {
      if (task.description == description && !task.isConcluded) {
        throw new Error('Esta tarefa já existe.');
      }
    }
  }

  static resetCurrentStateAnchorsActiveClass() {
    const userActionsContainer = document.querySelector('.user-actions');
    const anchorArray = userActionsContainer.querySelectorAll('a');
    anchorArray.forEach(e => e.classList.remove('active'));
  }

  static clearTaskNameInput() {
    const taskNameInput = document.getElementById('new-task-name');
    taskNameInput.value = '';
  }

  static tryToAddTask() {
    const taskNameInput = document.getElementById('new-task-name');

    try {
      UserActionsUtils.validateTask(taskNameInput.value);

      HandleTasks.addTask({
        description: taskNameInput.value,
        isConcluded: false
      });

      UserActionsUtils.clearTaskNameInput();
      App.reload();
    } catch (error) {
      Toast.showToast(error.message);
    }
  }
}


export class UserActions {
  static watchUserActions() {
    window.addEventListener('click', e => {
      e.preventDefault();
      const target = e.target;
      const addTaskDiv = document.querySelector('.add-task');
      const listAllTasksAnchor = document.getElementById('list-all-tasks');
      const listConcludedTasksAnchor = document.getElementById('list-concluded-tasks');
      const listActiveTasksAnchor = document.getElementById('list-active-tasks');
      const clearConcludedTasksAnchor = document.getElementById('clear-tasks');

      if (target === addTaskDiv) {
        UserActionsUtils.tryToAddTask();
        return;
      }

      if (target === listAllTasksAnchor) {
        currentState.isAll = true;
        currentState.isByConcluded = false;
        UserActionsUtils.resetCurrentStateAnchorsActiveClass();
        target.classList.add('active');
        App.reload();
        return;
      }

      if (target === listActiveTasksAnchor) {
        currentState.isAll = false;
        currentState.isByConcluded = false;
        UserActionsUtils.resetCurrentStateAnchorsActiveClass();
        target.classList.add('active');
        App.reload();
        return;
      }

      if (target === listConcludedTasksAnchor) {
        currentState.isAll = false;
        currentState.isByConcluded = true;
        UserActionsUtils.resetCurrentStateAnchorsActiveClass();
        target.classList.add('active');
        App.reload();
        return;
      }

      if (target === clearConcludedTasksAnchor) {
        HandleTasks.removeConcludedTasks();
        App.reload();
        return;
      }
    })
  }

  static watchPressEnter() {
    window.addEventListener('keypress', e => {
      const key = e.key;

      if (key === 'Enter') {
        UserActionsUtils.tryToAddTask();
        return;
      }
    });
  }
}