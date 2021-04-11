import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/Task';
import { User } from '../../models/User';
import { TaskService } from '../../services/task.service';

export interface DialogData {
  name: string;
  description: string;
  assigned: string;
  start_date: string;
  end_date: string;
  priority: string;
  status: string;
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());
  users: User[];
  todaysDate: string = new Date().toISOString().split('T')[0];

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private taskService: TaskService
  ) {}

  tasks: Task[];
  cTask: Task;

  ngOnInit(): void {
    this.users = [
      {
        userId: 1,
        userFirstName: 'Jasmin',
        userLastName: 'Alimanovic',
      },
    ];
  }
  close(): void {
    this.dialogRef.close();
  }
  onAdd(result: any): void {
    if (result.name === undefined) {
      console.log('add');

      return;
    }

    let task: Task = {
      assignmentTitle: result?.name,
      assignmentId: 0,
      assignmentDescription: result?.description,
      assignmentEndDate: JSON.stringify(result?.end_date)?.slice(1, 11),
      priorityAssignment: result?.priorityAssignment,
      statusAssignment: result?.statusAssignment,
      userAssignment: result?.userAssignment,
      assignmentStartDate: JSON.stringify(result?.assignmentStartDate)?.slice(
        1,
        11
      ),
      assignmentIsDeleted: false,
      assignmentPhotoAttach: '',
    };
    if (result) {
      this.dialogRef.close();
      this.taskService.addTask(task).subscribe((task) => {
        this.tasks.push(task);
      });
    }
  }
}
