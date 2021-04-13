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
  @Output() updateTask: EventEmitter<Task> = new EventEmitter();

  ngOnInit(): void {}

  onToggle(task) {
    this.updateTask.emit(task);
  }

  onCreate() {}

  onDelete(task) {
    this.deleteTask.emit(task);
  }

  onEdit(task){
    this.editTask.emit(task);

  };

  
}
