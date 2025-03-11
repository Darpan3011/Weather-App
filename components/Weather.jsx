import Image from 'next/image';

export default function Weather({ data }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold">{data.name}, {data.sys.country}</h2>
      <p className="text-lg">{data.weather[0].main}</p>
      <div className="flex justify-center items-center gap-3">
        <Image
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Weather Icon"
          width={80}
          height={80}
        />
        <h1 className="text-5xl font-bold">{data.main.temp.toFixed(0)}°C</h1>
      </div>
      <p className="text-sm">Wind: {data.wind.speed.toFixed(0)} km/h</p>
      <p className="text-sm">Humidity: {data.main.humidity}%</p>
    </div>
  );
}
