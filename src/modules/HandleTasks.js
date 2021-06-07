import { Storage } from './Storage.js';

let tasks = Storage.getTasks;

export class HandleTasks {
  static get allTasks() {
    return tasks;
  }

  static filterTasks(byConcluded) {
    if (!byConcluded) return tasks.filter(e => !e.isConcluded);
    return tasks.filter(e => e.isConcluded);
  }

  static removeTask(index) {
    if (!index == null) return;

    tasks.splice(index, 1);
  }

  static addTask(task) {
    if (!task) return;

    tasks.unshift(task);
  }

  static markAsConcluded(index) {
    tasks[index].isConcluded = true;
  }

  static removeConcludedTasks() {
    const onlyActiveTasksArray = tasks.filter(e => e.isConcluded === false);
    tasks = onlyActiveTasksArray;
  }
}
