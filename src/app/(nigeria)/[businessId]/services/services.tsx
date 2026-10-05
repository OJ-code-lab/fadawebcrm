"use client";

import { useState } from "react";
import ServiceModal from "@/components/services/ServiceModal";
import ServicesCard from "@/components/services/ServicesCard";
import { ServicesOffer } from "@/src/types/businessTypes";

interface ServicesClientProps {
  allServices: ServicesOffer[];
}

export default function ServicesClient({ allServices }: ServicesClientProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );

  return (
    <>
      <ServicesCard
        services={allServices}
        onBuy={(id) => setSelectedServiceId(id)}
      />

      {selectedServiceId && (
        <ServiceModal
          serviceId={selectedServiceId}
          onClose={() => setSelectedServiceId(null)}
        />
      )}
    </>
  );
}
