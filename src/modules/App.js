import { HandleTasks } from './HandleTasks.js';
import { Task } from './TaskHtmlHandler.js';
import { UserActions } from './UserActions.js';
import { currentState } from './currentState.js';
import { Storage } from './Storage.js';

export class App {
  static printTasks() {
    const tasksContainer = document.querySelector('.tasks-container ul');
    let tasks = HandleTasks.allTasks;

    if (currentState.isAll) {
      for (const taskIndex in tasks) {
        const description = tasks[taskIndex].description;
        const isConcluded = tasks[taskIndex].isConcluded;
        const id = taskIndex;
        const task = new Task(description, isConcluded, id);
        const taskLiElement = task.createTaskLiElement();
        tasksContainer.appendChild(taskLiElement);
      }

      return;
    }

    if (!currentState.isAll && currentState.isByConcluded) {
      for (const taskIndex in tasks) {
        if (!tasks[taskIndex].isConcluded) continue;

        const description = tasks[taskIndex].description;
        const isConcluded = true;
        const id = taskIndex;
        const task = new Task(description, isConcluded, id);
        const taskLiElement = task.createTaskLiElement();
        tasksContainer.appendChild(taskLiElement);
      }

      return;
    }

    if (!currentState.isAll && !currentState.isByConcluded) {
      for (const taskIndex in tasks) {
        if (tasks[taskIndex].isConcluded) continue;

        const description = tasks[taskIndex].description;
        const isConcluded = false;
        const id = taskIndex;
        const task = new Task(description, isConcluded, id);
        const taskLiElement = task.createTaskLiElement();
        tasksContainer.appendChild(taskLiElement);
      }

      return;
    }
  }

  static showRemainingTasks() {
    const pendentTasks = HandleTasks.filterTasks(false).length;
    const remainingTasksP = document.getElementById('total-remaining-tasks');
    remainingTasksP.innerText = `${pendentTasks} tarefa(s) restante(s)`;
  }

  static init() {
    Storage.setTasks(HandleTasks.allTasks);
    App.printTasks();
    App.showRemainingTasks();
    UserActions.watchUserActions();
    UserActions.watchPressEnter();
  }

  static reload() {
    Storage.setTasks(HandleTasks.allTasks);
    const tasksContainer = document.querySelector('.tasks-container ul');
    tasksContainer.innerHTML = '';
    App.printTasks();
    App.showRemainingTasks();
  }
}