import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../data-storage.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  private data: any;
  private response: any;
  private model: DataStorageService;
  private countries: any;
  private http: HttpClient;

  constructor(data: DataStorageService, http: HttpClient) {
    this.model = data;
    this.http = http;
    this.data = data.getData('2');
  }
  onChange(e) {
    this.model.setData('2', this.data);
  }
  ngOnInit() {
    this.http.get('../../assets/country.json').subscribe((result) => {
      this.response = result;
      const Items = new Array();
      this.response.forEach(function (item) {
        Items.push(item);
      });
      this.countries = Items;
    });
  }
}

