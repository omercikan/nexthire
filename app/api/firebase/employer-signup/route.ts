import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../firebaseConfig";
import { FormatText } from "@/lib/formatText";
import { formatTurkishPhoneNumber } from "@/lib/formatPhoneNumber";
import { setUserDatabase } from "@/lib/setUserDatabase";

export async function POST(req: NextRequest) {
  const {
    nameAndSurname,
    email,
    phoneNumber,
    companyName,
    city,
    district,
    taxCity,
    taxOffice,
    taxNumber,
  } = await req.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      String(process.env.FIREBASE_EMPLOYER_FIRST_PASSWORD)
    );

    await sendPasswordResetEmail(auth, email);

    const createdData = {
      companyInformations: {
        companyName: companyName,
        phoneNumber: formatTurkishPhoneNumber(phoneNumber),
        email: email,
        location: {
          city: city,
          district: FormatText(district),
          taxCity: taxCity,
          taxOffice: FormatText(taxOffice),
          taxNumber: taxNumber,
        },
      },
      name: nameAndSurname,
      id: userCredential.user.uid,
      emailVerified: userCredential.user.emailVerified,
      role: "employer",
    };

    await setUserDatabase("employers", userCredential, createdData);
    await setUserDatabase("users", userCredential, createdData);

    return NextResponse.json({ user: userCredential.user, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }
}
