import { NgModule } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksModule } from '../tasks.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TaskItemComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    TaskItemComponent
  ]
})
export class ComponentsModule { }
