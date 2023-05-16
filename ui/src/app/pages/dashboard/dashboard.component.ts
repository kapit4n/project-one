import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from '../../shared/models/task'
import { TasksService } from 'src/app/shared/services/tasks.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = []
  current: Task;
  totalTime = 0;

  description = new FormControl("");
  status = new FormControl("pending");
  estimatedTime = new FormControl(0);
  time = new FormControl(0);
  constructor(private _tasksService: TasksService
  ) {

  }

  onCreateForm() {

  }

  onSaveNewTask() {
    const task: Task = {
      description: this.description.value,
      status: this.status.value,
      stimated: this.estimatedTime.value,
      time: this.time.value
    }

    this._tasksService.create(task).subscribe(taskCreated => {
      this.reloadData()
      this.description.setValue("")
      this.estimatedTime.setValue(0)
      this.time.setValue(0)
    })
  }

  reloadData() {
    this._tasksService.list()
      .subscribe(tasks => {
        console.log(tasks)
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

  removeTask(task) {
    this._tasksService.remove(task.id).subscribe(result => {
      this.reloadData();
    });
  }
}
