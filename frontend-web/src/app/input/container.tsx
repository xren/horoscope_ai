"use client";
import { LightNavbar } from "@/components/navbar";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import { useRouter } from "next/navigation";
import ReactSelect from "react-select";

export function InputPageContainer() {
  const router = useRouter();
  const [value, setValue] = useState({ startDate: null, endDate: null });
  const [birthday, setBirthday] = useState("");
  const [time, setTime] = useState("");
  const [birthplace, setBirthplace] = useState("");

  const handleValueChange = (newValue: any) => {
    const date = moment(newValue.startDate);
    const formattedDate = date.format("YYYYMMDD");
    setValue(newValue);
    setBirthday(formattedDate);
  };

  const onSelectBirthTime = (e: any) => {
    setTime(e.target.value);
    const selectElement = document.querySelector(
      ".select"
    ) as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log(selectedValue);

    const time1 = moment(selectedValue, "h:mm A");
    const formattedTime1 = time1.format("HHmm");
    setTime(formattedTime1);
  };

  const onSubmit = () => {
    router.push(
      "/predict?birthday=" +
        birthday +
        "&birthtime=" +
        time +
        "&birthplace=" +
        birthplace
    );
  };

  const cityOptions = [
    { value: 'san_francisco', label: 'San Francisco' },
    // Add other cities here
  ];

  return (
    <div data-theme="lofi">
      <LightNavbar />
      <div className="relative top-20 flex flex-col px-6 sm:px-0 lg:px-56 md:px-32 mx-auto w-full pb-12 lg:w-2/3 justify-center items-center space-y-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center pb-4">
        Chart your course with the stars
        </h1>
        <div className="w-full flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold">Birth Date</h2>
          <div className="border border-gray-300 rounded-md h-full">
            <Datepicker
              primaryColor={"blue"}
              useRange={false}
              asSingle={true}
              value={value}
              onChange={handleValueChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold">Birth Time</h2>
          <select
            className="select select-bordered w-full max-w-full rounded-md"
            onChange={onSelectBirthTime}
          >
            <option disabled selected>
              -
            </option>
            <option>12:00 AM</option>
            <option>1:00 AM</option>
            <option>2:00 AM</option>
            <option>3:00 AM</option>
            <option>4:00 AM</option>
            <option>5:00 AM</option>
            <option>6:00 AM</option>
            <option>7:00 AM</option>
            <option>8:00 AM</option>
            <option>9:00 AM</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 PM</option>
            <option>1:00 PM</option>
            <option>2:00 PM</option>
            <option>3:00 PM</option>
            <option>4:00 PM</option>
            <option>5:00 PM</option>
            <option>6:00 PM</option>
            <option>7:00 PM</option>
            <option>8:00 PM</option>
            <option>9:00 PM</option>
            <option>10:00 PM</option>
            <option>11:00 PM</option>
          </select>
        </div>
          <div className="w-full flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold">Birth Place</h2>
          <ReactSelect 
            options={cityOptions} 
            onChange={(selectedOption) => {
              if (selectedOption)
              setBirthplace(selectedOption.value)
            }} 
          />
        </div>
      </div>
      <div className="fixed left-0 w-full bottom-4 sm:bottom-32 mx-auto flex flex-row justify-center items-center">
        <button className="btn btn-primary btn-wide" onClick={onSubmit}>
          Get Ur Chart
        </button>
      </div>
    </div>
  );
}
