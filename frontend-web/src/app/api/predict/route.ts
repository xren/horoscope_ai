import _ from "lodash";
import { getHoroscopePrediction } from "@/clients/backend_client";

export async function POST(req: Request) {
  const body = await req.json();
  const resp = await getHoroscopePrediction(body);
  console.log("predict res", resp);
  return new Response(JSON.stringify(resp.response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
