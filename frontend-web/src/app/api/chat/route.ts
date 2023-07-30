import _ from "lodash";
import { chat } from "@/clients/backend_client";

export async function POST(req: Request) {
  const body = await req.json();
  const resp = await chat(body);
  console.log("chat res", resp);
  return new Response(JSON.stringify(resp.response.answer[0]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
