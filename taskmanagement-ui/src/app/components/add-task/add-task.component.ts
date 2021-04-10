import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/Task';
import { User } from '../../models/User';
import { TasksComponent } from '../tasks/tasks.component';

export interface DialogData {
  name: string;
  description: string;
  assigned: string;
  date: string;
  priority: string;
  status: string;
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  users: User[] = [
    { id: 1, first_name: 'Jasmin', last_name: 'Alimanovic' },
    { id: 2, first_name: 'Harun', last_name: 'Kusic' },
    { id: 3, first_name: 'Adnan', last_name: 'Alagic' },
    { id: 4, first_name: 'Semin', last_name: 'Hasic' },
    { id: 5, first_name: 'Ajdin', last_name: 'Civic' },
  ];

  todaysDate: string = new Date().toISOString().split('T')[0];

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  tasks: Task[];
  cTask: Task;

  ngOnInit(): void {
    this.tasks = [
      {
        id: 1,
        name: 'Task 1',
        description: 'test test',
        assigned: 'Jasmin Alimanovic',
        priority: 2,
        status: true,
        start_date: '08/04/2021',
        end_date: '15/04/2021',
      },
      {
        id: 2,
        name: 'Task 2',
        description: 'test test',
        assigned: 'Semin Hasic',
        priority: 3,
        status: true,
        start_date: '09/04/2021',
        end_date: '21/04/2021',
      },
      {
        id: 3,
        name: 'Task 3',
        description: 'test test',
        assigned: 'Adnan Alagic',
        priority: 1,
        status: true,
        start_date: '15/04/2021',
        end_date: '25/04/2021',
      },
    ];
    this.cTask = this.tasks[0];
  }
  close(): void {
    this.dialogRef.close();
  }
}
