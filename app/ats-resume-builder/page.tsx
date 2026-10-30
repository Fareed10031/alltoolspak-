import React from 'react';
import ATSResumeBuilder from '@/components/tools/ATSResumeBuilder';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free ATS Resume Builder Pakistan - 100% Pass Machine Readable CV",
  description: "Free ATS Resume Builder Pakistan for software developers and remote professionals. Build single-column ATS compliant CVs without paywalls or watermarks.",
  alternates: {
    canonical: "https://alltoolspk.com/ats-resume-builder/",
  },
};

export default function Page() {
  return (
    <>
      <ATSResumeBuilder />
      <AllToolsSEO
        toolName="ATS Resume Builder"
        slug="/ats-resume-builder"
        keyword="Free ATS Resume Builder Pakistan"
        desc="Create single-column, 100% ATS parser compliant resumes tailored for international remote and domestic hiring."
      />
    </>
  );
}
