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
      let task: Task = {
        name: result.name,
        id: 0,
        description: result.description,
        end_date: result.date,
        priority: Number(result.priority),
        status: Boolean(result.status),
        assigned: result.assigned,
        start_date: '2020-1-1',
      };

      this.taskService.addTask(task).subscribe((task) => {
        this.tasks.push(task);
      });
    });

    // this.limit += 5;
    // this.taskService.getTasks(this.limit).subscribe((tasks) => {
    //   this.tasks = tasks;
    // });
    // console.log(this.tasks);
  }
  deleteTask(task: Task){
    this.tasks = this.tasks.filter(t=> t.id !== task.id);
    this.taskService.deleteTask(task).subscribe();
  }



  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(){
    
    this.tasks.filter(task=>task.name.includes(this.searchKey))
  }
}
