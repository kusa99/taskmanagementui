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
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddTaskComponent, dialogConfig);
    
    this.limit += 5;
    this.taskService.getTasks(this.limit).subscribe((tasks) => {
      this.tasks = tasks;
    });
    console.log(this.tasks);
  }
  deleteTask(task: Task){
    this.tasks = this.tasks.filter(t=> t.id !== task.id);
    this.taskService.deleteTask(task).subscribe();
  }
}
