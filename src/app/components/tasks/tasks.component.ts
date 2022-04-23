import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  deleteTask(taskToDelete: Task) {
    this.taskService.deleteTask(taskToDelete).subscribe(() => {
      this.tasks = this.tasks.filter(
        (task: Task) => task.id !== taskToDelete.id
      );
    });
  }
}
