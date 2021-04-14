import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';
import { ITask } from '../components/add-task/add-task.component';
import { Status } from '../models/Status';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  Vary: 'Origin',
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

  baseUrl: string = environment.baseUrl;
  tasksUrl: string = this.baseUrl + '/Assignments';
  taskUrlPost: string = this.baseUrl + '/Assignments/NewAssignment';
  taskUrlStatus: string = this.baseUrl + '/Statuses';
  taskDeleteUrl: string = this.baseUrl + '/Assignments/DeleteAssignment';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.tasksUrl}/${id}`);
  }

  updateTask(task: Task): Observable<any> {
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
      assignmentIsDeleted: task.assignmentIsDeleted,
    };
    return this.http.put(url, itask, httpOptions);
  }

  addTask(task: ITask): Observable<any> {
    return this.http.post(this.taskUrlPost, task, httpOptions);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.taskDeleteUrl}/${task.assignmentId}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this.taskUrlStatus);
  }
}
