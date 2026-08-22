import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";

function ServicesPage() {
  return (
    <div>
      <div className="flex flex-col gap-8">
        <Card className="px-8 py-6">
          <CardHeader className="font-semibold text-xl text-black">
            Website Design
          </CardHeader>
          <p className="font-normal text-sm text-light-black mb-15">
            doola can prepare your annual tax return for submission to the
            Internal Revenue Service (IRS).
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <p className="font-bold text-3xl text-black">$1,500</p>
              <span className="font-medium text-sm text-light-black">
                /year
              </span>
            </div>
            <Button className="bg-blue-card text-sm text-white">Buy now</Button>
          </div>
        </Card>
        <Card className="px-8 py-6">
          <CardHeader className="font-semibold text-xl text-black">
            Branding
          </CardHeader>
          <p className="font-normal text-sm text-light-black mb-15">
            Receive exclusive access to a one-on-one tax consultation tailored
            to your specific business needs.
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <p className="font-bold text-3xl text-black">$150</p>
              <span className="font-medium text-sm text-light-black">
                one-time
              </span>
            </div>
            <Button className="bg-blue-card text-sm text-white">Buy now</Button>
          </div>
        </Card>
        <Card className="px-8 py-6">
          <CardHeader className="font-semibold text-xl text-black">
            Website Design
          </CardHeader>
          <p className="font-normal text-sm text-light-black mb-15">
            doola can prepare your annual tax return for submission to the
            Internal Revenue Service (IRS).
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <p className="font-bold text-3xl text-black">$1,500</p>
              <span className="font-medium text-sm text-light-black">
                /year
              </span>
            </div>
            <Button className="bg-blue-card text-sm text-white">Buy now</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ServicesPage;
