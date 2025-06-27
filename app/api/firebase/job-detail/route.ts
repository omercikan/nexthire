import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebaseConfig";
import { EmployerOpenJobs } from "@/types";
import { cookies } from "next/headers";

/**
 * API route handler to fetch job posting details.
 *
 * Receives a POST request with `postID` in JSON body.
 * Decodes the company ID from cookie.
 * Queries Firestore employers collection and retrieves the matching job.
 * Used to display job detail page on frontend.
 *
 * @param req - Incoming Next.js request with JSON body containing `postID`.
 * @returns JSON response with the matched job and status or error message.
 */

export async function POST(req: NextRequest) {
  const { postID } = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("CIDVSD");
  const companyID = atob(token?.value as string);

  try {
    const docRef = query(
      collection(db, "employers"),
      where("eid", "==", companyID),
      limit(1)
    );
    const docData = await getDocs(docRef);

    const job: (EmployerOpenJobs & { companyLogo: string })[] = [];

    docData.forEach((snapshot) => {
      const data = snapshot.data();

      const filteredJob = data.openJobs.find(
        (job: EmployerOpenJobs) => job.postId == postID
      );

      const companyInformations = {
        companyLogo: data.companyInformations.companyLogo,
        companyName: data.companyInformations.companyName,
        serviceArea: data.companyInformations.serviceArea,
        numberOfEmployees: data.companyInformations.numberOfEmployees,
      };

      job.push({
        ...filteredJob,
        ...companyInformations,
      });
    });

    return NextResponse.json({ job: job[0], status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error?.message, status: 400 });
  }
}
