import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from '../components/Weather';
import Spinner from '../public/spinner.gif';

export default function App() {
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
  const zipUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},IN&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  const fetchWeatherByCity = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(url);
      const windSpeedKmh = response.data.wind.speed * 1.60934;
      setWeather({ ...response.data, wind_speed_kmh: windSpeedKmh });
    } catch (error) {
      alert('City not found. Please try again.');
    }
    setCity('');
    setLoading(false);
  };

  const fetchWeatherByZip = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(zipUrl);
      const windSpeedKmh = response.data.wind.speed * 1.60934;
      setWeather({ ...response.data, wind_speed_kmh: windSpeedKmh });
    } catch (error) {
      alert('ZIP Code not found. Please try again.');
    }
    setZipCode('');
    setLoading(false);
  };

  const getBackgroundClass = () => {
    if (!weather.main) return 'bg-gradient-to-r from-blue-500 to-purple-600'; // Default

    const temp = weather.main.temp;
    const condition = weather.weather[0].main.toLowerCase();

    if (condition.includes('rain')) return 'bg-gradient-to-r from-gray-600 to-blue-700'; // Rainy
    if (condition.includes('snow')) return 'bg-gradient-to-r from-blue-500 to-gray-300'; // Snowy
    if (condition.includes('cloud')) return 'bg-gradient-to-r from-gray-500 to-gray-800'; // Cloudy

    if (temp >= 30) return 'bg-gradient-to-r from-red-500 to-orange-600'; // Hot
    if (temp >= 20) return 'bg-gradient-to-r from-yellow-400 to-orange-500'; // Warm
    if (temp >= 10) return 'bg-gradient-to-r from-blue-400 to-green-500'; // Mild
    return 'bg-gradient-to-r from-blue-600 to-purple-800'; // Cold
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen text-white transition-all duration-500 ${getBackgroundClass()}`}>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="A modern weather app" />
        <link rel="icon" href="/weather2.png" />
      </Head>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 max-w-lg w-full text-center">
        <h1 className="text-3xl font-semibold mb-4">🌤 Weather App</h1>

        <div className="flex flex-col gap-3">
          {/* City Search */}
          <form onSubmit={fetchWeatherByCity} className="flex items-center bg-white/20 rounded-lg p-3">
            <input
              type="text"
              value={city}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Remove non-alphabetic characters
                setCity(value);
              }}            
              placeholder="Search city..."
              className="bg-transparent flex-grow text-white placeholder-white focus:outline-none px-2"
            />
            <button type="submit">
              <BsSearch size={22} />
            </button>
          </form>

          {/* ZIP Code Search */}
          <form onSubmit={fetchWeatherByZip} className="flex items-center bg-white/20 rounded-lg p-3">
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/[^\d]/g, ''))}
              placeholder="Enter ZIP code..."
              className="bg-transparent flex-grow text-white placeholder-white focus:outline-none px-2"
            />
            <button type="submit">
              <BsSearch size={22} />
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="mt-5">
          <Image src={Spinner} alt="Loading..." width={80} height={80} />
        </div>
      )}

      {!loading && weather.main && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6 max-w-lg w-full text-center mt-6">
          <Weather data={weather} />
        </div>
      )}
    </div>
  );
}