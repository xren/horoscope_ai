"use client";
import { LightNavbar } from "@/components/navbar";
import React from "react";

export function HomePageContainer() {
  return (
    <div data-theme="lofi">
      <LightNavbar />
      <div className="relative top-20 flex flex-col px-6 sm:px-0 lg:px-56 md:px-32 mx-auto w-full pb-12 lg:w-2/3 justify-center items-center space-y-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center pb-4">
          Welcome
        </h1>
      </div>
    </div>
  );
}
