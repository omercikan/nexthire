export interface ApplicationData {
  additionalQuestions: { title: string; answer: string; index: number }[];
  email: string;
  name: string;
  phone: string;
  postId: string;
  resume: string;
  cid: string;
  eid: string;
  companyLogo: string;
  companyLocation: string;
  companyName: string;
  jobTitle: string;
  status: { text: string; time: string }[];
}
