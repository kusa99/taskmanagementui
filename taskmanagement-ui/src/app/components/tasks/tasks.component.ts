import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from '../../services/task.service';
import { Status } from 'src/app/models/Status';

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

  name: string;
  description: string;
  assigned: string;
  start_date: string;
  end_date: string;
  priority: string;
  status: string;

  constructor(private dialog: MatDialog, private taskService: TaskService) {}

   getSelectedStatus(event) {
    this.sortid = event;
    if (event == 0) {
       this.taskService.getTasks(this.limit).subscribe((tasks) => {
        this.tasks = tasks.sort((t1, t2) =>
          t1.assignmentId < t2.assignmentId ? 1 : -1
        );
      });
    } else {
      ( this.taskService.getTasks(this.limit)).subscribe((tasks) => {
        this.tasks = tasks.filter((t) => t.statusAssignment.statusId === event);
      });
    }
  }
  ngOnInit(): void {
    this.taskService.getTasks(this.limit).subscribe((tasks) => {
      this.tasks = tasks.sort((t1, t2) =>
        t1.assignmentId < t2.assignmentId ? 1 : -1
      );
      console.log(tasks);
    });

    this.taskService.getStatus().subscribe((statusi) => {
      this.statusi = statusi;
    });
    this.sortid = 0;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { name: this.name };
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '60%',
      data: {
        name: this.name,
        description: this.description,
        assigned: this.assigned,
        start_date: this.start_date,
        end_date: this.end_date,
        priority: this.priority,
        status: this.status,
      },
    });

    // this.limit += 5;
    // this.taskService.getTasks(this.limit).subscribe((tasks) => {
    //   this.tasks = tasks;
    // });
    // console.log(this.tasks);
  }
  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.assignmentId !== task.assignmentId);
    this.taskService.deleteTask(task).subscribe();
  }
  editTask(task:Task){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { name: this.name };
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '60%',
      data: {
        assignmentTitle: task.assignmentTitle,
        assignmentDescription: task.assignmentDescription,
        assignmentUserId: task.userAssignment.userId,
        assignmentStartDate: task.assignmentStartDate,
        assignmentEndDate: task.assignmentEndDate,
        assignmentPriorityId: task.priorityAssignment,
        assignmentStatusId: task.statusAssignment,
      },
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
    this.taskService
      .toggleCompleted(task)
      .subscribe((task) => console.log(task));

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
              task.assignmentEndDate?.toLowerCase()
            ).includes(this.searchKey.trim().toLowerCase())
          ))
      );
  }
}
