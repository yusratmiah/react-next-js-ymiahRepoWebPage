"use client"; // Add this line at the top

import WeatherBlock from "./WeatherBlock";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'; // Import the CSV parser

async function getData(){
  const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=37.227076&longitude=-80.416443&current=temperature_2m&hourly=temperature_2m,precipitation_probability,precipitation,wind_speed_10m,wind_gusts_10m&daily=sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&models=gfs_seamless"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return res.json();
}

function getCurrentDate() {
  const now = new Date();

  // Get the weekday (e.g., Monday)
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });

  // Get the month (e.g., February)
  const month = now.toLocaleDateString('en-US', { month: 'long' });

  // Get the day of the month (e.g., 24)
  const day = now.getDate();

  // Add the suffix for the day (st, nd, rd, th)
  const suffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Special case for 11-13
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // Get the year (e.g., 2025)
  const year = now.getFullYear();

  // Format the full date string
  return `${dayOfWeek}, ${month} ${day}${suffix(day)}, ${year}`;
}

function getOfficialCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString();
}

function getCurrentTimeInMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes
}


function getCurrentDay() {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[dayIndex];
}

function parseTimeToMinutes(time) {
  const [hour, minute] = time.slice(0, -2).split(":").map(Number);
  const period = time.slice(-2); // 'am' or 'pm'

  let totalMinutes = hour * 60 + minute;

  if (period === "pm" && hour !== 12) totalMinutes += 12 * 60;
  if (period === "am" && hour === 12) totalMinutes -= 12 * 60;

  return totalMinutes;
}

function getCurrentClass(scheduleData) {
  const currentDay = getCurrentDay();  // Get current day (e.g., Monday)
  const currentTime = getCurrentTimeInMinutes();  // Get current time in minutes

  for (let i = 0; i < scheduleData.length; i++) {
    const { Classes, Days, Time } = scheduleData[i];

    // Check if the current day is in the "Days" field for this class
    if (Days.includes(currentDay.charAt(0))) { // We assume the day is a single letter ('M', 'T', 'W', etc.)
      const [start, end] = Time.split("-");

      // Convert class start and end times to minutes
      const startTime = parseTimeToMinutes(start);
      const endTime = parseTimeToMinutes(end);

      // Check if current time is within the class time range
      if (currentTime >= startTime && currentTime <= endTime) {
        return Classes; // Return class name
      }
    }
  }

  return "No class at the moment."; // If no class matches the current time
}

// Fetch CSV data and parse it
async function loadScheduleData() {
  const res = await fetch('/spring-classes.csv');
  const csvData = await res.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: reject,
    });
  });
}

export default function Page() {
  const [currentClass, setCurrentClass] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Fetch weather data and schedule data
  useEffect(() => {
    async function updateData() {
      // Fetch weather data
      const weather = await getData();
      setWeatherData(weather);

      // Fetch class schedule data
      const scheduleData = await loadScheduleData();
      const classInProgress = getCurrentClass(scheduleData);
      setCurrentClass(classInProgress);
    }

    updateData();
    const interval = setInterval(updateData, 60000); // Update every minute

    return () => clearInterval(interval); // Clean up interval when component unmounts
  }, []);

  if (!weatherData) return <div>Loading...</div>; // Wait for data to load

  return (
    <main>
      <div className="frontPageTimeTemp">
        <Image src="/CID-Logo-Clear.png" alt="Image of Creativity and Innovation District Logo" width={500} height={300} style={{ display: 'block', margin: '0 auto' }} />
        <h1 className= "font-bold">Welcome to SL Yusrat's Website!</h1>
        <h2>Current Class Status: {currentClass}</h2>

        <br />
        <br />
        <Image src="/virginia-tech-logo.png" alt="Image of Virginia Tech Logo" width={300} height={100} style={{ display: 'block', margin: '0 auto' }} />
          <h1 className= "font-bold">Information About Blacksburg, Virginia</h1>
          <h1>Current Date: {getCurrentDate()}</h1>
          <h1>Current Time: {getOfficialCurrentTime()}</h1>
          <WeatherBlock currentTemperature={weatherData.current.temperature_2m} />
      </div>
    </main>
  );
}