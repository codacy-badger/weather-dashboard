export interface City {
  cityId: number;
  name?: string;
  weather?: {
    description: string;
    icon: string;
    id: number;
    main: string;
    temperature: number;
    temp_max: number;
    temp_min: number;
  };
  time?: {
    sunrise: string,
    sunset: string
  };
}
