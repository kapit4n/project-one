import { Injectable } from '@angular/core';
import { Task, TaskPage } from '../models/task';
import { TaskLog } from '../models/taskLog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  public create(taskInfo: Task) {
    return this.http.post(`${BaseUrl}/api/tasks/`, taskInfo);
  }

  public update(id: number, taskInfo: Task) {
    const data = {status: taskInfo.status, time: taskInfo.time};
    return this.http.patch<Task>(`${BaseUrl}/api/tasks/${id}/`, data, this.httpOptions);
  }

  public createLog(taskLogInfo: TaskLog) {
    return this.http.post(`${BaseUrl}/api/task-logs/`, taskLogInfo);
  }

  public list() {

    const todayDate = new Date().toISOString().split('T')[0];

    return this.http.get<TaskPage>(`${BaseUrl}/api/tasks/?create_date=${todayDate}`);
  }

  public remove(id) {
    return this.http.delete<Task[]>(`${BaseUrl}/api/tasks/${id}`);
  }

}
