import {Component} from '@angular/core';
import {DataStorageService} from './data-storage.service';
import {Steps} from './steps';
import {Step} from './step';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular6-stepwise';
  steps = Steps;
  selectedStep: Step;
  private model: DataStorageService;

  constructor(data: DataStorageService) {
    this.model = data;
    this.OnInit();
  }

  OnInit() {
    this.selectedStep = Steps[0];
  }

  onSelect(step: Step): void {
    this.selectedStep = step;

  }

  prevStep() {
    const active = this.selectedStep.id;
    this.selectedStep = this.steps[active - 1];
  }

  nextStep() {
    const active = this.selectedStep.id;
    this.model.validateData(active + 1);
    if (this.model.AppData.valid) {
      this.clearStepData(this.selectedStep.id);
      this.selectedStep = this.steps[active + 1];
    }
  }

  clearStepData(id: number) {
    let arr = this.model.AppData;
    for (let i = id + 2; i < 4; i++) {
      for (let key in arr[i]) {
        arr[i][key] = '';
      }
    }
  }
}
