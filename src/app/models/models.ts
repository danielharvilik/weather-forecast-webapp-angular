/**
 * Deines valid options for the Column in table component.
 * @group Interface
 */
export interface ITableColumn {
  field: string;
  header: string;
}

/**
 * Deines valid options for the displayed forecast data.
 * @group Interface
 */
export interface IForecastData {
  datetime: string;
  rain: number;
  temperature: number;
  surfacePressure: number;
  relativeHumidity: number;
  wind: number;
}
