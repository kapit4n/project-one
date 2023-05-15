import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';

@NgModule({
  declarations: [
    CreateDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [CreateDialogComponent]
})
export class TaskModule { }
