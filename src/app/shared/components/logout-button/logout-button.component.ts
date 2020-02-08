import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavController  } from '@ionic/angular';

import { OverlayService } from './../../../core/services/overlay.service';
import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-logout-button',
  template: `
  <ion-buttons slot="start">
    <ion-button (click)="logout()">
      <ion-icon slot="icon-only" name="exit"></ion-icon>
    </ion-button>
  </ion-buttons>
  `
})
export class LogoutButtonComponent implements OnInit {

  @Input() menu: string;

  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private overlayService: OverlayService
  ) { }

  async ngOnInit(): Promise<void> {
    if (!( await this.menuCtrl.isEnabled(this.menu))) {
      this.menuCtrl.enable(true, this.menu);
    }
  }

  async logout(): Promise<void> {
    await this.overlayService.alert({
      message: 'Do you really want to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            try {
              await this.authService.logout();
              await this.menuCtrl.enable(false, this.menu)
              this.navCtrl.navigateRoot('/login');
            } catch (error) {
              await this.overlayService.toast({
                message: error.message
              });
            }

          }
        },
        'No'
      ]
    });
  }

}
