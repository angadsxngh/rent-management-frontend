import { Card, CardBody } from "@heroui/react";

export default function CancellationsAndRefunds() {
  return (
    <div className="max-w-4xl mx-auto p-6 py-32">
      <Card>
        <CardBody className="space-y-4 p-6">
          <h1 className="text-2xl font-semibold">Cancellations and Refunds</h1>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Rent Payments:</strong> Rent once paid is non-refundable unless the owner cancels before the move-in date.
            </li>
            <li>
              <strong>Tenant Cancellations:</strong> Full refund within 24 hours of booking (excluding processing fees). Refunds in 5–7 business days.
            </li>
            <li>
              <strong>Owner Cancellations:</strong> Full refund will be issued if an owner cancels a confirmed booking.
            </li>
            <li>
              <strong>Disputes:</strong> Disputes will be mediated by RentEase support based on platform records.
            </li>
          </ul>

          <p>Need help? Email us at <span className="text-blue-600">billing@rentease.in</span>.</p>
        </CardBody>
      </Card>
    </div>
  );
}
