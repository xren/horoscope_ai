import React from "react";
import { redirect } from "next/navigation";
import { PredictPageContainer } from "./container";
import { getHoroscopePrediction } from "@/clients/backend_client";

export default function Home({
  searchParams,
}: {
  searchParams: {
    birthday: string;
    birthtime: string;
    birthplace: string;
  };
}) {
  console.log("#@@@@", searchParams);
  return <PredictPageContainer prediction={searchParams} />;
}
