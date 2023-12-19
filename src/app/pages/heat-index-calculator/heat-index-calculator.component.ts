import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import {
  calculateHeatIndex,
  celsiusToFarenheitConversion,
  fahrenheitToCelsiusConversion,
} from '../../helpers/helper-functions';
import { CalculationValuesHistoryService } from '../../services/calculation-values-history.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-heat-index-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    ReactiveFormsModule,
    SelectButtonModule,
    TableModule
  ],
  templateUrl: './heat-index-calculator.component.html',
  styleUrl: './heat-index-calculator.component.scss',
})
export class HeatIndexCalculatorComponent implements OnInit {
  isInputTemperatureValueValid!: boolean;
  temperature: number = 0;
  temperatureUsedForCalculation: number = 0;
  humidity: number = 0;
  heatIndex: number | null = null;

  heatIndexHistory!: number[];

  temperatureUnits: any[] = [
    { label: '°C', value: 'celsius' },
    { label: '°F', value: 'farenheit' },
  ];
  selectedTemperatureUnit: string = 'celsius';

  constructor(private historyService: CalculationValuesHistoryService) {}

  ngOnInit(): void {
    this.heatIndexHistory = this.historyService.getHistory();
    this.isInputTemperatureValueValid = false;
  }

  onInputTemperatureChange(event: any) {
    if (this.selectedTemperatureUnit === 'celsius') {
      this.temperatureUsedForCalculation = celsiusToFarenheitConversion(
        event.value
      );
    } else this.temperatureUsedForCalculation = event.value;

    if (this.temperatureUsedForCalculation < 80) {
      this.isInputTemperatureValueValid = false;
    } else this.isInputTemperatureValueValid = true;
  }

  onTemperatureUnitChange(event: any): void {
    if (event.value === 'farenheit') {
      this.temperature = celsiusToFarenheitConversion(this.temperature);
    } else if (event.value) {
      this.temperature = fahrenheitToCelsiusConversion(this.temperature);
    }
  }

  calculateHeatIndex(): void {
    if (this.selectedTemperatureUnit === 'celsius') {
      this.temperatureUsedForCalculation = celsiusToFarenheitConversion(
        this.temperature
      );
    } else this.temperatureUsedForCalculation = this.temperature;

    this.heatIndex = calculateHeatIndex(
      this.temperatureUsedForCalculation,
      this.humidity
    );

    this.heatIndex = Math.round(this.heatIndex * 100) / 100;

    alert('The heat index is ' + this.heatIndex + ' °F');

    this.historyService.addToHistory(this.heatIndex);
    this.heatIndexHistory = this.historyService.getHistory();
  }
}
