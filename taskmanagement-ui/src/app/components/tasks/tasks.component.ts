import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  

  constructor(private dialog: MatDialog) {}
  

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
        assigned: 'Semin Hasic',
        priority: 'HIGH',
        status: true,
        start_date: '09/04/2021',
        end_date: '21/04/2021',
      },
      {
        id: 3,
        name: 'Task 3',
        description: 'test test',
        assigned: 'Adnan Alagic',
        priority: 'LOW',
        status: true,
        start_date: '15/04/2021',
        end_date: '25/04/2021',
      },
      {
        id: 4,
        name: 'Task 4',
        description: 'test test',
        assigned: 'Harun Kusic',
        priority: 'LOW',
        status: true,
        start_date: '15/04/2021',
        end_date: '25/04/2021',
      },
      {
        id: 5,
        name: 'Task 5',
        description: 'test test',
        assigned: 'Ajdin Civic',
        priority: 'LOW',
        status: false,
        start_date: '15/04/2021',
        end_date: '25/04/2021',
      },
    ];
  }
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddTaskComponent, dialogConfig);
    
  }
}
