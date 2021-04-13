import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/Task';
import { User } from '../../models/User';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Status } from 'src/app/models/Status';

export interface ITask {
  assignmentId: number;
  assignmentDescription: string;
  assignmentTitle: string;
  assignmentPriorityId: number;
  assignmentStatusId: number;
  assignmentUserId: number;
  assignmentEndDate: string;
  assignmentStartDate: string;
  assignmentPhotoAttach: string;
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
  tasks: Task[];
  cTask: Task;
  statuses: Status[];
  todaysDate: string = new Date().toISOString().split('T')[0];

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.statuses = [
      {
        statusId: 1,
        statusTitle: 'To do',
      },
      {
        statusId: 2,
        statusTitle: 'In progress',
      },
      {
        statusId: 3,
        statusTitle: 'Done',
      },
    ];
  }

  close(): void {
    this.dialogRef.close();
  }

  onAdd(result: any): void {
    if (result.assignmentTitle === undefined) {
      return;
    }
    this.successAlertBox();
  }

  onEdit(result) {
    if (result.assignmentTitle === undefined) {
      return;
    }
    this.successAlertEditBox();
  }

  //pop up for successfully added task
  successAlertBox() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task successfully added!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //pop up for successfully edited task
  successAlertEditBox() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Task successfully edited!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
