import { Routes } from '@angular/router';
import { ForecastTableComponent } from './pages/forecast-table/forecast-table.component';
import { TemperatureChartComponent } from './pages/temperature-chart/temperature-chart.component';
import { HeatIndexCalculatorComponent } from './pages/heat-index-calculator/heat-index-calculator.component';

export const routes: Routes = [
  { path: '', component: ForecastTableComponent },
  { path: 'temperature-chart', component: TemperatureChartComponent },
  { path: 'heat-index-calculator', component: HeatIndexCalculatorComponent },
];
