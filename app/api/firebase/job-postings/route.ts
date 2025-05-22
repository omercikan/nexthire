import {
  collection,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebaseConfig";
import { EmployerOpenJobs } from "@/types";

export async function POST(req: NextRequest) {
  const {
    modeOfWork,
    experienceTime,
    positionLevel,
  }: { modeOfWork: string; experienceTime: string[]; positionLevel: string[] } =
    await req.json();

  const { searchParams } = new URL(req.url);
  const sortValue = searchParams.get("sort");
  const startIndex = Number(searchParams.get("start"));
  const endIndex = Number(searchParams.get("end"));

  try {
    const q = query(
      collection(db, "employers"),
      where("openJobs", ">", []),
      orderBy("createdAt", sortValue === "asc" || sortValue === "desc" ? sortValue : undefined )
    );

    const docData = (await getDocs(q)).docs.slice(startIndex, endIndex);

    const jobs: (EmployerOpenJobs & { companyInformations: object })[] = [];

    docData.forEach((snapshot) => {
      const data = snapshot.data();
      const companyInformations = {
        companyLogo: data.companyInformations.companyLogo,
        companyName: data.companyInformations.companyName,
        serviceArea: data.companyInformations.serviceArea,
        numberOfEmployees: data.companyInformations.numberOfEmployees,
        location: data.companyInformations.location.city,
        featured: data.featured,
        companyId: data.eid,
      };

      data.openJobs.forEach((job: EmployerOpenJobs) => {
        jobs.push({ ...job, companyInformations });
      });
    });

    const countJobs = await getCountFromServer(q);

    const filteredJob = jobs.filter(
      (job) =>
        modeOfWork.toLowerCase().trim() ===
          job.modeOfWork.toLowerCase().trim() ||
        experienceTime.includes(job.experienceTime.toLowerCase().trim()) ||
        positionLevel.includes(job.positionLevel)
    );

    return NextResponse.json({
      jobPostings: filteredJob.length ? filteredJob : jobs,
      countJobs: countJobs.data().count,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
