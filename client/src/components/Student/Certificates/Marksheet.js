import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./../../styles/certificates.css";
import centerLogo from "./../../../assets/logo.png";
import govtOfUPLogo from "./../../../assets/GovtOfUP.jpg";
import digitalIndiaLogo from "./../../../assets/DigitalIndiaLogo.png";
import msmeLogo from "./../../../assets/MSMELogo.png";
import directorLogo from "./../../../assets/logo.png";
import ribbonImage from "./../../../assets/ribbon.png";

import QRCode from "react-qr-code";

const marks = [
  {
    subject: "Fundamental Of Computer",
    theory: { max: 100, obtained: 65 },
    practical: { max: 100, obtained: 70 },
    grade: "", // can be calculated or left empty
  },
  {
    subject: "M.S. Word",
    theory: { max: 100, obtained: 70 },
    practical: { max: 100, obtained: 76 },
    grade: "",
  },
  {
    subject: "Fundamental Of Computer",
    theory: { max: 100, obtained: 65 },
    practical: { max: 100, obtained: 70 },
    grade: "", // can be calculated or left empty
  },
  {
    subject: "M.S. Word",
    theory: { max: 100, obtained: 70 },
    practical: { max: 100, obtained: 76 },
    grade: "",
  },
  {
    subject: "Fundamental Of Computer",
    theory: { max: 100, obtained: 65 },
    practical: { max: 100, obtained: 70 },
    grade: "", // can be calculated or left empty
  },
  {
    subject: "M.S. Word",
    theory: { max: 100, obtained: 70 },
    practical: { max: 100, obtained: 76 },
    grade: "",
  },
  {
    subject: "Fundamental Of Computer",
    theory: { max: 100, obtained: 65 },
    practical: { max: 100, obtained: 70 },
    grade: "", // can be calculated or left empty
  },
  {
    subject: "M.S. Word",
    theory: { max: 100, obtained: 70 },
    practical: { max: 100, obtained: 76 },
    grade: "",
  },
  {
    subject: "Fundamental Of Computer",
    theory: { max: 100, obtained: 65 },
    practical: { max: 100, obtained: 70 },
    grade: "", // can be calculated or left empty
  },
  {
    subject: "M.S. Word",
    theory: { max: 100, obtained: 70 },
    practical: { max: 100, obtained: 76 },
    grade: "",
  },
  // ... more subjects
];

const Marksheet = ({ student, overallGrade }) => {
  const verifyUrl = `https://www.secinstitute.in/verify?id=${student._id}`;
  const certificateRef = useRef();

  const totalTheoryMax = marks.reduce((sum, m) => sum + m.theory.max, 0);
  const totalTheoryObt = marks.reduce((sum, m) => sum + m.theory.obtained, 0);
  const totalPracticalMax = marks.reduce((sum, m) => sum + m.practical.max, 0);
  const totalPracticalObt = marks.reduce(
    (sum, m) => sum + m.practical.obtained,
    0
  );
  const grandTotal = totalTheoryObt + totalPracticalObt;

  return (
    <>
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

        <section>
          <table className="marksheet-info-table">
            <tbody>
              <tr>
                <td>
                  <strong>NAME OF STUDENT</strong>
                </td>
                <td className="marksheet-blue-text">
                  : {student?.studentName || "STUDENT NAME"}
                </td>
                <td>
                  <strong>REGS NO</strong>
                </td>
                <td className="marksheet-blue-text">
                  : {student?.enrollmentNumber || "SECI/0001"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>FATHER’S NAME</strong>
                </td>
                <td className="marksheet-blue-text">
                  : {student?.fatherName || "FATHER NAME"}
                </td>
                <td>
                  <strong>D.O.B</strong>
                </td>
                <td className="marksheet-blue-text">: {student?.dob || "DD/MM/YYYY"}</td>
              </tr>
              <tr>
                <td>
                  <strong>COURSE NAME</strong>
                </td>
                <td colSpan="3" className="marksheet-blue-text">
                  :{" "}
                  {student?.course ||
                    "Diploma in Computer Application & Accounting"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>COURSE DURATION</strong>
                </td>
                <td className="marksheet-blue-text">
                  : {student?.duration || "06 MONTHS"}
                </td>
                <td>
                  <strong>ISSUE DATE</strong>
                </td>
                <td className="marksheet-blue-text">
                  : {student?.issueDate || "DD/MM/YYYY"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>STUDY CENTRE</strong>
                </td>
                <td colSpan="3" className="marksheet-blue-text underline">
                  :{" "}
                  {student?.studyCentre ||
                    "Somnath Education & Computer Institute"}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <div className="marks-header">
          <img src={ribbonImage} alt="Statement of Marks Banner" />
          <div className="overlay-text">Statement of Marks</div>
        </div>

        <section>
          <table className="marks-table">
            <thead>
              <tr>
                <th rowSpan="2">SR. NO.</th>
                <th rowSpan="2">SUBJECT</th>
                <th colSpan="2" className="red-text">
                  THEORY
                </th>
                <th colSpan="2" className="red-text">
                  PRACTICAL
                </th>
                <th rowSpan="2" className="red-text">
                  TOTAL (TH.+PRA.)
                </th>
                <th rowSpan="2">GRADE</th>
              </tr>
              <tr>
                <th>Max</th>
                <th>Obt.</th>
                <th>Max</th>
                <th>Obt.</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((m, i) => {
                const total = m.theory.obtained + m.practical.obtained;
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{m.subject}</td>
                    <td>{m.theory.max}</td>
                    <td>{m.theory.obtained}</td>
                    <td>{m.practical.max}</td>
                    <td>{m.practical.obtained}</td>
                    <td>{total}</td>
                    <td>{m.grade || ""}</td>
                  </tr>
                );
              })}
              {/* Grand Total Row */}
              <tr className="grand-total-row">
                <td colSpan="2">
                  <strong>GRAND TOTAL</strong>
                </td>
                <td>
                  <strong>{totalTheoryMax}</strong>
                </td>
                <td>
                  <strong>{totalTheoryObt}</strong>
                </td>
                <td>
                  <strong>{totalPracticalMax}</strong>
                </td>
                <td>
                  <strong>{totalPracticalObt}</strong>
                </td>
                <td>
                  <strong>{grandTotal}</strong>
                </td>
                <td>
                  <strong>{overallGrade || ""}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <div className="certificate-footer">
            <div className="footer-director">
              <strong>DIRECTOR</strong>
            </div>
            <div className="footer-address">
              <p className="head-office">(HEAD OFFICE)</p>
              <p className="address">
                SOMNATH MARRIAGE HOME, MAURYA HOSPITAL,
                <br />
                NH-19, MATHURA (U.P) 281006
              </p>
              <p className="website">
                Website.{" "}
                <span className="website-link">www.secinstitute.in</span>
              </p>
            </div>

            <div>
              <QRCode
                title="SECInstitute QR Code"
                className="footer-qr"
                value={verifyUrl}
                // bgColor={back}
                // fgColor={fore}
                size={128}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Marksheet;
