import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';
import { ITask } from '../components/add-task/add-task.component';
import { Status } from '../models/Status';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export interface ITaskPut {
  assignmentDescription: string;
  assignmentTitle: string;
  assignmentPriorityId: number;
  assignmentStatusId: number;
  assignmentUserId: number;
  assignmentEndDate: string;
  assignmentStartDate: string;
  assignmentPhotoAttach: string;
  assignmentIsDeleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskUpdateUrl: string =
    'https://localhost:44371/api/Assignments/UpdateAssignment';

  constructor(private http: HttpClient) {}

  tasksUrl: string = 'https://localhost:44371/api/Assignments';
  taskUrlPost: string = 'https://localhost:44371/api/Assignments/NewAssignment';

  getTasks(limit: number = 500): Observable<Task[]> {
    let Limit = limit ?? 5;
    let taskLimit = `?_limit=${limit}`;
    return this.http.get<Task[]>(`${this.tasksUrl}`);
  }

  toggleCompleted(task: Task): Observable<any> {
    const url = `${this.taskUpdateUrl}/${task.assignmentId}`;
    const itask: ITaskPut = {
      assignmentDescription: task.assignmentDescription,
      assignmentEndDate: task.assignmentEndDate,
      assignmentPhotoAttach: task.assignmentPhotoAttach,
      assignmentPriorityId: task.priorityAssignment.priorityId,
      assignmentStartDate: task.assignmentStartDate,
      assignmentTitle: task.assignmentTitle,
      assignmentStatusId: task.statusAssignment.statusId,
      assignmentUserId: task.userAssignment.userId,
      assignmentIsDeleted: false,
    };
    return this.http.put(url, itask, httpOptions);
  }

  addTask(task: ITask): Observable<any> {
    console.log('Dodano');
    return this.http.post(this.taskUrlPost, task, httpOptions);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `https://localhost:44371/api/Assignments/DeleteAssignment/${task.assignmentId}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>('https://localhost:44371/api/Statuses');
  }
}
