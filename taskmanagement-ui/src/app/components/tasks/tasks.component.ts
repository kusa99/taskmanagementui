import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor() {}

  ngOnInit(): void {
    this.tasks = [
      {
        id: 1,
        name: 'Task 1',
        description: 'test test',
        assigned: 'Jasmin Alimanovic',
        priority: 2,
        status: 3,
      },
      {
        id: 2,
        name: 'Task 2',
        description: 'test test',
        assigned: 'Jasmin Alimanovic',
        priority: 3,
        status: 2,
      },
      {
        id: 3,
        name: 'Task 2',
        description: 'test test',
        assigned: 'Jasmin Alimanovic',
        priority: 2,
        status: 1,
      },
    ];
  }
}
