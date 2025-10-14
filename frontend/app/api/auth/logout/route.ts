import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const ajt = cookieStore.get("ajt");

  const tokens = ["ajt", "rjt"];
  tokens.forEach(async (tk) => cookieStore.delete(tk));

  return NextResponse.json({
    message: "Exit made",
    ajt,
  });
}
