import { z } from "zod";

export const services = [
  "Cradle-to-Completion House Development",
  "Residential Construction",
  "Commercial Construction",
  "Approvals & Regulatory",
  "Architectural Planning & Design",
  "Front Elevation Development",
] as const;
export const residentialTypes = [
  "Independent house",
  "Villa / Duplex",
  "Apartment building",
  "Renovation / Extension",
] as const;
export const commercialTypes = [
  "Office building",
  "Retail / Mixed-use",
  "Institutional / Utility building",
] as const;
export const siteStatuses = [
  "Vacant plot",
  "Existing structure",
  "Under planning",
  "Under construction",
] as const;

export const enquirySchema = z
  .object({
    service: z.enum(services, {
      errorMap: () => ({ message: "Choose the service you’re interested in." }),
    }),
    projectCategory: z.enum(["Residential", "Commercial"], {
      errorMap: () => ({ message: "Choose a project category." }),
    }),
    projectType: z.string().trim().min(1, "Choose a project type.").max(80),
    floors: z
      .string()
      .trim()
      .regex(
        /^[1-9]\d?$/,
        "Enter a whole number from 1 to 99. G+1 means 2 floors.",
      ),
    location: z
      .string()
      .trim()
      .min(2, "Enter your city or area.")
      .max(150, "Keep the location under 150 characters."),
    plotSize: z
      .string()
      .trim()
      .min(2, "Enter a plot size and unit, or ‘Not sure’.")
      .max(100),
    builtUpArea: z.string().trim().max(100, "Keep this under 100 characters."),
    siteStatus: z.enum(siteStatuses, {
      errorMap: () => ({ message: "Choose the current site status." }),
    }),
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your name (at least 2 characters).")
      .max(100),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address, such as name@example.com.")
      .max(254),
    phone: z
      .string()
      .trim()
      .refine(
        (value) =>
          !value ||
          (/^\+?[\d\s()-]+$/.test(value) &&
            value.replace(/\D/g, "").length >= 7 &&
            value.replace(/\D/g, "").length <= 15),
        "Enter a valid phone number, including your country code.",
      ),
  })
  .superRefine((data, ctx) => {
    const options: readonly string[] =
      data.projectCategory === "Residential"
        ? residentialTypes
        : commercialTypes;
    if (!options.includes(data.projectType))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["projectType"],
        message: "Choose a type that matches your project category.",
      });
  });

export type EnquiryData = {
  [K in keyof z.infer<typeof enquirySchema>]: string;
};
export type EnquiryErrors = Partial<Record<keyof EnquiryData, string>>;
export const emptyEnquiry: EnquiryData = {
  service: "",
  projectCategory: "",
  projectType: "",
  floors: "",
  location: "",
  plotSize: "",
  builtUpArea: "",
  siteStatus: "",
  fullName: "",
  email: "",
  phone: "",
};
export const stepFields: (keyof EnquiryData)[][] = [
  ["service"],
  ["projectCategory", "projectType", "floors"],
  ["location", "plotSize", "builtUpArea", "siteStatus"],
  ["fullName", "email", "phone"],
];
export function validateEnquiry(data: EnquiryData): EnquiryErrors {
  const result = enquirySchema.safeParse(data);
  if (result.success) return {};
  return Object.fromEntries(
    result.error.issues.map((issue) => [issue.path[0], issue.message]),
  );
}
