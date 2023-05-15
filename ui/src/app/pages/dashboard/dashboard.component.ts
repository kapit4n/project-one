import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Task } from '../../shared/models/task'
import { TasksService } from 'src/app/shared/services/tasks.service';

import { CreateComponentDialog } from '../../task/create/create.component';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = []
  current: Task;
  totalTime = 0;
  constructor(public dialog: MatDialog,
    private _tasksService: TasksService
  ) {

  }
  openCreate() {
    const dialogRef = this.dialog.open(CreateComponentDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result.data.status === 'progress') {
        this.current = result.data;
        const filteredtasks = this.tasks.filter(t => t.status === 'progress');
        if (filteredtasks.length > 0) {
          const rToUpdate = filteredtasks.map(fu => this._tasksService.update(fu.id, Object.assign(fu, { status: 'pending' })));
          forkJoin(rToUpdate).subscribe(dd => {
            this.tasks.push(result.data);
          })
        } else {
          this.tasks.push(result.data);
        }
      }
    })
  }

  reloadData() {
    this._tasksService.list()
      .subscribe(tasks => {
        this.tasks = tasks.results
        this.tasks.forEach(element => {
          if (element.status === 'progress') {
            this.current = element;
          }
        });
        this.startTimer();
      });
  }

  ngOnInit(): void {
    this.reloadData();
  }

  continueCurrent() {
    this.current.status = 'pending';
    this._tasksService.update(this.current.id, this.current).subscribe(result => {
      console.log(result);
    })
  }

  startCurrent() {
    this.current.status = 'progress';
    this._tasksService.update(this.current.id, this.current).subscribe(result => {
      console.log(result);
    })
  }

  finishCurrent() {
    this.current.status = 'finished';
    this._tasksService.update(this.current.id, this.current).subscribe(result => {
      console.log(result);
    })
  }

  startTimer() {
    setInterval(() => {
      if (this.current && this.current.status == 'progress') {
        this.current.time = this.current.time + 1;
        if (this.current.time % 5 === 0) {
          this._tasksService.update(this.current.id, this.current).subscribe(result => {
            console.log('Current task saved', result)
          })
        }
        let total = 0;
        this.tasks.forEach(element => {
          total = total + element.time;
        });
        this.totalTime = total;
      }
    }, 1000)
  }

  continueTask(task) {
    task.status = 'progress';
    this._tasksService.update(task.id, task).subscribe(result => {
      console.log(result);
    });
  }

  pauseTask(task) {
    task.status = 'pending';
    this._tasksService.update(task.id, task).subscribe(result => {
      console.log(result);
    });
  }

  startTask(task) {
    this.tasks.forEach(element => {
      if (element.status === 'progress') {
        element.status = 'pending';
        this._tasksService.update(element.id, element).subscribe(result => {
          console.log(result);
        });
      }
    });
    task.status = 'progress';
    this.current = task;
    this._tasksService.update(task.id, task).subscribe(result => {
      console.log(result);
    });
  }

  finishTask(task) {
    task.status = 'finished';
    this._tasksService.update(task.id, task).subscribe(result => {
      console.log(result);
    });
  }
}
