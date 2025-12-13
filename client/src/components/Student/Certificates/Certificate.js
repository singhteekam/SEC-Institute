import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./../../styles/certificates.css";
import centerLogo from "./../../../assets/logo.png"; // update with your actual file path
import govtOfUPLogo from "./../../../assets/GovtOfUP.jpg"; 
import digitalIndiaLogo from "./../../../assets/DigitalIndiaLogo.png";
import msmeLogo from "./../../../assets/MSMELogo.png";
import directorLogo from "./../../../assets/logo.png";

import QRCode from "react-qr-code";

export default function Certificate({ student }) {
  const verifyUrl = `https://www.secinstitute.in/verify?id=${student._id}`;

  const showDate = (date1) => {
    const date = new Date(date1);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const certificateRef = useRef();

  const downloadPDF = (scale) => {
    const input = certificateRef.current;
    html2canvas(input, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width
      const pageHeight = 297; // A4 height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <>
      <button className="download-button" onClick={() => downloadPDF(1)}>
        Download PDF
      </button>

      <button className="download-button" onClick={() => downloadPDF(1.5)}>
        Download High-Quality PDF
      </button>

      <div ref={certificateRef} className="certificate-container">
        <section className="header-content">
          <div className="top-left-div"></div>

          <div className="top-middle-div">
            <img src={centerLogo} alt="Center Logo" className="center-logo" />
          </div>

          {/* Right Logo + Reg Number */}
          <div className="right-side">
            <img src={govtOfUPLogo} alt="Right Logo" className="right-logo" />
            <p className="reg-number">Regd : {"008954"}</p>
          </div>
        </section>

        {/* Institute Info */}
        <section className="institute-info">
          <h1 className="institute-name">
            SOMNATH EDUCATION & COMPUTER INSTITUTE
          </h1>
          <p className="institute-tagline">
            (An Institute of Computer & IT Education)
          </p>
          <p className="institute-reg">REGD. BY - STATE GOVT. (U.P.)</p>
        </section>

        <div className="certificate-line"></div>

        {/* Middle Section */}
        <section className="middle-section">
          <p className="green-text">
            This certificate is proudly presented <br />
          </p>
          <p className="green-text-2">For honorable achievement to</p>
          <p className="black-text bold">This is To Certify That</p>
          <p className="red-text uppercase bold large">
            {student?.studentName || "STUDENT NAME"}{" "}
            {student.gender === "male" ? "S/o" : "D/o"}{" "}
            {student?.fatherName || "FATHER NAME"}
          </p>
          <p className="black-text2">Has Successfully Completed</p>
          <p className="blue-text">
            {student?.course || "Diploma in Computer Application & Accounting"}
          </p>
          <p className="black-text2">
            Session{" "}
            <span className="green-text">{student?.session || "2025-26"}</span>{" "}
            and {student?.gender === "Female" ? "She" : "He"} is awarded with
            Grade <span className="quotes">“A”</span>
          </p>
        </section>

        {/* ===== SECTION 3 ===== */}
        <section className="section-3">
          {/* Left Side */}
          <div className="section-3-left">
            <p>
              <strong>REGS NO.:</strong>{" "}
              {student?.enrollmentNumber || "SECI/1814"}
            </p>
            <p>
              <strong>Date of Issue:</strong>{" "}
              {showDate(student?.certificateIssueDate)}
            </p>
          </div>

          {/* Center QR Code */}
          <div className="section-3-center">
            <QRCode
              title="SECInstitute QR Code"
              value={verifyUrl}
              // bgColor={back}
              // fgColor={fore}
              size={128}
            />
          </div>

          {/* Right Side */}
          <div className="section-3-right">
            <p>
              <strong>Roll No.:</strong>{" "}
              {student?.enrollmentNumber.slice(4) || "1814"}
            </p>
            <img
              src={`data:image/jpeg;base64,${student.studentProfilePicture}`}
              alt="Student"
              className="student-photo"
            />
          </div>
        </section>

        {/* Section 4 */}
        <section className="section-4">
          <div className="logos-row">
            <img src={digitalIndiaLogo} alt="Digital India" className="logo" />
            <img src={msmeLogo} alt="MSME" className="logo" />
            <b className="director-text">DIRECTOR</b>
          </div>
          <p className="head-office">
            HEAD OFFICE: SOMNATH MARRAIGE HOME, MAURYA HOSPITAL, NH-19,
            <br />
            MATHURA (U.P) 281006
          </p>
          <p className="website">
            Website:{" "}
            <a href="https://www.secinstitute.in">www.secinstitute.in</a>
          </p>
        </section>
      </div>
    </>
  );
}
