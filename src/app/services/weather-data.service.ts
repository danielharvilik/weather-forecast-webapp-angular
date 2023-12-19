import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IForecastData } from '../models/models';

interface ApiResponse {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  rain: number[];
  surface_pressure: number[];
  wind_speed_10m: number[];
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,relative_humidity_2m,rain,surface_pressure,wind_speed_10m`;
  historyUrl = `https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,relative_humidity_2m,rain,surface_pressure,wind_speed_10m&past_days=7&forecast_days=0`;

  constructor(private http: HttpClient) {}

  getOneWeekForecastOpenMeteoData(){
    return this.http.get(this.forecastUrl);
  }

  getPastWeekForecastOpenMeteoData(){
    return this.http.get(this.historyUrl);
  }
}
