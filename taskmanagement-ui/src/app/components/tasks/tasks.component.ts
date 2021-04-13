import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { AddTaskComponent, ITask } from '../add-task/add-task.component';
import { TaskService } from '../../services/task.service';
import { Status } from 'src/app/models/Status';
import { User } from 'src/app/models/User';
import { Priority } from 'src/app/models/Priority';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  limit: number = 15;
  searchKey: string;
  statusi: Status[];
  sortid: number;
  isAddForm: boolean = true;

  name: string;
  description: string;
  assigned: string;
  start_date: string;
  end_date: string;
  priority: string;
  status: string;
  len: number;

  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  getSelectedStatus(event) {
    this.sortid = event;
    if (event == 0) {
      this.taskService.getTasks().subscribe((tasks) => {
        this.tasks = tasks.sort((t1, t2) =>
          t1.assignmentId < t2.assignmentId ? 1 : -1
        );
      });
    } else {
      this.taskService.getTasks().subscribe((tasks) => {
        this.tasks = tasks.filter((t) => t.statusAssignment.statusId === event);
      });
    }
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.sort((t1, t2) =>
        t1.assignmentId < t2.assignmentId ? 1 : -1
      );
    });
    this.getTasksLength();
    this.taskService.getStatus().subscribe((statusi) => {
      this.statusi = statusi;
    });
    this.sortid = 0;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      assignmentTitle: this.name,
      assignmentDescription: this.description,
      assignmentUserId: 0,
      assignmentStartDate: this.start_date,
      assignmentEndDate: this.end_date,
      assignmentPriorityId: 0,
      assignmentStatusId: 0,
    };
    console.log(dialogConfig.data);
    const dialogRef = this.dialog.open(AddTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      let itask: ITask = {
        assignmentId: result?.assignmentId,
        assignmentDescription: result?.assignmentDescription,
        assignmentTitle: result?.assignmentTitle,
        assignmentStartDate: this.formatDate(
          new Date(Date.parse(result?.assignmentStartDate))
        ).slice(0, 10),
        assignmentEndDate: this.formatDate(
          new Date(Date.parse(result?.assignmentEndDate))
        ).slice(0, 10),
        assignmentStatusId: result?.assignmentStatusId,
        assignmentPriorityId: result?.assignmentPriorityId,
        assignmentUserId: result?.assignmentUserId,
        assignmentPhotoAttach: '',
      };
      console.log('itask');
      console.log(itask);
      if (result) {
        dialogRef.close();
        this.taskService.addTask(itask).subscribe(() => {
          this.getTasksLength();
          this.taskService.getTasks().subscribe((tasks) => {
            this.tasks = tasks.sort((t1, t2) =>
              t1.assignmentId < t2.assignmentId ? 1 : -1
            );
          });
        });
      }
    });
  }

  formatDate(myDate: Date): string {
    let myUtcDate = new Date(
      Date.UTC(
        myDate.getFullYear(),
        myDate.getMonth(),
        myDate.getDate(),
        myDate.getHours(),
        myDate.getMinutes(),
        myDate.getSeconds()
      )
    );

    return myUtcDate.toJSON();
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.assignmentId !== task.assignmentId);
    this.taskService.deleteTask(task).subscribe();
  }
  getTasksLength(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.len = tasks.length;
    });
  }

  editTask(task: Task) {
    this.isAddForm = false;
    const dialogConfig = new MatDialogConfig();
    let statusId: number = task.statusAssignment.statusId;
    let priorityId: number = task.priorityAssignment.priorityId;
    console.log('prio ' + priorityId);
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      assignmentTitle: task.assignmentTitle,
      assignmentDescription: task.assignmentDescription,
      assignmentUserId: task.userAssignment.userId,
      assignmentStartDate: task.assignmentStartDate,
      assignmentEndDate: task.assignmentEndDate,
      assignmentPriorityId: priorityId,
      assignmentStatusId: statusId,
      assignmentId: task.assignmentId,
    };
    console.log(dialogConfig.data);
    const dialogRef = this.dialog.open(AddTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      let task: Task = {
        assignmentDescription: result?.assignmentDescription,
        assignmentTitle: result?.assignmentTitle,
        assignmentStartDate: JSON.stringify(result?.assignmentStartDate)?.slice(
          1,
          11
        ),
        assignmentEndDate: JSON.stringify(result?.assignmentEndDate)?.slice(
          1,
          11
        ),
        statusAssignment: new Status(result?.assignmentStatusId),
        priorityAssignment: new Priority(result?.assignmentPriorityId),
        userAssignment: new User(result?.assignmentUserId),
        assignmentPhotoAttach: '',
        assignmentId: result?.AssignmentId,
        assignmentIsDeleted: false,
      };

      if (result) {
        dialogRef.close();
        this.taskService.updateTask(task).subscribe(() => {
          this.taskService.getTasks().subscribe((tasks) => {
            this.tasks = tasks.sort((t1, t2) =>
              t1.assignmentId < t2.assignmentId ? 1 : -1
            );
          });
        });
      }
    });
  }

  updateTask(task: Task) {
    //Toggle in UI
    if (task.statusAssignment.statusId === 1) {
      task.statusAssignment.statusId = 2;
    } else if (task.statusAssignment.statusId == 2) {
      task.statusAssignment.statusId = 3;
    } else if (task.statusAssignment.statusId == 3) {
      task.statusAssignment.statusId = 1;
    }
    //Toggle on server
    this.taskService.updateTask(task).subscribe();
    if (this.sortid != 0) {
      this.tasks = this.tasks.filter(
        (t) => t.statusAssignment.statusId === this.sortid
      );
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.taskService
      .getTasks()
      .subscribe(
        (tasks) =>
          (this.tasks = tasks.filter((task) =>
            (
              task?.assignmentTitle?.toLowerCase() +
              task.userAssignment.userFirstName?.toLowerCase() +
              task.priorityAssignment.priorityTitle.toLowerCase()
            ).includes(this.searchKey.trim().toLowerCase())
          ))
      );
  }
}
