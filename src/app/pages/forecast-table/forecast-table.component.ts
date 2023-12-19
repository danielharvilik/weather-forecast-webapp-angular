import { Component } from '@angular/core';
import { UiTableComponent } from '../../components/ui-table/ui-table.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IForecastData, ITableColumn } from '../../models/models';
import { HttpClientModule } from '@angular/common/http';
import { formatDateString } from '../../helpers/helper-functions';
import { WeatherService } from '../../services/weather-data.service';

@Component({
  selector: 'app-forecast-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UiTableComponent,
    SelectButtonModule,
    HttpClientModule,
  ],
  templateUrl: './forecast-table.component.html',
  styleUrl: './forecast-table.component.scss',
})
export class ForecastTableComponent {
  tableCols!: ITableColumn[];
  forecastData!: IForecastData[];
  historyData!: IForecastData[];
  forecastModel: any[] = [
    { label: 'Forecast', value: 'forecast' },
    { label: 'History', value: 'history' },
  ];
  selectedForecastModel: string = 'forecast';

  constructor(
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.weatherService.getOneWeekForecastOpenMeteoData().subscribe((data) => {
      console.log('fetching', data);
      this.forecastData = this.transformData(data.hourly);
    });
    this.weatherService
      .getPastWeekForecastOpenMeteoData()
      .subscribe((data: any) => {
        console.log('fetching', data);
        this.historyData = this.transformData(data.hourly);
      });

    this.tableCols = [
      { field: 'datetime', header: 'Datetime' },
      { field: 'rain', header: 'Rain' },
      { field: 'temperature', header: 'Temperature (°C)' },
      { field: 'surfacePressure', header: 'Surface Pressure' },
      { field: 'relativeHumidity', header: 'Relative Humidity' },
      { field: 'wind', header: 'Wind (km/h)' },
    ];
  }

  transformData(originalData: any): IForecastData[] {
    const transformedData: IForecastData[] = [];

    for (let i = 0; i < originalData.time.length; i++) {
      const newDataPoint: IForecastData = {
        datetime: formatDateString(originalData.time[i]),
        temperature: originalData.temperature_2m[i],
        relativeHumidity: originalData.relative_humidity_2m[i],
        rain: originalData.rain[i],
        surfacePressure: originalData.surface_pressure[i],
        wind: originalData.wind_speed_10m[i],
      };

      transformedData.push(newDataPoint);
    }

    return transformedData;
  }
}
