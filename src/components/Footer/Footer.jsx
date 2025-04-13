import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-10 border-t">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
        <div>
          <h3 className="text-indigo-700 font-semibold mb-2">RentEase</h3>
          <p>Managing rentals made easy for both tenants and property owners.</p>
        </div>
        <div>
          <h3 className="text-indigo-700 font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#features" className="hover:text-indigo-600">Features</a></li>
            <li><a href="#pricing" className="hover:text-indigo-600">Pricing</a></li>
            <li><a href="#reviews" className="hover:text-indigo-600">Reviews</a></li>
            <li><a href="#faq" className="hover:text-indigo-600">FAQs</a></li>
          </ul>
        </div>
        <div id="contact">
          <h3 className="text-indigo-700 font-semibold mb-2">Contact Us</h3>
          <p>Email: support@rentease.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>
      <div className="text-center mt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} RentEase. All rights reserved.
      </div>
    </footer>
  );
}
