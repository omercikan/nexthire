export type JobTypes = string[];

export type FilterSwitch = {
  itemText: string;
};

export interface JobCompanyInformations {
  companyInformations: {
    companyLogo: string;
    companyName: string;
    featured: boolean;
    serviceArea: string;
    companyId: string;
    numberOfEmployees: string;
    location: string;
  };
}
