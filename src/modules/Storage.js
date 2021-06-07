export class Storage {
  static get getTasks() {
    return JSON.parse(localStorage.getItem('todoapp:tasks')) || [];
  }

  static setTasks(tasks) {
    localStorage.setItem('todoapp:tasks', JSON.stringify(tasks));
  }
};