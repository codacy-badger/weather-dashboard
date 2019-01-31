import { EnvinronmentModel } from './model';

export const environment: EnvinronmentModel= {
  production: true,
  openweathermap: {
    endpoint: 'https://api.openweathermap.org/data/2.5/weather',
    token: '9a75971df07ea2b05cdc712c57819d18'
  }
};
