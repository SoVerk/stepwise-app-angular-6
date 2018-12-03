import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  AppData =
    {
      1: {'tel': ''},
      2: {
        'email': '',
        'password': '',
        'country': ''
      },
      3: {
        time: '',
        date: ''
      },
      'valid': true
    };


  setData(key, data) {
    this.AppData[key] = data;
  }

  getData(key) {
    return this.AppData[key];
  }

  validateData(key): boolean {
    if (key === 1) {
      const tel = this.AppData[key].tel;
      if (tel.match(/\d/g) !== null && tel.match(/\d/g).length === 11) {
        tel.match(/\d/g);
        this.AppData.valid = true;
        return;
      }
      this.AppData.valid = false;
      return;
    } else if (key === 2) {
      for (let field in this.AppData[key]) {
        if (this.AppData[key][field] === null || this.AppData[key][field] === '') {
          this.AppData.valid = false;
          return;
        } else if (field === 'password' && this.AppData[key][field].length < 6) {
          this.AppData[key][field] = '';
          this.AppData.valid = false;
          return;
        } else if (field === 'email' && this.AppData[key][field].length < 6) {
          this.AppData[key][field] = '';
          this.AppData.valid = false;
          return;
        } else if (field === 'country' && this.AppData[key][field] === 'Не выбрано') {
          this.AppData.valid = false;
          return;
        }
      }
    }
    this.AppData.valid = true;
  }

  constructor() {
  }
}
