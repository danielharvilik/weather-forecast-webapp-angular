// helper functions for temperature conversion, data transformations

export function formatDateString(inputDate: string): string {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  return formattedDate;
}

export function celsiusToFarenheitConversion(inputValue: number): number {
  return (inputValue * 9) / 5 + 32;
}

export function fahrenheitToCelsiusConversion(inputValue: number): number {
  return ((inputValue - 32) * 5) / 9;
}

export function calculateHeatIndex(
  temperatureInFarenheit: number,
  humidity: number
): number {
  return (
    -42.379 +
    2.04901523 * temperatureInFarenheit +
    10.14333127 * humidity -
    0.22475541 * temperatureInFarenheit * humidity -
    6.83783e-3 * (temperatureInFarenheit * temperatureInFarenheit) -
    5.481717e-2 * (humidity * humidity) +
    1.22874e-3 * (temperatureInFarenheit * temperatureInFarenheit) * humidity +
    8.5282e-4 * temperatureInFarenheit * (humidity * humidity) -
    1.99e-6 *
      (temperatureInFarenheit * temperatureInFarenheit) *
      (humidity * humidity)
  );
}
