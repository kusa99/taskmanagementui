import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/models/Task';
import { User } from '../../models/User';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

export interface ITask {
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
  todaysDate: string = new Date().toISOString().split('T')[0];

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  tasks: Task[];
  cTask: Task;
  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
    });
  }
  close(): void {
    this.dialogRef.close();
  }

  onAdd(result: any): void {
    if (result.assignmentTitle === undefined) {
      console.log('add');

      return;
    }
    let task: ITask = {
      assignmentDescription: result.assignmentDescription,
      assignmentTitle: result.assignmentTitle,
      assignmentStartDate: result.assignmentStartDate,
      assignmentEndDate: result.assignmentEndDate,
      assignmentStatusId: result.assignmentStatusId,
      assignmentPriorityId: result.assignmentPriorityId,
      assignmentUserId: result.assignmentUserId,
      assignmentPhotoAttach: '',
    };
    console.log(task);
    if (result) {
      this.dialogRef.close();
      this.taskService.addTask(task).subscribe((task) => {
        this.tasks.push(task);
      });
    }
  }
}
