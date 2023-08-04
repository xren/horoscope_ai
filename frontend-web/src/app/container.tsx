"use client";
import { LightNavbar } from "@/components/navbar";
import React from "react";
import Link from 'next/link'; // Add this import

export function HomePageContainer() {

  const getTimeOfDayGreeting = () => {
    const currentHour = new Date().getHours();
    return currentHour < 12 ? 'Good morning' : 'Good evening';
  };


  return (
    <div data-theme="lofi">
      <LightNavbar />
      <div className="relative top-20 flex flex-col px-6 sm:px-0 lg:px-56 md:px-32 mx-auto w-full pb-12 lg:w-2/3 justify-center items-center space-y-8">
        <h2 className="text-center text-sm">{getTimeOfDayGreeting()}, Chandler. Today at a glance:</h2>
        <img src="moon.png" alt="descriptive text here" className="w-31 h-32" />
        <p className="text-center text-md">
          Locked up in your tower of self-restriction is a timid child who wants to love and be loved
        </p>
        <img src="chart.png" alt="descriptive text here" />
        <div className="flex justify-center mt-4">
          <Link href="/input" className="btn btn-primary">
            Know Yourself
          </Link>
        </div>
        
      </div>
    </div>
  );
}
