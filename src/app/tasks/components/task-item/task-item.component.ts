import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {

  @Input() task: Task; // <app-task-item  [task]="task" >
  @Output() done = new EventEmitter<Task>();  // <app-task-item  (done)="onDone($event)">
  @Output() update = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  constructor() {}
}
