import { Component } from '@angular/core';
import { Task } from '../model/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedParentTask: Task | null = null;

  ngOnInit() {
    this.loadTasksFromLocalStorage();
    this.filteredTasks = this.tasks.flatMap((task) => task.task);
  }

  ngOnDestroy() {
    this.loadTasksFromLocalStorage();
    this.filteredTasks = this.tasks.flatMap((task) => task.task);
  }

  loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = [...JSON.parse(storedTasks)];
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
      this.saveTasksToLocalStorage();
    }
  }

  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(task: Task) {
    const parentTask = this.findParentTask(task.id);
    if (parentTask) {
      Swal.fire({
        title: 'Information about the parent task',
        html: `
          <strong>Name:</strong> ${parentTask.name}<br>
          <strong>Status:</strong> ${parentTask.status}
        `,
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  }

  moveTask(task: Task, status: string) {
    const parentTask = this.findParentTask(task.id);
    if (parentTask) {
      task.status = status;
      this.updateParentTaskStatus(task.id);
      this.saveTasksToLocalStorage();
    }
  }

  updateParentTaskStatus(parentId: number) {
    const parentTask = this.findParentTask(parentId);
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
