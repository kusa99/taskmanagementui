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
  limit: number = 5;
  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks(this.limit).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  name: string;
  description: string;
  assigned: string;
  date: string;
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
        date: this.date,
        priority: this.priority,
        status: this.status,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      this.name = result.name;
      this.description = result.description;
    });

    // this.limit += 5;
    // this.taskService.getTasks(this.limit).subscribe((tasks) => {
    //   this.tasks = tasks;
    // });
    // console.log(this.tasks);
  }
}
