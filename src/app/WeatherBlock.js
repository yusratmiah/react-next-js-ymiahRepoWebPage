"use client";
//import Image from "next/image";

// loader function that will create a url on wherever these functions live
export default function WeatherBlock({ currentTemperature }) {
  // Decide which image to show based on temperature
  // /*Image src= {weatherIcon} width={300} height={300} alt="Weather Icon" />
  const weatherIcon = currentTemperature > 60 ? "☀️" : "❄️";
  return (
    <div>
      <h2>Current Temperature: {currentTemperature}°F {weatherIcon}</h2>
      
    </div>
  );
}