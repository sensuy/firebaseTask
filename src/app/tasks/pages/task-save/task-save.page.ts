import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';


import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  taskForm: FormGroup;
  pageTitle = '...';
  taskId: string = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  init(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      this.pageTitle = 'Create Task';
      return;
    }
    this.taskId = taskId;
    console.log('taskId: ', taskId);
    this.pageTitle = 'Edit Task';
    this.tasksService
      .get(taskId)
      .pipe(take(1))
      .subscribe(({ title, done }) => {
        this.taskForm.get('title').setValue(title);
        this.taskForm.get('done').setValue(done);
      });
  }

  createForm(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    console.log('Task: ', this.taskForm.value);
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {

      const task = !this.taskId
      ? await this.tasksService.create(this.taskForm.value)
      : await this.tasksService.update({
        id: this.taskId,
        ...this.taskForm.value
      });
      console.log('Task saved! ', task);

    } catch (error) {
      console.error('Error ao salvar tarefa: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      this.navCtrl.navigateBack('/tasks');
      loading.dismiss();
    }
  }

}
