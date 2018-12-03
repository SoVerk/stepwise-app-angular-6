import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../data-storage.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  private data: any;
  private model: DataStorageService;

  constructor(data: DataStorageService) {
    this.model = data;
    this.data = data.getData(1);
  }

  onChange(e) {
    this.applyMask();
    this.model.setData(1, this.data);
  }

  private applyMask() {
    let telephone = this.data.tel.replace(/[^\d-][-\W]/g, '');
    const startMask = '+7 9';
    const space = ' ';
    if (telephone.length === 1 && telephone.length < 6) {
      telephone = startMask + telephone;
    } else if (telephone.length === 6 || telephone.length === 10 || telephone.length === 13) {
      telephone = telephone + space;
    }
    this.data.tel = telephone;
  }

  ngOnInit() {
  }
}
