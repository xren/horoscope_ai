import { ChatRequest, ChatResponse } from "@/app/predict/container";
import { PredictRequest, PredictResponse } from "@/app/predict/container";

export async function chat(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const data = await res.text();
    throw new Error(`Failed to generate image: ${data}`);
  }
  const data = await res.json();
  return data;
}

export async function predict(req: PredictRequest): Promise<PredictResponse> {
  const res = await fetch("/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const data = await res.text();
    throw new Error(`Failed to generate image: ${data}`);
  }
  const data = await res.json();
  return data;
}
