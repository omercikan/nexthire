import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebaseConfig";
import { EmployerOpenJobs } from "@/types";
import { normalize } from "@/lib/routeFormat";

export async function POST(req: NextRequest) {
  const {
    modeOfWork,
    experienceTime,
    positionLevel,
    jobKeywords,
    locationKeywords,
    pageValue,
  }: {
    modeOfWork: string;
    experienceTime: string[];
    positionLevel: string[];
    jobKeywords: string[];
    locationKeywords: string[];
    pageValue: string;
  } = await req.json();

  const { searchParams } = new URL(req.url);
  const sortValue = searchParams.get("sort");
  const startIndex = Number(searchParams.get("start"));
  const endIndex = Number(searchParams.get("end"));

  const isAnyFilterItem =
    modeOfWork.length > 0 ||
    experienceTime.length > 0 ||
    positionLevel.length > 0 ||
    jobKeywords.length > 0 ||
    locationKeywords.length > 0 ||
    sortValue === "asc" ||
    sortValue === "desc" ||
    pageValue === "Tümü";

  try {
    const q = query(
      collection(db, "employers"),
      where("openJobs", ">", []),
      orderBy(
        "createdAt",
        sortValue === "asc" || sortValue === "desc" ? sortValue : "asc"
      )
    );

    const docData = await getDocs(q);

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

    const filteredJobs = jobs.filter((job) => {
      if (
        jobKeywords.find(
          (jk) =>
            job.jobTitle.toLowerCase().includes(jk.toLowerCase()) ||
            job.category.toLowerCase().includes(jk.toLowerCase())
        ) &&
        !locationKeywords.length
      ) {
        return true;
      }

      if (
        locationKeywords.find((lk) =>
          normalize(job.location)
            .toLocaleLowerCase("tr")
            .includes(normalize(lk.toLocaleLowerCase("tr")))
        ) &&
        !jobKeywords.length
      ) {
        return true;
      }

      if (
        jobKeywords.find(
          (jk) =>
            job.jobTitle.toLowerCase().includes(jk.toLowerCase()) ||
            job.jobTitle
              .toLocaleLowerCase("tr")
              .includes(jk.toLocaleLowerCase("tr")) ||
            job.category.toLowerCase().includes(jk.toLowerCase()) ||
            job.category
              .toLocaleLowerCase("tr")
              .includes(jk.toLocaleLowerCase("tr"))
        ) &&
        locationKeywords.find((lk) =>
          normalize(job.location)
            .toLocaleLowerCase("tr")
            .includes(normalize(lk.toLocaleLowerCase("tr")))
        )
      ) {
        return true;
      }

      if (
        job.modeOfWork.toLowerCase().trim() === modeOfWork.toLowerCase().trim()
      ) {
        return true;
      }

      if (experienceTime.includes(job.experienceTime)) {
        return true;
      }

      if (positionLevel.includes(job.positionLevel)) {
        return true;
      }

      return false;
    });

    return NextResponse.json({
      jobs: filteredJobs?.length
        ? filteredJobs
        : jobs.slice(
            isAnyFilterItem ? 0 : startIndex,
            isAnyFilterItem ? jobs?.length : endIndex
          ),
      countJobs:
        modeOfWork.length > 0 ||
        experienceTime.length > 0 ||
        positionLevel.length > 0 ||
        jobKeywords.length > 0 ||
        locationKeywords.length > 0
          ? filteredJobs.length
          : jobs.length,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
}
