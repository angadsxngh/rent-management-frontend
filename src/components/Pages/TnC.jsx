import { Card, CardBody } from "@heroui/react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto p-6 py-32">
      <Card>
        <CardBody className="space-y-4 p-6">
          <h1 className="text-2xl font-semibold">Terms and Conditions</h1>
          <p>Welcome to RentEase. By using our platform, you agree to the following terms and conditions:</p>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Users must be at least 18 years old to register and transact on RentEase.</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>Owners are solely responsible for the accuracy of their property details.</li>
            <li>Tenants agree to pay rent as per the agreed schedule. RentEase is not liable for disputes between tenants and owners.</li>
            <li>Misuse of the platform will lead to account suspension.</li>
            <li>We may update these terms at any time. Continued use implies acceptance.</li>
          </ul>

          <p>For any questions, contact us at <span className="text-blue-600">support@rentease.in</span>.</p>
        </CardBody>
      </Card>
    </div>
  );
}
