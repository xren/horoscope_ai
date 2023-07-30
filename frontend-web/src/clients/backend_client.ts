import { ChatRequest } from "@/app/predict/container";

const API_DOMAIN = "https://google.com";

export async function getHoroscopePrediction(
  req: any
): Promise<Record<string, any>> {
  const response = await fetch(
    `https://anthropic-hackathon.onrender.com/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }
  );
  const data = await response.json();
  return data;
}

export async function chat(req: ChatRequest): Promise<Record<string, any>> {
  const response = await fetch(
    `https://anthropic-hackathon.onrender.com/query2`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }
  );
  const data = await response.json();
  return data;
}
