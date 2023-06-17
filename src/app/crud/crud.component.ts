import { Component } from '@angular/core';
import { Task } from '../model/task';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  ngOnInit() {
    this.loadTasksFromLocalStorage();
    if (!localStorage.getItem('lastTaskId')) {
      localStorage.setItem('lastTaskId', '6');
    } else {
      localStorage.getItem('lastTaskId');
    }
  }

  ngOnDestroy() {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    } else {
      this.tasks = [
        {
          id: 1,
          name: 'Func 1',
          status: 'todo',
          task: [
            { id: 1, name: 'Task 1.1', status: 'todo' },
            { id: 2, name: 'Task 1.2', status: 'todo' },
          ],
        },
        {
          id: 2,
          name: 'Func 2',
          status: 'doing',
          task: [
            { id: 3, name: 'Task 2.1', status: 'todo' },
            { id: 4, name: 'Task 2.2', status: 'doing' },
          ],
        },
        {
          id: 3,
          name: 'Func 3',
          status: 'done',
          task: [{ id: 5, name: 'Task 3.1', status: 'done' }],
        },
      ];
    }
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(task: Task) {
    const newName = prompt('Enter the new name:', task.name);
    if (newName !== null) {
      task.name = newName.trim();
      this.saveTasksToLocalStorage();
    }
    this.saveTasksToLocalStorage();
  }

  deleteTask(parentId: number, task: Task) {
    const parentTaskupdate = this.findParentTask(parentId);
    const index = this.tasks.findIndex((t) => t.task.includes(task));
    if (index !== -1) {
      this.tasks[index].task = this.tasks[index].task.filter(
        (t: Task) => t !== task
      );
      this.filteredTasks = this.tasks.flatMap((task) => task.task);
      this.saveTasksToLocalStorage();
    } else {
      const index = this.tasks.findIndex((t) => t === task);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    }
    this.updateParentTaskStatus(parentTaskupdate?.id);
    this.saveTasksToLocalStorage();
  }

  addFunction() {
    const functionName = prompt('Enter the function name:');
    if (functionName !== null) {
      const newFunction: Task = {
        id: this.tasks.length + 1,
        name: functionName.trim(),
        status: 'todo',
        task: [],
      };
      this.tasks.push(newFunction);
      this.saveTasksToLocalStorage();
    }
  }

  addChildTask(parentId: number) {
    let storedTasks: number | any = localStorage.getItem('lastTaskId');
    const parentTask = this.tasks[parentId - 1];
    if (parentTask && Array.isArray(parentTask.task)) {
      const taskName = prompt('Enter the task name:');
      if (taskName !== null) {
        const newTask: Task['task'] = {
          id: storedTasks,
          name: taskName.trim(),
          status: 'todo',
        };
        parentTask.task.push(newTask);
        this.updateParentTaskStatus(parentId);
        this.saveTasksToLocalStorage();
      }
    }
    storedTasks++;
    localStorage.setItem('lastTaskId', storedTasks);
  }

  updateParentTaskStatus(parentId: number | any) {
    const parentTask = this.tasks[parentId - 1];
    if (parentTask) {
      const childTasks = parentTask.task;
      const childStatuses = childTasks.map(
        (task: { status: any }) => task.status
      );

      if (childStatuses.every((status: string) => status === 'todo')) {
        parentTask.status = 'todo';
      } else if (childStatuses.every((status: string) => status === 'done')) {
        parentTask.status = 'done';
      } else {
        parentTask.status = 'doing';
      }
    }
  }
  findParentTask(parentId: number): Task | undefined {
    for (const task of this.tasks) {
      for (const subtask of task.task) {
        if (subtask.id === parentId) {
          return task;
        }
      }
    }
    return undefined;
  }
}
