import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Map from "./components/map/Map";
import RecyclerRegister from "./pages/RecyclerRegister/recyclerRegister";
import RecyclersManagerRegister from "./pages/RecyclersManagerRegister/recyclersManagerRegister";
import ContactUs from "./pages/Contact/ContactUs";
import CollectRequest from "./pages/CollectRequest/CollectRequest";
import About from "./pages/About/About";
import TermsAndConditions from "./pages/Conditions/Terms/terms";
import PrivacyPolicy from "./pages/Conditions/Privacy/privacy";
import NotFound from "./pages/404/404";
import UserLayout from "./layouts/UserLayout";
import WelcomeAdmin from "./pages/Users/WelcomePerUser/WelcomeAdmin";
import WelcomeUser from "./pages/Users/WelcomePerUser/WelcomeUser";
import WelcomeRecycler from "./pages/Users/WelcomePerUser/WelcomeRecycler";
import WelcomeManager from "./pages/Users/WelcomePerUser/WelcomeManager";
import UpdateUserInformation from "./pages/Users/ManageAccount/UpdateUserInformation";
import ChangePassword from "./pages/Users/ManageAccount/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UpdateRequest from "./pages/Users/UpdateRequest";
import Cancelled from "./pages/Users/RequestsPerStatus/Cancelled";
import Completed from "./pages/Users/RequestsPerStatus/completed";
import Pending from "./pages/Users/RequestsPerStatus/Pending";
import UserManagement from "./pages/Users/AdminPanel/UserManagement";
import JoinRequests from "./pages/Users/AdminPanel/JoinRequests";
import AllRequests from "./pages/Users/AdminPanel/AllRequests";
import RecycleBins from "./pages/Users/AdminPanel/RecycleBins/RecycleBins";
import UpdateBin from "./pages/Users/AdminPanel/RecycleBins/UpdateBin";
import AddNewBin from "./pages/Users/AdminPanel/RecycleBins/AddNewBin";
import RecyclersJoinRequests from "./pages/Users/ManagerPanel/RecyclersJoinRequests";
import RecyclersManagement from "./pages/Users/ManagerPanel/RecyclersManagement";
import RegionalRequests from "./pages/Users/ManagerPanel/RegionalRequests";
import RegionalRecyclerRequests from "./pages/Users/RecyclerPanel/RegionalRequests";
import AcceptedRequests from "./pages/Users/RecyclerPanel/AcceptedRequests";
import CompletedRequests from "./pages/Users/RecyclerPanel/CompletedRequests";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./components/Auth/RequireAuth";
import SessionExpiry from "./components/Auth/SessionExpiry";
import { ROLE, COLLECTOR_ROLES } from "./utils/roles";
import "./index.css";

export default function App() {
  return (
    <Router>
      <SessionExpiry />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/collect"
          element={
            <RequireAuth roles={COLLECTOR_ROLES}>
              <CollectRequest />
            </RequireAuth>
          }
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/password-recovery" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/manager-join" element={<RecyclersManagerRegister />} />
        <Route
          path="/user/*"
          element={
            <RequireAuth>
              <UserLayout />
            </RequireAuth>
          }
        >
          <Route
            path="welcomeAdmin"
            element={
              <RequireAuth roles={[ROLE.ADMIN]}>
                <WelcomeAdmin />
              </RequireAuth>
            }
          />
          <Route
            path="welcomeUser"
            element={
              <RequireAuth roles={[ROLE.USER, ROLE.DEMOTED]}>
                <WelcomeUser />
              </RequireAuth>
            }
          />
          <Route
            path="welcomeRecycler"
            element={
              <RequireAuth roles={[ROLE.RECYCLER]}>
                <WelcomeRecycler />
              </RequireAuth>
            }
          />
          <Route
            path="welcomeManager"
            element={
              <RequireAuth roles={[ROLE.MANAGER]}>
                <WelcomeManager />
              </RequireAuth>
            }
          />
          <Route
            path="update-user-info"
            element={<UpdateUserInformation />}
          />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="update-request" element={<UpdateRequest />} />
          <Route path="cancelled-requests" element={<Cancelled />} />
          <Route path="completed-requests" element={<Completed />} />
          <Route path="pending-requests" element={<Pending />} />
        </Route>
        <Route
          path="/admin/*"
          element={
            <RequireAuth roles={[ROLE.ADMIN]}>
              <UserLayout />
            </RequireAuth>
          }
        >
          <Route path="user-management" element={<UserManagement />} />
          <Route path="join-requests" element={<JoinRequests />} />
          <Route path="requests" element={<AllRequests />} />
          <Route path="bins" element={<RecycleBins />} />
          <Route path="update-bin/*" element={<UpdateBin />} />
          <Route path="add-bin" element={<AddNewBin />} />
        </Route>
        <Route
          path="/manager/*"
          element={
            <RequireAuth roles={[ROLE.MANAGER]}>
              <UserLayout />
            </RequireAuth>
          }
        >
          <Route path="join-requests" element={<RecyclersJoinRequests />} />
          <Route
            path="recyclers-management"
            element={<RecyclersManagement />}
          />
          <Route path="regional-requests" element={<RegionalRequests />} />
        </Route>
        <Route
          path="/recycler/*"
          element={
            <RequireAuth roles={[ROLE.RECYCLER]}>
              <UserLayout />
            </RequireAuth>
          }
        >
          <Route
            path="regional-requests"
            element={<RegionalRecyclerRequests />}
          />
          <Route path="accepted-requests" element={<AcceptedRequests />} />
          <Route path="completed-requests" element={<CompletedRequests />} />
        </Route>
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/map/*" element={<Map />} />
        <Route path="/join" element={<RecyclerRegister />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
      <Footer />
    </Router>
  );
}
