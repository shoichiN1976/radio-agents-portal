import { NextRequest, NextResponse } from "next/server";
import { agents } from "@/lib/agents";

const passwords: Record<string, string> = {
  "kawada-chiyume": process.env.PASSWORD_KAWADA ?? "1976",
  "sean-kawakami": process.env.PASSWORD_SEAN ?? "0321",
  "shiga-naoya": process.env.PASSWORD_SHIGA ?? "1915",
  "ai-edison": process.env.PASSWORD_EDISON ?? "1847",
  "ai-nishimura": process.env.PASSWORD_NISHIMURA ?? "1948",
  "ai-seishonagon": process.env.PASSWORD_SEISHONAGON ?? "0966",
};

export async function POST(request: NextRequest) {
  const { agentId, password } = await request.json();

  const correctPassword = passwords[agentId];
  if (!correctPassword) {
    return NextResponse.json({ success: false, error: "Agent not found" }, { status: 404 });
  }

  if (password !== correctPassword) {
    return NextResponse.json({ success: false, error: "Incorrect password" }, { status: 401 });
  }

  const agent = agents.find((a) => a.id === agentId);
  if (!agent) {
    return NextResponse.json({ success: false, error: "Agent not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, url: agent.url });
}
