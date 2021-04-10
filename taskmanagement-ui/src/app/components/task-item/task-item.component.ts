import { Component, OnInit, Input } from '@angular/core';
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

  ngOnInit(): void {}

  onToggle(task: Task) {
    //Toggle in UI
    task.status = !task.status;
    //Toggle on server
    this.taskService
      .toggleCompleted(task)
      .subscribe((task) => console.log(task));
  }

  

  onCreate() {}
}
