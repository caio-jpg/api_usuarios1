"use client";

import {
  Accordion,
} from "@/components/ui/accordion";
import { apiSpec } from '@/lib/api-spec';
import { EndpointSection } from "./endpoint-section";

export function ApiDocumentation() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {apiSpec.map((resourceSpec) => (
          <EndpointSection key={resourceSpec.resource} {...resourceSpec} />
        ))}
      </Accordion>
    </div>
  );
}
