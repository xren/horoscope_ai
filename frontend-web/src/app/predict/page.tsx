import React from "react";
import { redirect } from "next/navigation";
import { PredictPageContainer } from "./container";
import { getHoroscopePrediction } from "@/clients/backend_client";

export default function Input({
  searchParams,
}: {
  searchParams: {
    birthday: string;
    birthtime: string;
    birthplace: string;
  };
}) {
  return <PredictPageContainer prediction={searchParams} />;
}
