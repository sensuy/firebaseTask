import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { TasksListPageRoutingModule } from './tasks-list-routing.module';

import { TasksListPage } from './tasks-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TasksListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TasksListPage]
})
export class TasksListPageModule {}
