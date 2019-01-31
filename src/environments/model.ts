export interface EnvinronmentModel {
  production: boolean;
  openweathermap: {
    endpoint: string;
    token: string;
  };
}
