import { Card, CardBody } from "@heroui/react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 py-32">
      <Card>
        <CardBody className="space-y-4 p-6">
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>Information Collected:</strong> Name, email, phone, address, and payment details. Also includes device and usage data.
            </li>
            <li>
              <strong>Use of Data:</strong> To process rent, support users, and improve the platform. Optional updates/promotions may be sent.
            </li>
            <li>
              <strong>Data Protection:</strong> Sensitive data is encrypted. We do not sell or rent your data.
            </li>
            <li>
              <strong>Third-Party Services:</strong> Razorpay and others may handle your data per their policies.
            </li>
            <li>
              <strong>Your Rights:</strong> You may request correction or deletion of your data at any time by emailing us.
            </li>
          </ul>

          <p>Contact our privacy team at <span className="text-blue-600">privacy@rentease.in</span>.</p>
        </CardBody>
      </Card>
    </div>
  );
}
