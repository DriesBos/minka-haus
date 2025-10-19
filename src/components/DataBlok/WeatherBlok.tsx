'use client';

import { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import DataBlok from './DataBlok';

// Set to true to test loading state with 1 second delay
const TEST_LOADING_DELAY = false;

interface WeatherData {
  temperature: number;
  humidity: number;
  weatherCode: number;
}

// Convert weather code to readable condition
const getWeatherCondition = (code: number): string => {
  const weatherConditions: { [key: number]: string } = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Light Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Light Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Slight Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Slight Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Violent Rain Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Slight Hail',
    99: 'Thunderstorm with Heavy Hail',
  };

  return weatherConditions[code] || 'Unknown';
};

export default function WeatherBlok() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const params = {
          latitude: 35.1134,
          longitude: 135.7254,
          models: 'jma_seamless',
          current: ['temperature_2m', 'relative_humidity_2m', 'weather_code'],
          forecast_days: 3,
        };
        const url = 'https://api.open-meteo.com/v1/forecast';
        const responses = await fetchWeatherApi(url, params);

        // Process first location
        const response = responses[0];
        const current = response.current()!;

        // Extract weather data
        const weatherData = {
          temperature: Math.round(current.variables(0)!.value()),
          humidity: Math.round(current.variables(1)!.value()),
          weatherCode: current.variables(2)!.value(),
        };

        // Add delay for testing loading state
        if (TEST_LOADING_DELAY) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    // Fetch immediately
    fetchWeather();

    // Update every 10 minutes (600000ms)
    const interval = setInterval(fetchWeather, 600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DataBlok
        label="Temp"
        value={weather ? `${weather.temperature}°` : '--°'}
        loading={!weather}
      />
      <DataBlok
        label="Humidity"
        value={weather ? `${weather.humidity}%` : '--%'}
        loading={!weather}
      />
      <DataBlok
        label="Conditions"
        value={
          weather ? getWeatherCondition(weather.weatherCode) : 'Loading...'
        }
        loading={!weather}
      />
    </>
  );
}
