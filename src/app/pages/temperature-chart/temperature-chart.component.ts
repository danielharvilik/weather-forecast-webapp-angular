import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { WeatherService } from '../../services/weather-data.service';
import { HttpClientModule } from '@angular/common/http';
import { animation } from '@angular/animations';
import { callback } from 'chart.js/dist/helpers/helpers.core';
import { formatDateString } from '../../helpers/helper-functions';

@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  imports: [ChartModule, HttpClientModule],
  templateUrl: './temperature-chart.component.html',
  styleUrl: './temperature-chart.component.scss',
})
export class TemperatureChartComponent implements OnInit {
  data: any;

  options: any;

  timeStamps!: string[];
  temperatures!: number[];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.weatherService.getOneWeekForecastOpenMeteoData().subscribe((data) => {
      this.timeStamps = data.hourly.time;
      this.temperatures = data.hourly.temperature_2m;
      this.data = {
        labels: this?.timeStamps.map((timestamp) =>
          formatDateString(timestamp)
        ),
        datasets: [
          {
            label: 'First Dataset',
            data: this?.temperatures,
            fill: false,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            tension: 0.4,
          },
        ],
      };
    });

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      animation: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
            callback: (value: any) => `${value} °C`,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
