import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const query = queryParams.get("q");

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GEOCODE_URL}&q=${query}`
    );
    const data = await res.data[0];

    return NextResponse.json(
      { geo: { lon: Number(data.lon), lat: Number(data.lat) } },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
