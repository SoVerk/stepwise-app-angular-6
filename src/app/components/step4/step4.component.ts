import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../../data-storage.service';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {
  private data: any;
  private model: DataStorageService;

  constructor(data: DataStorageService) {
    this.model = data;
  }

  ngOnInit() {
  }
}
