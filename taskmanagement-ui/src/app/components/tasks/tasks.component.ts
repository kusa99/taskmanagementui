import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  limit: number = 15;
  searchKey: string;
  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks(this.limit).subscribe((tasks) => {
      this.tasks = tasks.sort((t1, t2) => (t1.id < t2.id ? 1 : -1));
    });
  }
  name: string;
  description: string;
  assigned: string;
  end_date: string;
  start_date: string;
  priority: string;
  status: string;

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
        end_date: this.end_date,
        start_date: this.start_date,
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
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    this.taskService.deleteTask(task).subscribe();
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
              task.name.toLowerCase() +
              task.assigned.toLowerCase() +
              task.end_date.toLowerCase()
            ).includes(this.searchKey.trim().toLowerCase())
          ))
      );
  }
}
