import { sendPasswordResetEmail } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../firebaseConfig";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  try {
    const result = await sendPasswordResetEmail(auth, email);
    return NextResponse.json({
      data: result,
      messsage: `Şifre sıfırlama bağlantısı ${email} adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.`,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message || "Bir hata oluştu.",
        status: 400,
      });
    }
  }
}
