import { ChatRequest } from "@/app/predict/container";

const API_DOMAIN = "https://google.com";

export async function getHoroscopePrediction(
  req: any
  // birthday: string,
  // birthtime: string,
  // birthplace: string
): Promise<Record<string, any>> {
  const response = await fetch(`https://anthropic-hackathon.onrender.com/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "birthday": "1103",
      "birthtime": "0400",
      "birthplace": "los angeles"
    }),
  });
  const data = await response.json();
  return data;
}

export async function chat(
  req: ChatRequest
): Promise<Record<string, any>> {
  const response = await fetch(`https://anthropic-hackathon.onrender.com/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  const data = await response.json();
  return data;
}