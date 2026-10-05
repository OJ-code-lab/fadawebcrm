"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ServiceDetails } from "@/src/types/businessTypes";

type ModalStep = "idle" | "details" | "checkout" | "payment" | "success";

interface ServiceModalProps {
  serviceId: string;
  onClose: () => void;
}

export default function ServiceModal({
  serviceId,
  onClose,
}: ServiceModalProps) {
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [currentStep, setCurrentStep] = useState<ModalStep>("details");

  useEffect(() => {
    async function getServicesById(id: string) {
      try {
        setLoading(true);
        const res = await fetch(`/api/get/services/${id}`, { method: "GET" });

        if (!res.ok) {
          console.error("Failed to fetch service details:", res.status);
          return;
        }

        const data = await res.json();
        if (data?.status && data.data?.industry) {
          setServiceDetails(data.data.industry);
        }
      } catch (error) {
        console.error("GET request error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (serviceId) {
      getServicesById(serviceId);
      //   setCurrentStep("details");
    }
  }, [serviceId]);

  const closeAll = () => {
    setCurrentStep("idle");
    setServiceDetails(null);
    onClose();
  };

  const handlePayForServices = () => {
    // Implement checkout / payment endpoint logic here
    setCurrentStep("payment");
  };

  return (
    <>
      {/* 1. Details Modal */}
      <Dialog
        open={currentStep === "details"}
        onOpenChange={(open) => !open && closeAll()}
      >
        <DialogContent className="sm:max-w-3xl px-8 py-6 lg:px-16 lg:py-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Description
            </DialogTitle>
            <DialogDescription render={<div />}>
              <div>
                {loading ? (
                  <p className="py-8 text-center text-sm text-gray-500">
                    Loading service details...
                  </p>
                ) : serviceDetails ? (
                  <div className="text-xs lg:text-sm font-normal text-light-black">
                    <div
                      className="hidden lg:block leading-6"
                      dangerouslySetInnerHTML={{
                        __html: serviceDetails.description,
                      }}
                    />

                    <div className="lg:hidden">
                      <div
                        className="leading-6"
                        dangerouslySetInnerHTML={{
                          __html: showMore
                            ? serviceDetails.description
                            : serviceDetails.description.slice(0, 100) + "...",
                        }}
                      />
                      <div className="flex justify-center mt-2">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setShowMore(!showMore)}
                          className="text-sm text-blue-card hover:text-blue-900 font-semibold"
                        >
                          {showMore ? "Show Less" : "Show More"}
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 *:text-light-black text-sm font-normal bg-accent p-4 rounded-lg">
                      <h5 className="text-xl font-semibold">Requirements</h5>
                      <ul className="list-disc list-inside space-y-2 pt-4">
                        <li>Brief description of your business</li>
                        <li>Preferred colors or style (if any)</li>
                        <li>Inspiration or references (optional)</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="py-8 text-center text-sm text-red-500">
                    Failed to load service details.
                  </p>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex gap-2">
            <Button
              onClick={() => setCurrentStep("checkout")}
              disabled={loading || !serviceDetails}
              type="button"
              className="bg-blue-card rounded-3xl text-sm text-white hover:bg-blue-900"
            >
              Continue
            </Button>
            <Button
              onClick={closeAll}
              type="button"
              variant="outline"
              className="border rounded-3xl bg-primary text-sm text-primary-foreground hover:bg-primary/80"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. Checkout Modal */}
      <Dialog
        open={currentStep === "checkout"}
        onOpenChange={(open) => !open && closeAll()}
      >
        <DialogContent className="sm:max-w-3xl px-8 py-6 lg:px-16 lg:py-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Summary</DialogTitle>
            <DialogDescription render={<div />}>
              <div>
                {serviceDetails && (
                  <>
                    <div className="mt-6 flex justify-between items-center text-sm text-light-black">
                      <p className="font-normal text-base leading-7">
                        {serviceDetails.title}
                      </p>
                      <p className="font-semibold text-xl leading-7 text-black">
                        {serviceDetails.price?.formatted}
                      </p>
                    </div>
                    <hr className="my-8" />
                    <div className="flex justify-between items-center text-sm text-light-black">
                      <p className="font-semibold text-sm leading-7 text-black">
                        Total due for today
                      </p>
                      <p className="font-semibold text-xl leading-7 text-black">
                        {serviceDetails.price?.formatted}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex flex-col gap-4 sm:flex-col sm:justify-start">
            <Button
              onClick={handlePayForServices}
              className="bg-blue-card rounded-3xl text-sm text-white hover:bg-blue-900 w-full"
            >
              Check out
            </Button>
            <Button
              onClick={() => setCurrentStep("details")}
              type="button"
              variant="outline"
              className="border rounded-3xl bg-primary text-sm text-primary-foreground hover:bg-primary/80 w-full"
            >
              Back
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. Payment Modal */}
      <Dialog
        open={currentStep === "payment"}
        onOpenChange={(open) => !open && closeAll()}
      >
        <DialogContent className="sm:max-w-3xl px-8 py-6 lg:px-16 lg:py-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Payment</DialogTitle>
            <DialogDescription render={<div />}>
              <div className="text-sm text-light-black">
                <p>Payment Method</p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex gap-2">
            <Button
              onClick={() => setCurrentStep("success")}
              className="bg-blue-card rounded-3xl text-sm text-white hover:bg-blue-900"
            >
              Pay Now
            </Button>
            <Button
              onClick={() => setCurrentStep("checkout")}
              type="button"
              variant="outline"
              className="border rounded-3xl bg-primary text-sm text-primary-foreground hover:bg-primary/80"
            >
              Back
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. Success Modal */}
      <Dialog
        open={currentStep === "success"}
        onOpenChange={(open) => !open && closeAll()}
      >
        <DialogContent className="sm:max-w-3xl px-8 py-6 lg:px-16 lg:py-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Success</DialogTitle>
            <DialogDescription render={<div />}>
              <div className="text-sm text-light-black">
                <p>Your payment was successful!</p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex gap-2">
            <Button
              onClick={closeAll}
              className="bg-blue-card rounded-3xl text-sm text-white hover:bg-blue-900"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
