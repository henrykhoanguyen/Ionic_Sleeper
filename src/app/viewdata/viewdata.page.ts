import { Component, OnInit } from "@angular/core";
// Services
import { SleepService } from "../services/sleep.service";
import {
  getOvernightData,
  getSleepinessData,
  deleteData
} from "../services/firebase.service";

@Component({
  selector: "app-viewdata",
  templateUrl: "./viewdata.page.html",
  styleUrls: ["./viewdata.page.scss"]
})
export class ViewdataPage implements OnInit {
  private allOvernight: any = getOvernightData();
  private allSleep: any = getSleepinessData();
  // private static LoadDefaultData: boolean = true;

  constructor(public sleepService: SleepService) {
    // this.getOvernight();
    // this.getSleepiness();
    this.getData();
  }

  ngOnInit() {}

  async getData() {
    this.allOvernight = await getOvernightData();
    this.allSleep = await getSleepinessData();
  }

  async deleteSleep(key) {
    // console.log(key);
    await deleteData(key, "sleepiness");
    this.clearData();
  }

  async deleteItem(key) {
    // console.log(key);
    await deleteData(key, "overnight");
    this.clearData();
  }

  clearData() {
    this.allSleep = [];
    this.allOvernight = [];
    this.getData();
  }
}
