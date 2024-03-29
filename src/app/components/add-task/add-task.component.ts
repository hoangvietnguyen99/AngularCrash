import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string = '';
  date: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = uiService.onToggle().subscribe((value: boolean) => {
      this.showAddTask = value;
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    const newTask: Task = {
      text: this.text,
      date: this.date,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.date = '';
    this.reminder = false;
  }
}
