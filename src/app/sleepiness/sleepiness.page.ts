import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SleepService } from "../services/sleep.service";
import { StanfordSleepinessData } from "../data/stanford-sleepiness-data";
import { logSleepinessData } from "../services/firebase.service";

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  private sleepiness: any = 4;
  constructor(public sleepService:SleepService, private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'You have successfully logged your sleepiness!',
      buttons: ['OKAY']
    });

    await alert.present();
  }

  logSleepiness() {
    let temp = new StanfordSleepinessData(this.sleepiness);
    // this.sleepService.logSleepinessData(temp); // log sleepiness to sleep service
    logSleepinessData(temp); // log sleepiness to sleep service
    // console.log(SleepService.AllSleepData);
    this.presentConfirmation();
  }
}

// TODO: firebase service in /src/app/services/firebase.service.ts and /sleep.service.ts
// TODO: edit viewdata