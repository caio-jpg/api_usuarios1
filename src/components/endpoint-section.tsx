"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { apiSpec } from '@/lib/api-spec';
import { EndpointCard } from "./endpoint-card";

type EndpointSectionProps = (typeof apiSpec)[0];

export function EndpointSection({ resource, description, endpoints }: EndpointSectionProps) {
  return (
    <AccordionItem value={resource} className="border-b-0">
      <AccordionTrigger className="text-2xl font-semibold bg-card rounded-lg px-6 py-4 hover:no-underline shadow-sm">
        {resource}
      </AccordionTrigger>
      <AccordionContent className="pt-4 space-y-3">
        <p className="px-2 text-muted-foreground">{description}</p>
        <div className="space-y-4">
        {endpoints.map((endpoint, index) => (
            <EndpointCard key={`${endpoint.method}-${endpoint.path}`} {...endpoint} />
        ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
