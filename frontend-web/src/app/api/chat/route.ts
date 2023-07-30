import _ from "lodash";
import {
    chat
} from "@/clients/backend_client";

export async function POST(req: Request) {
  const body = await req.json();

  const resp = await chat(body);
  const data = await resp.json();

  if (!resp.ok) {
    return new Response(JSON.stringify({ error: data.error }), {
      status: resp.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response(JSON.stringify(data.response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}