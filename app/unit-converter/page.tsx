import React from 'react';
import UnitConverterTool from '@/components/tools/UnitConverterTool';
import AllToolsSEO from '../components/AllToolsSEO';

export const metadata = {
  title: "Free Unit Converter Pakistan - Length, Weight, Area, Marla to Sqft",
  description: "Free online unit converter for Pakistan. Convert length, mass, temperature, and Pakistani land units including Marla, Kanal, and Square Feet.",
  alternates: {
    canonical: "https://alltoolspk.com/unit-converter",
  },
};

export default function Page() {
  return (
    <>
      <UnitConverterTool />
      <AllToolsSEO
        toolName="Unit Converter"
        slug="/unit-converter"
        keyword="Free Unit Converter Pakistan"
        desc="Fast and accurate multi-category unit converter for length, weight, area, and Pakistani land measurements."
      />
    </>
  );
}
