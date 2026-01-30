import { PROGRAM_APPLY_PREFILL } from "./applylink";

const BASE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSefCu9swRQfPpfrX-ngxU6oMq_d6tXvrSnPTDyY3QcUSWAe0Q/viewform";

const PROGRAM_FIELD_ENTRY_ID = "entry.2005620554";

export function getApplyLink(slug?: string) {
  if (!slug) return BASE_FORM_URL;

  const programName = PROGRAM_APPLY_PREFILL[slug];
  if (!programName) return BASE_FORM_URL;

  const encodedValue = encodeURIComponent(programName);
  return `${BASE_FORM_URL}?usp=pp_url&${PROGRAM_FIELD_ENTRY_ID}=${encodedValue}`;
}
