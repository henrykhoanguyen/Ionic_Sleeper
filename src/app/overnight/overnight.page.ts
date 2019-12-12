import { Component, OnInit } from "@angular/core";
// Data
import { OvernightSleepData } from "../data/overnight-sleep-data";
// Ionic components
import { AlertController } from '@ionic/angular';
// Services
import { SleepService } from "../services/sleep.service";
import { logOvernightData } from "../services/firebase.service";

@Component({
  selector: "app-overnight",
  templateUrl: "./overnight.page.html",
  styleUrls: ["./overnight.page.scss"]
})
export class OvernightPage implements OnInit {
  private sleepTimeStart: String;
  private sleepTimeEnd: String;
  private sleepDateStart: String;
  private sleepDateEnd: String;

  constructor(public sleepService: SleepService, public alertController: AlertController) {}

  ngOnInit() {
    let d = new Date();

    // Setting sleep date
    this.sleepDateStart =
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.sleepDateEnd =
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() + 1);

    // Setting sleeping duration
    if (d.getHours() < 10){
      this.sleepTimeStart = "0" + d.getHours();
      this.sleepTimeEnd = this.sleepTimeStart;
    } else{
      this.sleepTimeStart = String(d.getHours());
      this.sleepTimeEnd = this.sleepTimeStart;
    }

    if (d.getMinutes() < 10){
      this.sleepTimeStart += ":0" + d.getMinutes();
      this.sleepTimeEnd += ":0" + d.getMinutes();
    } else {
      this.sleepTimeStart += ":" + d.getMinutes();
      this.sleepTimeEnd += ":" + d.getMinutes();
    }

    // console.log(this.sleepTimeStart, this.sleepTimeEnd);
  }

  // Ionic Alert Component
  async presentError() {
    const alert = await this.alertController.create({
      header: 'UH OH!',
      message: 'Please re-enter correct information...',
      buttons: ['OKAY']
    });

    await alert.present();
  }

  async presentConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'You have successfully logged your sleep time!',
      buttons: ['OKAY']
    });

    await alert.present();
  }

  // Log Sleep
  public logSleep() {
    var sleepStart = new Date(this.sleepDateStart.split('T')[0] + " " + this.sleepTimeStart);
    var sleepEnd = new Date(this.sleepDateEnd.split('T')[0] + " " + this.sleepTimeEnd);

    // console.log(this.sleepDateStart + " " + this.sleepTimeStart);

    if (sleepStart < sleepEnd) {
      // console.log(sleepStart, sleepEnd);
      let sleep = new OvernightSleepData(sleepStart, sleepEnd);
      // this.sleepService.logOvernightData(sleep); // Log sleep to sleep service
      logOvernightData(sleep); // Log sleep to firebase service
      this.presentConfirmation();
    } else {
      this.presentError();
      this.ngOnInit();
    }
  }
}
