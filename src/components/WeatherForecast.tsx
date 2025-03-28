import React, { useState, useEffect } from 'react';
import './WeatherForecast.css'; // Importing the CSS for styling

interface ForecastItem {
  area: string;
  forecast: string;
}

interface ApiResponse {
  data: {
    items: {
      forecasts: ForecastItem[];
      timestamp: string;
      update_timestamp: string;
    }[];
  };
  api_info?: {
    status: string;
  };
}


const WeatherForecast: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [resultLocation, setResultLocation] = useState<string>('');
  const [forecast, setForecast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fetch available areas on component mount
  useEffect( () => {
    const fetchAvailableAreas = async () => {
      try {
        const response = await fetch(
          'https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast'
        );
      
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data: ApiResponse = await response.json();
      
        if (data.data?.items?.[0]?.forecasts) {
          const areas = data.data.items[0].forecasts.map(item => item.area);
          setAvailableAreas(areas);
        }
      } catch (err) {
        console.error('Error fetching available areas:', err);
      }
  };

  fetchAvailableAreas();
}, []);

    const fetchForecast = async () => {
      const queryLocation = location.trim();
      if (!queryLocation) {
        setError('Please enter a location in Singapore');
        return;
      }
      setError(null); // Reset error message
      setForecast(null); // Reset forecast data
      setLoading(true); // Show loading indicator

      try {
        const response = await fetch(
          'https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast'
          //'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok (${response.status})');
        }
        const data: ApiResponse = await response.json();
        setLoading(false); // Hide loading indicator after data is fetched

        // Log the full API response to inspect its structure
        console.log('API Response: ', data);

        if (!data.data?.items?.[0]?.forecasts) {
          throw new Error('No forecast data available for the API response');
          return;
        }

        // Extract update timestamp if available
        if (data.data.items[0].update_timestamp) {
          setLastUpdated(new Date(data.data.items[0].update_timestamp).toLocaleString());
        }

        // Find the forecast for the specified location
        const foundForecast = data.data.items[0].forecasts.find(
          (f) => f.area.toLowerCase() === queryLocation.toLowerCase()
        );

        if (foundForecast) {
          setResultLocation(queryLocation);
          setForecast(foundForecast.forecast);
        } else {
          setError(`Location not found. Try one of these : ${availableAreas.slice(0, 5).join(', ')}${availableAreas.length > 5 ? '...' : ''}`);
        }
      } catch (err) {
        setError(`Error: ${(err as Error).message}`);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchForecast();
    }
  };

  return (
    <div className='container'>
      <h3 className='title'>Singapore's 2-Hour Weather Forecast</h3>
      <div className='form-group'>
        <input
          type="text"
          className="location-input"
          value={location}
          onChange={handleLocationChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter location in Singapore (e.g., Ang Mo Kio)"
          list="area-suggestions"
        />
        <datalist id="area-suggestions">
          {availableAreas.map(area => (
            <option key={area} value={area} />
          ))}
        </datalist>
      </div>

      <button 
        className="get-forecast-button" 
        onClick={fetchForecast}
        disabled={loading || !location.trim()}
      >
          {loading ? 'Loading... ': 'Get Forecast'}
      </button>

      {loading && <div className="loading-indicator">Loading Forecast...</div>}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {forecast && (
        <div className="forecast-result">
          <h4>Weather for {resultLocation}</h4>
          <p className="forecast-text">{forecast}</p>
          {lastUpdated && (
            <p className="update-time">Last updated: {lastUpdated}</p>
          )}
        </div>
      )}
    </div>
  );
};
export default WeatherForecast;
