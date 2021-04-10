import { Injectable } from '@angular/core';
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
  constructor(private http: HttpClient) {}

  tasksUrl: string = 'https://retoolapi.dev/TCswF7/tasks';

  getTasks(limit: number): Observable<Task[]> {
    let Limit = limit ?? 5;
    let taskLimit = `?_limit=${limit}`;
    return this.http.get<Task[]>(`${this.tasksUrl}${taskLimit}`);
  }

  toggleCompleted(task: Task): Observable<any> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.put(url, task, httpOptions);
  }

  addTask(task: Task): Observable<any> {
    console.log('Dodano');
    return this.http.post(this.tasksUrl, task, httpOptions);
  }
}
