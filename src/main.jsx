import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/react";
import HomePage from "./components/Home/Home.jsx";
import LoginPage from "./components/Login/Login.jsx";
import SignupPage from "./components/Signup/Signup.jsx";
import OwnerDashboard from "./components/Dashboard/OwnerDashboard.jsx";
import TenantDashboard from "./components/Dashboard/TenantDashboard.jsx";
import PropertyCard from "./components/Property/PropertyCard.jsx";
import AddProperty from "./components/Property/AddProperty.jsx";
import FindProperty from "./components/Property/FindProperty.jsx";
import Property from "./components/Property/Property.jsx";
import PrivateRoute from "./components/Layout/PrivateRoute.jsx";
import OwnerLayout from "./components/Layout/OwnerLayout.jsx";
import TenantLayout from "./components/Layout/TenantLayout.jsx";
import OwnerAlerts from "./components/Alerts/OwnerAlerts.jsx";
import TenantAlerts from "./components/Alerts/TenantAlerts.jsx";
import OwnerProperties from "./components/Property/OwnerProperties.jsx";
import TenantProperties from "./components/Property/TenantProperties.jsx";
import OwnerPassbook from "./components/Passbook/OwnerPassbook.jsx";
import SettleBalance from "./components/Passbook/SettleBalance.jsx";
import TenantPassbook from "./components/Passbook/TenantPassbook.jsx";
import PaymentRequest from "./components/Passbook/PaymentRequest.jsx";
import OwnerProfile from "./components/Profile/OwnerProfile.jsx";
import TenantProfile from "./components/Profile/TenantProfile.jsx";
import PrivacyPolicy from "./components/Pages/Policy.jsx";
import TermsAndConditions from "./components/Pages/TnC.jsx";
import CancellationsAndRefunds from "./components/Pages/RnC.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<OwnerLayout />}>
          <Route path="/owner-profile" element={<OwnerProfile />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/card" element={<PropertyCard />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/owner-alerts" element={<OwnerAlerts />} />
          <Route path="/owner-properties" element={<OwnerProperties />} />
          <Route path="/owner-passbook" element={<OwnerPassbook />} />
          <Route path="/record-payment" element={<SettleBalance />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route
            path="/refunds-and-cancellations"
            element={<CancellationsAndRefunds />}
          />
        </Route>
        <Route element={<TenantLayout />}>
          <Route path="/tenant-profile" element={<TenantProfile />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
          <Route path="/find-property" element={<FindProperty />} />
          <Route path="/property/:id" element={<Property />} />
          <Route path="/tenant-alerts" element={<TenantAlerts />} />
          <Route path="/tenant-properties" element={<TenantProperties />} />
          <Route path="/tenant-passbook" element={<TenantPassbook />} />
          <Route path="/record-tpayment" element={<PaymentRequest />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route
            path="/refunds-and-cancellations"
            element={<CancellationsAndRefunds />}
          />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <HeroUIProvider>
    <ToastProvider />
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </HeroUIProvider>
);
