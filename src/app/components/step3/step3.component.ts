import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../data-storage.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  private data: any;
  private model: DataStorageService;
  private time: Date;
  private timer = {days: '', hours: '', min: '', sec: ''};
  private timerUpdate: number;
  private renewDate: number;
  private minDate: string;
  private minTime: string;

  constructor(data: DataStorageService) {
    this.model = data;
    this.data = data.getData(3);
    this.renewDate = setInterval(() => {
      this.time = new Date();
      this.minDate = '' + this.time.getFullYear() + '-' + (this.time.getMonth() + 1) + '-' + this.time.getDate();
      this.minTime = this.time.getHours() + ':' + (this.time.getMinutes() + 1);
    }, 500);
    return;
  }

  onChange(e) {
    this.model.setData(3, this.data);
    this.calculateDate();
  }

  calculateDate() {
    if (this.data.time && this.data.date) {
      this.timerUpdate = setInterval(() => {
        this.setTimer();
      }, 1000);
      return;
    }
    clearInterval(this.timerUpdate);
    return;
  }

  ngOnInit() {
  }

  private getTimeDiff(diff) {
    this.timer.days = this.addDigits(Math.floor(diff));
    diff = diff - parseFloat(this.timer.days);
    this.timer.hours = this.addDigits(Math.floor(diff * 24));
    diff = (diff * 24) - parseFloat(this.timer.hours);
    this.timer.min = this.addDigits(Math.floor(diff * 60));
    diff = (diff * 60) - parseFloat(this.timer.min);
    this.timer.sec = this.addDigits(Math.floor(diff * 60));
  }

  private setTimer() {
    const time = this.data.time.split(':');
    const hour = time[0];
    const minute = time[1];
    const date = this.data.date.split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    const enterDate = new Date(year, month - 1, day, hour, minute);
    const diff = (enterDate.getTime() - this.time.getTime()) / (3600 * 24 * 1000);
    this.getTimeDiff(diff);
  }

  private addDigits(num: number) {
    if (num < 0) {
      return '00';
    } else if (num >= 0 && num <= 9) {
      return '0' + num;
    } else {
      return '' + num;
    }
  }
}
