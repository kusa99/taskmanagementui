import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from '../../services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  constructor(private taskService: TaskService) {}
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() editTask: EventEmitter<Task> = new EventEmitter();
  @Output() updateTask: EventEmitter<Task> = new EventEmitter();

  ngOnInit(): void {}

  onToggle(task) {
    this.updateTask.emit(task);
  }

  onCreate() {}

  onEdit(task){
    this.editTask.emit(task);

  };
  onDelete(task){
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
        this.deleteTask.emit(task);
      }
    })
  }
}
