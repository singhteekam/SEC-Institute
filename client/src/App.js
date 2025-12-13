import logo from "./logo.svg";
import "./App.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import RegisterStudent from "./components/Admin/RegisterStudent";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ViewAllStudents from "./components/ViewAllStudents";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./components/styles/style.css";
import StudentVerification from "./components/Student/StudentVerification";
import Courses from "./components/Courses";
import Branches from "./components/Branches";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminProfile from "./components/Admin/AdminProfile";
import OnlineLearning from "./components/Student/OnlineLearning";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import ContactUs from "./components/ContactUs";
import CertificatePage from "./components/Student/Certificates/CertificatePage";


function App() {
  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <Header/>

      <main>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/viewstudents" element={<ViewAllStudents />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/studentverify" element={<StudentVerification />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/online-learning" element={<OnlineLearning />} />
          <Route path="/admin/registerstudent" element={<RegisterStudent />} exact />
          <Route path="/admin/dashboard" element={<AdminDashboard />} exact />
          <Route path="/admin/profile" element={<AdminProfile />} exact />
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/certificate" element={<CertificatePage/>}/>
          {/* <Route path="/studentverify" element={<StudentVerification />} /> */}
        </Routes>
      </main>

      <Footer/>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
