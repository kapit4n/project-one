import { Component, Inject, OnInit } from '@angular/core';
//import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { TaskPage, Task } from '../../shared/models/task'
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {

  createForm: UntypedFormGroup;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private formBuilder: UntypedFormBuilder,
    private taskSvc: TasksService,
  ) {
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      description: ['', { validators: [Validators.required] }],
      status: [''],
      priority: [],
      estimated_time: [0],
      time: [0]
    });
  }

  onSubmit(startNow: boolean) {
    const taskInfo = this.createForm.value;

    if (startNow) {
      taskInfo.status = 'progress';
    }

    this.taskSvc.create(taskInfo).subscribe((res: Task) => {
      if (startNow) {
        const taskLog = { task: res.id, start_date: new Date().toISOString(), status: 'progress' };
        this.taskSvc.createLog(taskLog).subscribe(tl => {
          this.dialogRef.close({ data: res });
        });
      }
    });
  }
  

  onStartNow() {

    this.onSubmit(true);
  }

  onStartLater() {
    this.onSubmit(false);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.createForm.reset();
    this.dialogRef.close();
  }

  get f() {
    return this.createForm.controls;
  }
}
