import { Component, OnInit, Input, Output } from '@angular/core';

import { EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  constructor(private taskService: TaskService) {}
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() editTask: EventEmitter<Task> = new EventEmitter();

  ngOnInit(): void {}

  onToggle(task: Task) {
    //Toggle in UI
    if (task.statusAssignment.statusId === 1) {
      task.statusAssignment.statusId = 2;
    } else if (task.statusAssignment.statusId == 2) {
      task.statusAssignment.statusId = 3;
    } else if (task.statusAssignment.statusId == 3) {
      task.statusAssignment.statusId = 1;
    }
    //Toggle on server
    this.taskService
      .toggleCompleted(task)
      .subscribe((task) => console.log(task));
  }

  onCreate() {}

  onDelete(task) {
    this.deleteTask.emit(task);
  }

  onEdit(task){
    this.editTask.emit(task);

  };

  
}
