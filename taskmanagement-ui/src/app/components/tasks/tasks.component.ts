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
        priority: 'MEDIUM',
        status: true,
        start_date: '08/04/2021',
        end_date: '15/04/2021',
      },
      {
        id: 2,
        name: 'Task 2',
        description: 'test test',
        assigned: 'Jasmin Alimanovic',
        priority: 'HIGH',
        status: false,
        start_date: '09/04/2021',
        end_date: '21/04/2021',
      },
      {
        id: 3,
        name: 'Task 2',
        description: 'test test',
        assigned: 'Jasmin Alimanovic',
        priority: 'LOW',
        status: true,
        start_date: '15/04/2021',
        end_date: '25/04/2021',
      },
    ];
  }
}
