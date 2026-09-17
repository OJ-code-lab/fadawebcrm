"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const services = [
  {
    name: "Website Design",
    description:
      "Professional website design services to help your business stand out online.",
    price: "$1,500",
    period: "/year",
  },
  {
    name: "Branding",
    description:
      "Professional branding services to help your business establish a strong identity.",
    price: "$1,500",
    period: "/year",
  },
  {
    name: "Design",
    description:
      "Professional website design services to help your business stand out online.",
    price: "$1,500",
    period: "/year",
  },
  {
    name: "Website",
    description:
      "Professional website design services to help your business stand out online.",
    price: "$1,500",
    period: "/year",
  },
  {
    name: "Website Production",
    description:
      "Professional website design services to help your business stand out online.",
    price: "$1,500",
    period: "/year",
  },
];
// Define all steps in your flow
type ModalStep = "idle" | "details" | "checkout" | "payment" | "success";

function ServicesPage() {
  const [showMore, setShowMore] = useState(false);

  const [currentStep, setCurrentStep] = useState<ModalStep>("idle");

  const closeAll = () => setCurrentStep("idle");

  return (
    <div>
      <div className="flex flex-col gap-8">
        {services.map((section) => (
          <Card key={section.name} className="px-8 py-6">
            <CardHeader className="font-semibold text-xl text-black">
              {section.name}
            </CardHeader>
            <p className="font-normal text-sm text-light-black mb-15">
              {section.description}
            </p>
            <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-between lg:items-center">
              <div className="flex gap-4 items-center">
                <p className="font-bold text-3xl text-black">{section.price}</p>
                <span className="font-medium text-sm text-light-black">
                  {section.period}
                </span>
              </div>

              {/* Buy Now Modal */}
              <Button
                onClick={() => setCurrentStep("details")}
                className="bg-blue-card text-sm text-white hover:bg-blue-900 rounded-3xl w-full lg:w-auto"
              >
                Buy now
              </Button>
              <Dialog
                open={currentStep === "details"}
                onOpenChange={(open) =>
                  !open && currentStep === "details" && closeAll()
                }
              >
                <DialogContent className="sm:max-w-3xl px-8 py-6 lg:px-16 lg:py-8">
                  <form>
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold">
                        Description
                      </DialogTitle>
                      <DialogDescription render={<div />}>
                        <div className="text-xs lg:text-sm font-normal text-light-black">
                          <div>
                            <p className="hidden lg:block leading-6">
                              Looking for a brand identity that truly reflects
                              your business? With this service, you’ll receive 3
                              completely original logo designs, created from
                              scratch based on your preferences, business niche,
                              and brand personality. Whether you want something
                              modern, minimal, bold, or playful — our designers
                              take the time to understand your vision and
                              translate it into 3 unique logo options. You’ll
                              get high-resolution versions of each design,
                              suitable for websites, social media, and printing.
                              This package is perfect if you’re launching a new
                              company, rebranding, or simply want options to
                              choose from. The logos are not from templates or
                              stock graphics — every design is crafted with
                              care, creativity, and attention to detail. Let
                              your brand stand out from day one with logos that
                              make a lasting impression.
                            </p>
                          </div>
                          <div className="lg:hidden">
                            <p className="leading-6">
                              Looking for a brand identity that truly reflects
                              your business? With this service, you’ll receive 3
                              completely original logo designs, created from
                              scratch based on your preferences, business niche,
                              and brand personality.
                            </p>
                            {showMore && (
                              <p className="leading-6">
                                Whether you want something modern, minimal,
                                bold, or playful — our designers take the time
                                to understand your vision and translate it into
                                3 unique logo options. You’ll get
                                high-resolution versions of each design,
                                suitable for websites, social media, and
                                printing. This package is perfect if you’re
                                launching a new company, rebranding, or simply
                                want options to choose from. The logos are not
                                from templates or stock graphics — every design
                                is crafted with care, creativity, and attention
                                to detail. Let your brand stand out from day one
                                with logos that make a lasting impression.
                              </p>
                            )}
                            <div className="flex justify-center">
                              <Button
                                type="button"
                                onClick={() => setShowMore(!showMore)}
                                className="text-sm text-blue-card hover:text-blue-900 font-semibold"
                              >
                                {showMore ? "Show Less" : "Show More"}
                              </Button>
                            </div>
                          </div>

                          <div className="mt-4 *:text-light-black text-sm font-normal bg-accent p-4 rounded-lg">
                            <h5 className="text-xl font-semibold">
                              Requirement
                            </h5>
                            <ul className="list-disc list-inside space-y-2 pt-4">
                              <li>Brief description of your business</li>
                              <li>Preferred colors or style (if any)</li>
                              <li>Inspiration or references (optional)</li>
                            </ul>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-6 flex gap-2">
                      <Button
                        onClick={() => setCurrentStep("checkout")}
                        type="button"
                        className="bg-blue-card rounded-3xl text-sm text-white hover:bg-blue-900"
                      >
                        Continue
                      </Button>
                      <DialogClose
                        render={
                          <Button
                            onClick={closeAll}
                            type="button"
                            variant="outline"
                            className="border rounded-3xl bg-primary text-sm text-primary-foreground hover:bg-primary/80"
                          >
                            Cancel
                          </Button>
                        }
                      />
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>

      {/* Checkout Modal */}
      <Dialog
        open={currentStep === "checkout"}
        onOpenChange={(open) =>
          !open && currentStep === "checkout" && closeAll()
        }
      >
        <DialogContent className="sm:max-w-3xl px-8 py-6 lg:px-16 lg:py-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Summary</DialogTitle>
            <DialogDescription render={<div />}>
              <div className=" mt-6 flex justify-between items-center text-sm text-light-black">
                <p className="font-normal text-base leading-7">Logo Design</p>
                <p className="font-semibold text-xl leading-7 text-black ">
                  $1990.00
                </p>
                ``
              </div>
              <hr className="my-8" />
              <div className="flex justify-between items-center text-sm text-light-black">
                <p className="font-semibold text-sm leading-7 text-black">
                  Total due for today
                </p>
                <p className="font-semibold text-xl leading-7 text-black">
                  $2100.20
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex flex-col gap-4 sm:flex-col sm:justify-start">
            <div className="flex w-full flex-col gap-4 ">
              <Button
                onClick={() => setCurrentStep("payment")}
                className="bg-blue-card rounded-3xl text-sm text-white hover:bg-blue-900"
              >
                Check out
              </Button>
              <DialogClose
                render={
                  <Button
                    onClick={() => setCurrentStep("details")}
                    type="button"
                    variant="outline"
                    className="border rounded-3xl bg-primary text-sm text-primary-foreground hover:bg-primary/80"
                  >
                    Cancel
                  </Button>
                }
              />
            </div>

            <div className="text-center">
              <p className="font-semibold text-lg leading-7 ">
                100% Refund Guarantee
              </p>
              <p className="text-base text-light-black font-light leading-6 pt-2">
                We offer a hassle-free refund with no questions asked if we are
                unable to fulfill your order.
              </p>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog
        open={currentStep === "payment"}
        onOpenChange={(open) =>
          !open && currentStep === "payment" && closeAll()
        }
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
            <DialogClose
              render={
                <Button
                  onClick={() => setCurrentStep("checkout")}
                  type="button"
                  variant="outline"
                  className="border rounded-3xl bg-primary text-sm text-primary-foreground hover:bg-primary/80"
                >
                  Cancel
                </Button>
              }
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog
        open={currentStep === "success"}
        onOpenChange={(open) =>
          !open && currentStep === "success" && closeAll()
        }
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
              onClick={() => setCurrentStep("success")}
              className="bg-blue-card rounded-3xl text-sm text-white hover:bg-blue-900"
            >
              Redirect
            </Button>
            <DialogClose
              render={
                <Button
                  onClick={() => setCurrentStep("checkout")}
                  type="button"
                  variant="outline"
                  className="border rounded-3xl bg-primary text-sm text-primary-foreground hover:bg-primary/80"
                >
                  Cancel
                </Button>
              }
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ServicesPage;
