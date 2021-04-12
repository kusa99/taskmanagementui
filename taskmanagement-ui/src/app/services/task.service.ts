import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/Task';

import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  deleteTask(task: Task): Observable<Task> {
    const url = `https://localhost:44371/api/Assignments/DeleteAssignment/${task.assignmentId}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  constructor(private http: HttpClient) {}

  tasksUrl: string = 'https://localhost:44371/api/Assignments';

  getTasks(limit: number = 500): Observable<Task[]> {
    let Limit = limit ?? 5;
    let taskLimit = `?_limit=${limit}`;
    return this.http.get<Task[]>(`${this.tasksUrl}`);
  }

  toggleCompleted(task: Task): Observable<any> {
    const url = `${this.tasksUrl}/${task.assignmentId}`;
    return this.http.put(url, task, httpOptions);
  }

  addTask(task: Task): Observable<any> {
    console.log('Dodano');
    return this.http.post(this.tasksUrl, task, httpOptions);
  }
}
