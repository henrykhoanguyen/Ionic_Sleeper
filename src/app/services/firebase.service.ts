import { Injectable } from "@angular/core";
// Firebase
import * as firebase from "firebase";

const firedb: any = firebase.database();

export const logOvernightData = sleepData => {
  // console.log(JSON.stringify(sleepData.sleepStart));
  firedb
    .ref("overnight/")
    .push()
    .set({
      sleepStart: String(sleepData.sleepStart),
      sleepEnd: String(sleepData.sleepEnd)
    });
};

export const logSleepinessData = sleepData => {
  // console.log(sleepData);
  firedb
    .ref("sleepiness/")
    .push()
    .set({
      loggedValue: String(sleepData.loggedValue),
      loggedAt: String(sleepData.loggedAt)
    });
};

export const getOvernightData = () => {
  var returnArr = [];
  firedb
    .ref("overnight/")
    .once("value")
    .then(snapshot => {
      // console.log(snapshotToArray(snapshot));

      for (let snap in snapshot.val()) {
        // console.log(snapshot.child(snap).val())
        // console.log(snapshot.child(snap))
        const data = snapshot.child(snap).val();

        var difference_ms =
          new Date(data.sleepEnd).getTime() -
          new Date(data.sleepStart).getTime();
        // console.log(data, difference_ms);

        returnArr.push({
          key: snap,
          sleepStart: new Date(data.sleepStart).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          }),
          duration:
            Math.floor(difference_ms / (1000 * 60 * 60)) +
            " hours, " +
            Math.floor((difference_ms / (1000 * 60)) % 60) +
            " minutes."
        });
      }
    })
    .catch(err => console.log(err));
  // console.log(returnArr);
  return returnArr;
};

export const getSleepinessData = () => {
  var returnArr = [];
  firedb
    .ref("sleepiness/")
    .once("value")
    .then(snapshot => {
      // console.log(snapshotToArray(snapshot));

      for (let snap in snapshot.val()) {
        const data = snapshot.child(snap).val();
        // console.log(data);
        returnArr.push({
          key: snap,
          loggedAt: new Date(data.loggedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          }),
          loggedValue: data.loggedValue
        });
      }
    })
    .catch(err => console.log(err));

  // console.log(returnArr);
  return returnArr;
};

export const deleteData = (key, type) => {
  firebase
    .database()
    .ref(`${type}/${key}`)
    .remove();
};
