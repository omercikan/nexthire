import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { FormatText } from "@/lib/formatText";
import { formatTurkishPhoneNumber } from "@/lib/formatPhoneNumber";

export async function POST(req: NextRequest) {
  const {
    nameAndSurname,
    email,
    phoneNumber,
    companyName,
    city,
    district,
    TaxOfficieCity,
    TaxOffice,
    taxNumber,
  } = await req.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      String(process.env.FIREBASE_EMPLOYER_FIRST_PASSWORD)
    );

    await sendPasswordResetEmail(auth, email);

    await setDoc(doc(db, "employers", userCredential.user.uid), {
      eid: userCredential.user.uid,
      name: nameAndSurname,
      phoneNumber: formatTurkishPhoneNumber(phoneNumber),
      email: email,
      companyName: companyName,
      location: {
        city: city,
        district: FormatText(district),
        taxOfficieCity: TaxOfficieCity,
        taxOffice: FormatText(TaxOffice),
        taxNumber: taxNumber,
      },
      createdAt: new Date(Timestamp.now().seconds * 1000).toLocaleDateString(
        "tr"
      ),
      emailVerified: userCredential.user.emailVerified,
      role: "employer",
    });

    await setDoc(doc(db, "users", userCredential.user.uid), {
      id: userCredential.user.uid,
      name: nameAndSurname,
      phoneNumber: formatTurkishPhoneNumber(phoneNumber),
      email: email,
      companyName: companyName,
      location: {
        city: city,
        district: FormatText(district),
        taxOfficieCity: TaxOfficieCity,
        taxOffice: FormatText(TaxOffice),
        taxNumber: taxNumber,
      },
      createdAt: new Date(Timestamp.now().seconds * 1000).toLocaleDateString(
        "tr"
      ),
      emailVerified: userCredential.user.emailVerified,
      role: "employer",
    });

    return NextResponse.json({ user: userCredential.user, status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }
}
